import React, { useState, useEffect, useCallback } from 'react';
import { X, Trash2, Plus, Minus, Barcode, ChevronDown, CheckCircle, Camera, StopCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { DATA_PRODUCTOS_INICIAL } from '../../components/ListaProductos';
import './RegistrarVenta.css';

export default function RegistrarVenta({ isOpen, onClose }) {
    const [carrito, setCarrito] = useState([]);
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [ventaExitosa, setVentaExitosa] = useState(false);
    const [ultimoTotal, setUltimoTotal] = useState(0);
    const [escaneando, setEscaneando] = useState(false);

    const agregarAlCarrito = useCallback((id) => {
        const producto = DATA_PRODUCTOS_INICIAL.find(p => p.id.toString() === id.toString());

        if (!producto) {
            console.warn("Producto no encontrado con ID:", id);
            return;
        }

        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find(item => item.id === producto.id);
            if (existe) {
                return prevCarrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
        setProductoSeleccionado('');
    }, []);

    useEffect(() => {
        let scanner = null;
        if (escaneando && isOpen) {
            scanner = new Html5QrcodeScanner('reader', {
                fps: 10,
                qrbox: { width: 250, height: 150 },
            });

            scanner.render((decodedText) => {
                agregarAlCarrito(decodedText);
                setEscaneando(false);
                scanner.clear().catch((error) => console.error("Error al limpiar scanner:", error));
            }, (error) => {
            });
        }
        return () => {
            if (scanner) {
                scanner.clear().catch(() => { });
            }
        };
    }, [escaneando, isOpen, agregarAlCarrito]);

    const handleAgregarPorCodigo = () => {
        if (codigoBarras) {
            agregarAlCarrito(codigoBarras);
            setCodigoBarras('');
        }
    };

    const actualizarCantidad = (id, delta) => {
        setCarrito(carrito.map(item => {
            if (item.id === id) {
                const nuevaCant = Math.max(1, item.cantidad + delta);
                return { ...item, cantidad: nuevaCant };
            }
            return item;
        }));
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const finalizarVenta = () => {
        if (carrito.length === 0) return;
        setUltimoTotal(subtotal);
        setVentaExitosa(true);
        setCarrito([]);
        setTimeout(() => {
            setVentaExitosa(false);
            onClose();
        }, 2500);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-registro-content">
                {ventaExitosa && (
                    <div className="pantalla-exito-total">
                        <div className="contenido-exito-central">
                            <CheckCircle size={80} color="#22c55e" />
                            <h2>¡Venta Completada!</h2>
                            <p className="total-exito">Total: <strong>${ultimoTotal.toFixed(2)}</strong></p>
                            <p className="metodo-exito">Pago con: {metodoPago}</p>
                        </div>
                    </div>
                )}

                <header className="modal-registro-header">
                    <h2 className="modal-registro-title">Registrar Nueva Venta</h2>
                    <button className="btn-close-modal" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="registro-body">
                    <div className="registro-left-column">
                        <div className="registro-card">
                            <p className="label-registro">
                                <Barcode size={14} style={{ marginRight: '8px' }} />
                                Escanear Código
                            </p>
                            <div className="input-action-row">
                                <input
                                    type="text"
                                    className="input-barcode"
                                    placeholder="ID o Código"
                                    value={codigoBarras}
                                    onChange={(e) => setCodigoBarras(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAgregarPorCodigo()}
                                />
                                <button className="btn-add-blue" onClick={handleAgregarPorCodigo}>
                                    AGREGAR
                                </button>
                            </div>

                            <button
                                className={`btn-camera ${escaneando ? 'active' : ''}`}
                                onClick={() => setEscaneando(!escaneando)}
                            >
                                {escaneando ? <StopCircle size={16} /> : <Camera size={16} />}
                                {escaneando ? 'DETENER CÁMARA' : 'ACTIVAR CÁMARA'}
                            </button>

                            {escaneando && <div id="reader" className="scanner-container"></div>}
                        </div>

                        <div className="registro-card">
                            <p className="label-registro">Selección Manual</p>
                            <div className="select-wrapper">
                                <select
                                    className="select-registro"
                                    value={productoSeleccionado}
                                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                                >
                                    <option value="">Seleccionar producto</option>
                                    {DATA_PRODUCTOS_INICIAL.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.nombre} - ${p.precio.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="icon-select" size={16} />
                            </div>
                            <button
                                className="btn-add-green"
                                style={{ width: '100%', marginTop: '15px' }}
                                onClick={() => productoSeleccionado && agregarAlCarrito(productoSeleccionado)}
                            >
                                AGREGAR AL CARRITO
                            </button>
                        </div>
                    </div>

                    <div className="cart-panel">
                        <h3 className="cart-title">Carrito de Venta</h3>
                        <div className="cart-content">
                            {carrito.length === 0 ? (
                                <div className="no-products">No hay productos en el carrito</div>
                            ) : (
                                carrito.map(item => (
                                    <div key={item.id} className="cart-item-row-v2">
                                        <div className="cart-item-main-info">
                                            <span className="item-name-cart">{item.nombre}</span>
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>
                                                ${item.precio.toFixed(2)} c/u
                                            </span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="item-qty-control">
                                                <button onClick={() => actualizarCantidad(item.id, -1)}><Minus size={14} /></button>
                                                <span className="qty-number">{item.cantidad}</span>
                                                <button onClick={() => actualizarCantidad(item.id, 1)}><Plus size={14} /></button>
                                            </div>
                                            <span className="item-price-display">${(item.precio * item.cantidad).toFixed(2)}</span>
                                            <button className="btn-delete-item" onClick={() => eliminarDelCarrito(item.id)}>
                                                <Trash2 size={16} color="#ef4444" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="cart-footer">
                            <p className="label-registro">Método de Pago</p>
                            <div className="select-wrapper" style={{ marginBottom: '15px' }}>
                                <select
                                    className="select-registro-small"
                                    value={metodoPago}
                                    onChange={(e) => setMetodoPago(e.target.value)}
                                >
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                </select>
                                <ChevronDown className="icon-select" size={16} />
                            </div>
                            <div className="total-summary-row">
                                <span style={{ fontWeight: '600', color: '#64748b' }}>Total:</span>
                                <span className="total-amount-blue">${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                className="btn-complete-sale"
                                onClick={finalizarVenta}
                                disabled={carrito.length === 0}
                            >
                                COMPLETAR VENTA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}