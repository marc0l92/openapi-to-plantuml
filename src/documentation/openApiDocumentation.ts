import { Documentation, IDocDefinition, IDocMapOfDefinitions, IDocServices } from "./definition"

interface IOpenApiDoc {
    info?: {
        title?: string
        version?: string
    }
    paths?: {
        [index: string]: {
            [index: string]: {
                requestBody?: {
                    content?: {
                        "application/json"?: {
                            schema?: IDocDefinition
                        }
                    }
                }
                responses?: {
                    [index: string]: {
                        content?: {
                            "application/json"?: {
                                schema?: IDocDefinition
                            }
                        }
                    }
                }
            }
        }
    }
    components?: {
        schemas?: IDocMapOfDefinitions
    }
}

export default class OpenApiDocumentation extends Documentation {
    private _doc: IOpenApiDoc

    constructor(docJson: Object) {
        super()
        this._doc = docJson
    }

    protected get doc(): any {
        return this._doc;
    }

    protected set doc(doc: any) {
        this._doc = doc;
    }

    getTitle() {
        let title = []
        if (this._doc.info) {
            if (this._doc.info.title) {
                title.push(this._doc.info.title)
            }
            if (this._doc.info.version) {
                title.push(`[v${this._doc.info.version}]`)
            }
        }
        return title.join(' ')
    }

    getServices() {
        let services: IDocServices = {}
        for (const path in this._doc.paths) {
            services[path] = {}
            for (const method in this._doc.paths[path]) {
                if (['get', 'post', 'put', 'delete', 'patch'].indexOf(method) >= 0) {
                    services[path][method] = {}
                    const docService = this._doc.paths[path][method]

                    if (docService.requestBody
                        && docService.requestBody.content
                        && docService.requestBody.content['application/json']
                        && docService.requestBody.content['application/json'].schema) {
                        services[path][method].request = docService.requestBody.content['application/json'].schema
                    }

                    if (docService.responses) {
                        for (const statusCode of Object.keys(docService.responses).sort()) {
                            if (statusCode.match(/^2[0-9][0-9]$/) || statusCode === 'default') {
                                if (docService.responses[statusCode].content
                                    && docService.responses[statusCode].content['application/json']
                                    && docService.responses[statusCode].content['application/json'].schema) {
                                    services[path][method].response = docService.responses[statusCode].content['application/json'].schema
                                }
                                break
                            }
                        }
                    }
                }
            }
        }
        return services
    }

    getDefinitions() {
        if ('components' in this._doc && 'schemas' in this._doc.components) {
            return this._doc.components.schemas
        }
        return {}
    }

}