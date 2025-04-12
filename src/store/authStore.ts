import {defineStore} from 'pinia'
import {ref} from 'vue'
import api from '../api/axios'
import router from '../router/index'
import type { AxiosError } from 'axios'
import type { User } from '../types/User'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref(localStorage.getItem('token') || '')
    const loading = ref(false)
    const error = ref('')

    const register = async (username: string, email: string, password: string) => {
        loading.value = true
        error.value = ''

        try {
            const res = await api.post('auth/local/register',{
                username,
                email,
                password,
            })

            token.value = res.data.jwt
            user.value = res.data.user

            localStorage.setItem('token', res.data.jwt)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            router.push('/articles')
        } catch(err: any) {
            const axiosError = err as AxiosError<any>
            error.value = axiosError.response?.data?.error?.message || 'Registration failed'
        } finally {
            loading.value = false
        }
    }

    const login = async (email: string, password: string) => {
        loading.value = true
        error.value = ''

        try {
            const res = await api.post('/auth/local', {
                identifier: email,
                password: password
            })

            token.value = res.data.jwt
            user.value = res.data.user
            
            localStorage.setItem('token', res.data.jwt)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            router.push('/articles')
        } catch (err: any) {
            console.error('Login error:', err)
            console.log('Error msg:', err?.response?.data?.error?.message)
            error.value = err.response?.data?.error?.message || 'Login Failed'
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        token.value = ''
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
    }

    const fetchMe = async() => {
        try {
            const res = await api.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            user.value = res.data
        } catch(err) {
            console.error('Failed to fetch profile:', err)
            logout()
        }
    }

    return {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        fetchMe,
    }
})