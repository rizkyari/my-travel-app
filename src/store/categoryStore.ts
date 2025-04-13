import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/axios";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<{ id: number; name: string}[]>([])
    const loading = ref(false)
    const error = ref('')

    const fetchCategories = async () => {
        loading.value = true
        error.value = ''

        try {
            const res = await api.get('/categories')
            categories.value = res.data.data
        } catch(err) {
            error.value = 'Failed to fetch categories'
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
    }
})