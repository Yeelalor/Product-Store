<template>
  <VApp>
    <VAppBar class="bg-primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" color="white" />

      <VSpacer />

      <!-- Dashboard Link -->
      <VBtn variant="text" color="white" to="/dashboard">
        Dashboard
      </VBtn>

      <VBtn variant="text" color="white" @click="handleLogout">
        Logout
      </VBtn>
    </VAppBar>

    <VMain class="d-flex" style="min-height: 100vh">
      <slot />
    </VMain>
  </VApp>
</template>

<script setup>
const drawer = ref(false)

const handleLogout = async () => {
  // clear token
  const token = useCookie('token')
  token.value = null

  await navigateTo('/login')
}
</script>
