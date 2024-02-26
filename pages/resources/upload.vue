<script setup lang="ts">
import { ref } from "vue"

import BaseTextControl from "../../components/ui/forms/BaseTextControl.vue"

const title = ref("")
const description = ref("")
const file = ref("")
</script>
<template>
    <div>
        <BaseH1>Resource Upload Page</BaseH1>
        <div class="bg-black/60">
            <div class="grid w-full sm:grid-cols-2">
                <BaseTextControl
                    v-model="title"
                    name="title"
                    label="Title"
                    text-control="input"
                />
                <BaseTextControl
                    v-model="file"
                    name="file"
                    label="File"
                    text-control="input"
                />
            </div>
            <BaseTextControl
                v-model="description"
                name="description"
                label="Description"
                text-control="textarea"
            />
        </div>
        <p class="text-4xl text-white">{{ title }}</p>
        <p class="text-4xl text-white">{{ file }}</p>
        <p class="text-4xl text-white">{{ description }}</p>
    </div>
</template>
