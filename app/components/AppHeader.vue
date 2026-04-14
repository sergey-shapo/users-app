<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs: { label: string; to?: string }[] = []

  if (route.path.startsWith('/usuarios')) {
    crumbs.push({ label: 'Usuarios', to: '/usuarios' })

    if (route.path === '/usuarios/nuevo') {
      crumbs.push({ label: 'Nuevo Usuario' })
    } else if (route.path.includes('/usuarios/') && route.path !== '/usuarios') {
      const userId = route.params.id as string
      crumbs.push({ label: `Usuario ${userId?.substring(0, 8)}...`, to: route.path })
    }
  }

  return crumbs
})
</script>

<template>
  <header class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
    <UBreadcrumb :items="breadcrumbs" />
    <UColorModeButton />
  </header>
</template>
