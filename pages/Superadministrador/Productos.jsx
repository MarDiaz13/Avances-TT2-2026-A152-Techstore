import React, { useState } from 'react';
import { Plus, Info, X, Store, ChevronRight, ArrowLeft } from 'lucide-react';
import { PRODUCTOS_DUENO_DATA } from '../../components/ListaProductos';
import { SUCURSALES } from '../../components/datosTienda';
import './Productos.css';

export default function Productos() {
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const productosFiltrados = PRODUCTOS_DUENO_DATA.filter(
        (prod) => tiendaSeleccionada && prod.tiendaId === tiendaSeleccionada.id
    );

    return (
        <div className="view-container fade-in">
            {!tiendaSeleccionada ? (
                <>
                    <header className="view-header">
                        <div>
                            <h1 className="view-title">Inventario por Sucursal</h1>
                            <p className="view-subtitle">Selecciona una tienda para gestionar sus productos</p>
                        </div>
                    </header>
                    <div className="table-card-wrapper shadow-sm">
                        {SUCURSALES.map((tienda) => (
                            <div key={tienda.id} className="store-item-row" onClick={() => setTiendaSeleccionada(tienda)}>
                                <div className="store-info-flex">
                                    <div className="store-icon-bg"><Store size={20} color="#3b82f6" /></div>
                                    <div>
                                        <p className="store-title-name">{tienda.nombre}</p>
                                        <p className="store-subtitle">Sucursal activa</p>
                                    </div>
                                </div>
                                <div className="action-btns-container">
                                    <span className="text-view-report">Ver Inventario</span>
                                    <ChevronRight size={18} color="#9ca3af" />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <header className="view-header">
                        <div>
                            <button className="btn-back-stores" onClick={() => setTiendaSeleccionada(null)}>
                                <ArrowLeft size={16} /> Volver a sucursales
                            </button>
                            <h1 className="view-title">Productos: {tiendaSeleccionada.nombre}</h1>
                        </div>
                        <button className="btn-primary-blue" onClick={() => setShowModal(true)}>
                            <Plus size={18} /> DAR DE ALTA PRODUCTO
                        </button>
                    </header>

                    <div className="banner-info-blue">
                        <div className="icon-circle"><Info size={18} color="#0038a8" /></div>
                        <p>Mostrando productos registrados exclusivamente en <strong>{tiendaSeleccionada.nombre}</strong>.</p>
                    </div>

                    <div className="table-card-wrapper shadow-sm">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Codigo de Barras</th>
                                    <th>Producto</th>
                                    <th>Categoria</th>
                                    <th>Costo</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.length > 0 ? (
                                    productosFiltrados.map((prod) => (
                                        <tr key={prod.id}>
                                            <td className="text-muted">{prod.id}</td>
                                            <td className="text-dark-bold">{prod.nombre}</td>
                                            <td className="text-muted">{prod.categoria}</td>
                                            <td>${prod.costo.toFixed(2)}</td>
                                            <td>${prod.precio.toFixed(2)}</td>
                                            <td>{prod.stock}</td>
                                            <td>
                                                <span className={`pill-status ${prod.stock <= 10 ? 'low' : 'ok'}`}>
                                                    {prod.stock <= 10 ? 'Stock Bajo' : 'Disponible'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="empty-table-msg">
                                            No hay productos registrados en {tiendaSeleccionada.nombre}.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-box fade-in">
                        <div className="modal-header-section">
                            <h2 className="modal-title-h2">Dar de Alta Producto</h2>
                            <button className="btn-close-x" onClick={() => setShowModal(false)}><X size={22} /></button>
                        </div>
                        <form className="modal-form-grid" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-item">
                                <label>Codigo de Barras *</label>
                                <input type="text" />
                            </div>
                            <div className="form-item">
                                <label>Nombre del Producto *</label>
                                <input type="text" />
                            </div>
                            <div className="modal-actions-footer">
                                <button type="button" className="btn-cancel-flat" onClick={() => setShowModal(false)}>CANCELAR</button>
                                <button type="submit" className="btn-submit-action">DAR DE ALTA</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}