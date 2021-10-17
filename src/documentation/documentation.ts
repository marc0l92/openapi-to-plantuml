export interface IDocumentation {
    getDefinitions: () => { [index: string]: IDocDefinition }
}

export enum EDocTypes {
    Array = 'array',
    Boolean = 'boolean',
    Integer = 'integer',
    Object = 'object',
    String = 'string',
}

export interface IDocDefinition {
    type?: EDocTypes
    title?: string
    $ref?: string
}

export interface IDocObject extends IDocDefinition {
    properties?: { [index: string]: IDocDefinition }
}

export interface IDocArray extends IDocDefinition {
    items?: IDocDefinition
}