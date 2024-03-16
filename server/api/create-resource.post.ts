import {
    ResourceData,
    saveResourceData as save,
} from "../resources/resource-service"

export default defineEventHandler(async (event) => {
    const formData: any = await readMultipartFormData(event)

    if (!formData) return

    console.log(formData)

    function extract(fieldName: string) {
        return formData!.find((item: any) => item.name === fieldName)
    }

    const resourceData: ResourceData = {
        name: extract("title")?.data?.toString("utf8")!,
        description: extract("description")?.data?.toString("utf8")!,
        image: extract("image"),
    }

    console.log("resourceData", resourceData)

    save(resourceData)
})
