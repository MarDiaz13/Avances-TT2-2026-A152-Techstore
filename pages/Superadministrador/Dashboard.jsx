import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Users, ClipboardList, BarChart3,
    ShoppingCart, Package, Store, Plus,
    Edit, Trash2, LogOut, Calendar, Clock
} from 'lucide-react';
import './Dashboard.css';

import Usuarios from './Usuarios';
import Inventario from './Inventario';
import Reportes from './Reportes';
import Pedidos from './Pedidos';
import Productos from './Productos';
import GestionSucursales from './GestionSucursales';

import logoEmpresa from '../../logo.jpg';
import { SUCURSALES } from '../../components/datosTienda';

export default function Dashboard({ onLogout }) {
    const [vistaActual, setVistaActual] = useState('dashboard');
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });

    // Estado para la fecha y hora dinámica
    const [fechaHora, setFechaHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setFechaHora(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatearFecha = (date) => {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = date.toLocaleDateString('es-MX', opciones);
        return fecha.charAt(0).toUpperCase() + fecha.slice(1);
    };

    const formatearHora = (date) => {
        return date.toLocaleTimeString('es-MX', { hour12: false });
    };

    const abrirModal = (tipo, tienda = null) => {
        setModalConfig({ isOpen: true, type: tipo, data: tienda });
    };

    const cerrarModal = () => {
        setModalConfig({ isOpen: false, type: '', data: null });
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar-new">
                <div className="sidebar-header-new">
                    <div className="logo-container-white">
                        <img src={logoEmpresa} alt="Logo" className="sidebar-logo-img" />
                    </div>
                    <div className="header-text-new">
                        <h1 className="brand-name">TECHSTORE</h1>
                        <p className="admin-subtitle">Admin Principal</p>
                    </div>
                </div>

                <nav className="nav-menu-new">
                    <div
                        className={`nav-item-new ${vistaActual === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setVistaActual('dashboard')}
                    >
                        <LayoutDashboard size={20} /> <span>Dashboard</span>
                    </div>

                    <div
                        className={`nav-item-new ${vistaActual === 'usuarios' ? 'active' : ''}`}
                        onClick={() => setVistaActual('usuarios')}
                    >
                        <Users size={20} /> <span>Usuarios</span>
                    </div>

                    <div
                        className={`nav-item-new ${vistaActual === 'inventario' ? 'active' : ''}`}
                        onClick={() => setVistaActual('inventario')}
                    >
                        <ClipboardList size={20} /> <span>Inventario</span>
                    </div>

                    <div
                        className={`nav-item-new ${vistaActual === 'reportes' ? 'active' : ''}`}
                        onClick={() => setVistaActual('reportes')}
                    >
                        <BarChart3 size={20} /> <span>Reportes</span>
                    </div>

                    <div
                        className={`nav-item-new ${vistaActual === 'pedidos' ? 'active' : ''}`}
                        onClick={() => setVistaActual('pedidos')}
                    >
                        <ShoppingCart size={20} /> <span>Pedidos</span>
                    </div>

                    <div
                        className={`nav-item-new ${vistaActual === 'productos' ? 'active' : ''}`}
                        onClick={() => setVistaActual('productos')}
                    >
                        <Package size={20} /> <span>Productos</span>
                    </div>
                </nav>

                <div className="sidebar-footer-new">
                    <div className="role-indicator">
                        <p className="role-label">Rol actual</p>
                        <strong className="role-name">Super Admin</strong>
                    </div>
                    <button className="btn-logout-red" onClick={onLogout}>
                        <LogOut size={18} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="header-top-nav">
                    <div className="breadcrumb-text">
                        INICIO &nbsp; {">"} &nbsp; {vistaActual.toUpperCase()}
                    </div>
                    <div className="horario-header-flex">
                        <div className="horario-item">
                            <Calendar size={16} />
                            <span>{formatearFecha(fechaHora)}</span>
                        </div>
                        <div className="horario-item">
                            <Clock size={16} />
                            <span>{formatearHora(fechaHora)}</span>
                        </div>
                    </div>
                </header>

                <div className="view-content">
                    {vistaActual === 'dashboard' && (
                        <div className="fade-in">
                            <div className="header-page-row">
                                <h2 className="page-title">Panel de Control</h2>
                                <button className="btn-add-store" onClick={() => abrirModal('agregar')}>
                                    <Plus size={18} /> Nueva Tienda
                                </button>
                            </div>

                            <div className="management-card">
                                <div className="card-header">
                                    <h3 className="section-subtitle">Gestión de Sucursales</h3>
                                </div>
                                <div className="store-list">
                                    {SUCURSALES.map(tienda => (
                                        <div key={tienda.id} className="store-item">
                                            <div className="store-info-flex" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div className="store-icon-bg"><Store size={20} color="#0038a8" /></div>
                                                <div>
                                                    <p className="store-title-name" style={{ fontWeight: '700', color: '#1e293b' }}>{tienda.nombre}</p>
                                                    <p className="store-subtitle" style={{ fontSize: '13px', color: '#64748b' }}>{tienda.ubicación}</p>
                                                </div>
                                            </div>
                                            <div className="action-btns-container">
                                                <button className="action-btn-edit" onClick={() => abrirModal('editar', tienda)}>
                                                    <Edit size={20} />
                                                </button>
                                                <button className="action-btn-delete" onClick={() => abrirModal('borrar', tienda)}>
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {vistaActual === 'usuarios' && <div className="fade-in"><Usuarios /></div>}
                    {vistaActual === 'inventario' && <div className="fade-in"><Inventario /></div>}
                    {vistaActual === 'reportes' && <div className="fade-in"><Reportes /></div>}
                    {vistaActual === 'pedidos' && <div className="fade-in"><Pedidos /></div>}
                    {vistaActual === 'productos' && <div className="fade-in"><Productos /></div>}
                </div>

                <footer className="main-footer">
                    © 2026 TechStore. Todos los derechos reservados.
                </footer>
            </main>

            <GestionSucursales
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                data={modalConfig.data}
                onClose={cerrarModal}
            />
        </div>
    );
}