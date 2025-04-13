<template>
    <BModal :title="isEditMode ? 'Edit Category' : 'Add Category'" v-model="show" centered no-footer>
        <BForm @submit.prevent="submit">
            <BFormGroup label="Category Name" label-for="category-name">
            <BFormInput
            id="category-name"
            v-model="form.name"
            required
            placeholder="Enter category name"
            />
            </BFormGroup>
  
            <div class="d-flex justify-content-end gap-2 mt-4">
                <BButton variant="secondary" @click="cancel">Cancel</BButton>
                <BButton variant="primary" type="submit">{{ isEditMode ? 'Save Changes' : 'Add Category' }}</BButton>
            </div>
        </BForm>
    </BModal>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
  
const props = defineProps({
    isOpen: Boolean,
    initialData: {
        type: Object as PropType<{ name: string } | null>,
        default: null
    },
    isEditMode: Boolean
})
  
const emit = defineEmits(['update:isOpen', 'submit'])
  
const show = ref(props.isOpen)
  
watch(() => props.isOpen, (val) => {
    show.value = val
})
  
watch(show, (val) => {
    emit('update:isOpen', val)
})
  
const form = ref({
    name: ''
})
  
watch(
    () => props.initialData,
    (val) => {
      form.value.name = val?.name || ''
    },
    { immediate: true }
)
  
const cancel = () => {
    show.value = false
}
  
const submit = () => {
    emit('submit', { name: form.value.name })
    show.value = false
}
</script>
  