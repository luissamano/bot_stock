import axios from "axios";

// Configuración global de Axios
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token";

// URL base para las solicitudes a la API
const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);


// Función para obtener la lista de precios de las acciones
export const getListPriceStock = async () => {
  let data = await axios({
    method: "get",       // Método HTTP GET
    url: '/stocks',      // Endpoint para obtener los precios de las acciones
    baseURL: BASE_URL    // URL base de la API
  });
  return data;
};

// Función para obtener el precio actual de una acción
export const getPriceCurrent = async (newPrice) => {
  try {
    // Realiza una solicitud POST para obtener y crear una acción
    let { data, status } = await axios({
      method: "post",    // Método HTTP POST
      url: `/fetch_and_create_stock?symbol=${newPrice}`,  // Endpoint con el símbolo de la acción
      baseURL: BASE_URL, // URL base de la API
      headers: {
        'accept': 'application/json'  // Acepta respuestas en formato JSON
      }
    });

    // Verifica si el estado de la respuesta no es 200 o 201
    if (status !== 200 && status !== 201) {
      throw new Error(`Unexpected response status: ${status}`);
    }

    return data;
  } catch (error) {
    // Manejo de diferentes tipos de errores de axios
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango de 2xx
      console.error(`Error fetching and creating stock: ${error.response.status} - ${error.response.data}`);
      return {
        error: `Error: ${error.response.status} - ${error.response.data}`
      };
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error(`Error fetching and creating stock: No response received`, error.request);
      return {
        error: "Error: No response received from the server"
      };
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      console.error(`Error fetching and creating stock:`, error.message);
      return {
        error: `Error: ${error.message}`
      };
    }
  }
};
