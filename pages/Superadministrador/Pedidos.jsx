import React, { useState } from 'react';
import { Info, Eye, X, Store, ChevronRight, ArrowLeft } from 'lucide-react';
import { DATA_PEDIDOS } from '../../components/datosPedidos'; 
import { SUCURSALES } from '../../components/datosTienda';
import './Pedidos.css';

export default function Pedidos() {
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerDetalle = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const pedidosFiltrados = DATA_PEDIDOS.filter(
    (pedido) => pedido.sucursal === tiendaSeleccionada?.nombre
  );

  return (
    <div className="pedidos-view-wrapper fade-in">
      {!tiendaSeleccionada ? (
        <>
          <header className="header-view">
            <h1 className="title-main">Pedidos por Sucursal</h1>
            <p className="subtitle-main">Selecciona una tienda para visualizar los pedidos realizados</p>
          </header>

          <div className="table-card shadow-sm">
            {SUCURSALES.map((tienda) => (
              <div key={tienda.id} className="store-item-row" onClick={() => setTiendaSeleccionada(tienda)}>
                <div className="store-info-flex">
                  <div className="store-icon-bg"><Store size={20} color="#3b82f6" /></div>
                  <div>
                    <p className="store-title-name">{tienda.nombre}</p>
                    <p className="store-subtitle">{tienda.ubicación || tienda.ubicacion}</p>
                  </div>
                </div>
                <div className="action-btns-container">
                  <span className="text-view-report">Ver Pedidos</span>
                  <ChevronRight size={18} color="#9ca3af" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="header-view">
            <button className="btn-back-stores" onClick={() => setTiendaSeleccionada(null)}>
              <ArrowLeft size={16} /> Volver a sucursales
            </button>
            <h1 className="title-main">Pedidos: {tiendaSeleccionada.nombre}</h1>
            <p className="subtitle-main">Visualiza los pedidos realizados en esta sucursal</p>
          </header>

          <div className="info-banner-blue">
            <div className="icon-circle">
              <Info size={18} color="#0038a8" />
            </div>
            <p>Como administrador, solo puedes <strong>visualizar</strong> los pedidos de esta sucursal.</p>
          </div>

          <div className="table-card shadow-sm">
            <table className="pedidos-table">
              <thead>
                <tr>
                  <th>#Pedido</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.length > 0 ? (
                  pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="bold-text">{pedido.id}</td>
                      <td className="text-muted">{pedido.cliente}</td>
                      <td>
                        <span className={`pill-status ${pedido.estado.toLowerCase()}`}>
                          {pedido.estado}
                        </span>
                      </td>
                      <td className="bold-text">${pedido.total.toFixed(2)}</td>
                      <td>{pedido.fecha}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="action-btn-eye" onClick={() => handleVerDetalle(pedido)}>
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '50px', color: '#9ca3af' }}>
                      No hay pedidos registrados en {tiendaSeleccionada.nombre}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showModal && pedidoSeleccionado && (
        <div className="modal-overlay-custom">
          <div className="modal-detalle-box fade-in">
            <div className="modal-header-flex">
              <h2 className="modal-h2">Detalle de Pedido {pedidoSeleccionado.id}</h2>
              <button className="btn-close-modal" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-grid-info">
              <div><label>CLIENTE</label><p>{pedidoSeleccionado.cliente}</p></div>
              <div><label>ESTADO</label>
                <span className={`pill-status ${pedidoSeleccionado.estado.toLowerCase()}`}>
                  {pedidoSeleccionado.estado}
                </span>
              </div>
              <div><label>FECHA</label><p>{pedidoSeleccionado.fecha}</p></div>
            </div>

            <div className="modal-table-container">
              <table className="modal-items-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th style={{ textAlign: 'center' }}>Cant.</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidoSeleccionado.detalle.map((item, index) => (
                    <tr key={index}>
                      <td>{item.producto}</td>
                      <td style={{ textAlign: 'center' }}>{item.cantidad}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-total-banner">
              <span>Total General:</span>
              <span className="blue-total-text">${pedidoSeleccionado.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}