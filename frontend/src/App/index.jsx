import React from "react";

import "./App.css";
import Container from "react-bootstrap/Container";

import Chatbot from "react-chatbot-kit";

import ActionProvider from "../ActionProvider";
import MessageParser from "../MessageParser";
import config from "../Config";

// Componente principal de la aplicación
const App = () => {
  
  // Estado para mostrar u ocultar el chatbot
  return (
    <div className="App">
      <Container>
        <Chatbot
          config={config} // Configuración del chatbot
          actionProvider={ActionProvider} // Proveedor de acciones
          messageParser={MessageParser} // Analizador de mensajes
          placeholderText="Ingresa la clave de la accion a buscar"
          headerText="Conversacion con Fukencio"
        />
      </Container>
    </div>
  );
};

export default App;
