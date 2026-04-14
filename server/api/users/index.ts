import { defineEventHandler, readBody, createError } from "h3";
import { users } from "../../utils/users-store";

const now = new Date().toISOString();

export default defineEventHandler(async (event) => {
  const method = event.method;
  const query = getQuery(event);

  if (method === "GET") {
    let filtered = [...users];

    const search = query.search as string | undefined;
    const role = query.role as string | undefined;
    const status = query.status as string | undefined;
    const page = parseInt(query.page as string) || 1;
    const perPage = parseInt(query.perPage as string) || 10;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(searchLower) ||
          u.lastName.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower),
      );
    }

    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (status) {
      filtered = filtered.filter((u) => u.status === status);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedUsers = filtered.slice(start, end);

    return {
      data: paginatedUsers,
      total,
      page,
      perPage,
      totalPages,
    };
  }

  if (method === "POST") {
    const body = await readBody(event);

    const errors: Record<string, string> = {};

    if (!body.firstName?.trim()) {
      errors.firstName = "El nombre es obligatorio";
    } else if (body.firstName.trim().length < 2) {
      errors.firstName = "El nombre debe tener al menos 2 caracteres";
    }

    if (!body.lastName?.trim()) {
      errors.lastName = "El apellido es obligatorio";
    } else if (body.lastName.trim().length < 2) {
      errors.lastName = "El apellido debe tener al menos 2 caracteres";
    }

    if (!body.email?.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.email = "El email no es válido";
    } else {
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === body.email.toLowerCase(),
      );
      if (existingUser) {
        errors.email = "Ya existe un usuario con este email";
      }
    }

    if (!body.role) {
      errors.role = "El rol es obligatorio";
    }

    if (!body.status) {
      errors.status = "El estado es obligatorio";
    }

    if (Object.keys(errors).length > 0) {
      throw createError({
        statusCode: 422,
        statusMessage: "Validation Error",
        data: { errors },
      });
    }

    const newUser = {
      id: crypto.randomUUID(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      role: body.role,
      status: body.status,
      createdAt: now,
      updatedAt: now,
    };

    users.unshift(newUser);

    return {
      data: newUser,
      message: "Usuario creado correctamente",
    };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed",
  });
});
