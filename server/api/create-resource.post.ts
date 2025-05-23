import { resourceService } from "../services"
import type { ResourceDto } from "../dto/resourceDto"

export default defineEventHandler(async (event) => {
    // const service = useNuxtsaveApp().$resourceService
    const formData = await readMultipartFormData(event)

    if (!formData) return

    function extract(fieldName: string) {
        return formData?.find((item) => item.name === fieldName)
    }

    const resourceData: ResourceDto = {
        title: extract("title")?.data?.toString("utf8") ?? "",
        description: extract("description")?.data?.toString("utf8") ?? "",
        imageFile: Buffer.from(extract("image")?.data ?? ""),
        slug: "",
        creatorId: "",
    }

    //TODO: validate data and throw/log error and respond with error if it's broken

    return resourceService.saveResourceData(resourceData)
})
