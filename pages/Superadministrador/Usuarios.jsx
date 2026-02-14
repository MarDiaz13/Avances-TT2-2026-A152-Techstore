import React, { useState } from 'react';
import { 
  UserPlus, Edit, Trash2, Store, ArrowLeft, ChevronRight 
} from 'lucide-react';
import ModificacionesUsuario from './ModificacionesUsuario';
import './Usuarios.css';

// IMPORTACIÓN DIRECTA DESDE TU ARCHIVO CENTRAL
import { SUCURSALES, USUARIOS_REGISTRADOS } from '../../components/datosTienda';

export default function Usuarios() {
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [modalConfig, setModalConfig] = useState({ 
    show: false, 
    modo: 'agregar', 
    usuario: null 
  });

  const abrirModal = (modo, usuario = null) => {
    setModalConfig({ show: true, modo, usuario });
  };

  const cerrarModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  // Filtrado dinámico de la "Base de Datos" de datosTienda
  const usuariosFiltrados = USUARIOS_REGISTRADOS.filter(
    (u) => u.tiendaId === tiendaSeleccionada?.id
  );

  return (
    <div className="usuarios-view-wrapper fade-in">
      <div className="usuarios-content-area">
        {!tiendaSeleccionada ? (
          /* VISTA A: SELECCIÓN DE SUCURSAL */
          <>
            <header className="header-actions">
              <div>
                <h1 className="main-title">Usuarios por Sucursal</h1>
                <p className="main-subtitle">Selecciona una tienda para gestionar sus usuarios</p>
              </div>
            </header>

            <div className="table-white-card">
              <div className="store-list-container">
                {SUCURSALES.map((tienda) => (
                  <div 
                    key={tienda.id} 
                    className="store-item-row" 
                    onClick={() => setTiendaSeleccionada(tienda)}
                  >
                    <div className="store-info-flex">
                      <div className="store-icon-bg"><Store size={20} color="#007bff" /></div>
                      <div>
                        <p className="store-title-name">{tienda.nombre}</p>
                        <p className="store-subtitle">{tienda.ubicación}</p>
                      </div>
                    </div>
                    <div className="action-btns-container">
                      <span className="text-view-users">Ver Usuarios</span>
                      <ChevronRight size={18} color="#9ca3af" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* VISTA B: TABLA DE USUARIOS */
          <>
            <header className="header-actions">
              <div>
                <button className="btn-back-stores" onClick={() => setTiendaSeleccionada(null)}>
                  <ArrowLeft size={16} /> Volver a sucursales
                </button>
                <h1 className="main-title">Usuarios: {tiendaSeleccionada.nombre}</h1>
                <p className="main-subtitle">Personal asignado a {tiendaSeleccionada.ubicación}</p>
              </div>
              <button className="btn-primary-add" onClick={() => abrirModal('agregar')}>
                <UserPlus size={18} /> Agregar Usuario
              </button>
            </header>

            <div className="table-white-card">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((u) => (
                      <tr key={u.id}>
                        <td className="font-semibold">{u.nombre}</td>
                        <td className="text-gray">{u.correo}</td>
                        <td><span className={`badge-rol ${u.rol.toLowerCase()}`}>{u.rol}</span></td>
                        <td><span className={`badge-status ${u.estado.toLowerCase()}`}>{u.estado}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="action-icons">
                            <button className="icon-edit" onClick={() => abrirModal('editar', u)}><Edit size={16} /></button>
                            <button className="icon-delete" onClick={() => abrirModal('eliminar', u)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                        No hay usuarios registrados en esta sucursal.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <ModificacionesUsuario 
        isOpen={modalConfig.show}
        modo={modalConfig.modo}
        usuario={modalConfig.usuario}
        onClose={cerrarModal}
      />

    
    </div>
  );
}