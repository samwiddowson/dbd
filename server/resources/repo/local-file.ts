import fs from "node:fs"
import log from "~/server/utils/log.js"

// import { v4 as uuid } from "uuid"

export async function saveFile(file: any, resourceSlug: string) {
    log.trace("called local saveFile with file:", file)
    const filenameExt = file.type.split("/").pop()
    const fileName = `${resourceSlug}.${filenameExt}`

    const urlPath = `/images/${fileName}`
    const filePath = `public/${urlPath}`

    const stream = fs.createWriteStream(filePath)

    const buffer = file.data

    stream.write(Buffer.from(buffer), (err) => {
        if (err) {
            throw new Error("Saving file failed!", err)
        }
    })

    return urlPath
}
