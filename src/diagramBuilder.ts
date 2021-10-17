import { IDocDefinition, IDocObject } from "./documentation/documentation"
import * as plantumlEncoder from 'plantuml-encoder'

export interface IOptions {
    serverUrl?: string
    format?: string
}

const defaultOptions: IOptions = {
    serverUrl: 'http://www.plantuml.com/plantuml',
    format: 'svg'
}

export default class DiagramBuilder {
    private options: IOptions
    private diagramText: string

    constructor(options: IOptions) {
        this.diagramText = '@startuml\n'
        this.options = Object.assign(defaultOptions, options)
    }

    getDiagramText(): string {
        return this.diagramText + '@enduml'
    }

    getDiagramImageUri(): string {
        const encodedDiagram = plantumlEncoder.encode(this.diagramText)
        return this.options.serverUrl + '/' + this.options.format + '/' + encodedDiagram
    }

    buildObject(name: string, obj: IDocObject): void {
        this.diagramText += `class ${name} {\n`
        this.diagramText += `}\n`
    }
}