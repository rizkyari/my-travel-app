<template>
    <div class="container py-5">
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
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '../store/articleStore';
import { formatDate } from '../utils/format';

import CommentList from '../components/CommentList.vue';
import CommentForm from '../components/CommentForm.vue';

const route = useRoute()
const articleStore = useArticleStore()
const showComments = ref(false)

const toggleComments = () => {
  showComments.value = !showComments.value
}

onMounted(() => {
    articleStore.fetchArticleById(route.params.documentId as string)
})

</script>