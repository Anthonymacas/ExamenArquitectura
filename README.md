# ExamenArquitectura
 Examen de Arquitrecrtura Tercer Parcial

# Universidad de las Fuerzas Armadas ESPE

**Integrantes:**
- Paul Salazar
- Pablo Tamayo
- Anthony Macas
- HOLGER Catucuamba 

**NRC:** 16509

## Instrucciones de Configuración y Ejecución

### Ejecución del Backend

Para ejecutar el backend llamado `gestión-proyectos`, sigue estos pasos:

1. **Configuración de Propiedades:**
   Modifica las propiedades de la aplicación para configurar la conexión a la base de datos. Asegúrate de cambiar el nombre de usuario y la contraseña según corresponda. Crea una base de datos con el nombre que prefieras; en nuestro caso, la base de datos se llama `final`.

   En el archivo de configuración (por ejemplo, `application.properties` o `application.yml`), establece las siguientes propiedades:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/final
   spring.datasource.username=postgres
   spring.datasource.password=postgres



Base de Datos: Asegúrate de tener una base de datos PostgreSQL en ejecución con el nombre final (o el nombre que hayas elegido).
Prueba de la API
Para probar la API, ingresa a la siguiente dirección:

URL de GraphiQL: http://localhost:8080/graphiql

Nota: El puerto puede variar dependiendo de tu configuración.

Ejemplo de Consulta:

Para listar todos los empleados, usa la siguiente consulta:

query {
  listarEmpleados {
    id
    nombre
    apellido
    email
  }
}



Ejecución del Frontend
Para ejecutar el frontend, asegúrate de tener instalada una versión de Node.js compatible. En este caso, se requiere Node.js 16.14.0. Si no tienes esta versión, actualízala a través del sitio oficial de Node.js.

Instalación de Dependencias: Navega al directorio del proyecto frontend y ejecuta:

npm install
Ejecución: Para iniciar el servidor de desarrollo, ejecuta: ng serve

Por defecto, la aplicación estará disponible en http://localhost:4200.
Para  acceder se recuerda ingresar con el usuario permitido admin psw: admin


1. Asegúrate de Tener Angular CLI Instalado
Si no tienes Angular CLI instalado globalmente, puedes instalarlo usando npm (Node Package Manager). Abre una terminal o PowerShell y ejecuta:

npm install -g @angular/cli
