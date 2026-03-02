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
import Inventario from './Inventario';
import Reportes from './Reportes';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import './Dashboard.css';

import { informacionFinanciera } from '../../components/datosDashboard';

export default function Dashboard({ onLogout }) {
    const [vistaActual, setVistaActual] = useState('dashboard');
    const [fechaHora, setFechaHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setFechaHora(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatearFecha = (date) => {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = date.toLocaleDateString('es-MX', opciones);
        return fecha.charAt(0).toUpperCase() + fecha.slice(1);
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar-new">
                <div className="sidebar-header-new" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px' }}>
                    <div className="logo-container-white" style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={logoEmpresa} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="header-text-new">
                        <h1 className="brand-name" style={{ fontSize: '1.1rem', margin: 0 }}>TECHSTORE</h1>
                        <p className="admin-subtitle" style={{ margin: 0, fontSize: '0.85rem' }}>Dueño</p>
                    </div>
                </div>

                <nav className="nav-menu-new">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={vistaActual === 'dashboard'} onClick={() => setVistaActual('dashboard')} />
                    <NavItem icon={<DollarSign size={20} />} label="Ventas" active={vistaActual === 'ventas'} onClick={() => setVistaActual('ventas')} />
                    <NavItem icon={<Package size={20} />} label="Productos" active={vistaActual === 'productos'} onClick={() => setVistaActual('productos')} />
                    <NavItem icon={<BarChart3 size={20} />} label="Inventario" active={vistaActual === 'inventario'} onClick={() => setVistaActual('inventario')} />
                    <NavItem icon={<ClipboardList size={20} />} label="Reportes" active={vistaActual === 'reportes'} onClick={() => setVistaActual('reportes')} />
                    <NavItem icon={<ShoppingBag size={20} />} label="Pedidos" active={vistaActual === 'pedidos'} onClick={() => setVistaActual('pedidos')} />
                    <NavItem icon={<Users size={20} />} label="Usuarios" active={vistaActual === 'usuarios'} onClick={() => setVistaActual('usuarios')} />
                </nav>

                <div className="sidebar-footer-new">
                    <button className="btn-logout-red" onClick={onLogout}>
                        <LogOut size={18} /> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="header-top-nav">
                    <div className="breadcrumb-text">INICIO &nbsp; {">"} &nbsp; {vistaActual.toUpperCase()}</div>
                    <div className="horario-header-flex">
                        <div className="horario-item"><Calendar size={16} /> <span>{formatearFecha(fechaHora)}</span></div>
                        <div className="horario-item"><Clock size={16} /> <span>{fechaHora.toLocaleTimeString('es-MX')}</span></div>
                    </div>
                </header>

                <div className="view-content">
                    {vistaActual === 'dashboard' && (
                        <div className="fade-in">
                            <div className="alert-stock-bajo">
                                <AlertCircle size={18} color="#b45309" />
                                <span><strong>Aviso de Stock Bajo:</strong> Sabritas Originales 45g (8 unidades), Leche Lala Entera 1L (5 unidades)</span>
                            </div>

                            <div className="stats-container">
                                {informacionFinanciera.stats.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        title={stat.title}
                                        value={stat.value}
                                        sub={stat.sub}
                                        icon={stat.type === 'ventas' ? <DollarSign size={20} color={stat.color} /> :
                                            stat.type === 'stock' ? <Package size={20} color={stat.color} /> :
                                                <TrendingUp size={20} color={stat.color} />}
                                    />
                                ))}
                            </div>

                            <div className="charts-grid">
                                <ChartCard title="Ingresos Mensuales">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={informacionFinanciera.graficaIngresos}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip formatter={(value) => `$${value}.00 MXN`} />
                                            <Bar dataKey="Ingresos" fill="#2eb85c" radius={[4, 4, 0, 0]} barSize={35} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartCard>

                                <ChartCard title="Utilidad Mensual">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <AreaChart data={informacionFinanciera.graficaUtilidad}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip formatter={(value) => `$${value}.00 MXN`} />
                                            <Area type="monotone" dataKey="Utilidad" stroke="#1f2937" strokeWidth={2} fillOpacity={0.1} fill="#1f2937" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartCard>
                            </div>

                            <div className="management-card">
                                <div className="card-header"><h3 className="page-title" style={{ fontSize: '18px' }}>Productos con Mayor Demanda</h3></div>
                                <div className="store-list">
                                    {informacionFinanciera.productosDemanda.map((item) => (
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

                    {vistaActual === 'productos' && <Productos />}
                    {vistaActual === 'ventas' && <Ventas />}
                    {vistaActual === 'inventario' && <Inventario />}
                    {vistaActual === 'reportes' && <Reportes />}
                    {vistaActual === 'pedidos' && <Pedidos />}
                    {vistaActual === 'usuarios' && <Usuarios />}
                </div>
                <footer className="main-footer">© 2026 TechStore. Todos los derechos reservados.</footer>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <div className={`nav-item-new ${active ? 'active' : ''}`} onClick={onClick}>
            {icon} <span>{label}</span>
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

function ChartCard({ title, children }) {
    return (
        <div className="table-card">
            <h3 className="chart-title">{title}</h3>
            {children}
        </div>
    );
}