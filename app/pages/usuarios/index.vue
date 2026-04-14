<script setup lang="ts">
import { h } from 'vue'
import type { User, UserFiltersState } from '~/types/user'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const { fetchUsers } = useUsers()

const filters = ref<UserFiltersState>({
  search: (route.query.search as string) || '',
  role: ((route.query.role as string) === 'all' ? '' : (route.query.role as string)) || '',
  status: ((route.query.status as string) === 'all' ? '' : (route.query.status as string)) || '',
  page: parseInt(route.query.page as string) || 1,
  perPage: parseInt(route.query.perPage as string) || 5
})

const searchLocal = ref(filters.value.search)
let searchTimeout: ReturnType<typeof setTimeout> | null = null
let isUpdatingFromLocal = false

function onSearchInput() {
  filters.value.search = searchLocal.value
  filters.value.page = 1
  isUpdatingFromLocal = true

  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    syncQuery()
  }, 300)
}

const filtersForApi = computed(() => ({
  search: filters.value.search,
  role: filters.value.role,
  status: filters.value.status,
  page: filters.value.page,
  perPage: filters.value.perPage
}))

const { data, pending, refresh } = await useAsyncData(
  'users-list',
  () => fetchUsers(filtersForApi.value),
  { watch: [filtersForApi] }
)

const users = computed(() => data.value?.data || [])
const total = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)
const currentPage = computed(() => data.value?.page || 1)

const roleOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Moderator', value: 'moderator' }
]

const statusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' }
]

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.search) count++
  if (filters.value.role) count++
  if (filters.value.status) count++
  return count
})

function updateFilters() {
  filters.value.page = 1
  syncQuery()
}

function onRoleUpdate() {
  filters.value.role = filters.value.role === 'all' ? '' : filters.value.role
  updateFilters()
}

function onStatusUpdate() {
  filters.value.status = filters.value.status === 'all' ? '' : filters.value.status
  updateFilters()
}

function syncQuery() {
  const query: Record<string, string> = {}
  if (searchLocal.value) query.search = searchLocal.value
  if (filters.value.role) query.role = filters.value.role
  else query.role = 'all'
  if (filters.value.status) query.status = filters.value.status
  else query.status = 'all'
  if (filters.value.page > 1) query.page = filters.value.page.toString()
  if (filters.value.perPage !== 5) query.perPage = filters.value.perPage.toString()

  router.push({ query })
}

function clearFilters() {
  filters.value = {
    search: '',
    role: '',
    status: '',
    page: 1,
    perPage: filters.value.perPage
  }
  searchLocal.value = ''
  syncQuery()
}

function goToDetail(userId: string) {
  router.push({
    path: `/usuarios/${userId}`,
    query: route.query
  })
}

function goToPage(page: number) {
  filters.value.page = page
  syncQuery()
}

function goToCreate() {
  router.push({
    path: '/usuarios/nuevo',
    query: route.query
  })
}

watch(
  () => route.query,
  (newQuery) => {
    if (isUpdatingFromLocal) {
      isUpdatingFromLocal = false
      return
    }

    const newSearch = (newQuery.search as string) || ''
    const newRole = ((newQuery.role as string) === 'all' ? '' : (newQuery.role as string)) || ''
    const newStatus =
      ((newQuery.status as string) === 'all' ? '' : (newQuery.status as string)) || ''
    const newPage = parseInt(newQuery.page as string) || 1
    const newPerPage = parseInt(newQuery.perPage as string) || 5

    searchLocal.value = newSearch

    filters.value = {
      search: newSearch,
      role: newRole,
      status: newStatus,
      page: newPage,
      perPage: newPerPage
    }
  },
  { deep: true }
)

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

function getBadgeStyle(color: string | undefined) {
  const c = color || 'neutral'
  return {
    backgroundColor: `var(--color-${c}-100)`,
    color: `var(--color-${c}-800)`
  }
}

const statusLabels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente'
}

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  user: 'Usuario',
  moderator: 'Moderador'
}

interface TableRow {
  id: number
  fullName: string
  name: string
  email: string
  role: string
  roleLabel: string
  status: string
  statusLabel: string
  userId: string
}

const columns: TableColumn<TableRow>[] = [
  { accessorKey: 'id', header: 'Identificador' },
  {
    accessorKey: 'fullName',
    header: 'Nombre completo',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          {
            class:
              'flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary font-semibold',
            style: 'width: 2rem; height: 2rem; font-size: 0.875rem'
          },
          (row.original.fullName as string)
            .split(' ')
            .map((n: string) => n[0])
            .join('')
        ),
        h('span', { class: 'font-medium' }, row.original.fullName)
      ])
  },
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) =>
      h(resolveComponent('UBadge'), {
        label: row.original.roleLabel as string,
        color: roleColors[row.original.role as string],
        variant: 'subtle',
        size: 'sm'
      })
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) =>
      h(resolveComponent('UBadge'), {
        label: row.original.statusLabel as string,
        color: statusColors[row.original.status as string],
        variant: 'subtle',
        size: 'sm'
      })
  },
  {
    id: 'actions',
    header: 'Detalle',
    cell: ({ row }) =>
      h(resolveComponent('UButton'), {
        label: 'Ir al detalle',
        icon: 'i-lucide-arrow-right',
        trailing: true,
        variant: 'outline',
        size: 'xs',
        onClick: () => goToDetail((row.original as TableRow).userId)
      })
  }
]

const tableData = computed<TableRow[]>(() =>
  users.value.map((user, index) => ({
    id: index + 1,
    fullName: `${user.firstName} ${user.lastName}`,
    name: user.firstName,
    email: user.email,
    role: user.role,
    roleLabel: roleLabels[user.role] || user.role,
    status: user.status,
    statusLabel: statusLabels[user.status] || user.status,
    userId: user.id
  }))
)

const tableUi = {
  th: 'bg-gray-100 dark:bg-gray-800',
  tr: 'even:bg-gray-50 dark:even:bg-gray-900/50'
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between p-4">
      <div>
        <h2 class="text-2xl font-bold">Listado de Usuarios</h2>
        <p class="text-muted">Gestiona los usuarios del sistema</p>
      </div>
      <UButton label="Crear Usuario" icon="i-lucide-plus" color="primary" @click="goToCreate" />
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Filtros</h3>
          <UButton
            v-if="activeFiltersCount > 0"
            label="Limpiar filtros"
            variant="ghost"
            color="neutral"
            size="xs"
            @click="clearFilters"
          />
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UFormField label="Buscar">
          <UInput
            v-model="searchLocal"
            placeholder="Nombre, apellido o email..."
            icon="i-lucide-search"
            @input="onSearchInput"
          />
        </UFormField>

        <UFormField label="Rol">
          <USelect
            v-model="filters.role"
            :items="roleOptions"
            placeholder="Seleccionar rol..."
            @update:modelValue="onRoleUpdate"
          />
        </UFormField>

        <UFormField label="Estado">
          <USelect
            v-model="filters.status"
            :items="statusOptions"
            placeholder="Seleccionar estado..."
            @update:modelValue="onStatusUpdate"
          />
        </UFormField>
      </div>

      <div v-if="activeFiltersCount > 0" class="mt-4 flex gap-2 flex-wrap">
        <UBadge
          v-if="filters.role"
          :label="`Rol: ${roleLabels[filters.role]}`"
          color="primary"
          variant="subtle"
          size="md"
        />
        <UBadge
          v-if="filters.status"
          :label="`Estado: ${statusLabels[filters.status]}`"
          color="primary"
          variant="subtle"
          size="md"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Usuarios ({{ total }})</h3>
        </div>
      </template>

      <div v-if="pending" class="flex justify-center py-8">
        <UProgress animation="carousel" />
      </div>

      <div v-else-if="users.length === 0" class="text-center py-8">
        <UIcon name="i-lucide-users" class="w-12 h-12 mx-auto text-muted mb-4" />
        <p class="text-muted">No se encontraron usuarios</p>
        <UButton
          label="Crear usuario"
          color="primary"
          variant="outline"
          class="mt-4"
          @click="goToCreate"
        />
      </div>

      <UTable v-else :data="tableData" :columns="columns" class="w-full" :ui="tableUi" />

      <template v-if="totalPages > 1" #footer>
        <div class="flex items-center justify-between">
          <p class="text-sm text-muted">Página {{ currentPage }} de {{ totalPages }}</p>
          <UPagination
            v-model:page="currentPage"
            :items-per-page="filters.perPage"
            :total="total"
            :sibling-count="1"
            show-edges
            @update:page="goToPage"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
