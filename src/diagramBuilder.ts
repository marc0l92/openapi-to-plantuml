import { EDocTypes, IDocArray, IDocDefinition, IDocObject } from "./documentation/documentation"
import * as plantumlEncoder from 'plantuml-encoder'

export interface IOptions {
    serverUrl?: string
    format?: string
}

const defaultOptions: IOptions = {
    serverUrl: 'http://www.plantuml.com/plantuml',
    format: 'svg'
}

const refNameRegexp = /\/([^\/]+)$/
function getRefName(ref: string): string {
    const matches = refNameRegexp.exec(ref)
    if (matches && matches[1]) {
        return matches[1]
    }
    throw 'Invalid reference: ' + ref
}

function getDefName(def: IDocDefinition): string {
    if (def) {
        if (def.title) {
            return def.title
        }
        if (def.type) {
            return def.type
        }
        if (def.$ref) {
            return getRefName(def.$ref)
        }
    }
    console.warn('No name defined for the definition:', def)
    return 'NoName'
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

    buildDefinition(name: string, definition: IDocDefinition): void {
        if (definition.title) {
            name = definition.title
        }
        switch (definition.type) {
            case EDocTypes.Object:
                this.buildObject(name, definition as IDocObject)
                break
            default:
            // throw 'Definition type not supported: ' + definition.type
        }
    }

    buildProperty(name: string, property: IDocDefinition): void {
        if (property.title) {
            name = property.title
        }
        switch (property.type) {
            case EDocTypes.Array:
                this.diagramText += `  {field} ${name}: [${getDefName((property as IDocArray).items)}]\n`
                break
            case EDocTypes.Object:
                this.diagramText += `  {field} ${name}: {}\n`
                break
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                this.diagramText += `  {field} ${name}: ${property.type}\n`
                break
            default:
            // throw 'Property type not supported: ' + property.type
        }
    }

    buildObject(name: string, objDef: IDocObject): void {
        this.diagramText += `class ${name} {\n`
        for (const propName in objDef.properties) {
            this.buildProperty(propName, objDef.properties[propName])
        }
        this.diagramText += `}\n`
    }
}