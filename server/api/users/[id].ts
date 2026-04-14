import { defineEventHandler, createError } from "h3";
import { users } from "../../utils/users-store";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "Usuario no encontrado",
    });
  }

  return { data: user };
});
