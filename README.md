# ExamenArquitectura
 Examen de Arquitrecrtura Tercer Parcial
Universidad de las Fuerzas Armadas ESPE
Integrantes: Paul Salazar	
	           Pablo Tamayo
	           Anthony Macas
NRC: 16509

Para ejecutar el back que se llama gestión-proyectos se debe cambiar las propiedades de la aplicación ya sé el usuario la contraseña y además crear una base de datos con el nombre que se le desee dar o en nuestro caso que se llama final levantada en una base de datos SQL
spring.datasource.url=jdbc:postgresql://localhost:5432/final
spring.datasource.username=postgres
spring.datasource.password=postgres

Para probar la api
Ingresar a la dirección http://localhost:8080/graphiql el puerto varía de acuerdo a su configuración
Query
Listar solo empleados
query{
  listarEmpleados{
    id,nombre,apellido,email
	}
}

Para ejecutar el front
Se debe tener instalada una versión de node 16.14.0
