<template>
    <div class="d-flex justify-content-center align-items min-vh-100s">
        <div class="w-100" style="max-width: 400px;">
            <BCard class="shadow p-4 rounded-4">
                <div class="text-center mb-4">
                    <h3 class="fw-bold mb-1">Welcome Back</h3>
                    <p class="text-muted mb-0">
                        Please Login to continue
                    </p>
                </div>

                <BForm @submit.prevent="handleLogin">
                    <BFormGroup label="Email" label-for="email">
                        <BFormInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        />
                    </BFormGroup>
                    <BFormGroup label="Password" label-for="password">
                        <BFormInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        />
                    </BFormGroup>

                    <BButton type="submit" variant="primary" class="w-100 mt-3" :disabled="auth.loading">
                        {{ auth.loading ? 'Logging in...' : 'Login' }}
                    </BButton>

                    <BAlert
                    v-model="showAlert"
                    variant="danger"
                    class="mt-3 text-center"
                    dismissible
                    >
                        {{ auth.error }}
                    </BAlert>
                </BForm>

                <div class="text-center mt-3">
                    <small class="text-muted">
                        Don't have an account?
                        <RouterLink to="/register">Register here</RouterLink>
                    </small>
                    <BButton @click="check">check</BButton>
                </div>
            </BCard>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore()
const showAlert = ref(false)

watch(() => auth.error, (val) => {
  showAlert.value = !!val
})

const form = ref({
    email: '',
    password: '',
})

const handleLogin = () => {
    auth.login(form.value.email, form.value.password)
}
</script>