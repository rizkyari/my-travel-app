<template>
    <BContainer class="my-5">
        <BCard class="p-4 shadow-sm">
            <h3 class="mb-4 fw-bold">Tambah Artikel</h3>

            <BForm @submit.prevent="handleSubmit">
                <BFormGroup label="Title" label-for="title" class="mt-2">
                    <BFormInput id="title" v-model="form.title" required/>
                </BFormGroup>

                <BFormGroup label="Description" label-for="description" class="mt-2">
                    <BFormTextarea id="description" v-model="form.description" rows="4" placeholder="Article description..."/>
                </BFormGroup>

                <BFormGroup label="Category" label-for="category" class="mt-2">
                    <BFormSelect
                    id="category"
                    v-model="form.category"
                    :options="categoryOptions"
                    required
                    />
                </BFormGroup>

                <BFormGroup label="Upload Cover" label-for="image" class="mt-2">
                    <BFormFile id="image" @change="handleFileChange" accept="image/*" />
                    <BSpinner small class="ms-2" v-if="articleStore.uploadLoading" />
                    <div v-if="form.cover_image_url" class="mt-3">
                        <img :src="form.cover_image_url" alt="Preview" class="img-fluid rounded"/>
                    </div>
                </BFormGroup>
                <div v-if="articleStore.errorUpload" class="text-danger">
                    Failed to upload image
                </div>

                <div class="d-flex justify-content-end">
                    <BButton type="submit" variant="primary" class="mt-5" :disabled="articleStore.loading || articleStore.uploadLoading || uploadError">
                        {{ articleStore.loading ? 'Submitting...' : 'Submit' }}
                    </BButton>
                </div>
            </BForm>
        </BCard>
    </BContainer>
</template>

<script lang="ts" setup>
import { ref,onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '../store/categoryStore';
import { useArticleStore } from '../store/articleStore';

const categoryStore = useCategoryStore()
const articleStore = useArticleStore()
const router = useRouter()
const uploadError = ref(false)

const form = ref({
    title: '',
    description: '',
    cover_image_url: '',
    category: null as number | null
})

onMounted(() => {
    categoryStore.fetchCategories()
})

const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if(!file) return

    try {
        uploadError.value = false
        form.value.cover_image_url = await articleStore.uploadImage(file)
    } catch (err) {
        console.error('Failed to upload image: ', err)
        uploadError.value = true
    }
}

const categoryOptions = computed(() => {
    return categoryStore.categories.map(cat => ({
        value: cat.id,
        text: cat.name
    }))
})

const handleSubmit = async() => {
    if(form.value.category === null){
        alert('You must choose category')
        return
    }

    const payload = {
        ...form.value,
        category: form.value.category as number
    }

    try {
        await articleStore.createArticle(payload)
        router.push('/articles')
    } catch (err) {
        console.error('Failed to create article: ', err)
    }
}
</script>