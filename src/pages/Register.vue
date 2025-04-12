<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="w-100" style="max-width: 400px;">
            <BCard class="shadow p-4 rounded-4">
                <div class="text-center mb-4">
                    <h3 class="fw-bold mb-1">Create Account</h3>
                    <p class="text-muted mb-0">Let's get started</p>
                </div>

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