import { ref } from "vue"

async function uploadResourceData(resourceData: {
    title: string
    description: string
    dataFile?: any
    image: File
}) {
    const formData = new FormData()

    console.log(resourceData.image.name)

    formData.append("title", resourceData.title)
    formData.append("description", resourceData.description)
    formData.append("image", resourceData.image, resourceData.image.name)
    formData.append(
        "dataFile",
        resourceData.dataFile,
        resourceData.dataFile.name
    )

    $fetch("/api/create-resource", {
        method: "POST",
        body: formData,
        headers: { "cache-control": "no-cache" },
    })
}

export function useResourceUpload() {
    const title = ref("")
    const description = ref("")
    const dataFile = ref<any>("")
    const image = ref<File | null>(null)

    return {
        fields: { title, description, dataFile, image },
        uploadResourceData,
    }
}
