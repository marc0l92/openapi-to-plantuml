import { Documentation } from './documentation/definition'
import SwaggerDoc from './documentation/swaggerDocumentation'
import OpenApiDocumentation from './documentation/openApiDocumentation'
import DiagramBuilder, { IOptions } from './diagramBuilder'
import * as YAML from 'js-yaml'

interface IServiceDiagrams {
    [index: string]: {
        [index: string]: {
            request?: {
                diagram: string
                imageUri: string
            }
            response?: {
                diagram: string
                imageUri: string
            }
        }
    }
}

export default class OpenApi2PlantUml {
    private _doc: Documentation
    private _diagramOptions: IOptions = {}
    private _servicesDiagrams: IServiceDiagrams = {}

    constructor(docJson: any, options: IOptions) {
        if (!(docJson instanceof Object)) {
            try {
                docJson = JSON.parse(docJson)
            } catch (e) {
                try {
                    docJson = YAML.load(docJson)
                } catch (e) {
                    throw new Error('The input documentation must be a valid JSON or YAML')
                }
            }
        }
        if(!(docJson instanceof Object)){
            throw new Error('The input documentation must be a valid JSON or YAML')
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

    getDiagrams(): IServiceDiagrams {
        return this._servicesDiagrams
    }

    async execute(): Promise<void> {
        await this._doc.resolveRefs()
        const services = this._doc.getServices()
        for (const path in services) {
            this._servicesDiagrams[path] = {}
            for (const method in services[path]) {
                this._servicesDiagrams[path][method] = {}
                const service = services[path][method]
                if (service.request) {
                    const requestDiagramBuilder = new DiagramBuilder(this._diagramOptions)
                    requestDiagramBuilder.buildTitle(`${method.toUpperCase()} ${path} Request`)
                    requestDiagramBuilder.buildDefinition(service.request)
                    this._servicesDiagrams[path][method].request = {
                        diagram: requestDiagramBuilder.getDiagramText(),
                        imageUri: requestDiagramBuilder.getDiagramImageUri(),
                    }
                }
                if (service.response) {
                    const responseDiagramBuilder = new DiagramBuilder(this._diagramOptions)
                    responseDiagramBuilder.buildTitle(`${method.toUpperCase()} ${path} Response`)
                    responseDiagramBuilder.buildDefinition(service.response)
                    this._servicesDiagrams[path][method].response = {
                        diagram: responseDiagramBuilder.getDiagramText(),
                        imageUri: responseDiagramBuilder.getDiagramImageUri(),
                    }
                }
            }
        }
    }
}