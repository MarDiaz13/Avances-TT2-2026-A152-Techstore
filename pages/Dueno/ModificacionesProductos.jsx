/* eslint-disable unicode-bom */
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import './ModificacionesProductos.css';

export default function ModificacionesProductos({ isOpen, type, data, onClose, onConfirm }) {
    const [view, setView] = useState('main');

    if (!isOpen) return null;

    const safePrice = (val) => String(val || "").replace('$', '');

    const handleAction = () => {
        if (type === 'editar') {
            setView('success');
            setTimeout(() => {
                onConfirm(data);
                handleClose();
            }, 2000);
        } else {
            onConfirm(data);
            handleClose();
        }
    };

    const handleClose = () => {
        setView('main');
        onClose();
    };

    return (
        <div className="modal-overlay-final">
            <div className={`modal-card-final ${view !== 'main' || type === 'borrar' ? 'size-msg' : 'size-form'}`}>

                {view === 'main' && type === 'editar' && (
                    <div className="modal-inner">
                        <div className="modal-header-final">
                            <div className="header-info">
                                <h2 className="title-modificar">Modificar Producto</h2>
                                <p className="subtitle-gray">Completa los campos para modificar este producto.</p>
                            </div>
                            <button className="close-btn-final" onClick={() => setView('cancelAlert')}><X size={20} /></button>
                        </div>
                        <div className="modal-grid-final">
                            <div className="field-group">
                                <label>Codigo de Barras EAN-13 *</label>
                                <input type="text" defaultValue={data?.id} />
                            </div>
                            <div className="field-group">
                                <label>Nombre del Producto *</label>
                                <input type="text" defaultValue={data?.nombre} />
                            </div>
                            <div className="field-group">
                                <label>Categoria *</label>
                                <select defaultValue={data?.categoria || ""}>
                                    <option value="Bebidas">Bebidas</option>
                                    <option value="Botanas">Botanas</option>
                                    <option value="Panaderia">Panaderia</option>
                                    <option value="Lacteos">Lacteos</option>
                                </select>
                            </div>
                            <div className="field-group">
                                <label>Imagen del Producto *</label>
                                <div className="file-box-final">
                                    <label className="label-file"><Upload size={16} /> Seleccionar archivo</label>
                                </div>
                            </div>
                            <div className="field-group">
                                <label>Costo Unitario *</label>
                                <input type="number" defaultValue={data?.costo} />
                            </div>
                            <div className="field-group">
                                <label>Precio de Venta *</label>
                                <input type="number" defaultValue={safePrice(data?.precio)} />
                            </div>
                            <div className="field-group">
                                <label>Stock Inicial *</label>
                                <input type="number" defaultValue={data?.stock} />
                            </div>
                            <div className="field-group">
                                <label>Alerta de Stock Bajo *</label>
                                <input type="number" defaultValue="10" />
                            </div>
                            <div className="field-group full-width">
                                <label>Descripcion</label>
                                <textarea rows="3" defaultValue={data?.descripcion}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer-final">
                            <span className="req-text">* Campos obligatorios</span>
                            <div className="btns-row">
                                <button className="btn-cancel-final" onClick={() => setView('cancelAlert')}>CANCELAR</button>
                                <button className="btn-save-final" onClick={handleAction}>GUARDAR CAMBIOS</button>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'main' && type === 'borrar' && (
                    <div className="msg-view-centered">
                        <h2 className="title-red">Eliminar Producto</h2>
                        <p className="text-main">¿Deseas eliminar <strong>{data?.nombre}</strong>?</p>
                        <p className="text-sub">Esta acción no se puede deshacer.</p>
                        <div className="btns-row-centered">
                            <button className="btn-cancel-final" onClick={handleClose}>CANCELAR</button>
                            <button className="btn-save-final red-bg" onClick={handleAction}>SI, ELIMINAR</button>
                        </div>
                    </div>
                )}

                {view === 'success' && (
                    <div className="msg-view-centered">
                        <h2 className="title-blue">¡Éxito!</h2>
                        <p className="text-main">El producto se modificó correctamente.</p>
                        <p className="text-sub">Los cambios ya están reflejados en el inventario.</p>
                    </div>
                )}

                {view === 'cancelAlert' && (
                    <div className="msg-view-centered">
                        <h2 className="title-orange">Cancelar Acción</h2>
                        <p className="text-main">¿Estás seguro de que deseas salir?</p>
                        <p className="text-sub">Los cambios realizados no se guardarán.</p>
                        <div className="btns-row-centered">
                            <button className="btn-cancel-final" onClick={() => setView('main')}>NO, VOLVER</button>
                            <button className="btn-save-final orange-bg" onClick={handleClose}>SÍ, CANCELAR</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}