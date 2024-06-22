import { getAllResources, saveResourceInfo } from "../db/database-api"
import { generateSlug } from "~/server/utils/slugify"
import { buildFileRepo } from "./builders/fileRepoBuilder"

const fileRepo = buildFileRepo("files")
const imageRepo = buildFileRepo("images")

export interface ResourceData {
    name: string
    slug: string
    description: string
    imageFile: Buffer
    dataFile?: Buffer //TODO: remove optional modifier once implemented
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
    const imageFileName = await imageRepo.saveFile(imageFile, resourceSlug)
    const dataFileName = await fileRepo.saveFile(dataFile, resourceSlug)

    const resourceInfo = {
        name,
        slug: resourceSlug,
        description,
        imageFile: imageFileName,
        dataFile: dataFileName,
        creatorId: "",
    }

    saveResourceInfo(resourceInfo)
}

export async function getResources() {
    return getAllResources()
}
