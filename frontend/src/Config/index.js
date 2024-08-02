import { createChatBotMessage } from "react-chatbot-kit";
import StocksOptions from "../widgets/StocksOptions";
import Price from "../widgets/Price";

// Define el nombre del bot
const botName = "Fukencio";

// Configuración del chatbot
const config = {

  // Mensajes iniciales que el bot enviará al inicio
  initialMessages: [
    createChatBotMessage(`Hola mi nombre es ${botName}.`),
    createChatBotMessage(
      "Estoy aqui para ayudarte a obtener los precios de las empresas en la bolsa de valores, por ejemplo:",
      {
        withAvatar: false,
        delay: 800,
        widget: "Examples",
      }
    ),
  ],
  // Estado inicial del bot
  state: {
    currentPrice: [],   // Lista de precios actuales de acciones
    listPriceStock: [], // Lista de precios históricos de acciones
    idStock: ""         // ID de la acción buscada
  },
  // Nombre del bot
  botName: botName,
  // Configuración de los widgets utilizados por el bot
  widgets: [
    {
      widgetName: "Examples",   // Nombre del widget
      widgetFunc: (props) => <StocksOptions {...props} />, // Componente que renderiza el widget
    },
    {
      widgetName: "Price",      // Nombre del widget
      widgetFunc: (props) => <Price {...props} />, // Componente que renderiza el widget
    },
  ],
};

export default config;
