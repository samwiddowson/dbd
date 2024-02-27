<script setup lang="ts">
import { resolveComponent, InputTypeHTMLAttribute } from "vue"
import { cn } from "../../../utils/cn"
const { name, label, control, inputType } = defineProps<{
    name: string
    label: string
    control: "input" | "textarea" | "ImagePicker"
    inputType?: InputTypeHTMLAttribute
}>()

const model = defineModel<any>()

const { BaseTextArea, BaseInput, ImagePicker } = {
    BaseTextArea: resolveComponent("BaseTextArea"),
    BaseInput: resolveComponent("BaseInput"),
    ImagePicker: resolveComponent("ImagePicker"),
}
const cmp =
    control === "input" ? BaseInput
    : control === "textarea" ? BaseTextArea
    : ImagePicker
const controlId = `${name}-control`

const useInputType = control === "input" && inputType
</script>

<template>
    <div class="h-fit w-full rounded-2xl bg-black/70 p-4">
        <label :for="controlId" class="block"> {{ label }}</label>
        <component
            :is="cmp"
            :id="controlId"
            v-model="model"
            :name="name"
            :class="
                cn(
                    'w-full rounded border-2 border-amber-500 bg-black/0 text-base text-amber-400 caret-amber-500 focus:bg-amber-400/20',
                    $attrs.class
                )
            "
            :type="useInputType ? inputType : 'text'"
        ></component>
    </div>
</template>
