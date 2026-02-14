import React from 'react';
import { X } from 'lucide-react';
import './ModificacionesUsuario.css';

export default function ModificacionesUsuario({ isOpen, onClose, modo, usuario, onConfirm }) {
  if (!isOpen) return null;

  // Renderizado para la vista de ELIMINAR
  if (modo === 'eliminar') {
    return (
      <div className="mod-overlay">
        <div className="mod-container delete-mode fade-in">
          <h2 className="mod-title danger-text">Eliminar Usuario</h2>
          <p className="mod-subtitle">Esta acción no se puede deshacer.</p>
          
          <div className="mod-confirm-message">
            ¿Estás seguro de que deseas eliminar al usuario <br />
            <strong>{usuario?.nombre}</strong>?
          </div>

          <div className="mod-actions">
            <button className="btn-mod-secondary" onClick={onClose}>CANCELAR</button>
            <button className="btn-mod-danger" onClick={() => onConfirm(usuario)}>ELIMINAR</button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado para AGREGAR/EDITAR
  return (
    <div className="mod-overlay">
      <div className="mod-container fade-in">
        <div className="mod-header">
          <div>
            <h2 className="mod-title">
              {modo === 'editar' ? 'Editar Usuario' : 'Agregar Usuario'}
            </h2>
            <p className="mod-subtitle">
              {modo === 'editar' ? 'Actualiza los detalles del usuario.' : 'Ingresa los detalles del nuevo usuario.'}
            </p>
          </div>
          <button className="btn-mod-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form className="mod-form" onSubmit={(e) => { e.preventDefault(); onConfirm(usuario); }}>
          <div className="mod-input-group">
            <label>Nombre</label>
            <input 
              type="text" 
              placeholder="Ingresa el nombre" 
              defaultValue={modo === 'editar' ? usuario?.nombre : ''} 
            />
          </div>

          <div className="mod-input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              defaultValue={modo === 'editar' ? usuario?.correo : ''} 
            />
          </div>

          <div className="mod-input-group">
            <label>Rol</label>
            {/* MODIFICACIÓN: Solo permite Empleado y Cliente */}
            <select className="mod-select" defaultValue={modo === 'editar' ? usuario?.rol : ""}>
              <option value="" disabled>Seleccionar rol</option>
              <option value="Empleado">Dueño</option>
              <option value="Cliente">Empleado</option>
            </select>
          </div>

          <div className="mod-input-group">
            <label>Estado</label>
            <select className="mod-select" defaultValue={modo === 'editar' ? usuario?.estado : "Activo"}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="mod-actions">
            <button type="button" className="btn-mod-secondary" onClick={onClose}>CANCELAR</button>
            <button type="submit" className="btn-mod-primary">
              {modo === 'editar' ? 'GUARDAR CAMBIOS' : 'AGREGAR USUARIO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}