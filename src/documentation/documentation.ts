export interface IDocumentation {
    getDefinitions: () => { [index: string]: IDocDefinition }
}

export interface IDocDefinition {
    type: string
    title: string
}

export interface IDocObject extends IDocDefinition {
    properties: { [index: string]: IDocDefinition }
}

export interface IDocArray extends IDocDefinition {
    items: IDocDefinition[]
}