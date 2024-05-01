<script setup lang="ts">
const { slug, name, imgUrl } = defineProps<{
    slug: string
    name: string
    imgUrl: string
    description: string
}>()
</script>

<template>
    <NuxtLink :to="`/resources/${slug}`">
        <article
            :class="
                cn(
                    'w-full space-y-4 rounded-lg border-2 shadow-glow-sm',
                    'mb-8 border-lime-200 px-4 pb-4 text-lime-200',
                    'transition-all hover:scale-105 hover:bg-lime-200/5 hover:shadow-glow-lg'
                )
            "
        >
            <BaseH2 class="text-lime-200">{{ name }}</BaseH2>
            <NuxtImg
                class="bg-black-80 rounded-lg border-2 border-amber-400 shadow-amber-400"
                :src="imgUrl"
                fit="contain"
                width="500"
                height="350"
            />
            <p>{{ description }}</p>
        </article>
    </NuxtLink>
</template>
