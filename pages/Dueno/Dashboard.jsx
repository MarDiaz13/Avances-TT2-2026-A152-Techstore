import React, { useState } from 'react';
import {
    LayoutDashboard, DollarSign, Package, BarChart3,
    ClipboardList, ShoppingBag, Users, LogOut, TrendingUp, AlertCircle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import Horario from '../../components/Horario';
import logoEmpresa from '../../logo.jpg';
import Productos from './Productos';
import Ventas from './Ventas';
import ListaProductos from '../../components/ListaProductos';
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

export default function Dashboard({ onLogout }) {
    const [vistaActual, setVistaActual] = useState('dashboard');

    return (
        <div className="dashboard-wrapper">
            <aside className="sidebar-admin">
                <div className="sidebar-brand">
                    <div className="brand-wrapper">
                        <div className="logo-container-white">
                            <img src={logoEmpresa} alt="Logo" className="sidebar-logo-img" />
                        </div>
                        <div className="brand-text-container">
                            <span className="brand-name">TECHSTORE</span>
                            <p className="admin-name">Carlos López</p>
                        </div>
                    </div>
                </div>

                <nav className="nav-menu">
                    <div className={`nav-item-link ${vistaActual === 'dashboard' ? 'active' : ''}`} onClick={() => setVistaActual('dashboard')}>
                        <LayoutDashboard size={20} /> <span>Dashboard</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'ventas' ? 'active' : ''}`} onClick={() => setVistaActual('ventas')}>
                        <DollarSign size={20} /> <span>Ventas</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'productos' ? 'active' : ''}`} onClick={() => setVistaActual('productos')}>
                        <Package size={20} /> <span>Productos</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'inventario' ? 'active' : ''}`} onClick={() => setVistaActual('inventario')}>
                        <BarChart3 size={20} /> <span>Inventario</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'reportes' ? 'active' : ''}`} onClick={() => setVistaActual('reportes')}>
                        <ClipboardList size={20} /> <span>Reportes</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'pedidos' ? 'active' : ''}`} onClick={() => setVistaActual('pedidos')}>
                        <ShoppingBag size={20} /> <span>Pedidos</span>
                    </div>
                    <div className={`nav-item-link ${vistaActual === 'usuarios' ? 'active' : ''}`} onClick={() => setVistaActual('usuarios')}>
                        <Users size={20} /> <span>Usuarios</span>
                    </div>
                </nav>

                <div className="sidebar-status">
                    <div className="role-badge">
                        <p>ROL ACTUAL</p>
                        <p>Dueño</p>
                    </div>
                    <button className="btn-logout" onClick={onLogout}>
                        <LogOut size={18} /> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="main-viewport">
                <header className="page-header">
                    <p className="breadcrumb">INICIO {'>'} {vistaActual.toUpperCase()}</p>
                    <Horario />
                </header>

                <div className="view-content-scroll">
                    <div className="content-inner-wrapper">
                        {vistaActual === 'dashboard' && (
                            <>
                                <div className="alert-stock-bajo">
                                    <AlertCircle size={18} color="#b45309" />
                                    <span>
                                        <strong>Aviso de Stock Bajo:</strong> Sabritas Originales 45g (8 unidades), Leche Lala Entera 1L (5 unidades), Doritos Nacho 62g (1 unidades)
                                    </span>
                                </div>

                                <div className="stats-container">
                                    <StatCard title="Ventas del Día" value="$0.2K" sub="↑ +10% desde ayer" icon={<DollarSign size={20} color="#3b82f6" />} />
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
                                        <div className="chart-legend"><span className="dot green"></span> Ingresos</div>
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
                                        <div className="chart-legend"><span className="dot black"></span> Utilidad</div>
                                    </div>
                                </div>

                                <ListaProductos />
                            </>
                        )}
                        {vistaActual === 'productos' && <Productos />}
                        {vistaActual === 'ventas' && <Ventas />}
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, sub, icon }) {
    return (
        <div className="stat-box">
            <div>
                <p className="stat-label">{title}</p>
                <h3 className="stat-main-value">{value}</h3>
                <p className="stat-sub">{sub}</p>
            </div>
            <div className="stat-icon-container">{icon}</div>
        </div>
    );
}