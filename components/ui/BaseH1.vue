<template>
    <h1
        :class="
            cn(
                'mt-4 w-full text-center text-4xl font-bold text-slate-300 sm:text-5xl',
                $attrs.class
            )
        "
    >
        <slot></slot>
    </h1>
</template>
