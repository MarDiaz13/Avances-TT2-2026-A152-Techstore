import React, { useState, useEffect, useRef } from 'react';
import { X, CloudUpload } from 'lucide-react';
import { informacionQR } from '../../components/informacionQR';
import './EditarQR.css';

export default function EditarQR({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ ...informacionQR });
    const [previewImage, setPreviewImage] = useState(informacionQR.qrImagen);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setFormData({ ...informacionQR });
            setPreviewImage(informacionQR.qrImagen);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const handleSave = () => {
        informacionQR.banco = formData.banco;
        informacionQR.titular = formData.titular;
        informacionQR.tarjeta = formData.tarjeta;
        informacionQR.cuenta = formData.cuenta;
        informacionQR.clabe = formData.clabe;
        informacionQR.qrImagen = previewImage;
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-edit-content">
                <header className="modal-edit-header">
                    <h2 className="modal-edit-title">Editar Informacion de QR</h2>
                    <button className="btn-close-modal" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="edit-form-body">
                    <div className="input-group">
                        <label>Imagen del QR</label>
                        <div className="upload-zone-minimal" onClick={() => fileInputRef.current.click()}>
                            {previewImage ? (
                                <div className="preview-mini">
                                    <img src={previewImage} alt="QR Preview" />
                                    <div className="overlay-mini"><CloudUpload size={16} /></div>
                                </div>
                            ) : (
                                <div className="placeholder-mini">
                                    <CloudUpload size={20} />
                                    <span>Haz clic para subir imagen</span>
                                </div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                    </div>

                    <div className="input-group">
                        <label>Banco</label>
                        <input type="text" name="banco" value={formData.banco} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label>Titular</label>
                        <input type="text" name="titular" value={formData.titular} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label>Tarjeta</label>
                        <input type="text" name="tarjeta" value={formData.tarjeta} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label>Numero de Cuenta</label>
                        <input type="text" name="cuenta" value={formData.cuenta} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label>CLABE Interbancaria</label>
                        <input type="text" name="clabe" value={formData.clabe} onChange={handleChange} />
                    </div>
                </div>

                <footer className="modal-edit-footer">
                    <button className="btn-cancel" onClick={onClose}>CANCELAR</button>
                    <button className="btn-save" onClick={handleSave}>GUARDAR CAMBIOS</button>
                </footer>
            </div>
        </div>
    );
}