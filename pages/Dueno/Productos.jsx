import React from 'react';
import './ModificacionesProductos.css';

export default function ModificacionesProductos({ isOpen, type, data, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-original">
            <div className={`modal-content-original ${type === 'borrar' ? 'modal-delete' : 'modal-form'}`}>
                {type === 'editar' ? (
                    <div className="form-container-original">
                        <div className="form-grid-original">
                            <div className="form-group-original">
                                <label>Codigo de Barras EAN-13 *</label>
                                <input type="text" defaultValue={data?.codigo} />
                            </div>
                            <div className="form-group-original">
                                <label>Nombre del Producto *</label>
                                <input type="text" defaultValue={data?.nombre} placeholder="Ej. Coca-Cola 600ml" />
                            </div>
                            <div className="form-group-original">
                                <label>Categoria *</label>
                                <select defaultValue={data?.cat || ""}>
                                    <option value="" disabled>Seleccionar</option>
                                    <option value="Bebidas">Bebidas</option>
                                    <option value="Botanas">Botanas</option>
                                    <option value="Panaderia">Panaderia</option>
                                    <option value="Lacteos">Lacteos</option>
                                </select>
                            </div>
                            <div className="form-group-original">
                                <label>Imagen del Producto *</label>
                                <div className="file-input-wrapper">
                                    <input type="file" id="file-upload" />
                                    <label htmlFor="file-upload" className="file-label-btn">Seleccionar archivo</label>
                                    <span>Sin archi...ccionados</span>
                                </div>
                            </div>
                            <div className="form-group-original">
                                <label>Costo Unitario *</label>
                                <input type="number" defaultValue="0.00" />
                            </div>
                            <div className="form-group-original">
                                <label>Precio de Venta *</label>
                                <input type="number" defaultValue={data?.precio?.replace('$', '') || "0.00"} />
                            </div>
                            <div className="form-group-original">
                                <label>Stock Inicial *</label>
                                <input type="number" defaultValue={data?.stock || "0"} />
                            </div>
                            <div className="form-group-original">
                                <label>Alerta de Stock Bajo *</label>
                                <input type="number" defaultValue="10" />
                            </div>
                        </div>
                        <div className="form-group-original full-width">
                            <label>Descripcion</label>
                            <textarea placeholder="Breve descripcion del producto..." rows="4"></textarea>
                        </div>
                        <div className="modal-actions-original">
                            <button className="btn-cancel-white" onClick={onClose}>CANCELAR</button>
                            <button className="btn-submit-blue" onClick={() => onConfirm(data)}>GUARDAR CAMBIOS</button>
                        </div>
                    </div>
                ) : (
                    <div className="delete-container-original">
                        <h2 className="delete-title-red">Eliminar Producto</h2>
                        <p className="delete-main-text">
                            Estas seguro de que deseas eliminar el producto <br />
                            <strong>{data?.nombre}</strong>?
                        </p>
                        <p className="delete-sub-text">
                            Esta accion no se puede deshacer. Se eliminara permanentemente del inventario.
                        </p>
                        <div className="modal-actions-original centered">
                            <button className="btn-cancel-white" onClick={onClose}>CANCELAR</button>
                            <button className="btn-delete-red" onClick={() => onConfirm(data)}>SI, ELIMINAR</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}