import React from 'react';

export const VENTAS_DATA_BASE = [
    {
        id: '#VENTA-001',
        fecha: '2024-11-16 10:30',
        total: 81.00,
        utilidad: 32.40,
        metodo: 'Efectivo',
        tipo: 'Ventas',
        productos: 'Coca-Cola 600ml x3 = $45.00, Sabritas Originales 45g x2 = $36.00'
    },
    {
        id: '#VENTA-002',
        fecha: '2024-11-16 11:15',
        total: 82.00,
        utilidad: 41.00,
        metodo: 'Transferencia',
        tipo: 'Inventario',
        productos: 'Bimbo Pan Blanco Grande x1 = $38.00, Leche Lala Entera 1L x2 = $44.00'
    },
    {
        id: '#VENTA-003',
        fecha: '2024-11-16 12:00',
        total: 102.00,
        utilidad: 51.00,
        metodo: 'Efectivo',
        tipo: 'Ventas',
        productos: 'Takis Fuego 62g x4 = $72.00, Agua Ciel 600ml x3 = $30.00'
    },
    {
        id: '#VENTA-004',
        fecha: '2024-11-16 13:30',
        total: 65.00,
        utilidad: 26.00,
        metodo: 'Transferencia',
        tipo: 'General',
        productos: 'Doritos Nacho 62g x2 = $38.00, Pepsi 600ml x2 = $27.00'
    },
    {
        id: '#VENTA-005',
        fecha: '2024-11-16 14:45',
        total: 75.00,
        utilidad: 30.00,
        metodo: 'Efectivo',
        tipo: 'Ventas',
        productos: 'Gansito Marinela x5 = $60.00, Coca-Cola 600ml x1 = $15.00'
    },
    {
        id: '#VENTA-006',
        fecha: '2024-11-16 15:20',
        total: 96.00,
        utilidad: 38.40,
        metodo: 'Efectivo',
        tipo: 'Inventario',
        productos: 'Ruffles Queso 55g x3 = $60.00, Sabritas Originales 45g x2 = $36.00'
    }
];

export default function HistorialVentasDueno() {
    return (
        <div className="table-card shadow-sm" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
            <h3 className="history-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                Historial de Ventas
            </h3>
            <div className="sales-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {VENTAS_DATA_BASE.map((venta) => (
                    <div key={venta.id} className="sale-card-item" style={{ border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="sale-info-col">
                            <span className="sale-id-text" style={{ fontWeight: '700', color: '#3b82f6', marginBottom: '4px', display: 'block' }}>
                                {venta.id}
                            </span>
                            <span className="sale-date-text" style={{ fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '12px' }}>
                                {venta.fecha}
                            </span>
                            <div className="products-section">
                                <p className="products-label" style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 4px 0' }}>Productos:</p>
                                <ul style={{ paddingLeft: '18px', margin: '0', listStyleType: 'disc', color: '#64748b', fontSize: '13px' }}>
                                    {venta.productos.split(',').map((prod, index) => (
                                        <li key={index} className="product-line" style={{ marginBottom: '2px' }}>
                                            {prod.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="sale-price-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                            <span className={`method-badge-new ${venta.metodo.toLowerCase()}`} style={{
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                fontWeight: '700',
                                backgroundColor: venta.metodo === 'Efectivo' ? '#dcfce7' : '#dbeafe',
                                color: venta.metodo === 'Efectivo' ? '#166534' : '#1e40af'
                            }}>
                                {venta.metodo.toUpperCase()}
                            </span>
                            <span className="sale-total-blue" style={{ fontSize: '18px', fontWeight: '800', color: '#3b82f6' }}>
                                ${venta.total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}