import type { FileStrategy } from "~/server/services/repo/interfaces/FileStrategy"

export default class FileRepo {
    fileStrategy: FileStrategy

    constructor(fileStrategy: FileStrategy) {
        this.fileStrategy = fileStrategy
    }
    testnum = 2
    saveFile(file: any, resourceSlug: string) {
        return this.fileStrategy.saveFile(file, resourceSlug)
    }
}
