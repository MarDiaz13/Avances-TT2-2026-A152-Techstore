import React, { useState, useMemo } from 'react';
import {
    Download, TrendingUp, DollarSign, ShoppingBag,
    FileText, Calendar, Loader2, CheckCircle, FileCheck
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';

import {
    VENTAS_HISTORICO,
    VENTAS_POR_CATEGORIA_REPORTES
} from '../../components/ListaProductosDueno';

export default function Reportes() {
    const [showModal, setShowModal] = useState(false);
    const [filtroTipo, setFiltroTipo] = useState('General');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
    const [modalConfig, setModalConfig] = useState({
        tipo: '',
        titulo: '',
        mensaje: '',
        icono: null,
        color: '#4285f4'
    });

    const datosFiltrados = useMemo(() => {
        if (filtroTipo === 'Por Categorías') {
            if (categoriaSeleccionada === 'Todas') return VENTAS_POR_CATEGORIA_REPORTES;
            return VENTAS_POR_CATEGORIA_REPORTES.filter(item => item.nombre === categoriaSeleccionada);
        }
        return VENTAS_POR_CATEGORIA_REPORTES;
    }, [filtroTipo, categoriaSeleccionada]);

    const totales = useMemo(() => {
        const ingresos = datosFiltrados.reduce((sum, item) => sum + item.ventas, 0);
        const cantidad = datosFiltrados.reduce((sum, item) => sum + item.cantidad, 0);
        const utilidadTotal = VENTAS_HISTORICO.reduce((sum, item) => sum + item.utilidad, 0);
        return { ingresos, cantidad, utilidadTotal, reportes: 24 };
    }, [datosFiltrados]);

    const ejecutarConsultaBD = () => new Promise(res => setTimeout(res, 1500));
    const procesarDescargaPDF = () => new Promise(res => setTimeout(res, 1500));

    const handleGenerar = async () => {
        setModalConfig({
            tipo: 'procesando',
            titulo: 'PROCESANDO...',
            mensaje: `Generando reporte de tipo: ${filtroTipo}...`,
            icono: null,
            color: '#4285f4'
        });
        setShowModal(true);
        await ejecutarConsultaBD();
        setModalConfig({
            tipo: 'exito',
            titulo: '¡Reporte Generado!',
            mensaje: `El reporte de ${filtroTipo} se ha actualizado con éxito.`,
            icono: <FileCheck size={45} color="#fff" />,
            color: '#4285f4'
        });
    };

    const handlePDF = async () => {
        setModalConfig({
            tipo: 'procesando',
            titulo: 'GENERANDO PDF...',
            mensaje: 'Preparando archivo para descarga...',
            icono: null,
            color: '#2db742'
        });
        setShowModal(true);
        await procesarDescargaPDF();
        setModalConfig({
            tipo: 'exito',
            titulo: '¡Descarga Exitosa!',
            mensaje: `El documento PDF de ${filtroTipo} ha sido guardado.`,
            icono: <Download size={45} color="#fff" />,
            color: '#2db742'
        });
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', padding: '30px', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '24px', textAlign: 'center', maxWidth: '450px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                        {modalConfig.tipo === 'procesando' ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                    <Loader2 size={60} className="animate-spin" style={{ color: modalConfig.color }} />
                                </div>
                                <h2 style={{ color: '#1e293b', marginBottom: '10px', fontWeight: '800' }}>{modalConfig.titulo}</h2>
                                <p style={{ color: '#64748b' }}>{modalConfig.mensaje}</p>
                            </>
                        ) : (
                            <>
                                <div style={{ backgroundColor: modalConfig.color, width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                                    {modalConfig.icono}
                                </div>
                                <h2 style={{ color: modalConfig.color, marginBottom: '15px', fontSize: '32px', fontWeight: '800' }}>{modalConfig.titulo}</h2>
                                <p style={{ color: '#475569', marginBottom: '35px', fontSize: '18px', lineHeight: '1.5' }}>{modalConfig.mensaje}</p>
                                <button
                                    style={{ backgroundColor: modalConfig.color, color: 'white', padding: '14px 80px', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: '800', fontSize: '18px', letterSpacing: '0.5px' }}
                                    onClick={() => setShowModal(false)}
                                >
                                    ACEPTAR
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>Reportes</h1>
                <p style={{ color: '#64748b' }}>Visualiza la información filtrada por categorías</p>
            </header>

            <section style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px', color: '#334155' }}>Filtros de Reporte</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '25px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '10px' }}>FECHA INICIAL</label>
                        <input type="date" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b' }} defaultValue="2026-01-01" />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '10px' }}>FECHA FINAL</label>
                        <input type="date" style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b' }} defaultValue="2026-01-31" />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '10px' }}>TIPO DE REPORTE</label>
                        <select
                            value={filtroTipo}
                            onChange={(e) => {
                                setFiltroTipo(e.target.value);
                                setCategoriaSeleccionada('Todas');
                            }}
                            style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b', backgroundColor: 'white', outline: 'none' }}
                        >
                            <option value="General">General</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Inventario">Inventario</option>
                            <option value="Por Categorías">Por Categorías</option>
                        </select>
                    </div>

                    {filtroTipo === 'Por Categorías' && (
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '10px' }}>SELECCIONAR CATEGORÍA</label>
                            <select
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#1e293b', backgroundColor: 'white', outline: 'none' }}
                            >
                                <option value="Todas">Todas las Categorías</option>
                                {VENTAS_POR_CATEGORIA_REPORTES.map((cat, idx) => (
                                    <option key={idx} value={cat.nombre}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                            onClick={handleGenerar}
                            style={{ backgroundColor: '#4285f4', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', flex: 1 }}
                        >
                            GENERAR REPORTE
                        </button>
                        <button
                            onClick={handlePDF}
                            style={{ backgroundColor: '#2db742', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', flex: 1 }}
                        >
                            DESCARGAR PDF
                        </button>
                    </div>
                </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>Ingresos ({filtroTipo})</p>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>${totales.ingresos.toLocaleString()}</h2>
                    </div>
                    <div style={{ color: '#2db742' }}><DollarSign size={24} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>Utilidad Total</p>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#4285f4' }}>${totales.utilidadTotal.toLocaleString()}</h2>
                    </div>
                    <div style={{ color: '#4285f4' }}><TrendingUp size={24} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>Cant. Vendida</p>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{totales.cantidad.toLocaleString()}</h2>
                    </div>
                    <div style={{ color: '#7c3aed' }}><ShoppingBag size={24} /></div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>Reportes</p>
                        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{totales.reportes}</h2>
                    </div>
                    <div style={{ color: '#f59e0b' }}><FileText size={24} /></div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px' }}>Histórico Mensual (Ingresos vs Utilidad)</h3>
                    <div style={{ width: '100%', height: '320px' }}>
                        <ResponsiveContainer>
                            <LineChart data={VENTAS_HISTORICO}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                                <Line name="Ingresos ($)" type="monotone" dataKey="ingresos" stroke="#2db742" strokeWidth={4} dot={{ r: 5, fill: '#2db742', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                                <Line name="Utilidad ($)" type="monotone" dataKey="utilidad" stroke="#4285f4" strokeWidth={4} dot={{ r: 5, fill: '#4285f4', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '25px' }}>Distribución por Ventas</h3>
                    <div style={{ width: '100%', height: '320px' }}>
                        <ResponsiveContainer>
                            <BarChart data={datosFiltrados}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="top" align="right" iconType="rect" wrapperStyle={{ paddingBottom: '20px' }} />
                                <Bar name="Ventas Totales" dataKey="ventas" fill="#4285f4" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <section style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Detalles de Categoría Seleccionada</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                <th style={{ padding: '18px 30px', fontSize: '13px', color: '#475569' }}>CATEGORIA</th>
                                <th style={{ padding: '18px 30px', fontSize: '13px', color: '#475569', textAlign: 'center' }}>CANTIDAD</th>
                                <th style={{ padding: '18px 30px', fontSize: '13px', color: '#475569', textAlign: 'right' }}>VENTAS TOTALES</th>
                                <th style={{ padding: '18px 30px', fontSize: '13px', color: '#475569', textAlign: 'right' }}>% TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosFiltrados.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '18px 30px', fontSize: '14px', color: '#1e293b', fontWeight: '600' }}>{item.nombre}</td>
                                    <td style={{ padding: '18px 30px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>{item.cantidad.toLocaleString()}</td>
                                    <td style={{ padding: '18px 30px', fontSize: '14px', color: '#2db742', fontWeight: '700', textAlign: 'right' }}>${item.ventas.toLocaleString()}</td>
                                    <td style={{ padding: '18px 30px', fontSize: '14px', color: '#4285f4', fontWeight: '700', textAlign: 'right' }}>{item.porcentaje}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}