<template>
    <h2
        :class="
            cn(
                'mt-4 w-full text-center text-2xl font-semibold text-amber-400',
                $attrs.class
            )
        "
    >
        <slot></slot>
    </h2>
</template>
