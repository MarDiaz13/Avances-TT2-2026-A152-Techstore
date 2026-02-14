import React, { useState, useEffect } from 'react';
import { Store, Save, Trash2, X, AlertCircle } from 'lucide-react';
// CORRECCIÓN DE RUTA: Importación local
import './GestionSucursales.css'; 

export default function GestionSucursales({ isOpen, type, data, onClose, onConfirm }) {
  const [formData, setFormData] = useState({ nombre: '', ubicación: '' });

  useEffect(() => {
    if (data) {
      setFormData({ nombre: data.nombre, ubicación: data.ubicación || '' });
    } else {
      setFormData({ nombre: '', ubicación: '' });
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const isDelete = type === 'borrar';

  return (
    <div className="modal-gestion-overlay">
      <div className="modal-gestion-content">
        <div className={`modal-gestion-header ${isDelete ? 'header-borrar' : ''}`}>
          <h2>
            {isDelete ? <AlertCircle size={22} /> : <Store size={22} />}
            {type === 'agregar' && 'Nueva Sucursal'}
            {type === 'editar' && 'Editar Sucursal'}
            {type === 'borrar' && 'Eliminar Sucursal'}
          </h2>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!isDelete ? (
            <>
              <div className="form-group">
                <label>Nombre de la Sucursal</label>
                <input 
                  type="text" 
                  placeholder="Ej. Sucursal Centro"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ubicación / Colonia</label>
                <input 
                  type="text" 
                  placeholder="Ej. Col. Centro, CDMX"
                  value={formData.ubicación}
                  onChange={(e) => setFormData({...formData, ubicación: e.target.value})}
                />
              </div>
            </>
          ) : (
            <p className="delete-text">
              ¿Estás seguro de que deseas eliminar la sucursal <strong>{formData.nombre}</strong>? 
              Esta acción no se puede deshacer.
            </p>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button 
            className={`btn-confirmar ${isDelete ? 'btn-borrar' : ''}`}
            onClick={() => onConfirm(formData)}
          >
            {isDelete ? <Trash2 size={16} /> : <Save size={16} />}
            {isDelete ? 'Eliminar' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}