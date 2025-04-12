import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/axios";

export const useCommentStore = defineStore('comment', () => {
    const comments = ref<any[]>([])
    const loading = ref(false)
    const error = ref('')

    const fetchComments = async (articleId: number) => {
        loading.value = true
        error.value = ''
        comments.value = []

        try {
            const res = await api.get('/comments',{
                params: {
                    'filters[article][id][$eq]': articleId,
                    'populate': 'user',
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            comments.value = res.data.data
        } catch(err){
            error.value = 'Failed to fetch comments'
        } finally {
            loading.value = false
        }
    }

    const addComment = async (content: string, articleId: number) => {
        loading.value = true
        error.value = ''

        try {
            await api.post('comments', {
                data: {
                    content,
                    article: articleId
                }
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            await fetchComments(articleId)
        } catch(err) {
            error.value = 'Failed to add comment'
        } finally {
            loading.value = false
        }
    }

    const deleteComment = async (documentId: string, articleId: number) => {
        loading.value = true
        error.value = ''

        try {
            await api.delete(`/comments/${documentId}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })

            await fetchComments(articleId)
        } catch(err) {
            error.value = 'Failed to delete comment'
        } finally {
            loading.value = false
        }
    }

    const updateComment = async (documentId: string, content: string, articleId: number) => {
        loading.value = true
        error.value = ''

        try {
            await api.put(`/comments/${documentId}`,{
                data: {content}
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            await fetchComments(articleId)
        } catch(err){
            error.value = 'Failed to edit comment'
        } finally {
            loading.value = false
        }
    }

    return {
        comments,
        loading,
        error,
        fetchComments,
        addComment,
        deleteComment,
        updateComment,
    }
})