import { IDocDefinition, IDocMapOfDefinitions, Documentation, IDocServices } from "./definition"

interface ISwaggerDoc {
    info?: {
        title?: string
        version?: string
    }
    paths?: {
        [index: string]: {
            [index: string]: {
                parameters?: IServiceParameter[]
                responses?: {
                    [index: string]: {
                        schema?: IDocDefinition
                    }
                }
            }
        }
    }
    definitions?: IDocMapOfDefinitions
}

interface IServiceParameter {
    $ref?: string
    in?: string
    schema?: IDocDefinition
}

export default class SwaggerDoc extends Documentation {
    private _doc: ISwaggerDoc

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
                services[path][method] = {}
                const docService = this._doc.paths[path][method]

                if (docService.parameters) {
                    const bodyParam = docService.parameters.find((p) => p.in === 'body')
                    if (bodyParam) {
                        services[path][method].request = bodyParam.schema
                    }
                }

                if (docService.responses) {
                    for (const statusCode of Object.keys(docService.responses).sort()) {
                        if (statusCode.match(/^2[0-9][0-9]$/) || statusCode === 'default') {
                            if (docService.responses[statusCode].schema) {
                                services[path][method].response = docService.responses[statusCode].schema
                            }
                            break
                        }
                    }
                }
            }
        }
        return services
    }

    getDefinitions() {
        if ('definitions' in this._doc) {
            return this._doc.definitions
        }
        return {}
    }

}