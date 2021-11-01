import * as $RefParser from "@apidevtools/json-schema-ref-parser"

const setDefinitionsTitle = (definitions: IDocMapOfDefinitions): void => {
    for (const defName in definitions) {
        if (!definitions[defName].hasOwnProperty('title')) {
            definitions[defName].title = defName
        }
    }
}

export abstract class Documentation {
    async resolveRefs(): Promise<any> {
        setDefinitionsTitle(this.getDefinitions())

        this.doc = await $RefParser.dereference(this.doc)
    }

    protected abstract get doc(): any
    protected abstract set doc(doc: any)

    abstract getTitle(): string
    abstract getDefinitions(): IDocMapOfDefinitions
    abstract getServices(): IDocService[]
}

export enum EDocTypes {
    Array = 'array',
    Boolean = 'boolean',
    Integer = 'integer',
    Object = 'object',
    String = 'string',
}

export interface IDocService {
    path: string
    method: string
    request?: IDocDefinition
    response?: IDocDefinition
}

export interface IDocDefinition {
    type?: EDocTypes
    title?: string
    $ref?: string
}

export interface IDocObject extends IDocDefinition {
    properties?: IDocMapOfDefinitions
}

export interface IDocArray extends IDocDefinition {
    items?: IDocDefinition
}

export interface IDocMapOfDefinitions {
    [index: string]: IDocDefinition
}
