# Guía para Configurar y Ejecutar un Proyecto Next.js con Prisma

## Paso 1: Instalar y Configurar PostgreSQL

**1. Instalar PostgreSQL**

Con este comando se descargará e instalará PostgreSQL en su última versión:
sudo apt-get -y install postgresql postgresql-contrib

Ingrese a PostgreSQL con el siguiente comando:
sudo su - postgres
psql

Crea el usuario y la contraseña para administrar bases de datos con PostgreSQL:
create user eleazarparkour with password '123456';

Dar permisos de super usuario a eleazarparkour:
alter user eleazarparkour with superuser;

Crear tu primer base de datos con PostgreSQL.
Podemos crear nuestro primer base de datos con el siguiente comando para el usuario eleazarparkour:
create database login_next_db owner eleazarparkour;

Listar base de datos:
\l
\list

Para salir:
exit

**Instalar PgAdmin**

Para instalar PgAdmin nesecitaremos `curl` y lo podemos instalar con el siguiente comando:
sudo apt install curl

Instale la clave pública para el repositorio (si no lo hizo previamente):
sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add

Cree el archivo de configuración del repositorio:
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'


Instalar pgAdmin, instalar para los modos de escritorio :
sudo apt install pgadmin4

## Paso 2: Clonar el Repositorio

Abre una terminal.

Clona el repositorio del proyecto utilizando el siguiente comando:
git clone <URL_DEL_REPOSITORIO>

Navega al directorio del proyecto clonado:
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>

## Paso 3: Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias del proyecto:
npm install --force

## Paso 4: Configurar Prisma
Asegúrate de que el archivo .env esté presente en la raíz del proyecto. Si no existe, créalo y añade la configuración de la base de datos:
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

El NEXTAUTH_SECRET es una clave de seguridad utilizada por NextAuth.js para cifrar y firmar los tokens de sesión Para generar un valor seguro y aleatorio para NEXTAUTH_SECRET, ejecuta el siguiente comando en la terminal:
openssl rand -base64 32

Genera los clientes de Prisma ejecutando:
npm run db:generate

Ejecuta las migraciones para actualizar la base de datos con el esquema definido:
npm run db:migrate

## Paso 5: Iniciar el Servidor de Desarrollo
Inicia el servidor de desarrollo de Next.js:
npm run dev

# ______________________________________________________________________________________________________________________

# Descripción del Proyecto

Desarrollé una aplicación web utilizando Kirimase, una herramienta de línea de comandos (CLI) diseñada para acelerar el desarrollo con Next.js. Esta aplicación, construida con Next.js 14 y React, permite a los usuarios autenticarse, ingresar y visualizar información personal en una lista.

## Autenticación de Usuarios

Implementé la autenticación de usuarios con NextAuth, utilizando el proveedor de credenciales para permitir el inicio de sesión mediante correo electrónico y contraseña. Las contraseñas se cifran con bcrypt antes de ser almacenadas en la base de datos PostgreSQL, asegurando la protección de la información del usuario.

## Estilo y Diseño

Modifiqué los estilos del menú superior, menú lateral, botones, iconos y avatar para mejorar la apariencia de la interfaz de usuario.

## Visualización de Información

Para la presentación de información personal, utilicé el componente Data Table de Shadcn junto con Tailwind CSS. La tabla permite a los usuarios autenticados ver y gestionar su información personal, organizada por criterios como nombre, cédula, dirección, teléfono y salario. Implementé funcionalidades de búsqueda y filtrado para mejorar la usabilidad:

- **Ordenamiento**: Los datos pueden ordenarse haciendo clic en los encabezados de las columnas.
- **Filtrado**: Añadí un filtro de búsqueda dinámico que se actualiza según el criterio seleccionado, permitiendo a los usuarios buscar por nombre, cédula, dirección, teléfono y salario.

## Validación de Formularios

Desarrollé formularios para inicio de sesión, registro y creación de información personal, utilizando herramientas de validación modernas para asegurar una experiencia de usuario fluida:

- **Registro**: Utilicé Zod para validar campos como nombre, correo electrónico y contraseñas, asegurando que las contraseñas coincidan antes del envío.
- **Inicio de Sesión**: Utilicé react-hook-form para gestionar validaciones y estados, mostrando errores en tiempo real y manejando errores del servidor con mensajes claros.
- **Creación de Información Personal**: El formulario utiliza Zod para garantizar la validación efectiva de campos como nombre, cédula, teléfono, salario y dirección, con validaciones específicas para cada uno.