import ReleasePackager from "../services/ReleasePackager"

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    function extract(fieldName: string) {
        return formData?.find((item) => item.name === fieldName)
    }

    const wadFile = Buffer.from(extract("wadFile")?.data ?? "")
    const resourceIndex =
        extract("resourceIndex")?.data.toString("utf8").split(",") ?? []

    //TODO: check for empty fields and throw error
    const releasePackager = new ReleasePackager(wadFile, resourceIndex)

    const packagedRelease = releasePackager.buildReleasePackage()

    return packagedRelease
})
