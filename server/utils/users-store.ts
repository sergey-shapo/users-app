const generateId = () => crypto.randomUUID()

const now = new Date().toISOString()

export const users = [
  {
    id: generateId(),
    firstName: 'Ana',
    lastName: 'Garcia',
    email: 'ana.garcia@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: generateId(),
    firstName: 'Carlos',
    lastName: 'Lopez',
    email: 'carlos.lopez@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: '2024-02-20T14:00:00Z',
    updatedAt: '2024-02-20T14:00:00Z'
  },
  {
    id: generateId(),
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@example.com',
    role: 'moderator' as const,
    status: 'pending' as const,
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-03-10T09:15:00Z'
  },
  {
    id: generateId(),
    firstName: 'Pedro',
    lastName: 'Martinez',
    email: 'pedro.martinez@example.com',
    role: 'user' as const,
    status: 'inactive' as const,
    createdAt: '2024-03-25T16:45:00Z',
    updatedAt: '2024-03-25T16:45:00Z'
  },
  {
    id: generateId(),
    firstName: 'Laura',
    lastName: 'Fernandez',
    email: 'laura.fernandez@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: '2024-04-05T11:20:00Z',
    updatedAt: '2024-04-05T11:20:00Z'
  },
  {
    id: generateId(),
    firstName: 'Javier',
    lastName: 'Sanchez',
    email: 'javier.sanchez@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: '2024-04-12T08:00:00Z',
    updatedAt: '2024-04-12T08:00:00Z'
  },
  {
    id: generateId(),
    firstName: 'Sofia',
    lastName: 'Torres',
    email: 'sofia.torres@example.com',
    role: 'moderator' as const,
    status: 'active' as const,
    createdAt: '2024-05-01T13:30:00Z',
    updatedAt: '2024-05-01T13:30:00Z'
  },
  {
    id: generateId(),
    firstName: 'Diego',
    lastName: 'Ramirez',
    email: 'diego.ramirez@example.com',
    role: 'user' as const,
    status: 'pending' as const,
    createdAt: '2024-05-18T15:10:00Z',
    updatedAt: '2024-05-18T15:10:00Z'
  },
  {
    id: generateId(),
    firstName: 'Valentina',
    lastName: 'Castro',
    email: 'valentina.castro@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: '2024-06-02T10:00:00Z',
    updatedAt: '2024-06-02T10:00:00Z'
  },
  {
    id: generateId(),
    firstName: 'Andres',
    lastName: 'Ruiz',
    email: 'andres.ruiz@example.com',
    role: 'user' as const,
    status: 'inactive' as const,
    createdAt: '2024-06-15T17:25:00Z',
    updatedAt: '2024-06-15T17:25:00Z'
  },
  {
    id: generateId(),
    firstName: 'Camila',
    lastName: 'Diaz',
    email: 'camila.diaz@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: '2024-07-01T09:40:00Z',
    updatedAt: '2024-07-01T09:40:00Z'
  },
  {
    id: generateId(),
    firstName: 'Mateo',
    lastName: 'Morales',
    email: 'mateo.morales@example.com',
    role: 'moderator' as const,
    status: 'active' as const,
    createdAt: '2024-07-20T14:55:00Z',
    updatedAt: '2024-07-20T14:55:00Z'
  },
  {
    id: generateId(),
    firstName: 'Isabella',
    lastName: 'Vargas',
    email: 'isabella.vargas@example.com',
    role: 'user' as const,
    status: 'pending' as const,
    createdAt: '2024-08-05T12:15:00Z',
    updatedAt: '2024-08-05T12:15:00Z'
  },
  {
    id: generateId(),
    firstName: 'Lucas',
    lastName: 'Jimenez',
    email: 'lucas.jimenez@example.com',
    role: 'admin' as const,
    status: 'active' as const,
    createdAt: '2024-08-22T16:30:00Z',
    updatedAt: '2024-08-22T16:30:00Z'
  },
  {
    id: generateId(),
    firstName: 'Daniela',
    lastName: 'Rojas',
    email: 'daniela.rojas@example.com',
    role: 'user' as const,
    status: 'active' as const,
    createdAt: '2024-09-10T08:50:00Z',
    updatedAt: '2024-09-10T08:50:00Z'
  }
]
