import React, { useState } from 'react';
import { Plus, QrCode, ReceiptText } from 'lucide-react';
import HistorialVentas from '../../components/HistorialVentas';
import VerQR from './VerQR';
import CorteCaja from './CorteCaja';
import RegistrarVenta from './RegistrarVenta';
import './Ventas.css';

export default function Ventas() {
    const [isQrOpen, setIsQrOpen] = useState(false);
    const [isCorteOpen, setIsCorteOpen] = useState(false);
    const [isRegistrarOpen, setIsRegistrarOpen] = useState(false);

    return (
        <div className="ventas-container">
            <header className="header-page-row">
                <div>
                    <h2 className="page-title">Ventas</h2>
                    <p className="page-subtitle">Gestiona ventas, cortes de caja y QR</p>
                </div>
                <div className="action-btns-ventas">
                    <button className="btn-blue-icon" onClick={() => setIsQrOpen(true)}>
                        <QrCode size={18} /> VER QR
                    </button>
                    <button className="btn-orange-icon" onClick={() => setIsCorteOpen(true)}>
                        <ReceiptText size={18} /> CORTE DE CAJA
                    </button>
                    <button className="btn-purple-icon" onClick={() => setIsRegistrarOpen(true)}>
                        <Plus size={18} /> REGISTRAR VENTA
                    </button>
                </div>
            </header>

            <div className="stats-grid-ventas">
                <div className="stat-card-white">
                    <p className="stat-label">Total de Ventas Hoy</p>
                    <h3 className="stat-main-value">$501.00</h3>
                </div>
                <div className="stat-card-white">
                    <p className="stat-label">Numero de Ventas</p>
                    <h3 className="stat-main-value">6</h3>
                </div>
                <div className="stat-card-white">
                    <p className="stat-label">Ticket Promedio</p>
                    <h3 className="stat-main-value">$83.50</h3>
                </div>
            </div>

            <HistorialVentas />

            <VerQR isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
            <CorteCaja isOpen={isCorteOpen} onClose={() => setIsCorteOpen(false)} />
            <RegistrarVenta isOpen={isRegistrarOpen} onClose={() => setIsRegistrarOpen(false)} />
        </div>
    );
}