import { v4 as uuidv4 } from "uuid"
import { saveFile } from "./repo/file-repo"
import { getAllResources, saveResourceInfo } from "../db/database-api"

export interface ResourceData {
    name: string
    description: string
    image: any
    data?: any //TODO: remove optional modifier once implemented
}

export async function saveResourceData({
    name,
    description,
    image,
    data,
}: ResourceData) {
    const resourceSlug = uuidv4()
    const resourceInfo: any = {
        name,
        slug: resourceSlug,
        description,
        image: "",
        dataFile: "",
    }

    // console.log(image)
    resourceInfo.image = await saveFile(image, resourceSlug)
    // resourceInfo.dataFile = await saveFile(data)

    //     return saveFile(data)
    // })
    // .then((dataFilename) => {
    //     resourceInfo.dataFile = dataFilename

    resourceInfo.dataFile = "dummy"
    saveResourceInfo(resourceInfo)
}

export async function getResources() {
    return getAllResources()
}
