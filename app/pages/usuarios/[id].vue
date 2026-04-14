<script setup lang="ts">
import type { User } from '~/types/user'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const { fetchUser } = useUsers()

const userId = route.params.id as string

const {
  data: userData,
  pending,
  error
} = await useAsyncData(`user-${userId}`, () => fetchUser(userId), { watch: [() => userId] })

const user = computed(() => userData.value)

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  user: 'Usuario',
  moderator: 'Moderador'
}

const statusLabels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente'
}

const roleColors: Record<string, string> = {
  admin: 'danger',
  user: 'info',
  moderator: 'warning'
}

const statusColors: Record<string, string> = {
  active: 'success',
  inactive: 'neutral',
  pending: 'warning'
}

function goBack() {
  router.push({
    path: '/usuarios',
    query: route.query
  })
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-3xl">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Detalle del Usuario</h2>
        <p class="text-muted">Información completa del usuario</p>
      </div>
      <UButton
        label="Volver al listado"
        icon="i-lucide-arrow-left"
        variant="outline"
        @click="goBack"
      />
    </div>

    <div v-if="pending" class="flex justify-center py-12">
      <UProgress animation="carousel" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto text-error mb-4" />
      <p class="text-error font-semibold">Error al cargar el usuario</p>
      <UButton label="Volver al listado" variant="outline" class="mt-4" @click="goBack" />
    </div>

    <div v-else-if="user" class="flex flex-col gap-6">
      <UCard>
        <div class="flex items-start gap-6">
          <UAvatar :alt="`${user.firstName} ${user.lastName}`" size="xl" />
          <div class="flex-1">
            <h3 class="text-xl font-bold">{{ user.firstName }} {{ user.lastName }}</h3>
            <p class="text-muted">{{ user.email }}</p>
            <div class="flex gap-2 mt-3">
              <UBadge
                :label="roleLabels[user.role]"
                :color="roleColors[user.role]"
                variant="subtle"
              />
              <UBadge
                :label="statusLabels[user.status]"
                :color="statusColors[user.status]"
                variant="subtle"
              />
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Información</h4>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-muted">Nombre</p>
            <p class="font-medium">{{ user.firstName }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">Apellido</p>
            <p class="font-medium">{{ user.lastName }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">Email</p>
            <p class="font-medium">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">Rol</p>
            <p class="font-medium">{{ roleLabels[user.role] }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">Estado</p>
            <p class="font-medium">{{ statusLabels[user.status] }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">ID en BBDD</p>
            <p class="font-mono text-sm">{{ user.id }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Fechas</h4>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-muted">Fecha de creación</p>
            <p class="font-medium">{{ formatDate(user.createdAt) }}</p>
          </div>
          <div>
            <p class="text-sm text-muted">Última actualización</p>
            <p class="font-medium">{{ formatDate(user.updatedAt) }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
