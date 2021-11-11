import { EDocTypes, IDocArray, IDocDefinition, IDocMapOfDefinitions, IDocObject } from "./documentation/definition"
import * as plantumlEncoder from 'plantuml-encoder'

export interface IOptions {
    serverUrl?: string
    format?: string
    diagramHeader?: string
    colors?: boolean
}

const defaultOptions: IOptions = {
    serverUrl: 'https://www.plantuml.com/plantuml',
    format: 'svg',
    colors: true,
}
const colors = {
    nativeTypes: '#000000',
    field: '#00568F',
    fieldMandatory: '#00568F',
}

const safeStr = (str: string) => {
    return JSON.stringify(str)
}

const isDefinition = (def: IDocDefinition): boolean => {
    return 'title' in def
}

export default class DiagramBuilder {
    private options: IOptions
    private diagramText: string
    private classes: string[] = []

    constructor(options: IOptions) {
        this.diagramText = '@startuml\n'
        this.options = Object.assign(defaultOptions, options)
        this.diagramText += this.options.diagramHeader + '\n'
    }

    // Getters

    getDiagramText(): string {
        return this.diagramText + '@enduml'
    }

    getDiagramImageUri(): string {
        const encodedDiagram = plantumlEncoder.encode(this.diagramText)
        return this.options.serverUrl + '/' + this.options.format + '/' + encodedDiagram
    }

    // Builder

    buildTitle(title: string): void {
        this.diagramText += `title ${safeStr(title)}\n`
    }

    buildDefinition(def: IDocDefinition): void {
        let usedDefinitions: IDocMapOfDefinitions = {}
        let name = 'object'
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
        for (const defName in usedDefinitions) {
            const usedDefinition = usedDefinitions[defName]
            if (this.classes.indexOf(usedDefinition.title) === -1) {
                this.buildDefinition(usedDefinition)
                this.classes.push(usedDefinition.title)
            }
            this.buildLink(name, defName)
        }
    }

    buildProperty(name: string, property: IDocDefinition, mandatory: boolean = false): IDocMapOfDefinitions {
        let usedDefinitions: IDocMapOfDefinitions = {}
        if (!property.type) {
            property.type = EDocTypes.Object
        }
        switch (property.type) {
            case EDocTypes.Array:
                const arrayItems = (property as IDocArray).items
                this.buildField(name, `[${this.getDefName(arrayItems)}]`, mandatory)
                if (arrayItems.type === EDocTypes.Object) {
                    if (isDefinition(arrayItems)) {
                        usedDefinitions[this.getDefName(arrayItems)] = arrayItems
                    }
                }
                break
            case EDocTypes.Object:
                this.buildField(name, this.getDefName(property), mandatory)
                if (isDefinition(property)) {
                    usedDefinitions[this.getDefName(property)] = property
                }
                break
            case EDocTypes.Boolean:
            case EDocTypes.Integer:
            case EDocTypes.String:
                this.buildField(name, this.color(`<i>${property.type}</i>`, colors.nativeTypes), mandatory)
                break
            default:
                throw 'Property type not supported: ' + property.type
        }
        return usedDefinitions
    }

    buildObject(name: string, objDef: IDocObject, type: string = 'class'): IDocMapOfDefinitions {
        let usedDefinitions: IDocMapOfDefinitions = {}
        this.diagramText += `${type} ${safeStr(name)} {\n`
        for (const propName in objDef.properties) {
            const mandatory = 'required' in objDef && objDef.required.indexOf(propName) !== -1
            usedDefinitions = Object.assign(usedDefinitions, this.buildProperty(propName, objDef.properties[propName], mandatory))
        }
        if ('additionalProperties' in objDef) {
            usedDefinitions = Object.assign(usedDefinitions, this.buildProperty('{*}', objDef.additionalProperties))
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

    buildField(name: string, type: string, mandatory: boolean): void {
        name = `<b>${name}</b>`
        if (mandatory) {
            name = this.color(`<u>${name}</u>`, colors.fieldMandatory)
        } else {
            name = this.color(`${name}`, colors.field)
        }
        this.diagramText += `  {field} ${name}: ${type}\n`
    }

    color(str: string, color: string): string {
        if (this.options.colors) {
            return `<color ${color}>${str}</color>`
        }
        return str
    }

    getDefName(def: IDocDefinition): string {
        if (def) {
            if (def.title) {
                return def.title
            }
            if (def.type) {
                if (def.type === 'array' && (def as IDocArray).items) {
                    return `[${this.getDefName((def as IDocArray).items)}]`
                }
                return this.color(`<i>${def.type}</i>`, colors.nativeTypes)
            }
            return this.color(`<i>object</i>`, colors.nativeTypes)
        }
        console.warn('No name defined for the definition:', def)
        return 'NoName'
    }
}