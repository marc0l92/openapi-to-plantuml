import NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
export namespace entry {
    const OpenApi2PlantUml: string;
}
export const devtool: string;
export const mode: string;
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
        exclude: RegExp;
    }[];
}
export namespace resolve {
    const extensions: string[];
}
export const plugins: NodePolyfillPlugin[];
export namespace output {
    const filename: string;
    const path: string;
    const libraryExport: string;
    const globalObject: string;
    namespace library {
        const name: string;
        const type: string;
    }
}
