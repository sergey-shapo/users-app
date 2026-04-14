<script setup lang="ts">
const route = useRoute();

const navigation = [
  {
    label: "Usuarios",
    icon: "i-lucide-users",
    to: "/usuarios",
  },
];

function isActive(to: string) {
  return route.path.startsWith(to);
}
</script>

<template>
  <UVerticalNavigation
    :links="navigation"
    :class="{ 'bg-primary/10': isActive('/usuarios') }"
  />
</template>
