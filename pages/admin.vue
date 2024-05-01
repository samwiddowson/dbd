<script setup lang="ts">
const confirmationText = "Do it!"
const showDatabaseConfirmation = ref(false)
const databaseConfirmationInput = ref("")

function handleShowDatabaseConfirmation() {
    showDatabaseConfirmation.value = true
}

function cancelDatabaseReInit() {
    console.log("cancel")
    showDatabaseConfirmation.value = false
    databaseConfirmationInput.value = ""
}

function requestReinitialiseDatabase() {
    if (databaseConfirmationInput.value !== confirmationText) {
        return
    }
    const response = $fetch("/api/admin/reinit-db", {
        method: "POST",
        body: { confirm: confirmationText },
    })

    console.log(response)
}
</script>

<template>
    <div class="flex flex-col gap-4 sm:flex-row">
        <BaseCompartment class="h-64 w-96 text-center text-red-600">
            <div>
                <BaseButton @click="handleShowDatabaseConfirmation"
                    >Re-initialise database</BaseButton
                >
            </div>
            <Transition
                enter-from-class="opacity-0"
                enter-active-class="duration-500 transition-all"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100"
                leave-active-class="duration-500 transition-all"
                leave-to-class="opacity-0"
            >
                <div v-if="showDatabaseConfirmation">
                    <BaseH2 class="uppercase text-red-600"
                        >Are you sure?</BaseH2
                    >
                    <p class="my-4 font-semibold">
                        If you are sure you want to re-intialise the database,
                        type
                        <span
                            class="rounded-lg border border-red-600 px-2 font-bold text-red-500"
                            >{{ confirmationText }}</span
                        >
                        in the box below:
                    </p>
                    <div class="w-full space-x-4">
                        <BaseInput
                            v-model="databaseConfirmationInput"
                            class="rounded-lg border-2 border-red-600 bg-black p-1 font-semibold"
                        />
                        <BaseButton
                            class="border-red-600 bg-red-950 font-semibold text-red-600 hover:bg-red-900"
                            @click="cancelDatabaseReInit"
                        >
                            Cancel</BaseButton
                        >
                        <BaseButton
                            class="border-red-600 bg-red-950 font-semibold text-red-600 hover:bg-red-900"
                            @click="requestReinitialiseDatabase"
                        >
                            OK
                        </BaseButton>
                    </div>
                </div>
            </Transition>
        </BaseCompartment>
        <BaseCompartment class="h-[32rem] w-96 text-center text-red-600">
        </BaseCompartment>
    </div>
</template>
