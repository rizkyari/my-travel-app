import { defineStore } from "pinia";
import { ref } from "vue";
import api from '../api/axios';
import type { Article,ArticleForm } from "../types/Article";

export const useArticleStore = defineStore('articles', () => {
    const articles = ref<Article[]>([])
    const selectedArticle = ref<Article | null>(null)
    const token = ref(localStorage.getItem('token') || '')
    const loading = ref(false)
    const error = ref('')
    const hasMore = ref(true)
    const currentPage = ref(1)
    const searchQuery = ref('')
    const categoryFilter = ref('')
    const uploadLoading = ref(false)
    const errorUpload = ref(false)

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

    const fetchArticleById = async (documentId: string) => {
        loading.value = true
        error.value = ''
        selectedArticle.value = null

        try {
            const res = await api.get(`/articles/${documentId}?populate=*`,{
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            selectedArticle.value = res.data.data
            return res.data.data
        } catch(err) {
            error.value = 'Failed to fetch article'
        } finally {
            loading.value = false
        }
    }

    const uploadImage = async(file: File): Promise<string> => {
        uploadLoading.value = true
        errorUpload.value = false
        try {
            const formData = new FormData()
            formData.append('files', file)

            const res = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token.value}`
                }
            })

            return res.data[0].url
        } catch(err){
            console.error('Failed to upload image: ', err)
            errorUpload.value = true
            throw err
        } finally {
            uploadLoading.value = false
        }
    }

    const createArticle = async (form: ArticleForm) => {
        loading.value = true

        try {
            await api.post('/articles', {data: form}, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
        } catch(err) {
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateArticle = async(documentId: string, form: ArticleForm) => {
        loading.value = true
        error.value = ''

        try {
            const res = await api.put(`/articles/${documentId}`,{
                data: {
                    title: form.title,
                    description: form.description,
                    cover_image_url: form.cover_image_url,
                    category: form.category,
                },
            }, {
                headers:{
                    Authorization: `Bearer ${token.value}`
                }
            })

        } catch(err) {
            console.error('Update article error: ', err)
            error.value = 'Failed to update article.'
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
        selectedArticle,
        uploadLoading,
        errorUpload,
        fetchArticles,
        fetchArticleById,
        uploadImage,
        createArticle,
        updateArticle,
    }
})