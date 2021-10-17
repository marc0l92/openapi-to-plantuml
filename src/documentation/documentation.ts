export interface IDocumentation {
    getTitle: () => string
    getDefinitions: () => IDocMapOfDefinitions
    getServices: () => IDocService[]
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
