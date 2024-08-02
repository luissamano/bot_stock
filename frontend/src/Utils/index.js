// Función para convertir una cadena de fecha y hora en un nuevo formato
export const convertDatetime = (dateStr) => {
  // Crear un objeto Date a partir de la cadena de fecha y hora
  const date = new Date(dateStr);

  // Obtener los componentes de la fecha y hora
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Formatear la fecha y hora al nuevo formato: "YYYY-MM-DD HH:mm"
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// Función para formatear una cantidad monetaria según la configuración regional y la moneda especificadas
export const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Función para formatear un número con separadores de miles según la configuración regional de EE.UU.
export const formatNumber = (number) => {
  return number.toLocaleString('en-US');
};