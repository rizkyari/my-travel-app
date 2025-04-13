<template>
    <BForm @submit.prevent="onSubmit">
        <BFormGroup label="Judul" label-for="title">
            <BFormInput v-model="form.title" id="title" required />
        </BFormGroup>
  
        <BFormGroup label="Deskripsi" label-for="description" class="mt-3">
            <BFormTextarea v-model="form.description" id="description" rows="4" required />
        </BFormGroup>
  
        <BFormGroup label="Kategori" label-for="category" class="mt-3">
            <BFormSelect
            v-model="form.category"
            :options="categoryOptions"
            id="category"
            required
            />
        </BFormGroup>
  
        <BFormGroup label="Gambar" class="mt-3">
            <BFormFile @change="handleFileChange" accept="image/*" />
                <div v-if="form.cover_image_url" class="mt-2">
                    <img :src="form.cover_image_url" alt="Preview" class="img-fluid rounded" />
                </div>
        </BFormGroup>
  
        <BAlert v-if="uploadError" variant="danger" class="mt-2" dismissible>
            Upload gambar gagal.
        </BAlert>
  
        <BButton
        type="submit"
        variant="primary"
        class="mt-3"
        :disabled="loading || uploadLoading || uploadError"
        >
            {{ submitText }}
        </BButton>
    </BForm>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue'
import { useCategoryStore } from '../store/categoryStore'
import { useArticleStore } from '../store/articleStore'
import type { ArticleForm } from '../types/Article';
  
const props = defineProps<{
    initialData?: {
      title: string
      description: string
      cover_image_url: string
      category: number | null
    }
    onSubmitHandler: (form: ArticleForm) => void
    submitText?: string
}>()
  
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
  
const form = reactive<ArticleForm>({
    title: '',
    description: '',
    cover_image_url: '',
    category: null as number | null
})
  
const uploadError = ref(false)
const loading = ref(false)
  
const uploadLoading = computed(() => articleStore.uploadLoading)
  
watch(
    () => props.initialData,
    (val) => {
        if (val) {
            Object.assign(form, val)
        }
    },
    { immediate: true }
)
  
onMounted(() => {
    categoryStore.fetchCategories()
})
  
const handleFileChange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
  
    try {
      uploadError.value = false
      form.cover_image_url = await articleStore.uploadImage(file)
    } catch (e) {
      uploadError.value = true
    }
}
  
const onSubmit = async () => {
    loading.value = true
    await props.onSubmitHandler(form)
    loading.value = false
}
  
const categoryOptions = computed(() =>
    categoryStore.categories.map((cat) => ({
      value: cat.id,
      text: cat.name
    }))
)

</script>
  