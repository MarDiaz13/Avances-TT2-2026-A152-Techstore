import React, { useState, useMemo } from 'react';
import {
    Store, ChevronRight, ArrowLeft, Download,
    TrendingUp, DollarSign, ShoppingBag, Loader2, FileCheck
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
    const [filtroTipo, setFiltroTipo] = useState('General');

    const [modalConfig, setModalConfig] = useState({
        tipo: '',
        titulo: '',
        mensaje: '',
        icono: null,
        color: '#3b82f6'
    });

    const { ejecutarConsultaBD, procesarDescargaPDF } = useGenerarReportes();

    const datosFiltrados = useMemo(() => {
        if (filtroTipo === 'General') return DATA_CATEGORIAS;
        return DATA_CATEGORIAS.filter(item => item.nombre === filtroTipo);
    }, [filtroTipo]);

    const statsFiltradas = useMemo(() => {
        if (filtroTipo === 'General') return ESTADISTICAS_GENERALES;
        const cat = DATA_CATEGORIAS.find(item => item.nombre === filtroTipo);
        return {
            ventasTotales: cat ? cat.ventas : 0,
            ganancias: cat ? cat.ganancias : 0,
            productosVendidos: cat ? cat.cantidad : 0
        };
    }, [filtroTipo]);

    const handleGenerar = async () => {
        setModalConfig({
            tipo: 'procesando',
            titulo: 'PROCESANDO...',
            mensaje: 'Generando vista previa del reporte...',
            icono: null,
            color: '#3b82f6'
        });
        setShowModal(true);
        await ejecutarConsultaBD({ tienda: tiendaSeleccionada?.nombre, tipo: filtroTipo });
        setModalConfig({
            tipo: 'exito',
            titulo: '¡Reporte Generado!',
            mensaje: `El reporte de ${filtroTipo} se ha procesado correctamente.`,
            icono: <FileCheck size={32} color="#fff" />,
            color: '#3b82f6'
        });
    };

    const handlePDF = async () => {
        setModalConfig({
            tipo: 'procesando',
            titulo: 'GENERANDO PDF...',
            mensaje: 'Preparando archivo para descarga...',
            icono: null,
            color: '#10b981'
        });
        setShowModal(true);
        await procesarDescargaPDF(tiendaSeleccionada?.nombre);
        setModalConfig({
            tipo: 'exito',
            titulo: '¡Descarga Exitosa!',
            mensaje: `El archivo PDF de ${filtroTipo} se ha guardado en tu equipo.`,
            icono: <Download size={32} color="#fff" />,
            color: '#10b981'
        });
    };

    return (
        <div className="reportes-view-wrapper fade-in">
            {showModal && (
                <div className="mod-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="mod-container modal-descarga-exito fade-in" style={{ padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
                        {modalConfig.tipo === 'procesando' ? (
                            <div className="mod-loading">
                                <Loader2 size={50} className="animate-spin" style={{ color: modalConfig.color, marginBottom: '15px' }} />
                                <h2 style={{ fontWeight: '800' }}>{modalConfig.titulo}</h2>
                                <p>{modalConfig.mensaje}</p>
                            </div>
                        ) : (
                            <div className="mod-success-container">
                                <div className="icon-success-circle" style={{ backgroundColor: modalConfig.color, width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    {modalConfig.icono}
                                </div>
                                <h2 className="success-title" style={{ color: modalConfig.color, fontWeight: '800' }}>{modalConfig.titulo}</h2>
                                <p className="success-msg" style={{ margin: '15px 0 25px' }}>{modalConfig.mensaje}</p>
                                <button
                                    className="btn-modal-aceptar"
                                    style={{ backgroundColor: modalConfig.color, border: 'none', padding: '12px 50px', borderRadius: '10px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                    onClick={() => setShowModal(false)}
                                >
                                    ACEPTAR
                                </button>
                            </div>
                        )}
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
                                        <option value="Por Categorías">Por Categorías</option>
                                    </select>
                                </div>
                                <div className="report-actions-btns">
                                    <button className="btn-generate-report" onClick={handleGenerar}>GENERAR REPORTE</button>
                                    <button className="btn-pdf" onClick={handlePDF}>DESCARGAR PDF</button>
                                </div>
                            </div>
                        </div>

                        <div className="stats-cards-row fade-in">
                            <div className="stat-card-item">
                                <div className="stat-info-text">
                                    <p className="stat-label">Ingresos ({filtroTipo})</p>
                                    <h2 className="stat-number">${statsFiltradas.ventasTotales.toLocaleString()}</h2>
                                </div>
                                <div className="stat-icon-circle blue-bg"><DollarSign size={22} color="#3b82f6" /></div>
                            </div>
                            <div className="stat-card-item">
                                <div className="stat-info-text">
                                    <p className="stat-label">Utilidad</p>
                                    <h2 className="stat-number">${statsFiltradas.ganancias.toLocaleString()}</h2>
                                </div>
                                <div className="stat-icon-circle green-bg"><TrendingUp size={22} color="#10b981" /></div>
                            </div>
                            <div className="stat-card-item">
                                <div className="stat-info-text">
                                    <p className="stat-label">Productos</p>
                                    <h2 className="stat-number">{statsFiltradas.productosVendidos.toLocaleString()}</h2>
                                </div>
                                <div className="stat-icon-circle yellow-bg"><ShoppingBag size={22} color="#f59e0b" /></div>
                            </div>
                        </div>

                        <div className="charts-main-grid">
                            <div className="table-white-card chart-container shadow-sm fade-in">
                                <h4 className="card-inner-title">Ingresos y Utilidad Mensual</h4>
                                <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={DATA_GRAFICA_VENTAS}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                                            <Line type="monotone" dataKey="ganancias" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="table-white-card chart-container shadow-sm fade-in">
                                <h4 className="card-inner-title">Análisis: {filtroTipo}</h4>
                                <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={datosFiltrados}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} />
                                            <Tooltip cursor={{ fill: 'transparent' }} />
                                            <Bar dataKey="cantidad" fill={modalConfig.color} radius={[4, 4, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}