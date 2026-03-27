# Proyecto E-Commerce - Frontend con Svelte 5

Esta aplicación consiste en una interfaz de gestión de productos moderna desarrollada para la asignatura de Programación Web. El proyecto utiliza la versión más reciente de **Svelte 5** para la gestión del estado y se integra con un entorno de servidor desplegado mediante contenedores.

---

## Implementación de Svelte 5 (Runas)

Se han utilizado las nuevas **runas** de Svelte 5 para centralizar la lógica de reactividad, logrando un código más limpio y eficiente:

### $state
Se emplea para definir el estado fundamental de la aplicación que requiere cambios en tiempo real.
* **store.svelte.js**: Almacena de forma global el token de sesión y los datos de perfil del usuario.
* **Productos.svelte**: Gestiona el listado dinámico de productos y la cadena de texto del buscador.
* **Login.svelte**: Controla los campos de entrada y la gestión de mensajes de error de acceso.
* **ProductForm.svelte**: Maneja el estado temporal de los inputs antes de confirmar una operación de guardado.

### $derived
Se utiliza para realizar cálculos automáticos que dependen de otros estados, optimizando el rendimiento.
* **Productos.svelte**: Implementa el filtrado del catálogo en tiempo real y el contador total de artículos disponibles.
* **ProductCard.svelte**: Normaliza la propiedad de estado activo, asegurando que se interprete correctamente independientemente del formato en que llegue del servidor.
* **Perfil.svelte**: Deriva el nombre del usuario desde el estado global para su visualización.

### $effect
Se usa para gestionar la sincronización con servicios externos y efectos secundarios.
* **App.svelte**: Supervisa el estado de la sesión para proteger las rutas privadas y gestionar redirecciones.
* **Productos.svelte**: Inicia la petición de datos al backend en el momento en que se carga la vista del catálogo.
* **ProductForm.svelte**: Sincroniza automáticamente los datos del formulario cuando se selecciona un producto para su edición.

### $props
Sustituye a la comunicación tradicional entre componentes, permitiendo un flujo de datos más claro.
* **Componentes de interfaz**: Se utiliza en las tarjetas de productos y formularios para recibir datos y funciones de retorno (callbacks) desde los componentes padres.

---

## Integración con el Backend

La aplicación se comunica con una API REST profesional que gestiona la persistencia de datos y la seguridad mediante JWT.

### Endpoints y Roles Utilizados

| Método | Endpoint | Propósito | Requisito de Acceso |
| :--- | :--- | :--- | :--- |
| **POST** | /api/login | Autenticación y entrega de credenciales. | Público |
| **GET** | /api/productos | Obtención del catálogo completo. | Usuario Logueado |
| **POST** | /api/productos | Registro de nuevos productos. | Administrador |
| **PUT** | /api/productos/:id | Actualización de productos existentes. | Administrador |
| **DELETE** | /api/productos/:id | Eliminación de registros. | Administrador |

---

## Despliegue del Backend (Docker)

Para asegurar un entorno de ejecución idéntico al del servidor de producción, el backend se levantó utilizando la configuración de contenedores proporcionada por el profesor.

El despliegue se realizó de forma automatizada mediante el siguiente comando en la terminal:

```bash
docker compose up -d

Este proceso inicializa de forma aislada el servidor de aplicaciones y los servicios de base de datos necesarios, permitiendo que el frontend se conecte al puerto 3000 de forma inmediata y estable.

```

## Interfaz y Experiencia de Usuario (UI/UX)

El diseño de la aplicación se ha centrado en ofrecer una herramienta de administración funcional y visualmente equilibrada:

Arquitectura Visual: Se ha implementado un fondo basado en luces radiales suaves para evitar la fatiga visual, junto con una barra de navegación superior que utiliza desenfoque de fondo para aportar profundidad.

Optimización de Procesos: El buscador de productos funciona mediante lógica reactiva, permitiendo localizar cualquier artículo al instante sin necesidad de recargar la página o realizar peticiones adicionales.

Consistencia de Datos: La interfaz incluye una capa de limpieza de datos que garantiza que la información mostrada sea coherente, incluso si existen variaciones en los formatos de respuesta del servidor.

Adaptabilidad: El catálogo utiliza un sistema de rejilla flexible que se ajusta automáticamente al tamaño de la pantalla, garantizando una experiencia fluida tanto en dispositivos móviles como en ordenadores de sobremesa.

Tecnologías: Svelte 5, Vite, Docker Compose, JSON Web Tokens.

