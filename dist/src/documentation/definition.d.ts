export declare abstract class Documentation {
    resolveRefs(): Promise<any>;
    protected abstract get doc(): any;
    protected abstract set doc(doc: any);
    abstract getTitle(): string;
    abstract getDefinitions(): IDocMapOfDefinitions;
    abstract getServices(): IDocServices;
}
export declare enum EDocTypes {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
    Object = "object",
    String = "string"
}
export interface IDocServices {
    [index: string]: {
        [index: string]: {
            request?: IDocDefinition;
            response?: IDocDefinition;
        };
    };
}
export interface IDocDefinition {
    type?: EDocTypes;
    title?: string;
    $ref?: string;
}
export interface IDocObject extends IDocDefinition {
    required?: string[];
    properties?: IDocMapOfDefinitions;
    additionalProperties?: IDocDefinition;
}
export interface IDocArray extends IDocDefinition {
    items?: IDocDefinition;
}
export interface IDocMapOfDefinitions {
    [index: string]: IDocDefinition;
}
