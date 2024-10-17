# WattzOnAPI

Bienvenido a **WattzOnAPI**, un proyecto que proporciona una API construida con Node.js, Express y Prisma. Este proyecto está diseñado para ofrecer una conectividad robusta y eficiente a una base de datos PostgreSQL alojada en Aiven. Sigue esta guía para configurar, ejecutar y comprender el funcionamiento del proyecto.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Instalar Dependencias](#2-instalar-dependencias)
  - [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
  - [4. Configurar Prisma](#4-configurar-prisma)
  - [5. Ejecutar el Proyecto](#5-ejecutar-el-proyecto)
- [Comandos Útiles](#comandos-útiles)
- [Notas Adicionales](#notas-adicionales)
- [Resolución de Problemas Comunes](#resolución-de-problemas-comunes)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

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

2. Instalar Dependencias
Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

bash
npm install
Este comando instalará todas las dependencias especificadas en el archivo package.json, incluyendo Express, Prisma y cualquier otra biblioteca necesaria para el funcionamiento de la API.

3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto. Este archivo debe contener la configuración de la conexión a la base de datos. Aquí tienes un ejemplo de cómo debería verse el archivo .env:

Asegúrate de utilizar sslmode=require si tu base de datos está configurada para conexiones SSL.
Importante: Si tu base de datos requiere un certificado SSL, coloca el archivo ca.pem en una carpeta certs dentro de tu proyecto y configura la conexión en consecuencia.

4. Configurar Prisma
Prisma se conecta a la base de datos utilizando la variable DATABASE_URL definida en el archivo .env. Para sincronizar el esquema de la base de datos y generar el cliente de Prisma, ejecuta los siguientes comandos:

bash
Copy code
npx prisma db pull
npx prisma generate
npx prisma db pull: Obtiene el esquema de la base de datos y lo refleja en el archivo schema.prisma.
npx prisma generate: Genera el cliente de Prisma con base en el esquema actualizado.
Estos comandos son esenciales para que Prisma administre la conexión y las consultas a la base de datos.

5. Ejecutar el Proyecto
Con las dependencias instaladas y las variables de entorno configuradas, ahora puedes iniciar el proyecto en modo de desarrollo usando:

bash
Copy code
npm run dev
Esto iniciará el servidor en el puerto predeterminado de tu archivo de configuración (generalmente el puerto 3000). Ahora puedes acceder a la API visitando http://localhost:3000.