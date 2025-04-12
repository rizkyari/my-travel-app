<template>
    <div class="container py-5">
        <div v-if="articleStore.loading" class="text-center">
            <BSpinner label="Loading..."/>
        </div>

        <div v-else>
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

            <div v-if="articleStore.selectedArticle?.comments?.length" class="mt-5">
                <h5 class="fw-bold mb-3">Comments</h5>
                <ul class="list-group">
                    <li class="list-group-item" v-for="comment in articleStore.selectedArticle?.comments" :key="comment.id">
                        {{ comment.content }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '../store/articleStore';
import { formatDate } from '../utils/format';

const route = useRoute()
const articleStore = useArticleStore()

onMounted(() => {
    articleStore.fetchArticleById(route.params.documentId as string)
})

</script>