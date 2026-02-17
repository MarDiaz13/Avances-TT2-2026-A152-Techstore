import React, { useState, useRef } from 'react';
import { Plus, Info, X, Store, ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle, Upload } from 'lucide-react';
import { PRODUCTOS_DATA } from '../../components/ListaProductos';
import { SUCURSALES } from '../../components/datosTienda';
import './Productos.css';

export default function Productos() {
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    const [nombreImagen, setNombreImagen] = useState('');
    const fileInputRef = useRef(null);

    const productosFiltrados = PRODUCTOS_DATA.filter(
        (prod) => tiendaSeleccionada && Number(prod.tiendaId) === Number(tiendaSeleccionada.id)
    );

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNombreImagen(e.target.files[0].name);
        }
    };

    const handleAlta = (e) => {
        e.preventDefault();
        setStatusMessage('success');
        setTimeout(() => {
            setStatusMessage(null);
            setShowModal(false);
            setNombreImagen('');
        }, 2000);
    };

    const handleClose = () => {
        setShowModal(false);
        setStatusMessage(null);
        setNombreImagen('');
    };

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
                                        <p className="store-subtitle">Gestion de inventario activa</p>
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
                                {productosFiltrados.map((prod) => (
                                    <tr key={prod.id}>
                                        <td className="text-muted">{prod.id}</td>
                                        <td className="text-bold">{prod.nombre}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-box fade-in" style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                        {statusMessage === 'confirm' ? (
                            <div className="fade-in" style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                                <AlertTriangle size={80} color="#f59e0b" style={{ marginBottom: '20px' }} />
                                <h2 style={{ color: '#92400e', marginBottom: '10px', fontSize: '1.8rem' }}>Atencion</h2>
                                <p style={{ color: '#78350f', marginBottom: '30px', fontSize: '1.1rem' }}>Esta seguro de que quiere cancelar el proceso?</p>
                                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                    <button onClick={handleClose} style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>SI, CANCELAR</button>
                                    <button onClick={() => setStatusMessage(null)} style={{ backgroundColor: 'white', border: '2px solid #f59e0b', color: '#f59e0b', padding: '12px 40px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>NO, VOLVER</button>
                                </div>
                            </div>
                        ) : statusMessage === 'success' ? (
                            <div className="fade-in" style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
                                <CheckCircle2 size={80} color="#10b981" style={{ marginBottom: '20px' }} />
                                <h2 style={{ color: '#064e3b', marginBottom: '10px', fontSize: '1.8rem' }}>Exito</h2>
                                <p style={{ color: '#065f46', fontSize: '1.1rem' }}>El producto se dio de alta correctamente</p>
                            </div>
                        ) : (
                            <div style={{ padding: '25px' }}>
                                <div className="modal-header-section">
                                    <div>
                                        <h2 className="modal-title-h2">Dar de Alta Producto</h2>
                                        <p className="modal-subtitle-p">Completa los campos para dar de alta un nuevo producto.</p>
                                    </div>
                                    <button className="btn-close-x" onClick={() => setStatusMessage('confirm')}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <form className="modal-form-grid" onSubmit={handleAlta}>
                                    <div className="form-item">
                                        <label>Codigo de Barras EAN-13 *</label>
                                        <input type="text" placeholder="7501055300013" required />
                                    </div>
                                    <div className="form-item">
                                        <label>Nombre del Producto *</label>
                                        <input type="text" placeholder="Coca-Cola 600ml" required />
                                    </div>

                                    <div className="form-item">
                                        <label>Categoria *</label>
                                        <select defaultValue="" required>
                                            <option value="" disabled>Seleccionar</option>
                                            <option>Bebidas</option>
                                            <option>Botanas</option>
                                            <option>Panaderia</option>
                                            <option>Lacteos</option>
                                            <option>Galletas</option>
                                            <option>Dulces</option>
                                        </select>
                                    </div>

                                    <div className="form-item">
                                        <label>Imagen del Producto *</label>
                                        <div
                                            className="custom-file-upload"
                                            onClick={() => fileInputRef.current.click()}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '6px', backgroundColor: '#f9fafb' }}
                                        >
                                            <Upload size={16} color="#6b7280" />
                                            <span style={{ color: nombreImagen ? '#111827' : '#9ca3af', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {nombreImagen || 'Seleccionar archivo'}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />
                                    </div>

                                    <div className="form-item">
                                        <label>Costo Unitario *</label>
                                        <input type="number" step="0.01" min="0" placeholder="10.00" required />
                                    </div>
                                    <div className="form-item">
                                        <label>Precio de Venta *</label>
                                        <input type="number" step="0.01" min="0" placeholder="15.00" required />
                                    </div>

                                    <div className="form-item">
                                        <label>Stock Inicial *</label>
                                        <input type="number" min="0" placeholder="50" required />
                                    </div>
                                    <div className="form-item">
                                        <label>Alerta de Stock Bajo *</label>
                                        <input type="number" min="0" placeholder="10" required />
                                    </div>

                                    <div className="form-item full-row">
                                        <label>Descripcion</label>
                                        <textarea placeholder="Descripcion del producto..." rows="3"></textarea>
                                    </div>

                                    <div className="modal-actions-footer">
                                        <span style={{ flex: 1, fontSize: '12px', color: '#6b7280' }}>* Campos obligatorios</span>
                                        <button type="button" className="btn-cancel-flat" onClick={() => setStatusMessage('confirm')}>CANCELAR</button>
                                        <button type="submit" className="btn-submit-action">DAR DE ALTA</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}