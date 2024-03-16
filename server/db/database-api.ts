export interface ResourceInfo {
    name: string
    description: string
    image: string
    dataFile: string
}

export function saveResourceInfo(info: ResourceInfo) {
    console.log("saveResourceInfo called with ResourceInfo:", info)
}
