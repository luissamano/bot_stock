import React from "react";

import Col from "react-bootstrap/Col";
import Raw from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

import "./styles.css";

import { convertDatetime, formatCurrency, formatNumber } from "../../Utils";

// Componente Price para mostrar los detalles de precios de acciones
const Price = ({ state }) => {
  const { listPriceStock, idStock, currentPrice } = state;

  return (
    <Container>
      <Raw>
        {/* Mostrar el símbolo de la acción */}
        <a>{currentPrice.symbol}</a>
        <Col xs={6} md={4}>
          {/* Mostrar el último precio */}
          Ultimo precio:
          <p>{formatCurrency(currentPrice.last)}</p>
        </Col>
        <Col xs={6} md={4}>
          {/* Mostrar el precio máximo */}
          Maximo:
          <p>{formatCurrency(currentPrice.high)}</p>
        </Col>
        <Col xs={6} md={4}>
          {/* Mostrar el precio mínimo */}
          Minimo:
          <p>{formatCurrency(currentPrice.low)}</p>
        </Col>
      </Raw>

      <Raw>
        {/* Tabla para mostrar los detalles históricos de los precios de las acciones */}
        <Table responsive hover size="sm">
          <thead>
            <tr>
              <th>Apertura</th>
              <th>Maximo</th>
              <th>Minimo</th>
              <th>Cierre</th>
              <th>Num de acciones</th>
              <th>Fecha y hora</th>
            </tr>
          </thead>

          {listPriceStock.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{formatCurrency(item.open)}</td>
                <td>{formatCurrency(item.high)}</td>
                <td>{formatCurrency(item.low)}</td>
                <td>{formatCurrency(item.close)}</td>
                <td>{formatNumber(item.volume)}</td>
                <td>
                  {/* Badge para mostrar la fecha en formato convertido */}
                  <Badge bg="primary" pill>
                    {convertDatetime(item.date)}
                  </Badge>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Raw>
    </Container>
  );
};

// Exporta el componente Price
export default Price;
