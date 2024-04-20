<script setup lang="ts">
const { slug, name, imgUrl } = defineProps<{
    slug: string
    name: string
    imgUrl: string
}>()
</script>

<template>
    <article>
        <NuxtLink :to="`/resources/${slug}`">
            <BaseH2>{{ name }}</BaseH2>
        </NuxtLink>
        <img :src="imgUrl" />
    </article>
</template>
