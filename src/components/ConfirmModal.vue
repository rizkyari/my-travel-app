<template>
    <BModal :model-value="props.isOpen" :title="props.title" centered no-footer @update:modelValue="val => emit('update:isOpen', val)">
        <p>{{ props.message }}</p>
        <div class="d-flex justify-content-end gap-2 mt-4">
            <BButton variant="secondary" @click="cancel">Cancel</BButton>
            <BButton variant="danger" @click="confirm">Delete</BButton>
        </div>
    </BModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string
    message: string
    isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen', 'confirm'])

const cancel = () => emit('update:isOpen', false)
const confirm = () => {
    emit('confirm')
    emit('update:isOpen', false)
}
</script>