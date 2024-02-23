<template>
    <div>
        <TheHeader />
        <TheBackground />
        <main
            class="fixed z-0 h-dvh w-full pt-[6.25rem] text-amber-400 sm:pt-12"
        >
            <div class="h-full w-full p-1">
                <BaseCompartment class="h-full w-full overflow-y-scroll">
                    <slot></slot>
                </BaseCompartment>
            </div>
        </main>
    </div>
</template>
