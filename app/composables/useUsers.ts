import type { User, UserFormData, PaginatedResponse, UserFiltersState } from '~/types/user'

export function useUsers() {
  const fetchUsers = async (filters: UserFiltersState): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams()

    if (filters.search) params.append('search', filters.search)
    if (filters.role) params.append('role', filters.role)
    if (filters.status) params.append('status', filters.status)
    params.append('page', filters.page.toString())
    params.append('perPage', filters.perPage.toString())

    return await $fetch(`/api/users?${params.toString()}`)
  }

  const fetchUser = async (id: string): Promise<User> => {
    const response = await $fetch(`/api/users/${id}`)
    return response.data
  }

  const createUser = async (data: UserFormData): Promise<User> => {
    const response = await $fetch('/api/users', {
      method: 'POST',
      body: data
    })
    return response.data
  }

  return {
    fetchUsers,
    fetchUser,
    createUser
  }
}
