# Chat bot para consulta de stocks

## Pasos a seguir para levantar los servcicios.

- 1. Descargar el repositorio en tu maquina local.
`git clone `
- 2. Tener docker instalado en tu maquina. Puedes ver los pasos aqui, segun sea tu caso:
  [Mac]: https://docs.docker.com/desktop/install/mac-install/
  [Win]: https://docs.docker.com/desktop/install/windows-install/
  [Linux]: https://docs.docker.com/desktop/install/linux-install/
- 3. Crear dos archivos `.env` 
    -  El primero los depositaras dentro del directorio frontend el valor es la URL de la api:
    `REACT_APP_API_URL=http://localhost:8000`
    - El segundo va en la carpeta raiz /bot_stock
    los valores son:

| **Variable** | **Descripción**                      | **Valor**                       |
|--------------|--------------------------------------|---------------------------------|
| DB_NAME      | Nombre de la base de datos           | stocks                          |
| DB_USER      | Usuario de la base de datos          | postgres                        |
| DB_PASS      | Constraseña de la base de datos      | posgres                         |
| DB_HOST      | Host del contenedor de la api        | bot_stock-db-1                  |
| API_KEY      | Key de la plataforma marketstack | Puesdes conseguir la tuya [aqui](https://marketstack.com/) |


- 4. Una vez finalizado los pasos anteriores, en la consola de comando hay que ejecutar el comando: `docker-compose up --build` y deberia ser suficiente para levantar los servicios del bot.