import React, { useState } from 'react';
import { 
  Store, ChevronRight, ArrowLeft, Download, FileText, 
  TrendingUp, DollarSign, ShoppingBag, X, Loader2, CheckCircle 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar
} from 'recharts';

import { SUCURSALES } from '../../components/datosTienda';
import { 
  ESTADISTICAS_GENERALES, 
  DATA_GRAFICA_VENTAS, 
  DATA_CATEGORIAS 
} from '../../components/datosReportes';

import { useGenerarReportes } from './generarReportes';
import './Reportes.css';

export default function Reportes() {
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  
  // NUEVO: Estado para filtrar la información
  const [filtroTipo, setFiltroTipo] = useState('General');

  const { ejecutarConsultaBD, procesarDescargaPDF } = useGenerarReportes();

  const handleGenerar = async () => {
    setModalTipo('procesando');
    setShowModal(true);
    await ejecutarConsultaBD({ tienda: tiendaSeleccionada.nombre, tipo: filtroTipo });
    setModalTipo('exito');
  };

  const handlePDF = async () => {
    setModalTipo('procesando');
    setShowModal(true);
    await procesarDescargaPDF(tiendaSeleccionada.nombre);
    setModalTipo('exito');
  };

  return (
    <div className="reportes-view-wrapper fade-in">
      {showModal && (
        <div className="mod-overlay">
          <div className="mod-container fade-in">
            <div className="mod-header">
              <h2 className="mod-title">
                {modalTipo === 'procesando' ? 'Procesando' : 'Finalizado'}
              </h2>
              {modalTipo === 'exito' && (
                <button className="btn-mod-close" onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              )}
            </div>
            <div className="mod-content-area">
              {modalTipo === 'procesando' ? (
                <div className="mod-loading">
                  <Loader2 size={40} className="animate-spin" />
                  <p>Conectando con la base de datos...</p>
                </div>
              ) : (
                <div className="mod-success">
                  <CheckCircle size={40} color="#10b981" />
                  <p>La operación se completó correctamente.</p>
                  <button className="btn-mod-primary" onClick={() => setShowModal(false)}>
                    ACEPTAR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="reportes-content-area">
        {!tiendaSeleccionada ? (
          <>
            <header className="header-view">
              <h1 className="main-title">Reportes por Sucursal</h1>
              <p className="main-subtitle">Selecciona una tienda para visualizar sus estadísticas</p>
            </header>
            <div className="table-white-card">
              {SUCURSALES.map((tienda) => (
                <div key={tienda.id} className="store-item-row" onClick={() => setTiendaSeleccionada(tienda)}>
                  <div className="store-info-flex">
                    <div className="store-icon-bg"><Store size={20} color="#3b82f6" /></div>
                    <div>
                      <p className="store-title-name">{tienda.nombre}</p>
                      <p className="store-subtitle">{tienda.ubicación || tienda.ubicacion}</p>
                    </div>
                  </div>
                  <div className="action-btns-container">
                    <span className="text-view-report">Ver Reportes</span>
                    <ChevronRight size={18} color="#9ca3af" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <header className="header-view">
              <button className="btn-back-stores" onClick={() => setTiendaSeleccionada(null)}>
                <ArrowLeft size={16} /> Volver a sucursales
              </button>
              <h1 className="main-title">Reportes: {tiendaSeleccionada.nombre}</h1>
              <p className="main-subtitle">Mostrando reporte tipo: <strong>{filtroTipo}</strong></p>
            </header>

            <div className="table-white-card filtros-reporte-card shadow-sm">
              <h4 className="card-inner-title">Filtros de Reporte</h4>
              <div className="filtros-grid">
                <div className="filter-item">
                  <label>Fecha Inicial</label>
                  <input type="date" className="input-report" defaultValue="2026-01-01" />
                </div>
                <div className="filter-item">
                  <label>Fecha Final</label>
                  <input type="date" className="input-report" defaultValue="2026-01-31" />
                </div>
                <div className="filter-item">
                  <label>Tipo de Reporte</label>
                  <select 
                    className="input-report" 
                    value={filtroTipo} 
                    onChange={(e) => setFiltroTipo(e.target.value)}
                  >
                    <option value="General">General</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Inventario">Inventario</option>
                  </select>
                </div>
                <div className="report-actions-btns">
                  <button className="btn-pdf" onClick={handlePDF}><Download size={16} /> PDF</button>
                  <button className="btn-generate-report" onClick={handleGenerar}><FileText size={16} /> GENERAR</button>
                </div>
              </div>
            </div>

            {/* RENDERIZADO CONDICIONAL SEGÚN EL TIPO SELECCIONADO */}
            
            {(filtroTipo === 'General' || filtroTipo === 'Ventas') && (
              <div className="stats-cards-row fade-in">
                <div className="stat-card-item">
                  <div className="stat-info-text">
                    <p className="stat-label">Ventas Totales</p>
                    <h2 className="stat-number">${ESTADISTICAS_GENERALES.ventasTotales.toLocaleString()}</h2>
                  </div>
                  <div className="stat-icon-circle blue-bg"><DollarSign size={22} color="#3b82f6" /></div>
                </div>
                <div className="stat-card-item">
                  <div className="stat-info-text">
                    <p className="stat-label">Ganancias</p>
                    <h2 className="stat-number">${ESTADISTICAS_GENERALES.ganancias.toLocaleString()}</h2>
                  </div>
                  <div className="stat-icon-circle green-bg"><TrendingUp size={22} color="#10b981" /></div>
                </div>
                <div className="stat-card-item">
                  <div className="stat-info-text">
                    <p className="stat-label">Productos Vendidos</p>
                    <h2 className="stat-number">{ESTADISTICAS_GENERALES.productosVendidos.toLocaleString()}</h2>
                  </div>
                  <div className="stat-icon-circle yellow-bg"><ShoppingBag size={22} color="#f59e0b" /></div>
                </div>
              </div>
            )}

            <div className="charts-main-grid">
              {/* Gráfica de Ventas: Se muestra en General o Ventas */}
              {(filtroTipo === 'General' || filtroTipo === 'Ventas') && (
                <div className="table-white-card chart-container shadow-sm fade-in">
                  <h4 className="card-inner-title">Histórico de Ventas y Ganancias</h4>
                  <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <LineChart data={DATA_GRAFICA_VENTAS}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip />
                        <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6' }} />
                        <Line type="monotone" dataKey="ganancias" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Gráfica de Inventario: Se muestra en General o Inventario */}
              {(filtroTipo === 'General' || filtroTipo === 'Inventario') && (
                <div className="table-white-card chart-container shadow-sm fade-in">
                  <h4 className="card-inner-title">Productos por Categoría (Stock)</h4>
                  <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <BarChart data={DATA_CATEGORIAS}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="cantidad" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}