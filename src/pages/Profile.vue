<template>
    <div class="container py-5">
        <BCard class="mx-auto shadow-sm rounded-4" style="max-width: 600px;">
            <div class="text-center mb-4">
                <h3 class="fw-bold">User Profile</h3>
                <p class="text-muted">
                    Here is your account detail
                </p>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">Username</span>
                    <span class="text-break text-end">{{ auth.user?.username }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">Email</span>
                    <span class="text-break text-end">{{ auth.user?.email }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">Document ID</span>
                    <span class="text-break text-end">{{ auth.user?.documentId }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">User ID</span>
                    <span>{{ auth.user?.id }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">Status</span>
                    <span>
                        <BBadge :variant="auth.user?.confirmed ? 'success' : 'warning'">
                            {{ auth.user?.confirmed ? 'Confirmed' : 'Unconfirmed' }}
                        </BBadge>
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-semibold">Registered</span>
                    <span>{{ formatDate(auth.user?.createdAt) }}</span>
                </li>
            </ul>
        </BCard>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../store/authStore'
import { formatDate } from '../utils/format';

const auth = useAuthStore()

onMounted(() => {
    if(!auth.user){
        auth.fetchMe()
    }
})
</script>