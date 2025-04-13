<template>
    <ArticleForm
    v-if="form.title"
    :initialData="form"
    :onSubmitHandler="handleSubmit"
    submitText="Save"
    />
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticleStore } from '../store/articleStore';

import ArticleForm from '../components/ArticleForm.vue';
import type { ArticleForm as ArticleFormData } from '../types/Article';

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const form = ref<ArticleFormData>({
    title: '',
    description: '',
    cover_image_url: '',
    category: null,
})

onMounted(async() => {
    const docId = route.params.documentId as string
    if (!docId) return

    const data = await articleStore.fetchArticleById(docId)
    
    if(data) {
        form.value = {
            title: data.title,
            description: data.description,
            cover_image_url: data.cover_image_url,
            category: data.category?.id ?? null
        }
    }
})

const handleSubmit = async (formData: ArticleFormData) => {
    await articleStore.updateArticle(route.params.documentId as string, formData)
    router.push('/articles')
}

</script>