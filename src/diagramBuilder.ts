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

const safeStr = (str: string) => {
    return JSON.stringify(str)
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
        this.diagramText += `title ${safeStr(title)}\n`
    }

    buildDefinition(def: IDocDefinition): void {
        let usedDefinitions: IDocDefinition[] = []
        let name = 'InlineDefinition'
        if (def.title) {
            name = def.title
        }
        if (!def.type) {
            def.type = EDocTypes.Object
        }

        switch (def.type) {
            case EDocTypes.Object:
                usedDefinitions = this.buildObject(name, def as IDocObject)
                break
            case EDocTypes.Array:
                name += '[]'
                usedDefinitions = this.buildObject(name, (def as IDocArray).items as IDocObject, 'abstract')
                break
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                this.buildBasicType(def.type)
                break
            default:
                throw 'Definition type not supported: ' + def.type
        }
        usedDefinitions.forEach(usedDefinition => {
            this.buildDefinition(usedDefinition)
            this.buildLink(name, this.getDefName(usedDefinition))
        })
    }

    buildProperty(name: string, property: IDocDefinition): IDocDefinition[] {
        let usedDefinitions: IDocDefinition[] = []
        if (property.title) {
            name = property.title
        }
        if (!property.type) {
            property.type = EDocTypes.Object
        }
        switch (property.type) {
            case EDocTypes.Array:
                this.diagramText += `  {field} ${name}: [${this.getDefName((property as IDocArray).items)}]\n`
                if ((property as IDocArray).items.type === EDocTypes.Object) {
                    usedDefinitions.push((property as IDocArray).items)
                }
                break
            case EDocTypes.Object:
                this.diagramText += `  {field} ${name}: ${this.getDefName(property)}\n`
                usedDefinitions.push(property)
                break
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                this.diagramText += `  {field} ${name}: <i>${property.type}</i>\n`
                break
            default:
                throw 'Property type not supported: ' + property.type
        }
        return usedDefinitions
    }

    buildObject(name: string, objDef: IDocObject, type: string = 'class'): IDocDefinition[] {
        let usedDefinitions: IDocDefinition[] = []
        this.diagramText += `${type} ${safeStr(name)} {\n`
        for (const propName in objDef.properties) {
            usedDefinitions = usedDefinitions.concat(this.buildProperty(propName, objDef.properties[propName]))
        }
        if ('additionalProperties' in objDef) {
            usedDefinitions = usedDefinitions.concat(this.buildProperty('{*}', objDef.additionalProperties))
        }
        this.diagramText += `}\n`
        return usedDefinitions
    }

    buildBasicType(type: string): void {
        this.diagramText += `entity ${type} {}\n`
    }

    buildLink(from: string, to: string): void {
        this.diagramText += `${safeStr(from)} --> ${safeStr(to)}\n`
    }
}