<script setup lang="ts">
//This wrapper is necessary in order for v-model to work on dymamic <components>
const model = defineModel<string>()
</script>

<template>
    <input v-model="model" />
</template>
