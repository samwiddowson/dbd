import { getAllResources, saveResourceInfo } from "../db/database-api"
import { generateSlug } from "~/server/utils/slugify"
import { buildFileRepo } from "./builders/fileRepoBuilder"

const fileRepo = buildFileRepo("files")
const imageRepo = buildFileRepo("images")

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

    resourceInfo.imageFile = await imageRepo.saveFile(image, resourceSlug)
    resourceInfo.dataFile = await fileRepo.saveFile(data, resourceSlug)
    saveResourceInfo(resourceInfo)
}

export async function getResources() {
    return getAllResources()
}
