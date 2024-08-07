This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Guía para Configurar y Ejecutar un Proyecto Next.js con Prisma en Ubuntu

## Paso 1: Clonar el Repositorio

Abre una terminal.

Clona el repositorio del proyecto utilizando el siguiente comando:
git clone <URL_DEL_REPOSITORIO>

Navega al directorio del proyecto clonado:
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>

## Paso 2: Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias del proyecto:
npm install --legacy-peer-deps

## Paso 3: Configurar Prisma
Asegúrate de que el archivo .env esté presente en la raíz del proyecto. Si no existe, créalo y añade la configuración de la base de datos:
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

Genera los clientes de Prisma ejecutando:
npm run db:generate

Ejecuta las migraciones para actualizar la base de datos con el esquema definido:
npm run db:migrate

## Paso 4: Generar Cliente de Prisma (si es necesario)
Si no usaste npm run db:generate en el paso anterior, puedes generar el cliente de Prisma directamente con:
npx prisma generate

## Paso 5: Iniciar el Servidor de Desarrollo
Inicia el servidor de desarrollo de Next.js:
npm run dev
