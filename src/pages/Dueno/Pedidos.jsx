import React, { useState } from 'react';
import { Eye, Globe, ClipboardCheck } from 'lucide-react';
import { VENTAS_DATA_BASE } from '../../components/HistorialVentasDueno';
import './Pedidos.css';

export default function Pedidos() {
    const soloOnline = VENTAS_DATA_BASE.filter(v => v.origen === 'Online');

    const [pedidos, setPedidos] = useState(soloOnline);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [nuevoEstado, setNuevoEstado] = useState("");

    const limpiarTexto = (texto) => {
        if (!texto) return "";
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    };

    const parsearProductos = (str) => {
        if (!str) return [];
        return str.split(',').map(item => {
            const [nombrePart, precioPart] = item.split('=');
            if (!nombrePart) return null;
            const [nombre, cantidad] = nombrePart.split(' x');
            const totalStr = precioPart ? precioPart.trim() : '$0.00';
            const cantNum = cantidad ? parseInt(cantidad.trim()) : 1;
            const totalNum = parseFloat(totalStr.replace('$', ''));

            return {
                nombre: nombre.trim(),
                cantidad: cantNum,
                precioUnit: (totalNum / (cantNum || 1)).toFixed(2),
                total: totalStr
            };
        }).filter(Boolean);
    };

    const abrirDetalle = (v) => {
        const estadoLimpio = limpiarTexto(v.estado);
        const infoPedido = {
            ...v,
            estado: estadoLimpio,
            items: parsearProductos(v.productos)
        };
        setPedidoSeleccionado(infoPedido);
        setNuevoEstado(estadoLimpio);
        setShowModal(true);
    };

    const manejarActualizacion = () => {
        const pedidosActualizados = pedidos.map(p =>
            p.id === pedidoSeleccionado.id ? { ...p, estado: nuevoEstado } : p
        );
        setPedidos(pedidosActualizados);
        setPedidoSeleccionado(prev => ({ ...prev, estado: nuevoEstado }));
        setShowModal(false);
        setShowSuccess(true);
    };

    const getEstadoColor = (estado) => {
        const est = limpiarTexto(estado);
        switch (est) {
            case 'Pendiente': return '#ffc107';
            case 'En Preparacion': return '#00bcd4';
            case 'Listo': return '#673ab7';
            case 'Completado': return '#4caf50';
            case 'Cancelado': return '#f44336';
            default: return '#707eae';
        }
    };

    return (
        <div className="pedidos-view">
            <header className="view-header">
                <h1>Panel de Pedidos Online</h1>
            </header>

            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ORIGEN</th>
                            <th>ID PEDIDO</th>
                            <th>ESTADO ACTUAL</th>
                            <th>TOTAL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((v) => (
                            <tr key={v.id}>
                                <td>
                                    <div className="badge-origen">
                                        <Globe size={14} />
                                        {v.origen}
                                    </div>
                                </td>
                                <td className="id-cell">{v.id}</td>
                                <td>
                                    <span className="badge-status" style={{
                                        backgroundColor: getEstadoColor(v.estado),
                                        color: 'white'
                                    }}>
                                        {limpiarTexto(v.estado)}
                                    </span>
                                </td>
                                <td className="total-cell">${v.total.toFixed(2)} MXN</td>
                                <td>
                                    <button onClick={() => abrirDetalle(v)} className="btn-view-icon">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && pedidoSeleccionado && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <div className="modal-header-main">
                            <h2>Detalle de Pedido {pedidoSeleccionado.id}</h2>
                            <p className="subtitle">Informacion completa del pedido.</p>
                        </div>

                        <div className="mini-cards-row">
                            <div className="mini-card">
                                <label>Cliente</label>
                                <strong>Juan Perez</strong>
                            </div>
                            <div className="mini-card">
                                <label>Estado Actual</label>
                                <span className="badge-status" style={{
                                    backgroundColor: getEstadoColor(pedidoSeleccionado.estado),
                                    color: 'white'
                                }}>
                                    {pedidoSeleccionado.estado}
                                </span>
                            </div>
                            <div className="mini-card">
                                <label>Fecha</label>
                                <strong>{pedidoSeleccionado.fecha.split(' ')[0]}</strong>
                            </div>
                        </div>

                        <div className="client-comments">
                            <p className="comment-title">Comentarios del Cliente:</p>
                            <p className="comment-body">Por favor empacar bien las botanas</p>
                        </div>

                        <div className="products-container">
                            <table className="custom-table" style={{ fontSize: '13px' }}>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th style={{ textAlign: 'center' }}>Cant.</th>
                                        <th style={{ textAlign: 'right' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidoSeleccionado.items.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.nombre}</td>
                                            <td style={{ textAlign: 'center' }}>{item.cantidad}</td>
                                            <td style={{ textAlign: 'right' }}>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mini-card" style={{ marginTop: '20px', background: '#f8faff' }}>
                            <label>Actualizar Estado del Pedido</label>
                            <select
                                className="custom-select"
                                value={nuevoEstado}
                                onChange={(e) => setNuevoEstado(e.target.value)}
                            >
                                <option value="Pendiente">🟡 Pendiente - Pedido recibido</option>
                                <option value="En Preparacion">🔵 En Preparacion - Preparando productos</option>
                                <option value="Listo">🟣 Listo - Listo para entregar</option>
                                <option value="Completado">🟢 Completado - Pedido entregado</option>
                                <option value="Cancelado">🔴 Cancelado - Pedido cancelado</option>
                            </select>
                        </div>

                        <div className="total-box">
                            <span>Total General:</span>
                            <span className="final-price">${pedidoSeleccionado.total.toFixed(2)} MXN</span>
                        </div>

                        <div className="modal-btns">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>CERRAR</button>
                            <button className="btn-save" onClick={manejarActualizacion}>ACTUALIZAR ESTADO</button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="modal-backdrop">
                    <div className="modal-card success-modal">
                        <div className="success-icon-wrapper">
                            <div className="icon-circle-blue">
                                <ClipboardCheck size={48} color="white" />
                            </div>
                        </div>
                        <h2 className="success-title">Informacion Actualizada!</h2>
                        <p className="success-message">
                            El estado del pedido se ha actualizado correctamente en el sistema con exito.
                        </p>
                        <button className="btn-save btn-block" onClick={() => setShowSuccess(false)}>
                            ACEPTAR
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}