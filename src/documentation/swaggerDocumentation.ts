import { IDocDefinition, IDocMapOfDefinitions, IDocService, IDocumentation } from "./documentation";

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

export default class SwaggerDoc implements IDocumentation {
    private doc: ISwaggerDoc

    constructor(docJson: Object) {
        this.doc = docJson
    }

    getTitle() {
        let title = []
        if (this.doc.info) {
            if (this.doc.info.title) {
                title.push(this.doc.info.title)
            }
            if (this.doc.info.version) {
                title.push(`[v${this.doc.info.version}]`)
            }
        }
        return title.join(' ')
    }

    getServices() {
        let services: IDocService[] = []
        for (const path in this.doc.paths) {
            for (const method in this.doc.paths[path]) {
                const service = this.doc.paths[path][method]
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
        if ('definitions' in this.doc) {
            return this.doc.definitions
        }
        return {}
    }

}