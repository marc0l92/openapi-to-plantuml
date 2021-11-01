import { EDocTypes, IDocArray, IDocDefinition, IDocObject } from "./documentation/definition"
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

    // Getters

    getDiagramText(): string {
        return this.diagramText + '@enduml'
    }

    getDiagramImageUri(): string {
        const encodedDiagram = plantumlEncoder.encode(this.diagramText)
        return this.options.serverUrl + '/' + this.options.format + '/' + encodedDiagram
    }

    // Internals

    private getDefName(def: IDocDefinition): string {
        if (def) {
            if (def.title) {
                return def.title
            }
            if (def.type) {
                if (def.type === 'array' && (def as IDocArray).items) {
                    return `[${this.getDefName((def as IDocArray).items)}]`
                }
                return `<i>${def.type}</i>`
            }
        }
        console.warn('No name defined for the definition:', def)
        return 'NoName'
    }

    // Builder

    buildTitle(title: string): void {
        this.diagramText += `title ${title}\n`
    }

    buildDefinition(def: IDocDefinition): void {
        let name = 'InlineDefinition'
        if (def.title) {
            name = def.title
        }
        if (!def.type) {
            def.type = EDocTypes.Object
        }
        switch (def.type) {
            case EDocTypes.Object:
                this.buildObject(name, def as IDocObject)
                break
            case EDocTypes.Array:
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                break
            default:
                throw 'Definition type not supported: ' + def.type
        }
    }

    buildProperty(name: string, property: IDocDefinition): void {
        if (property.title) {
            name = property.title
        }
        if (!property.type) {
            property.type = EDocTypes.Object
        }
        switch (property.type) {
            case EDocTypes.Array:
                this.diagramText += `  {field} ${name}: [${this.getDefName((property as IDocArray).items)}]\n`
                break
            case EDocTypes.Object:
                this.diagramText += `  {field} ${name}: ${this.getDefName(property)}\n`
                break
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                this.diagramText += `  {field} ${name}: <i>${property.type}</i>\n`
                break
            default:
                throw 'Property type not supported: ' + property.type
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