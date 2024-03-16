<script setup lang="ts">
const NavItem = defineNuxtLink({
    componentName: "HeaderNavItem",
    activeClass: "active",
})
</script>

<template>
    <li class="block w-full text-right sm:inline-block sm:w-32 sm:text-center">
        <NavItem
            :class="
                cn(
                    `border-b-2 border-black/0 px-2 pt-1 text-base text-black
                     transition-all duration-300 hover:font-bold
                     active:font-bold sm:text-xl`
                )
            "
            :to="$attrs.to"
        >
            <slot></slot>
        </NavItem>
    </li>
</template>

<style scoped>
.active {
    border-color: black;
}
</style>
