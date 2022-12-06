import { IOptions } from './diagramBuilder';
interface IServiceDiagrams {
    [index: string]: {
        [index: string]: {
            request?: {
                diagram: string;
                imageUri: string;
            };
            response?: {
                diagram: string;
                imageUri: string;
            };
        };
    };
}
export default class OpenApi2PlantUml {
    private _doc;
    private _diagramOptions;
    private _servicesDiagrams;
    constructor(docJson: any, options: IOptions);
    getDiagrams(): IServiceDiagrams;
    execute(): Promise<void>;
}
export {};
