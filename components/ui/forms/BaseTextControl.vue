<script setup lang="ts">
import { cn } from "../../../utils/cn"
const { name, label } = defineProps<{
    name: string
    label: string
    textControl: "input" | "textarea"
}>()

const model = defineModel<string>()

const controlId = `${name}-control`
</script>

<template>
    <div class="h-fit w-full rounded-2xl bg-black/70 p-4">
        <label :for="controlId" class="block">{{ label }}</label>
        <component
            :is="textControl"
            :id="controlId"
            v-model="model"
            :class="
                cn(
                    'w-full rounded border-2 border-amber-500 bg-black/0 text-base text-amber-400 caret-amber-500 focus:bg-amber-400/20',
                    $attrs.class
                )
            "
        />
    </div>
</template>
