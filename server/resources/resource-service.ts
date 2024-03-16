import { saveFile } from "./repo/file-repo"
import { ResourceInfo, saveResourceInfo } from "../db/database-api"

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
    const resourceInfo: ResourceInfo = {
        name,
        description,
        image: "",
        dataFile: "",
    }

    console.log(image)
    resourceInfo.image = await saveFile(image)
    resourceInfo.dataFile = await saveFile(data)

    //     return saveFile(data)
    // })
    // .then((dataFilename) => {
    //     resourceInfo.dataFile = dataFilename
    saveResourceInfo(resourceInfo)
}
