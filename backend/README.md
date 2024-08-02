# Backend de Bot Stock

## Descripción

El backend de **Bot Stock** está construido con FastAPI y se utiliza para interactuar con la base de datos PostgreSQL. Proporciona una API para manejar datos de acciones del mercado.

## Requisitos

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Python](https://www.python.org/downloads/)

## Configuración del Proyecto

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/luissamano/bot_stock.git
   cd bot_stock/backend
   ```

2. **Crear el Archivo `.env`**

   Crea el archivo `.env` y ajusta las variables según tus necesidades.

   Asegúrate de definir las variables de entorno necesarias en el archivo `.env`. Por ejemplo:

   ```env
   DB_NAME=stocks
   DB_USER=postgres
   DB_PASS=postgres
   API_KEY=73dc1822fd02472e5cd3befbee805ad0
   DB_HOST=bot_stock-db-1
   ```

## Instalación y Ejecución

1. **Construir y Levantar el Contenedor**

   Ejecuta Docker Compose desde la raíz del proyecto para construir y levantar el contenedor del backend.

   ```bash
   docker-compose up --build
   ```

2. **Acceder a la API**

   La API estará disponible en [http://localhost:8000](http://localhost:8000).

## Endpoints Disponibles

### Obtener todas las acciones

`GET /stocks`

Este endpoint obtiene todos los registros de acciones de la base de datos.

**Respuesta:**

```json
[
  {
    "id": 1,
    "date": "2024-07-24T19:00:00+00:00",
    "symbol": "AAPL",
    "exchange": "IEXG",
    "open": 224.54,
    "high": 224.765,
    "low": 217.1,
    "close": 225.01,
    "last": 218.08,
    "volume": 818833
  },
  ...
]
```

### Crear una nueva acción

`POST /fetch_and_create_stock`

Este endpoint crea una nueva acción a partir de un símbolo proporcionado.

**Parámetros:**

- `symbol`: El símbolo de la acción a buscar.

**Ejemplo de Solicitud:**

```bash
curl -X POST "http://localhost:8000/fetch_and_create_stock?symbol=AAPL"
```

**Respuesta:**

```json
{
  "id": 1,
  "date": "2024-07-24T19:00:00+00:00",
  "symbol": "AAPL",
  "exchange": "IEXG",
  "open": 224.54,
  "high": 224.765,
  "low": 217.1,
  "close": 225.01,
  "last": 218.08,
  "volume": 818833
}
```

## Manejo de Errores

El backend maneja diversos errores y proporciona mensajes de error apropiados:

- `500`: Error en la base de datos o error inesperado.
- `400`: Error de validación de datos.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](../LICENSE) para más detalles.
