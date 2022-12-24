export class Extra {
    info: string
    description: string

    constructor(info: string, description: string){
        this.info = info
        this.description = description
    }

    Json() {
        return { info: this.info, description: this.description}
    }
}