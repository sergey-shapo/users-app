# Users App

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Aplicación de gestión de usuarios construida con [Nuxt 4](https://nuxt.com/) y [Nuxt UI](https://ui.nuxt.com).

- **Repositorio:** <https://github.com/sergey-shapo/users-app>
- **Stack:** Nuxt 4 · Vue 4 · TypeScript · Nuxt UI · Tailwind CSS

<a href="https://github.com/sergey-shapo/users-app" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png">
    <img alt="Users App" src="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png" width="830" height="466">
  </picture>
</a>

## Funcionalidades

- **Listado de usuarios** en tabla con columnas: Identificador, Nombre completo, Nombre, Email, Rol, Estado, Detalle.
- **Búsqueda** por nombre, apellido o email.
- **Filtrado** por rol (Admin, User, Moderator) y estado (Active, Inactive, Pending).
- **Paginación**.
- **Creación de usuarios** con validación de formulario.
- **Vista de detalle** de cada usuario.

## Quick Start

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Scripts disponibles

| Comando          | Descripción                           |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Inicia el servidor de desarrollo      |
| `pnpm build`     | Compila la aplicación para producción |
| `pnpm preview`   | Previsualiza la build de producción   |
| `pnpm lint`      | Ejecuta ESLint                        |
| `pnpm typecheck` | Verifica tipos TypeScript             |

## Estructura del proyecto

```
├── app/
│   ├── pages/usuarios/     # Rutas: listado, detalle, nuevo
│   ├── components/         # Componentes reutilizables
│   ├── composables/        # Composables (useUsers)
│   ├── types/              # Tipos TypeScript
│   └── app.vue             # Componente raíz
├── server/
│   ├── api/users/          # API REST (listado, detalle, crear)
│   └── utils/              # Utilidades (users-store)
├── Dockerfile              # Configuración Docker multi-stage
├── docker-compose.yml      # Orquestación con Docker Compose
└── package.json
```

## Despliegue con Docker

### Requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado en tu sistema.
- [Docker Compose](https://docs.docker.com/compose/install/) (incluido en Docker Desktop).

### Opción 1: Docker Compose (recomendado)

```bash
# Construir y ejecutar
docker compose up --build -d

# Ver logs
docker compose logs -f

# Detener
docker compose down
```

La aplicación estará disponible en `http://localhost:3000`.

### Opción 2: Docker directamente

```bash
# Construir la imagen
docker build -t users-app .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --name users-app users-app

# Ver logs
docker logs -f users-app

# Detener y eliminar
docker stop users-app && docker rm users-app
```

### Healthcheck

El contenedor incluye un healthcheck que verifica que la aplicación responde correctamente en `http://localhost:3000/`.

### Dockerfile (multi-stage)

| Etapa     | Descripción                              |
| --------- | ---------------------------------------- |
| `base`    | Node.js 20 Alpine + pnpm                 |
| `deps`    | Instalación de dependencias con lockfile |
| `builder` | Build de la aplicación Nuxt              |
| `runner`  | Imagen final minimal con usuario no-root |

## Tecnología

- **[Nuxt 4](https://nuxt.com/)** — Framework Vue full-stack
- **[Nuxt UI](https://ui.nuxt.com/)** — Componentes UI basados en Tailwind
- **[TypeScript](https://www.typescriptlang.org/)** — Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** — CSS utility-first
- **[Docker](https://www.docker.com/)** — Contenedores para despliegue

## Sobre este proyecto

Este proyecto fue desarrollado con el apoyo de inteligencia artificial, que aceleró la generación de código repetitivo y la implementación de componentes UI. El desarrollador mantuvo **supervisión completa** sobre:

- **Arquitectura** — Diseño de la estructura, rutas, API y flujo de datos.
- **Validación y tipado** — Revisión y corrección de tipos TypeScript, errores de compilación y lógica de negocio.
- **UX/UI** — Decisiones de diseño y experiencia de usuario.
- **Orquestación** — Selección de tecnologías y despliegue.
- **Calidad del código** — Refactorización, patrones de diseño y buenas prácticas.

La IA funcionó como asistente de productividad; la visión técnica, las decisiones de ingeniería y el control de calidad fueron responsabilidad del desarrollador.
