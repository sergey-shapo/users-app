<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <aside class="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col">
      <div class="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 class="text-xl font-bold text-primary">Users App</h1>
      </div>
      <nav class="flex-1 p-4">
        <AppSidebar />
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-auto p-6 bg-neutral-50 dark:bg-neutral-900">
        <slot />
      </main>
    </div>
  </div>
</template>
