import type { ResourceDto } from "../dto/resourceDto"
import type { Resource } from "../db/model/resource"

import { generateSlug } from "~/server/utils/slugify"

import { getAllResources, saveResourceInfo } from "../db/database-api"

import { buildFileRepo } from "./builders/fileRepoBuilder"

const fileRepo = buildFileRepo("files")
const imageRepo = buildFileRepo("images")

export class ResourceService {
    async saveResourceData({
        title,
        description,
        imageFile,
        dataFile,
    }: ResourceDto) {
        const resourceSlug = generateSlug(name)

        //TODO - ensure slug is unique
        const imageFileName = await imageRepo.saveFile(imageFile, resourceSlug)
        const dataFileName = await fileRepo.saveFile(dataFile, resourceSlug)

        const resourceInfo: Resource = {
            title,
            slug: resourceSlug,
            description,
            image: imageFileName,
            file: dataFileName,
            creator_id: "",
        }

        saveResourceInfo(resourceInfo)
    }

    async getResources() {
        return getAllResources()
    }
}
