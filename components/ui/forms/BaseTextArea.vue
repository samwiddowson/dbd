<script setup lang="ts">
import { cn } from "../../../utils/cn"
const { name, label } = defineProps<{
    name: string
    label: string
}>()

const model = defineModel<string>()
</script>

<template>
    <div class="h-fit w-full rounded-2xl p-4">
        <label :for="`${name}-input`" class="block font-semibold">{{
            label
        }}</label>
        <textarea
            v-model="model"
            rows="5"
            :class="
                cn(
                    'w-full rounded border-2 border-amber-500 bg-black/0 text-base text-amber-400 caret-amber-500 focus:bg-amber-500/10',
                    $attrs.class
                )
            "
        ></textarea>
    </div>
</template>
