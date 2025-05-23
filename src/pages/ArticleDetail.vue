<template>
    <div class="container py-5">
        <div v-if="authStore.user?.id === articleStore.selectedArticle?.user?.id" class="mb-5 d-flex justify-content-end">
            <BButton 
            variant="warning" 
            @click="goToEdit"
            class="mt-3"
            >
                Edit Article
            </BButton>
            <BButton
            variant="danger"
            class="mt-3 ms-2"
            @click="showDeleteConfirm = true"
            >
                Delete Article
            </BButton>
        </div>

        <div v-if="articleStore.loading" class="text-center">
            <BSpinner label="Loading..."/>
        </div>

        <div v-else class="text-center">
            <h2 class="fw-bold mb-3">{{ articleStore.selectedArticle?.title }}</h2>
            <img
            v-if="articleStore.selectedArticle?.cover_image_url"
            :src="articleStore.selectedArticle?.cover_image_url"
            alt="cover"
            class="img-fluid mb-4 rounded"
            />
            <p class="text-muted">{{ formatDate(articleStore.selectedArticle?.publishedAt) }}</p>
            <p class="mb-4">{{ articleStore.selectedArticle?.description }}</p>

            <div v-if="articleStore.selectedArticle?.user" class="mt-4">
                <h6 class="fw-semibold">Author</h6>
                <p class="mb-1">{{ articleStore.selectedArticle?.user.username }}</p>
                <small class="text-muted">{{ articleStore.selectedArticle?.user.email }}</small>
            </div>

            <div class="mt-5">
                <BButton @click="toggleComments" variant="outline-secondary" class="mb-3">
                    {{ showComments ? 'Hide Comments' : 'Show Comments' }}
                </BButton>
            </div>

            <div v-if="showComments">
                <CommentForm :articleId="articleStore.selectedArticle?.id" />
                <CommentList :articleId="articleStore.selectedArticle?.id" />
            </div>
        </div>
        <ConfirmModal
        v-model:isOpen="showDeleteConfirm"
        title="Delete Article"
        message="Are you sure you want to delete this article?"
        @confirm="handleDelete"
        />
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useArticleStore } from '../store/articleStore';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/format';

import CommentList from '../components/CommentList.vue';
import CommentForm from '../components/CommentForm.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const showComments = ref(false)
const authStore = useAuthStore()
const showDeleteConfirm = ref(false)

const toggleComments = () => {
  showComments.value = !showComments.value
}

onMounted(() => {
    articleStore.fetchArticleById(route.params.documentId as string)
})

const goToEdit = () => {
  router.push(`/articles/${route.params.documentId as string}/edit`)
}

const handleDelete = async() => {
    if(!articleStore.selectedArticle?.documentId) return
    await articleStore.deleteArticle(articleStore.selectedArticle.documentId)
    router.push('/articles')
}
</script>