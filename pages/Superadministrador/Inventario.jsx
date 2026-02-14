import React, { useState } from 'react';
import { Store, ChevronRight, ArrowLeft, Info, AlertTriangle } from 'lucide-react';
import { SUCURSALES, INVENTARIO_GLOBAL } from '../../components/datosTienda';
import './Inventario.css';

export default function Inventario() {
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);

  // CAMBIO: Ahora usamos todo el inventario global para cualquier tienda
  const productosFiltrados = INVENTARIO_GLOBAL; 

  const productosBajoStock = productosFiltrados.filter(p => p.stock <= 10);

  return (
    <div className="inventario-view-wrapper fade-in">
      <div className="inventario-content-area">
        {!tiendaSeleccionada ? (
          <>
            <header className="header-actions">
              <div>
                <h1 className="main-title">Inventario por Sucursal</h1>
                <p className="main-subtitle">Selecciona una tienda para visualizar su stock</p>
              </div>
            </header>
            <div className="table-white-card">
              {SUCURSALES.map((tienda) => (
                <div key={tienda.id} className="store-item-row" onClick={() => setTiendaSeleccionada(tienda)}>
                  <div className="store-info-flex">
                    <div className="store-icon-bg"><Store size={20} color="#007bff" /></div>
                    <div>
                      <p className="store-title-name">{tienda.nombre}</p>
                      <p className="store-subtitle">{tienda.ubicación}</p>
                    </div>
                  </div>
                  <div className="action-btns-container">
                    <span className="text-view-users">Ver Inventario</span>
                    <ChevronRight size={18} color="#9ca3af" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <header className="header-actions">
              <div>
                <button className="btn-back-stores" onClick={() => setTiendaSeleccionada(null)}>
                  <ArrowLeft size={16} /> Volver a sucursales
                </button>
                <h1 className="main-title">Gestión de Inventario</h1>
                {/* Ahora mostramos el nombre de la sucursal seleccionada */}
                <p className="main-subtitle">Visualización del inventario de: <strong>{tiendaSeleccionada.nombre}</strong></p>
              </div>
            </header>

            <div className="alert-banner info-blue">
              <Info size={18} />
              <p>Como administrador, solo puedes <strong>visualizar</strong> el inventario. No puedes modificar stock, precios ni eliminar productos.</p>
            </div>

            {productosBajoStock.length > 0 && (
              <div className="alert-banner warning-yellow">
                <AlertTriangle size={18} />
                <div>
                  <p><strong>{productosBajoStock.length} producto(s) con stock bajo</strong></p>
                  <p className="small-text">{productosBajoStock.map(p => p.nombre).join(', ')}</p>
                </div>
              </div>
            )}

            <div className="table-white-card shadow-sm">
              <div className="card-inner-title">Estado del Inventario</div>
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Costo Unitario</th>
                    <th>Precio de Venta</th>
                    <th>Ganancia/Utilidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="prod-name">{p.nombre}</div>
                        <div className="prod-sku">{p.sku}</div>
                      </td>
                      <td className="text-gray">{p.categoria}</td>
                      <td>{p.stock} unidades</td>
                      <td>${p.costo.toFixed(2)}</td>
                      <td>${p.venta.toFixed(2)}</td>
                      <td><span className="profit-tag">${(p.venta - p.costo).toFixed(2)}</span></td>
                      <td>
                        <span className={`badge-status ${p.estado.toLowerCase().replace(" ", "-")}`}>
                          {p.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}