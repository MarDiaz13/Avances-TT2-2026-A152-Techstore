import React, { useState } from 'react';
import { Eye, Store, Globe } from 'lucide-react';
import { VENTAS_DATA_BASE } from '../../components/HistorialVentasDueno';
import './Pedidos.css';

export default function Pedidos() {
    const [pedidos, setPedidos] = useState(VENTAS_DATA_BASE);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [nuevoEstado, setNuevoEstado] = useState("");

    const parsearProductos = (str) => {
        return str.split(',').map(item => {
            const [nombrePart, precioPart] = item.split('=');
            const [nombre, cantidad] = nombrePart.split(' x');
            return {
                nombre: nombre.trim(),
                cantidad: cantidad ? cantidad.trim() : '1',
                total: precioPart ? precioPart.trim() : '$0.00'
            };
        });
    };

    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'En Preparación': return { backgroundColor: '#e0f7fa', color: '#00acc1' };
            case 'Listo': return { backgroundColor: '#f3e8ff', color: '#7c3aed' };
            case 'Completado': return { backgroundColor: '#dcfce7', color: '#16a34a' };
            case 'Cancelado': return { backgroundColor: '#fee2e2', color: '#ef4444' };
            default: return { backgroundColor: '#fef3c7', color: '#d97706' };
        }
    };

    const abrirDetalle = (p) => {
        setPedidoSeleccionado({ ...p, items: parsearProductos(p.productos) });
        setNuevoEstado(p.estado);
        setShowModal(true);
    };

    const actualizar = () => {
        setPedidos(pedidos.map(p => p.id === pedidoSeleccionado.id ? { ...p, estado: nuevoEstado } : p));
        setShowModal(false);
    };

    return (
        <div className="pedidos-container">
            <header className="pedidos-header">
                <h1>Panel de Ventas</h1>
            </header>

            <div className="table-container">
                <table className="pedidos-table">
                    <thead>
                        <tr>
                            <th>ORIGEN</th>
                            <th>ID</th>
                            <th>ESTADO</th>
                            <th>TOTAL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((v) => (
                            <tr key={v.id}>
                                <td>
                                    <span className={`origin-badge origin-${v.origen.toLowerCase()}`}>
                                        {v.origen === 'Tienda' ? <Store size={12} /> : <Globe size={12} />}
                                        {v.origen}
                                    </span>
                                </td>
                                <td style={{ fontWeight: '700' }}>{v.id}</td>
                                <td>
                                    <span className="status-badge" style={getEstadoStyle(v.estado)}>{v.estado}</span>
                                </td>
                                <td style={{ fontWeight: '800' }}>${v.total.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => abrirDetalle(v)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Eye size={20} color="#64748b" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Detalle de Venta</h2>
                            <span className={`origin-badge origin-${pedidoSeleccionado.origen.toLowerCase()}`}>{pedidoSeleccionado.origen}</span>
                        </div>

                        <div className="info-grid">
                            <div className="info-box"><span style={{ fontSize: '10px', color: '#94a3b8' }}>PAGO</span><p style={{ margin: '4px 0', fontSize: '13px', fontWeight: '700' }}>{pedidoSeleccionado.metodo}</p></div>
                            <div className="info-box"><span style={{ fontSize: '10px', color: '#94a3b8' }}>FECHA</span><p style={{ margin: '4px 0', fontSize: '13px', fontWeight: '700' }}>{pedidoSeleccionado.fecha.split(' ')[0]}</p></div>
                            <div className="info-box"><span style={{ fontSize: '10px', color: '#94a3b8' }}>TIPO</span><p style={{ margin: '4px 0', fontSize: '13px', fontWeight: '700' }}>{pedidoSeleccionado.tipo}</p></div>
                        </div>

                        {pedidoSeleccionado.origen === 'Online' && (
                            <div className="comment-box">
                                <p style={{ color: '#3b82f6', fontWeight: '800', fontSize: '13px', margin: '0 0 5px 0' }}>Comentarios:</p>
                                <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Empacar para envío nacional.</p>
                            </div>
                        )}

                        <div style={{ margin: '20px 0' }}>
                            {pedidoSeleccionado.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                                    <span>{item.nombre} <b>x{item.cantidad}</b></span>
                                    <span style={{ fontWeight: '700' }}>{item.total}</span>
                                </div>
                            ))}
                        </div>

                        <select className="status-select" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)} disabled={pedidoSeleccionado.origen === 'Tienda'}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Preparación">En Preparación</option>
                            <option value="Listo">Listo</option>
                            <option value="Completado">Completado</option>
                        </select>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                            <span style={{ fontWeight: '800', fontSize: '18px' }}>Total: ${pedidoSeleccionado.total.toFixed(2)}</span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-secondary" onClick={() => setShowModal(false)}>CERRAR</button>
                                {pedidoSeleccionado.origen === 'Online' && <button className="btn-primary" onClick={actualizar}>GUARDAR</button>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}