import { getAllResources, saveResourceInfo } from "../db/database-api"
import { generateSlug } from "../utils/slugify"
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
    imageFile,
    dataFile,
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

    resourceInfo.imageFile = await imageRepo.saveFile(imageFile, resourceSlug)
    resourceInfo.dataFile = await fileRepo.saveFile(dataFile, resourceSlug)

    resourceInfo.dataFile = "dummy"
    saveResourceInfo(resourceInfo)
}

export async function getResources() {
    return getAllResources()
}
