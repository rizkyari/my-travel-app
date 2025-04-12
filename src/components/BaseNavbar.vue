<template>
  <BNavbar toggleable="lg" type="light" variant="light" class="shadow-sm mb-4">
    <BContainer class="d-lg-flex align-items-center">
      <div class="d-flex justify-content-between align-items-center w-100">
        <BNavbarBrand to="/" class="fw-bold">
          My Travel App
        </BNavbarBrand>
        <BNavbarToggle target="nav-collapse"/>
      </div>
      
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto d-flex align-items-center" :key="auth.token">
          <!-- All user -->
          <BNavItem to="/" exact>Home</BNavItem>
          
          <!-- Non Authenticated User -->
          <BNavItem v-if="!isLoggedIn" to="/login" exact>Login</BNavItem>
          <BNavItem v-if="!isLoggedIn" to="/register" exact>Register</BNavItem>
          
          <!-- Authenticated User -->
          <BNavItem v-if="isLoggedIn" to="/articles" exact>Articles</BNavItem>
          <BDropdown
          v-if="isLoggedIn"
          right
          text="Account"
          variant="outline-primary"
          class="ms-3"
          >
            <BDropdownItem disabled>
              {{ auth.user?.username }}
            </BDropdownItem>
            <BDropdownItem>
              <BNavItem v-if="isLoggedIn" to="/profile">Profile</BNavItem>
            </BDropdownItem>
            <BDropdownDivider/>
            <BDropdownItem @click="logout">Logout</BDropdownItem>
          </BDropdown>
        </BNavbarNav>
      </BCollapse>
    </BContainer>
  </BNavbar>
</template>

<script setup>
import { useAuthStore } from '../store/authStore'
import { ref, watch } from 'vue'

const auth = useAuthStore()
const isLoggedIn = ref(!!auth.token)

watch(() => auth.token, (val) => {
  isLoggedIn.value = !!val
})

const logout = () => {
  auth.logout()
}

</script>