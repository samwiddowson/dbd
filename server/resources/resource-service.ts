import { saveFile } from "./repo/file-repo"
import { saveResourceInfo } from "../db/database-api"

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
    const resourceInfo: any = {
        name,
        description,
        image: "",
        dataFile: "",
    }

    // console.log(image)
    resourceInfo.image = await saveFile(image)
    // resourceInfo.dataFile = await saveFile(data)

    //     return saveFile(data)
    // })
    // .then((dataFilename) => {
    //     resourceInfo.dataFile = dataFilename

    resourceInfo.dataFile = "dummy"
    saveResourceInfo(resourceInfo)
}

export async function getResources() {
    return { test: "object" }
}
