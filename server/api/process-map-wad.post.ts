import { wrangleResources } from "../services/resource-wrangler-service"

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    function extract(fieldName: string) {
        return formData?.find((item) => item.name === fieldName)
    }

    const wadFile = Buffer.from(extract("wadFile")?.data ?? "")
    const resourceIndex =
        extract("resourceIndex")?.data.toString("utf8").split(",") ?? []

    //TODO: check for empty fields and throw error
    wrangleResources(wadFile, resourceIndex)
})
