import { saveFile } from "./repo/file-repo"
import { getAllResources, saveResourceInfo } from "../db/database-api"
import { generateSlug } from "../utils/slugify"

export interface ResourceData {
    name: string
    slug: string
    description: string
    imageFile: any
    dataFile?: any //TODO: remove optional modifier once implemented
    creatorId: string
}

export async function saveResourceData({
    name,
    description,
    imageFile: image,
    data,
}: ResourceData) {
    const resourceSlug = generateSlug(name)

    //TODO - ensure slug is unique

    const resourceInfo: ResourceData = {
        name,
        slug: resourceSlug,
        description,
        imageFile: "",
        dataFile: "",
        creatorId: "",
    }

    resourceInfo.imageFile = await saveFile(image, resourceSlug)
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
