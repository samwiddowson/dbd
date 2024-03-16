<script setup lang="ts">
import { useResourceUpload } from "~/composables/upload.ts"
import BaseButton from "../../components/BaseButton.vue"

const { fields, uploadResourceData } = useResourceUpload()

const { title, description, image, dataFile } = fields

function submitData() {
    console.log("called submitData")
    if (!image.value) return
    uploadResourceData({
        title: title.value,
        description: description.value,
        image: image.value,
        dataFile: dataFile.value,
    })
}
</script>

<template>
    <div>
        <BaseH1>Resource Upload Page</BaseH1>
        <form class="bg-black/60" @submit.prevent="submitData">
            <div class="grid w-full sm:grid-cols-2">
                <FormControl
                    v-model="title"
                    name="resource-title"
                    label="Title"
                    control="input"
                />
                <FormControl
                    v-model="dataFile"
                    name="file"
                    label="File"
                    control="input"
                    input-type="file"
                />
            </div>
            <FormControl
                v-model="image"
                name="image"
                label="Image"
                control="ImagePicker"
            />

            <div class="grid w-full sm:grid-cols-2">
                <FormControl
                    v-model="description"
                    name="description"
                    label="Description"
                    control="textarea"
                />
            </div>
            <div class="grid w-full items-center">
                <BaseButton>Submit</BaseButton>
            </div>
        </form>
    </div>
</template>
