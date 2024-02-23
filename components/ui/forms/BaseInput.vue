<script setup lang="ts">
import { cn } from "../../../utils/cn"
const { name, label } = defineProps<{
    name: string
    label: string
}>()

const model = defineModel<string>()
</script>

<template>
    <div class="h-fit w-full rounded-2xl bg-black/70 p-4">
        <label :for="`${name}-input`" class="block">{{ label }}</label>
        <input
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
