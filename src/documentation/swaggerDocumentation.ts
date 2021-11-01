import { IDocDefinition, IDocMapOfDefinitions, IDocService, Documentation } from "./definition"

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
                        $ref?: string
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
        let services: IDocService[] = []
        for (const path in this._doc.paths) {
            for (const method in this._doc.paths[path]) {
                const service = this._doc.paths[path][method]
                let request: IDocDefinition = {}
                let response: IDocDefinition = {}

                if (service.parameters) {
                    const bodyParam = service.parameters.find((p) => p.in === 'body')
                    if (bodyParam) {
                        request = bodyParam.schema
                    }
                }

                if (service.responses) {
                    for (const statusCode in service.responses) {
                        if (statusCode.match(/^2[0-9][0-9]$/) && service.responses[statusCode].schema) {
                            response = service.responses[statusCode].schema
                            break
                        }
                    }
                }

                services.push({
                    path: path,
                    method: method,
                    request: request,
                    response: response,
                })
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