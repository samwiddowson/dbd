import fs from "node:fs"

import log from "~/server/utils/log.js"

import type {
    FileStrategy,
    FileStrategyConstructor,
} from "./interfaces/FileStrategy"

// export async function saveFile(file: any, resourceSlug: string) {
//     log.trace("called local saveFile with file:", file)
//     const filenameExt = file.type.split("/").pop()
//     const fileName = `${resourceSlug}.${filenameExt}`
//
//     const urlPath = `/images/${fileName}`
//     const filePath = `public/${urlPath}`
//
//     const stream = fs.createWriteStream(filePath)
//
//     const buffer = file.data
//
//     stream.write(Buffer.from(buffer), (err) => {
//         if (err) {
//             throw new Error("Saving file failed!", err)
//         }
//     })
//
//     return urlPath
// }

const LocalFileStrategy: FileStrategyConstructor = class LocalFileStrategy
    implements FileStrategy
{
    directory: string

    constructor(directory: string) {
        this.directory = directory
        log.debug(
            "New LocalFileStrategy instance created with directory:",
            this.directory
        )
    }
    testnum = 1

    async saveFile(file: any, resourceSlug: string) {
        log.trace("called local saveFile with file:", file)
        const filenameExt = file.type.split("/").pop()
        const fileName = `${resourceSlug}.${filenameExt}`

        const urlPath = `${this.directory}/${fileName}`
        const filePath = `public/${urlPath}`

        log.debug("preparing to save file with path", filePath)
        log.debug("testnum is ", this.testnum)
        const stream = fs.createWriteStream(filePath)

        const buffer = file.data

        stream.write(Buffer.from(buffer), (err) => {
            if (err) {
                throw new Error("Saving file failed!", err)
            }
        })

        return urlPath
    }
}

export default LocalFileStrategy
