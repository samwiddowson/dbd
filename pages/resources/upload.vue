<script setup lang="ts">
import { ref } from "vue"

const title = ref("")
const description = ref("")
const file = ref<any>("")
const image = ref<MediaSource | null>(null)
</script>
<template>
    <div>
        <BaseH1>Resource Upload Page</BaseH1>
        <div class="bg-black/60">
            <div class="grid w-full sm:grid-cols-2">
                <FormControl
                    v-model="title"
                    name="resource-title"
                    label="Title"
                    control="input"
                />
                <FormControl
                    v-model="file"
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
        </div>
        <p class="text-4xl text-white">{{ title }}</p>
        <p class="text-4xl text-white">{{ file }}</p>
        <p class="text-4xl text-white">{{ description }}</p>
    </div>
</template>
