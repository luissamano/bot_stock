import React from "react";
import { getListPriceStock, getPriceCurrent } from "../Services";

// Componente ActionProvider para manejar las acciones del chatbot
const ActionProvider = ({ createChatBotMessage, children, setState }) => {

  // Maneja el saludo inicial del chatbot
  const handleHello = () => {
    const botMessage = createChatBotMessage("¡Hola!");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Maneja la respuesta predeterminada cuando el chatbot no reconoce el comando
  const handleDefault = () => {
    removeWidgetMessage();

    const message = createChatBotMessage(
      "Solo puedo proporcionar información sobre la bolsa, ingresa la clave de, por ejemplo: AMZN",
      {
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    addMessageToState(message);
  };

  // Maneja la búsqueda del ID de una acción específica
  const handleSearchStockId = async (value) => {
    const idStock = value.toUpperCase();

    removeWidgetMessage();

    const message = createChatBotMessage(`Buscando ${idStock}...`, {
      loading: true,
      terminateLoading: true,
      withAvatar: true,
    });

    addMessageToState(message);

    const current = await getPriceCurrent(idStock);

    // Maneja el caso de error cuando la entrada no es válida
    if (current.error) {
      const message = createChatBotMessage(`Entrada no válida`, {
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      });

      addMessageToState(message);
    } else {
      const { data } = await getListPriceStock();
      const ls = data.filter((item) => item.symbol === idStock);

      addListPriceStock(current, ls);
    }
  };

  // Agrega un mensaje al estado
  const addMessageToState = (message) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };

  // Elimina los mensajes de widget del estado
  const removeWidgetMessage = () => {
    setState((state) => {
      const messages = state.messages.filter((message) => {
        // Filtra los mensajes basados en el widgetId
        return message.widget !== "Price" && message.type !== "bot";
      });
      return { ...state, messages };
    });
  };

  // Agrega la lista de precios de acciones y el precio actual al estado
  const addListPriceStock = (current, ls, count) => {
    setState((state) => ({
      ...state,
      currentPrice: current,
      listPriceStock: ls,
      count: count,
    }));

    const message = createChatBotMessage(`Listo!`, {
      delay: 1000,
      loading: true,
      terminateLoading: true,
      withAvatar: true,
      widget: "Price",
    });

    addMessageToState(message);
  };

  // Renderiza los elementos hijos del componente y les pasa las acciones como props
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDefault,
            handleSearchStockId,
            removeWidgetMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
