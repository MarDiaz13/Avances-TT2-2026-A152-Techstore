import React, { useState } from 'react';
import { Edit, Trash2, Search } from 'lucide-react';
import ModificacionesProductos from './ModificacionesProductos';
import { PRODUCTOS_DUENO_DATA } from '../../components/ListaProductosDueno';
import './Productos.css';

export default function Productos() {
    const [productos] = useState(PRODUCTOS_DUENO_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });
    const [notificacion, setNotificacion] = useState({ visible: false, texto: '', tipo: '' });

    const mostrarAlerta = (texto, tipo) => {
        setNotificacion({ visible: true, texto, tipo });
        setTimeout(() => setNotificacion({ visible: false, texto: '', tipo: '' }), 3000);
    };

    const abrirModal = (type, data = null) => {
        setModalConfig({ isOpen: true, type, data });
    };

    const cerrarModal = () => {
        setModalConfig({ isOpen: false, type: null, data: null });
        mostrarAlerta("Accion cancelada por el usuario", "info");
    };

    const manejarConfirmacion = (data) => {
        setModalConfig({ isOpen: false, type: null, data: null });
        const texto = modalConfig.type === 'borrar'
            ? "Producto eliminado correctamente"
            : "Producto modificado con exito";
        mostrarAlerta(texto, "success");
    };

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.includes(searchTerm)
    );

    return (
        <div className="productos-container-view">
            {notificacion.visible && (
                <div className={`alerta-flotante-original ${notificacion.tipo}`}>
                    {notificacion.texto}
                </div>
            )}

            <header className="productos-header">
                <div className="header-title-section">
                    <h2 className="title-text">Productos</h2>
                    <p className="subtitle-text">Gestiona la informacion completa de productos</p>
                </div>
            </header>

            <div className="table-wrapper-card">
                <div className="table-controls">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por codigo o nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-scroll">
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Codigo de Barras</th>
                                <th>Producto</th>
                                <th>Categoria</th>
                                <th>Proveedor</th>
                                <th>Costo</th>
                                <th>Precio</th>
                                <th style={{ textAlign: 'center' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((prod) => (
                                <tr key={prod.id}>
                                    <td className="code-text">{prod.id}</td>
                                    <td className="product-name-cell">{prod.nombre}</td>
                                    <td><span className="category-tag">{prod.categoria}</span></td>
                                    <td className="provider-text">{prod.proveedor}</td>
                                    <td className="price-text">${prod.costo.toFixed(2)}</td>
                                    <td className="price-text highlight">${prod.precio.toFixed(2)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon edit" onClick={() => abrirModal('editar', prod)}>
                                                <Edit size={16} color="#3b82f6" />
                                            </button>
                                            <button className="btn-icon delete" onClick={() => abrirModal('borrar', prod)}>
                                                <Trash2 size={16} color="#ef4444" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModificacionesProductos
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                data={modalConfig.data}
                onClose={cerrarModal}
                onConfirm={manejarConfirmacion}
            />
        </div>
    );
}