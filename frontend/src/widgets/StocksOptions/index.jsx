import React from "react";
import './Options.css';

// Componente StocksOptions para mostrar opciones de acciones
const StocksOptions = (props) => {
  const { setState, actionProvider } = props;

  // Opciones de acciones disponibles
  const options = [
    {
      name: "AAPL", // Nombre de la acción (Apple)
      id: 1,
    },
    {
      name: "NVDA", // Nombre de la acción (NVIDIA)
      id: 2,
    },
    {
      name: "MSFT", // Nombre de la acción (Microsoft)
      id: 3,
    },
  ];

  // Función para establecer el ID de la acción seleccionada
  const setIDStock = (e) => {
    const value = e.target.value;
    setState((state) => ({
      ...state,
      idStock: value, // Actualiza el estado con el ID de la acción seleccionada
    }));
    actionProvider.handleSearchStockId(value, props); // Llama a la acción para buscar la acción por ID
  };

  return (
    <div className="options">
      {options.map(option => {
        return (
          <button
            value={option.name}
            className="option"
            onClick={setIDStock}
            key={option.id}
          >
            {option.name} {/* Muestra el nombre de la acción en el botón */}
          </button>
        );
      })}
    </div>
  );
};

export default StocksOptions;
