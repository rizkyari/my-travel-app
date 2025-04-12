<template>
    <div class="container py-5">
        <h3 class="fw-bold mb-4 text-center">Travel Articles</h3>

        <div v-if="articleStore.error" class="text-center">
            <BAlert variant="danger" show>{{ articleStore.error }}</BAlert>
        </div>

        <BForm @submit.prevent="onSearch" class="mb-4 row g-2 align-items-end">
            <div class="col-md-6">
                <BFormGroup label="Search Title">
                    <BFormInput v-model="articleStore.searchQuery" placeholder="Search here..." />
                </BFormGroup>
            </div>
            <div class="col-md-4">
                <BFormGroup label="Category">
                    <BFormSelect v-model="articleStore.categoryFilter" :options="categories" />
                </BFormGroup>
            </div>
            <div class="col-md-2">
                <BButton type="submit" variant="primary" class="w-100">Search</BButton>
            </div>
        </BForm>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col" v-for="article in articleStore.articles" :key="article.id">
                <BCard class="h-100">
                    <BCardTitle>ID: {{ article.id }}</BCardTitle>
                    <BCardTitle>{{ article.title }}</BCardTitle>
                    <BCardText class="text-truncate">
                        {{ article.description }}
                    </BCardText>
                    <small class="text-muted">Published: {{ formatDate(article.publishedAt) }}</small>
                    <br/>
                    <div class="d-flex justify-content-center">
                        <RouterLink :to="`/articles/${article.id}`" class="btn btn-sm btn-primary mt-auto">
                            Read More
                        </RouterLink>
                    </div>
                </BCard>
            </div>
        </div>

        <div v-if="articleStore.loading" class="text-center mt-5">
            <BSpinner label="Loading...">
                Loading...
            </BSpinner>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useArticleStore } from '../store/articleStore';
import { formatDate } from '../utils/format';

const articleStore = useArticleStore()
let scrollTimeout: ReturnType<typeof setTimeout>

const categories = [
    { value: '', text: 'All' },
    { value: 'Nature', text: 'Nature' },
    { value: 'Beach', text: 'Beach' },
    { value: 'Mountain', text: 'Mountain' },
]

onMounted(() => {
    articleStore.fetchArticles()
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(()=>{
    window.removeEventListener('scroll', handleScroll)
})

const onSearch = () => {
  articleStore.fetchArticles(true)
}

const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)

  scrollTimeout = setTimeout(() => {
    if (articleStore.loading || !articleStore.hasMore) return

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledFromTop = window.scrollY;

    if (
        scrollableHeight - scrolledFromTop < 150 &&
        !articleStore.loading &&
        articleStore.hasMore
    ) {
      articleStore.fetchArticles()
    
    }
  }, 200)
}
</script>

<style></style>