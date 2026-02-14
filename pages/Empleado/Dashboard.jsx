import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, ClipboardList, Package, 
  Store, LogOut, TrendingUp, BarChart3, Users, AlertTriangle, ChevronRight
} from 'lucide-react';
// Importamos tu componente dinámico según tu árbol de archivos
import Horario from '../../components/Horario'; 
import './Dashboard.css';

export default function DashboardDueno({ onLogout }) {
  return (
    <div className="dashboard-container">
      {/* Barra Lateral Izquierda (Azul) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-container">
            <Store size={24} />
            <div>
              <span className="brand-name">TECHSTORE</span>
              <span className="user-name">Carlos López</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<TrendingUp size={20} />} label="Ventas" />
          <NavItem icon={<Package size={20} />} label="Productos" />
          <NavItem icon={<BarChart3 size={20} />} label="Inventario" />
          <NavItem icon={<ClipboardList size={20} />} label="Reportes" />
          <NavItem icon={<ShoppingBag size={20} />} label="Pedidos" />
          <NavItem icon={<Users size={20} />} label="Usuarios" />
        </nav>

        <div className="sidebar-footer">
          <div className="role-box">
            <p className="role-label">Rol actual</p>
            <p className="role-value">Dueño</p>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <header className="header-main">
          <div>
            <p className="breadcrumb">INICIO {'>'} Dashboard</p>
          </div>
          <div className="header-right">
            <Horario />
          </div>
        </header>

        {/* Aviso de Stock Bajo */}
        <div className="low-stock-alert">
          <AlertTriangle size={20} color="#d97706" />
          <p>
            <strong>Aviso de Stock Bajo:</strong> Sabritas Originales 45g (8 unidades), Leche Lala Entera 1L (5 unidades), Doritos Nacho 62g (1 unidades)
          </p>
        </div>

        {/* Tarjetas de Estadísticas (4 columnas como en la imagen) */}
        <div className="stats-grid-dueno">
          <StatCard title="Ventas del Día" value="$0.2K" subtext="↑ +10% desde ayer" icon={<ShoppingBag size={18} color="#3b82f6" />} />
          <StatCard title="Utilidad Total" value="$0.2K" subtext="↑ +5% desde ayer" icon={<TrendingUp size={18} color="#ef4444" />} />
          <StatCard title="Margen de Ganancia" value="$0.2K" subtext="↑ Margen 30%" icon={<BarChart3 size={18} color="#10b981" />} />
          <StatCard title="Productos en Stock" value="315" subtext="125 disponibles" icon={<Package size={18} color="#8b5cf6" />} />
        </div>

        {/* Sección de Gráficas (Ingresos y Utilidad) */}
        <div className="charts-container">
          <div className="chart-box">
            <h3 className="chart-title">Ingresos Mensuales</h3>
            <div className="chart-placeholder bar-chart">
              {/* Aquí iría el componente de gráfica de barras */}
              <div className="placeholder-text">Gráfica de Ingresos (Ene - Jul)</div>
            </div>
          </div>
          <div className="chart-box">
            <h3 className="chart-title">Utilidad Mensual</h3>
            <div className="chart-placeholder line-chart">
              {/* Aquí iría el componente de gráfica de líneas */}
              <div className="placeholder-text">Gráfica de Utilidad (Ene - Jul)</div>
            </div>
          </div>
        </div>

        {/* Sección inferior: Productos con Mayor Demanda */}
        <div className="bottom-section">
          <div className="section-header">
            <h3 className="section-title">Productos con Mayor Demanda</h3>
            <span className="view-all">Ver Todos</span>
          </div>
          <div className="demand-item">
            <div className="demand-left">
              <div className="rank-badge">1</div>
              <div>
                <p className="prod-name">Coca-Cola 600ml</p>
                <p className="prod-cat">Bebidas</p>
              </div>
            </div>
            <div className="prod-price">$15.00</div>
          </div>
        </div>

        <footer className="footer-copyright">
          © 2025 TechStore. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}

// Sub-componentes manteniendo tus clases de CSS
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatCard({ title, value, subtext, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <h3 className="stat-value">{value}</h3>
        <span className="stat-subtext">{subtext}</span>
      </div>
      <div className="stat-icon-bg">
        {icon}
      </div>
    </div>
  );
}