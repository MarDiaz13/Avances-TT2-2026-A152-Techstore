import React, { useState } from 'react';
import { X, Edit3, QrCode } from 'lucide-react';
import { informacionQR } from '../../components/informacionQR';
import EditarQR from './EditarQR';
import './VerQR.css';

export default function VerQR({ isOpen, onClose }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-qr-content">
                    <header className="modal-qr-header">
                        <h2 className="modal-qr-title">QR para Transferencias</h2>
                        <div className="header-actions">
                            <button className="btn-edit-qr" onClick={() => setIsEditOpen(true)}>
                                <Edit3 size={16} /> Editar
                            </button>
                            <button className="btn-close-modal" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>
                    </header>

                    <div className="qr-container-main">
                        <div className="qr-box">
                            {informacionQR.qrImagen ? (
                                <img
                                    src={informacionQR.qrImagen}
                                    alt="QR Bancario"
                                    className="qr-img-display"
                                />
                            ) : (
                                <QrCode size={180} color="#64748b" strokeWidth={1.5} />
                            )}
                        </div>
                    </div>

                    <div className="bank-details-card">
                        <div className="detail-row">
                            <span className="detail-label">Banco:</span>
                            <span className="detail-value">{informacionQR.banco}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Titular:</span>
                            <span className="detail-value">{informacionQR.titular}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Tarjeta:</span>
                            <span className="detail-value">{informacionQR.tarjeta}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Cuenta:</span>
                            <span className="detail-value">{informacionQR.cuenta}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">CLABE:</span>
                            <span className="detail-value">{informacionQR.clabe}</span>
                        </div>
                    </div>
                </div>
            </div>

            <EditarQR
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
}