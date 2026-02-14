import React, { useState } from 'react';
import { X, ShoppingCart, DollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';
import './CorteCaja.css';

export default function CorteCaja({ isOpen, onClose }) {
    const [registrado, setRegistrado] = useState(false);

    if (!isOpen) return null;

    const totalVentas = 6;
    const montoTotal = 501.00;

    const handleGenerarCorte = () => {
        // En lugar de alert(), cambiamos el estado para mostrar el éxito visual
        setRegistrado(true);
    };

    const handleFinalizar = () => {
        setRegistrado(false);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-corte-white">
                {!registrado ? (
                    <>
                        <header className="corte-header-simple">
                            <div className="header-icon-orange">
                                <TrendingUp size={20} />
                            </div>
                            <div className="header-titles">
                                <h2>Corte de Caja</h2>
                                <p>Resumen de operaciones del día</p>
                            </div>
                            <button className="btn-close-gray" onClick={onClose}>
                                <X size={18} />
                            </button>
                        </header>

                        <div className="corte-content-box">
                            <div className="stat-row-v3">
                                <div className="stat-icon-v3 blue-bg">
                                    <ShoppingCart size={18} />
                                </div>
                                <div className="stat-info-v3">
                                    <span>VENTAS TOTALES</span>
                                    <strong>{totalVentas} productos</strong>
                                </div>
                            </div>

                            <div className="stat-row-v3">
                                <div className="stat-icon-v3 green-bg">
                                    <DollarSign size={18} />
                                </div>
                                <div className="stat-info-v3">
                                    <span>INGRESO TOTAL</span>
                                    <strong className="total-price-v3">${montoTotal.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="corte-footer-alert">
                            <TrendingUp size={14} />
                            <span>Este proceso cerrará el turno actual y reiniciará el contador diario.</span>
                        </div>

                        <footer className="corte-actions-v3">
                            <button className="btn-v3-cancel" onClick={onClose}>
                                DESCARTAR
                            </button>
                            <button className="btn-v3-confirm" onClick={handleGenerarCorte}>
                                GENERAR REPORTE
                            </button>
                        </footer>
                    </>
                ) : (
                    <div className="success-container-v3">
                        <div className="success-icon-wrapper">
                            <CheckCircle2 size={60} color="#22c55e" strokeWidth={1.5} />
                        </div>
                        <h3>¡Reporte Generado!</h3>
                        <p>El resumen de operaciones ha sido guardado exitosamente en la base de datos.</p>
                        <button className="btn-v3-confirm full-width" onClick={handleFinalizar}>
                            ENTENDIDO
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}