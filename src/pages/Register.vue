<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="w-100" style="max-width: 400px;">
            <BCard class="shadow p-4 rounded-4">
                <div class="text-center mb-4">
                    <h3 class="fw-bold mb-1">Create Account</h3>
                    <p class="text-muted mb-0">Let's get started</p>
                </div>

                <BForm @submit.prevent="handleRegister">
                    <BFormGroup label="Username" label-for="username">
                        <BFormInput
                        id="username"
                        v-model="form.username"
                        type="text"
                        required
                        placeholder="Enter your username"
                        />
                    </BFormGroup>

                    <BFormGroup label="Email" label-for="email">
                        <BFormInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        />
                    </BFormGroup>

                    <BFormGroup label="Password" label-for="password">
                        <BFormInput
                        id="password"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Enter your password"
                        />
                    </BFormGroup>

                    <BButton type="submit" variant="success" class="w-100 mt-3" :disabled="auth.loading">
                        {{ auth.loading ? 'Registering...' : 'Register' }}
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
                        Already have an account?
                        <RouterLink to="/login">Login here</RouterLink>
                    </small>
                </div>
            </BCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '../store/authStore'

const auth = useAuthStore()

const form = ref({
  username: '',
  email: '',
  password: '',
})

const showAlert = ref(false)

watch(() => auth.error, (val) => {
  showAlert.value = !!val
})

const handleRegister = () => {
  auth.register(form.value.username, form.value.email, form.value.password)
}
</script>