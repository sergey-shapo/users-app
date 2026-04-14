export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface UserFormData {
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
}

export interface UserFilters {
  search?: string
  role?: string
  status?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface UserFiltersState extends UserFilters {
  page: number
  perPage: number
}
