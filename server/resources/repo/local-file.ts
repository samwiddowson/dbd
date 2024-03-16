import fs from "node:fs"
// import { v4 as uuid } from "uuid"

export async function saveFile(file: any) {
    console.log("file", file)
    const filenameExt = file.type.split("/").pop()
    const fileName = `${"test"}.${filenameExt}`

    const filePath = `public/images/${fileName}`

    console.log("filePath = ", filePath)

    const stream = fs.createWriteStream(filePath)

    console.log("created stream", stream)

    const buffer = file.data

    stream.write(Buffer.from(buffer), (err) => {
        if (err) {
            throw new Error("Saving image failed!")
        }
    })

    return filePath
}