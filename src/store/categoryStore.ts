import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/axios";
import type { CategoryForm } from "../types/Category";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<{ documentId: string; name: string }[]>([])
    const loading = ref(false)
    const error = ref('')

    const fetchCategories = async () => {
        loading.value = true
        error.value = ''

        try {
            const res = await api.get('/categories',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            categories.value = res.data.data.map((item:any) => ({
                documentId: item.documentId,
                name: item.name
            }))
        } catch(err) {
            error.value = 'Failed to fetch categories'
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    const createCategory = async (form: CategoryForm) => {
        loading.value = true
        error.value = ''

        try {
            await api.post('/categories', {data: form.name}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            await fetchCategories()
        } catch(err) {
            error.value = 'Failed to create category'
        } finally {
            loading.value = false
        }
    }

    const updateCategory = async(documentId: string, form: CategoryForm) => {
        loading.value = true
        error.value= ''

        try {
            await api.put(`categories/${documentId}`, {data: form.name}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            await fetchCategories()
        } catch (err) {
            error.value = 'Failed to update category'
        } finally {
            loading.value = false
        }
        
    }

    const deleteCategory = async(documentId: string) => {
        loading.value = true
        error.value = ''

        try {
            await api.delete(`/categories/${documentId}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            await fetchCategories()
        } catch (err) {
            error.value = 'Failed to delete category'
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    }
})