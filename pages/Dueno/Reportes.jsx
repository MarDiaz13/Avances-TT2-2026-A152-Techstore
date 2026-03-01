import React, { useState, useMemo } from 'react';
import {
    Download, TrendingUp, DollarSign, ShoppingBag,
    FileText, Calendar
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

import {
    PRODUCTOS_DUENO_DATA,
    VENTAS_HISTORICO,
    VENTAS_POR_CATEGORIA_REPORTES
} from '../../components/ListaProductosDueno';

export default function Reportes() {
    const [showModal, setShowModal] = useState(false);

    const totales = useMemo(() => {
        const ingresos = VENTAS_POR_CATEGORIA_REPORTES.reduce((sum, item) => sum + item.ventas, 0);
        const cantidad = VENTAS_POR_CATEGORIA_REPORTES.reduce((sum, item) => sum + item.cantidad, 0);
        return {
            ingresos,
            cantidad,
            reportes: 24
        };
    }, []);

    return (
        <div className="reportes-view-container" style={{ backgroundColor: '#f8fafc', padding: '30px', minHeight: '100vh' }}>
            {showModal && (
                <div className="mod-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', textAlign: 'center', maxWidth: '400px' }}>
                        <div style={{ backgroundColor: '#28a745', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Download size={30} color="#fff" />
                        </div>
                        <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Descarga Exitosa!</h2>
                        <p style={{ color: '#64748b', marginBottom: '25px' }}>El reporte PDF se ha generado correctamente.</p>
                        <button className="btn-aceptar" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setShowModal(false)}>
                            ACEPTAR
                        </button>
                    </div>
                </div>
            )}

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>Reportes</h1>
                <p style={{ color: '#64748b' }}>Visualiza, genera y descarga reportes del sistema</p>
            </header>

            <section className="filtros-card" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', color: '#334155' }}>Filtros de Reporte</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'flex-end' }}>
                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>FECHA INICIAL</label>
                        <input type="date" style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }} defaultValue="2026-02-28" />
                    </div>
                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>FECHA FINAL</label>
                        <input type="date" style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    </div>
                    <div className="filter-group">
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>TIPO DE REPORTE</label>
                        <select style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                            <option>Ventas Totales</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '13px' }}>
                            <Calendar size={18} /> GENERAR REPORTE
                        </button>
                        <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '13px' }}>
                            <Download size={18} /> DESCARGAR PDF
                        </button>
                    </div>
                </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Ingresos Totales</p>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>${totales.ingresos.toLocaleString()}</h2>
                        <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>+15% desde el mes pasado</span>
                    </div>
                    <div style={{ color: '#10b981' }}><DollarSign size={28} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Utilidad Total</p>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>${(totales.ingresos * 0.35).toLocaleString()}</h2>
                        <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>+8% desde el mes pasado</span>
                    </div>
                    <div style={{ color: '#3b82f6' }}><TrendingUp size={28} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Productos Vendidos</p>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{totales.cantidad}</h2>
                        <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600' }}>+12% desde el mes pasado</span>
                    </div>
                    <div style={{ color: '#8b5cf6' }}><ShoppingBag size={28} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Reportes Generados</p>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{totales.reportes}</h2>
                        <span style={{ color: '#64748b', fontSize: '12px' }}>Este mes</span>
                    </div>
                    <div style={{ color: '#f59e0b' }}><FileText size={28} /></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Ingresos y Utilidad Mensual</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <LineChart data={VENTAS_HISTORICO}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="utilidad" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Ventas por Categoria</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <BarChart data={VENTAS_POR_CATEGORIA_REPORTES}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="cantidad" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <section style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Detalles por Categoria</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>Categoria</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#475569', textAlign: 'center' }}>Cantidad Vendida</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#475569', textAlign: 'right' }}>Ventas Totales</th>
                                <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: '#475569', textAlign: 'right' }}>% del Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VENTAS_POR_CATEGORIA_REPORTES.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>{item.nombre}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>{item.cantidad}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#10b981', fontWeight: '600', textAlign: 'right' }}>${item.ventas.toLocaleString()}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#3b82f6', fontWeight: '600', textAlign: 'right' }}>{item.porcentaje}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}