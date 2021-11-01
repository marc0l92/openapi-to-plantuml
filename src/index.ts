import { Documentation } from './documentation/definition'
import SwaggerDoc from './documentation/swaggerDocumentation'
import OpenApiDocumentation from './documentation/openApiDocumentation'
import DiagramBuilder, { IOptions } from './diagramBuilder'

interface IServiceDiagrams {
    method: string
    path: string
    request?: {
        diagram: string
        imageUri: string
    }
    response?: {
        diagram: string
        imageUri: string
    }
}

export default class SwaggerToPlantuml {
    private _doc: Documentation
    private _diagramOptions: IOptions = {}
    private _servicesDiagrams: IServiceDiagrams[] = []

    constructor(docJson: any, options: IOptions) {
        if (!(docJson instanceof Object)) {
            throw 'Input documentation must be a JSON Object'
        }

        // Check swagger
        if ('swagger' in docJson && docJson.swagger === '2.0') {
            this._doc = new SwaggerDoc(docJson)
        } else if ('openapi' in docJson && docJson.openapi.match(/^3\.[0-9]+\.[0-9]+$/)) {
            this._doc = new OpenApiDocumentation(docJson)
        } else {
            throw 'Input documentation format not supported'
        }
        this._diagramOptions = options || {}
    }

    getDiagrams(): IServiceDiagrams[] {
        return this._servicesDiagrams
    }

    async execute(): Promise<void> {
        console.log('execute')
        await this._doc.resolveRefs()
        const services = this._doc.getServices()
        for (const i in services) {
            const service = services[i]
            const serviceDiagram: IServiceDiagrams = {
                method: service.method,
                path: service.path,
            }
            if (service.request) {
                const requestDiagramBuilder = new DiagramBuilder(this._diagramOptions)
                requestDiagramBuilder.buildTitle(`${service.method.toUpperCase()} ${service.path} Request`)
                requestDiagramBuilder.buildDefinition(service.response)
                serviceDiagram.request = {
                    diagram: requestDiagramBuilder.getDiagramText(),
                    imageUri: requestDiagramBuilder.getDiagramImageUri(),
                }
            }
            if (service.response) {
                const responseDiagramBuilder = new DiagramBuilder(this._diagramOptions)
                responseDiagramBuilder.buildTitle(`${service.method.toUpperCase()} ${service.path} Response`)
                responseDiagramBuilder.buildDefinition(service.response)
                serviceDiagram.response = {
                    diagram: responseDiagramBuilder.getDiagramText(),
                    imageUri: responseDiagramBuilder.getDiagramImageUri(),
                }
            }
            this._servicesDiagrams.push(serviceDiagram)
        }
    }
}