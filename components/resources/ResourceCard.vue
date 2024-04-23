<script setup lang="ts">
const { slug, name, imgUrl } = defineProps<{
    slug: string
    name: string
    imgUrl: string
    description: string
}>()
</script>

<template>
    <article
        :class="cn('w-full rounded-lg border-2 border-lime-500 text-lime-500')"
    >
        <NuxtLink :to="`/resources/${slug}`">
            <BaseH2 class="text-lime-500">{{ name }}</BaseH2>
        </NuxtLink>
        <NuxtImg
            class="mx-auto"
            :src="imgUrl"
            fit="contain"
            height="200"
            width="360"
        />
        <p>{{ description }}</p>
    </article>
</template>
