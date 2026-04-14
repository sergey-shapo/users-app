<script setup lang="ts">
import type { UserFormData } from '~/types/user'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const { createUser } = useUsers()
const toast = useToast()

const pending = ref(false)
const errors = ref<Record<string, string>>({})

const state = reactive<UserFormData>({
  firstName: '',
  lastName: '',
  email: '',
  role: 'user',
  status: 'active'
})

const roleOptions = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Usuario', value: 'user' },
  { label: 'Moderador', value: 'moderator' }
]

const statusOptions = [
  { label: 'Activo', value: 'active' },
  { label: 'Inactivo', value: 'inactive' },
  { label: 'Pendiente', value: 'pending' }
]

function validate(): Record<string, string> {
  const errs: Record<string, string> = {}

  if (!state.firstName) {
    errs.firstName = 'El nombre es obligatorio'
  } else if (state.firstName.length < 2) {
    errs.firstName = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!state.lastName) {
    errs.lastName = 'El apellido es obligatorio'
  } else if (state.lastName.length < 2) {
    errs.lastName = 'El apellido debe tener al menos 2 caracteres'
  }

  if (!state.email) {
    errs.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errs.email = 'El email no es válido'
  }

  if (!state.role) {
    errs.role = 'El rol es obligatorio'
  }

  if (!state.status) {
    errs.status = 'El estado es obligatorio'
  }

  return errs
}

function capitalizeName(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function handleSubmit() {
  errors.value = validate()

  if (Object.keys(errors.value).length > 0) return

  pending.value = true

  try {
    await createUser({
      firstName: capitalizeName(state.firstName),
      lastName: capitalizeName(state.lastName),
      email: state.email.trim().toLowerCase(),
      role: state.role,
      status: state.status
    })

    toast.add({
      title: 'Usuario creado',
      description: 'El usuario se ha creado correctamente',
      color: 'success'
    })

    router.push({
      path: '/usuarios',
      query: route.query
    })
  } catch (error: any) {
    if (error.data?.errors) {
      errors.value = error.data.errors
    } else {
      toast.add({
        title: 'Error',
        description: 'Ha ocurrido un error al crear el usuario',
        color: 'error'
      })
    }
  } finally {
    pending.value = false
  }
}

function onCancel() {
  router.push({
    path: '/usuarios',
    query: route.query
  })
}
</script>

<template>
  <div class="flex flex-col gap-6 max-w-2xl">
    <div>
      <h2 class="text-2xl font-bold">Crear Nuevo Usuario</h2>
      <p class="text-muted">Completa el formulario para crear un nuevo usuario</p>
    </div>

    <UCard>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <UFormField label="Nombre" :error="errors.firstName" required>
          <UInput v-model="state.firstName" placeholder="Ingresa el nombre" icon="i-lucide-user" />
        </UFormField>

        <UFormField label="Apellido" :error="errors.lastName" required>
          <UInput v-model="state.lastName" placeholder="Ingresa el apellido" icon="i-lucide-user" />
        </UFormField>

        <UFormField label="Email" :error="errors.email" required>
          <UInput
            v-model="state.email"
            type="email"
            placeholder="usuario@ejemplo.com"
            icon="i-lucide-mail"
          />
        </UFormField>

        <UFormField label="Rol" :error="errors.role" required>
          <USelect v-model="state.role" :items="roleOptions" placeholder="Seleccionar rol..." />
        </UFormField>

        <UFormField label="Estado" :error="errors.status" required>
          <USelect
            v-model="state.status"
            :items="statusOptions"
            placeholder="Seleccionar estado..."
          />
        </UFormField>

        <div class="flex gap-3 justify-end pt-4">
          <UButton label="Cancelar" type="button" variant="outline" @click="onCancel" />
          <UButton label="Guardar" type="submit" color="primary" :loading="pending" />
        </div>
      </form>
    </UCard>
  </div>
</template>
