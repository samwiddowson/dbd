import type { ResourceData } from "~/server/services/resource-service"
import { saveResourceData as save } from "~/server/services/resource-service"

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    if (!formData) return

    function extract(fieldName: string) {
        return formData?.find((item) => item.name === fieldName)
    }

    const resourceData = {
        name: extract("title")?.data?.toString("utf8") ?? "",
        description: extract("description")?.data?.toString("utf8") ?? "",
        imageFile: Buffer.from(extract("image")?.data ?? "") as image,
        slug: "",
    }

    console.log("resourceData", resourceData)
    //TODO: check data and throw/log error and respond with error if it's broken

    save(resourceData)
})
