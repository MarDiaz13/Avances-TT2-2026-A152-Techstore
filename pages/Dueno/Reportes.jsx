import React, { useState, useMemo } from 'react';
import {
    Download, TrendingUp, DollarSign, ShoppingBag,
    FileText, Loader2, Calendar
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

import { PRODUCTOS_DUENO_DATA, VENTAS_HISTORICO } from '../../components/ListaProductosDueno';

export default function Reportes() {
    const [showModal, setShowModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const stats = useMemo(() => {
        if (!PRODUCTOS_DUENO_DATA || PRODUCTOS_DUENO_DATA.length === 0) {
            return { porCategoria: [] };
        }

        const conteo = PRODUCTOS_DUENO_DATA.reduce((acc, prod) => {
            const catRaw = prod.categoria || 'Sin Categoria';
            const cat = catRaw.trim();

            if (!acc[cat]) {
                acc[cat] = { nombre: cat, cantidad: 0, ingresos: 0 };
            }

            acc[cat].cantidad += 1;
            acc[cat].ingresos += (prod.precio || 0) * 5;
            return acc;
        }, {});

        const listaCategorias = Object.values(conteo);
        const totalIngresos = listaCategorias.reduce((sum, c) => sum + c.ingresos, 0);

        return {
            porCategoria: listaCategorias.map(c => ({
                ...c,
                porcentaje: totalIngresos > 0 ? ((c.ingresos / totalIngresos) * 100).toFixed(1) : "0.0"
            }))
        };
    }, []);

    const handlePDF = () => {
        setIsDownloading(true);
        setShowModal(true);
        setTimeout(() => setIsDownloading(false), 2000);
    };

    return (
        <div className="reportes-view-wrapper fade-in">
            {showModal && (
                <div className="mod-overlay">
                    <div className="modal-descarga-exito">
                        {isDownloading ? (
                            <div className="mod-loading">
                                <Loader2 size={40} className="animate-spin" color="#28a745" />
                                <p style={{ marginTop: '15px' }}>Generando PDF...</p>
                            </div>
                        ) : (
                            <>
                                <div className="icon-success-circle"><Download size={35} color="#fff" /></div>
                                <h2 className="success-title">¡Descarga Exitosa!</h2>
                                <p>El reporte PDF se ha descargado correctamente</p>
                                <button className="btn-modal-aceptar" onClick={() => setShowModal(false)}>ACEPTAR</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <header className="header-view">
                <h1 className="main-title">Reportes</h1>
                <p className="main-subtitle">Visualiza, genera y descarga reportes del sistema</p>
            </header>

            <div className="table-white-card filtros-reporte-card">
                <h4 className="card-inner-title">Filtros de Reporte</h4>
                <div className="filtros-grid">
                    <div className="filter-item">
                        <label>Fecha Inicial</label>
                        <input type="date" className="input-report" defaultValue="2026-02-28" />
                    </div>
                    <div className="filter-item">
                        <label>Fecha Final</label>
                        <input type="date" className="input-report" placeholder="dd/mm/aaaa" />
                    </div>
                    <div className="filter-item">
                        <label>Tipo de Reporte</label>
                        <select className="input-report">
                            <option>Seleccionar tipo</option>
                            <option>Ventas Totales</option>
                        </select>
                    </div>
                    <div className="report-actions-btns">
                        <button className="btn-generate-report"><Calendar size={18} /> GENERAR REPORTE</button>
                        <button className="btn-pdf" onClick={handlePDF}><Download size={18} /> DESCARGAR PDF</button>
                    </div>
                </div>
            </div>

            <div className="stats-cards-row">
                <div className="stat-card-item">
                    <div className="stat-content">
                        <span className="stat-label">Ingresos Totales</span>
                        <h2 className="stat-number">$123,000</h2>
                        <span className="stat-trend positive">↑ +15% desde el mes pasado</span>
                    </div>
                    <div className="stat-icon-circle no-bg"><DollarSign size={24} color="#22c55e" /></div>
                </div>
                <div className="stat-card-item">
                    <div className="stat-content">
                        <span className="stat-label">Utilidad Total</span>
                        <h2 className="stat-number">$43,400</h2>
                        <span className="stat-trend positive">↑ +8% desde el mes pasado</span>
                    </div>
                    <div className="stat-icon-circle no-bg"><TrendingUp size={24} color="#3b82f6" /></div>
                </div>
                <div className="stat-card-item">
                    <div className="stat-content">
                        <span className="stat-label">Productos Vendidos</span>
                        <h2 className="stat-number">1,700</h2>
                        <span className="stat-trend positive">↑ +12% desde el mes pasado</span>
                    </div>
                    <div className="stat-icon-circle no-bg"><ShoppingBag size={24} color="#8b5cf6" /></div>
                </div>
                <div className="stat-card-item">
                    <div className="stat-content">
                        <span className="stat-label">Reportes Generados</span>
                        <h2 className="stat-number">24</h2>
                        <span className="stat-label">Este mes</span>
                    </div>
                    <div className="stat-icon-circle no-bg"><FileText size={24} color="#f59e0b" /></div>
                </div>
            </div>

            <div className="charts-main-grid">
                <div className="table-white-card chart-container">
                    <h4 className="card-inner-title">Ingresos y Utilidad Mensual</h4>
                    <p className="chart-subtitle">Evolucion de ingresos y utilidad de los ultimos 6 meses</p>
                    <div style={{ width: '100%', height: 320 }}>
                        <ResponsiveContainer>
                            <LineChart data={VENTAS_HISTORICO} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} ticks={[0, 7500, 15000, 22500, 30000]} domain={[0, 30000]} dx={-10} />
                                <Tooltip />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 5, fill: '#fff', stroke: '#22c55e', strokeWidth: 2 }} activeDot={{ r: 7 }} />
                                <Line type="monotone" dataKey="utilidad" name="Utilidad" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 5, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="table-white-card chart-container">
                    <h4 className="card-inner-title">Ventas por Categoria</h4>
                    <p className="chart-subtitle">Distribucion de productos vendidos por categoria de tiendita</p>
                    <div style={{ width: '100%', height: 320 }}>
                        <ResponsiveContainer>
                            <BarChart data={stats.porCategoria} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Legend verticalAlign="bottom" align="center" iconType="square" wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="cantidad" name="Cantidad Vendida" fill="#007bff" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="table-white-card" style={{ marginTop: '25px', padding: '25px' }}>
                <h4 className="card-inner-title" style={{ marginBottom: '25px' }}>Detalles por Categoria</h4>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1.5px solid #f3f4f6' }}>
                                <th style={{ padding: '15px 10px', color: '#111827', fontWeight: '600', textAlign: 'left' }}>Categoria</th>
                                <th style={{ padding: '15px 10px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>Cantidad Vendida</th>
                                <th style={{ padding: '15px 10px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>Ventas Totales</th>
                                <th style={{ padding: '15px 10px', color: '#111827', fontWeight: '600', textAlign: 'right' }}>% del Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.porCategoria.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f9fafb' }}>
                                    <td style={{ padding: '18px 10px', color: '#374151' }}>{item.nombre}</td>
                                    <td style={{ padding: '18px 10px', color: '#6b7280', textAlign: 'right' }}>{item.cantidad}</td>
                                    <td style={{ padding: '18px 10px', color: '#10b981', fontWeight: '600', textAlign: 'right' }}>
                                        ${item.ingresos.toLocaleString()}
                                    </td>
                                    <td style={{ padding: '18px 10px', color: '#3b82f6', fontWeight: '500', textAlign: 'right' }}>
                                        {item.porcentaje}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}