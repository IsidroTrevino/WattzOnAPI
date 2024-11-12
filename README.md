# WattzOnAPI

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Instalar Dependencias](#2-instalar-dependencias)
  - [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
  - [4. Ejecutar el Proyecto](#4-ejecutar-el-proyecto)
- [Liberación en Producción](#liberación-en-producción)
- [Stack Tecnológico](#stack-tecnológico)

---

## Requisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- **Node.js** (v14 o superior)
- **PostgreSQL** (para la base de datos)
- **Prisma** (para la administración del ORM)

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local. Asegúrate de estar en el directorio en el que quieres clonar el proyecto.

```bash
git clone https://github.com/IsidroTrevino/WattzOnAPI.git
cd WattzOnAPI
```

### 2. Instalar Dependencias
Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```
Este comando instalará todas las dependencias especificadas en el archivo package.json, incluyendo Express, Prisma y cualquier otra biblioteca necesaria para el funcionamiento de la API.

### 3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto. Este archivo debe contener la configuración de la conexión a la base de datos. Aquí tienes un ejemplo de cómo debería verse el archivo .env:

Asegúrate de utilizar sslmode=require si tu base de datos está configurada para conexiones SSL.

### 4. Ejecutar el Proyecto
Con las dependencias instaladas y las variables de entorno configuradas, ahora puedes iniciar el proyecto en modo de desarrollo usando:

```bash
npm run dev
```
Esto iniciará el servidor en el puerto predeterminado de tu archivo de configuración (generalmente el puerto 3000). Ahora puedes acceder a la API visitando http://localhost:3000.

## Liberación en Producción

Para liberar esta API en un entorno de producción, sigue estos pasos:

1. **Instalar Dependencias**: Asegúrate de tener todas las dependencias necesarias instaladas en el entorno de producción ejecutando `npm install`.
2. **Configurar Variables de Entorno**: Define las variables necesarias en producción en el archivo `.env` o en el sistema de gestión de variables del servidor.
3. **Iniciar en Modo Producción**: Ejecuta el comando `npm run dev` para iniciar el servidor en producción.


## Stack Tecnológico

- **Backend**: Node.js, Express, Prisma, PostgreSQL.
- **Frontend** (si aplica): [Framework o Librería de Frontend, ej. React].
- **Herramientas adicionales**: [Ej. Docker, Vercel para despliegue, etc.].

...