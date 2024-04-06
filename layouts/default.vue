<script setup lang="ts">
import { ref } from "vue"
const mainLandmark: any = ref<any>(null)

function skipToContent() {
    console.log("skipToCotent pressed")
    mainLandmark.value.focus()
}
</script>

<template>
    <div>
        <div
            :class="`absolute left-0 top-0 z-50 grid
                     h-0 w-full items-center
                     overflow-hidden bg-black
                     px-16 py-2 focus-within:h-min`"
        >
            <BaseButton @click="skipToContent">Skip to Content</BaseButton>
        </div>
        <TheHeader />
        <TheBackground />
        <main
            ref="mainLandmark"
            class="fixed z-0 h-dvh w-full pt-[6.25rem] text-amber-400 sm:pt-12"
        >
            <div class="h-full w-full p-1">
                <BaseCompartment class="h-full w-full overflow-y-scroll">
                    <slot></slot>
                </BaseCompartment>
            </div>
        </main>
    </div>
</template>
