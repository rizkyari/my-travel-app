import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/axios';
import type { Article } from "../types/Article";

export const useArticleStore = defineStore('articles', () => {
    const articles = ref<Article[]>([])
    const token = ref(localStorage.getItem('token') || '')
    const loading = ref(false)
    const error = ref('')
    const hasMore = ref(true)
    const currentPage = ref(1)
    const searchQuery = ref('')
    const categoryFilter = ref('')

    const fetchArticles = async(reset = false) => {
        if (loading.value) return

        if (!hasMore.value && !reset) return

        if (reset) {
            articles.value = []
            currentPage.value = 1
            hasMore.value = true
        }

        loading.value = true
        error.value = ''

        try {
            const params: Record<string, any> = {
                'pagination[page]': currentPage.value,
                'pagination[pageSize]': 10,
                'populate': '*',
            }
          
            if (searchQuery.value) {
                params['filters[title][$eqi]'] = searchQuery.value
            }
          
            if (categoryFilter.value) {
                params['filters[category][name][$eqi]'] = categoryFilter.value
            }
          
            const res = await api.get('/articles', { 
                params,
                headers: {
                    Authorization: `Bearer ${token.value}`
                } 
            })
            const fetched = res.data.data
            const total = res.data.meta.pagination.total
          
            articles.value.push(...fetched)

            if (articles.value.length >= total){
                hasMore.value = false
            } else {
                currentPage.value++
            }
        } catch(err) {
            error.value = 'Failed to fetch articles'
        } finally {
            loading.value = false
        }
    }

    return {
        articles,
        loading,
        error,
        hasMore,
        searchQuery,
        categoryFilter,
        fetchArticles,
    }
})