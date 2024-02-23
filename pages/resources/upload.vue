<script setup lang="ts">
import { ref } from "vue"

import BaseTextArea from "../../components/ui/forms/BaseTextArea.vue"
import BaseInput from "../../components/ui/forms/BaseInput.vue"

const title = ref("")
const description = ref("")
const file = ref("")
</script>
<template>
    <div>
        <BaseH1>Resource Upload Page</BaseH1>
        <div class="bg-black/60">
            <div class="grid w-full sm:grid-cols-2">
                <BaseInput v-model="title" name="title" label="Title" />
                <BaseInput v-model="file" name="file" label="File" />
            </div>
            <BaseTextArea
                v-model="description"
                name="description"
                label="Description"
            />
        </div>
        <p class="text-4xl text-white">{{ title }}</p>
        <p class="text-4xl text-white">{{ file }}</p>
        <p class="text-4xl text-white">{{ description }}</p>
    </div>
</template>
