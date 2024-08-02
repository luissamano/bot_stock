import React from "react";

// Componente MessageParser para analizar y manejar los mensajes del usuario
const MessageParser = ({ children, actions }) => {
  // Función para analizar el mensaje del usuario
  const parse = (message) => {
    // Verifica si el mensaje incluye palabras relacionadas con pedir ayuda o contacto con una persona real
    if (
      message.includes("ayuda") ||
      message.includes("puedes hacer") ||
      message.includes("talk") ||
      message.includes("speak") ||
      message.includes("real person") ||
      message.includes("person") ||
      message.includes("contact")
    ) {
      actions.handleDefault(); // Llama a la acción handleDefault
    }
    // Verifica si el mensaje incluye saludos
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hola")
    ) {
      actions.handleHello(); // Llama a la acción handleHello
    } else {
      actions.handleSearchStockId(message); // Llama a la acción handleSearchStockId con el mensaje como parámetro
    }
  };

  // Renderiza los elementos hijos del componente y les pasa las funciones parse y actions como props
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse, // Pasa la función parse como prop
          actions, // Pasa las acciones como prop
        });
      })}
    </div>
  );
};

export default MessageParser;
