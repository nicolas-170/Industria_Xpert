# Industria-Xpert

Desarrollo del proyecto industria Xpert


## 🌐 Variables de entorno

A continuación, se listan las variables de entorno necesarias para la correcta ejecución del servicio:

# Configuracion del servicio

- `APP_NAME`: Indica el nombre del proyecto.
- `PORT`: Indica el puerto en el que se va a exponer el servicio (por ejemplo, `7777`), por defecto esta en el 7777

# Configuración de Conexión a Base de Datos MySQL

A continuación se detallan las variables de entorno necesarias para establecer la conexión con la base de datos MySQL:

- `DB_USER`: Nombre de usuario utilizado para conectarse a la base de datos (por defecto, `root`)
- `DB_PASSWORD`: Contraseña asociada al usuario de la base de datos.
- `DB_HOST`: Dirección IP o nombre del host donde se encuentra el servidor MySQL, incluyendo el puerto (por defecto, `localhost:3306`).
- `DB_NAME`: Nombre de la base de datos a la que se conectará la aplicación.


## 🧩 Modelo de datos (SQL)

El modelado de la base de datos se encuentra en el archivo: scripts/sql/modelo.sql
Este contiene las entidades necesarias para el proyecto.

## ▶️ Para correr el servicio

### 1. Requisitos

- Tener instalado [Go](https://golang.org/doc/install)
- Tener acceso a una base de datos PostgreSQL (u otra compatible)
- Configurar las variables de entorno mencionadas anteriormente

### 2. Ejecutar en modo desarrollo

- En terminal:

```bash
go run ./cmd/server/main.go
```

