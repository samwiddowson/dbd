<script setup lang="ts">
import { ref } from "vue"
import { cn } from "../../../utils/cn"
const { modelValue, name } = defineProps<{
    modelValue: MediaSource | null
    name: string
}>()
const emit = defineEmits(["update:modelValue"])

const imageUrl = ref("")
const isDragging = ref(false)
const imageInputElement = ref<HTMLInputElement | null>(null)

function selectFile() {
    imageInputElement.value?.click()
}

function handleFileSelect(event: any) {
    imageUrl.value = URL.createObjectURL(event.target.files[0])
    emit("update:modelValue", event.target.files[0])
}
</script>

<template>
    <div
        :class="
            cn(
                'grid h-64 w-full content-center rounded-2xl bg-black/70 p-4 text-center text-base',
                { 'border-dashed': !modelValue },
                $attrs.class
            )
        "
    >
        <div>
            <div v-if="!modelValue">
                <div v-if="!isDragging" class="h-fit">
                    <span>Drag & drop image here or </span>
                    <button class="font-semibold underline" @click="selectFile">
                        Choose
                    </button>
                </div>
                <div v-else><p>Drop image file here</p></div>
            </div>
            <div v-else class="h-full w-full">
                <NuxtImg
                    class="mx-auto"
                    :src="imageUrl"
                    fit="contain"
                    height="200"
                    width="360"
                />
            </div>
            <input
                :id="`${name}-hiddeninput`"
                ref="imageInputElement"
                :name="name"
                type="file"
                class="hidden"
                aria-hidden="true"
                aria-label="Image select"
                tabindex="-1"
                @change="handleFileSelect"
            />
        </div>
    </div>
</template>
