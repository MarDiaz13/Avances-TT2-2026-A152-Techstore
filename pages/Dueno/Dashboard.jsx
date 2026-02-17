import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, DollarSign, Package, BarChart3,
    ClipboardList, ShoppingBag, Users, LogOut, TrendingUp, AlertCircle, Calendar, Clock
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

import logoEmpresa from '../../logo.jpg';
import Productos from './Productos';
import Ventas from './Ventas';
import './Dashboard.css';

const dataIngresos = [
    { name: 'Ene', Ingresos: 650 }, { name: 'Feb', Ingresos: 800 },
    { name: 'Mar', Ingresos: 750 }, { name: 'Abr', Ingresos: 900 },
    { name: 'May', Ingresos: 850 }, { name: 'Jun', Ingresos: 950 },
    { name: 'Jul', Ingresos: 1050 }
];

const dataUtilidad = [
    { name: 'Ene', Utilidad: 300 }, { name: 'Feb', Utilidad: 400 },
    { name: 'Mar', Utilidad: 370 }, { name: 'Abr', Utilidad: 480 },
    { name: 'May', Utilidad: 460 }, { name: 'Jun', Utilidad: 550 },
    { name: 'Jul', Utilidad: 560 }
];

const productosDemanda = [
    { id: 1, nombre: 'Coca-Cola 600ml', cat: 'Bebidas', precio: '$15.00' },
    { id: 2, nombre: 'Sabritas Originales 45g', cat: 'Botanas', precio: '$18.00' },
    { id: 3, nombre: 'Takis Fuego 62g', cat: 'Botanas', precio: '$18.00' },
    { id: 4, nombre: 'Bimbo Pan Blanco Grande', cat: 'Panaderia', precio: '$38.00' },
    { id: 5, nombre: 'Leche Lala Entera 1L', cat: 'Lacteos', precio: '$22.00' }
];

export default function Dashboard({ onLogout }) {
    const [vistaActual, setVistaActual] = useState('dashboard');
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

    return (
        <div className="dashboard-container">
            <aside className="sidebar-new">
                <div className="sidebar-header-new" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px' }}>
                    <div className="logo-container-white" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '2px'
                    }}>
                        <img src={logoEmpresa} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="header-text-new">
                        <h1 className="brand-name" style={{ fontSize: '1.1rem', margin: 0 }}>TECHSTORE</h1>
                        <p className="admin-subtitle" style={{ margin: 0, fontSize: '0.85rem' }}>Carlos Lopez</p>
                    </div>
                </div>

                <nav className="nav-menu-new">
                    <div className={`nav-item-new ${vistaActual === 'dashboard' ? 'active' : ''}`} onClick={() => setVistaActual('dashboard')}>
                        <LayoutDashboard size={20} /> <span>Dashboard</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'ventas' ? 'active' : ''}`} onClick={() => setVistaActual('ventas')}>
                        <DollarSign size={20} /> <span>Ventas</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'productos' ? 'active' : ''}`} onClick={() => setVistaActual('productos')}>
                        <Package size={20} /> <span>Productos</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'inventario' ? 'active' : ''}`} onClick={() => setVistaActual('inventario')}>
                        <BarChart3 size={20} /> <span>Inventario</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'reportes' ? 'active' : ''}`} onClick={() => setVistaActual('reportes')}>
                        <ClipboardList size={20} /> <span>Reportes</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'pedidos' ? 'active' : ''}`} onClick={() => setVistaActual('pedidos')}>
                        <ShoppingBag size={20} /> <span>Pedidos</span>
                    </div>
                    <div className={`nav-item-new ${vistaActual === 'usuarios' ? 'active' : ''}`} onClick={() => setVistaActual('usuarios')}>
                        <Users size={20} /> <span>Usuarios</span>
                    </div>
                </nav>

                <div className="sidebar-footer-new">
                    <div className="role-indicator">
                        <p className="role-label">ROL ACTUAL</p>
                        <strong className="role-name">Dueño</strong>
                    </div>
                    <button className="btn-logout-red" onClick={onLogout}>
                        <LogOut size={18} /> <span>Cerrar Sesion</span>
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
                            <div className="alert-stock-bajo">
                                <AlertCircle size={18} color="#b45309" />
                                <span>
                                    <strong>Aviso de Stock Bajo:</strong> Sabritas Originales 45g (8 unidades), Leche Lala Entera 1L (5 unidades), Doritos Nacho 62g (1 unidades)
                                </span>
                            </div>

                            <div className="stats-container">
                                <StatCard title="Ventas del Dia" value="$0.2K" sub="↑ +10% desde ayer" icon={<DollarSign size={20} color="#3b82f6" />} />
                                <StatCard title="Utilidad Total" value="$0.2K" sub="↑ +5% desde ayer" icon={<TrendingUp size={20} color="#ef4444" />} />
                                <StatCard title="Margen de Ganancia" value="$0.2K" sub="↑ Margen 30%" icon={<TrendingUp size={20} color="#10b981" />} />
                                <StatCard title="Productos en Stock" value="315" sub="125 disponibles" icon={<Package size={20} color="#8b5cf6" />} />
                            </div>

                            <div className="charts-grid">
                                <div className="table-card">
                                    <h3 className="chart-title">Ingresos Mensuales</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={dataIngresos}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip cursor={{ fill: '#f8fafc' }} />
                                            <Bar dataKey="Ingresos" fill="#2eb85c" radius={[4, 4, 0, 0]} barSize={35} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="table-card">
                                    <h3 className="chart-title">Utilidad Mensual</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <AreaChart data={dataUtilidad}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="Utilidad" stroke="#1f2937" strokeWidth={2} fillOpacity={0.1} fill="#1f2937" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="management-card">
                                <div className="card-header">
                                    <h3 className="page-title" style={{ fontSize: '18px' }}>Productos con Mayor Demanda</h3>
                                </div>
                                <div className="store-list">
                                    {productosDemanda.map((item) => (
                                        <div key={item.id} className="store-item">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div className="rank-badge-blue">{item.id}</div>
                                                <div>
                                                    <p style={{ fontWeight: '700', color: '#1e293b' }}>{item.nombre}</p>
                                                    <p style={{ fontSize: '13px', color: '#64748b' }}>{item.cat}</p>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: '800', color: '#1e293b' }}>{item.precio}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {vistaActual === 'productos' && <div className="fade-in"><Productos /></div>}
                    {vistaActual === 'ventas' && <div className="fade-in"><Ventas /></div>}
                </div>

                <footer className="main-footer">
                    © 2026 TechStore. Todos los derechos reservados.
                </footer>
            </main>
        </div>
    );
}

function StatCard({ title, value, sub, icon }) {
    return (
        <div className="stat-box-new">
            <div>
                <p className="stat-label-new">{title}</p>
                <h3 className="stat-value-new">{value}</h3>
                <p className="stat-sub-new">{sub}</p>
            </div>
            <div className="stat-icon-bg-new">{icon}</div>
        </div>
    );
}