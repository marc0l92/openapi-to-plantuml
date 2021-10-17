export default class DiagramBuilder {
    private diagramText: string

    constructor() {
        this.diagramText = 'test'
    }

    getDiagramText(): string {
        return this.diagramText
    }
}