import React from 'react';

export default function HistorialVentas() {
    const ventasData = [
        { id: '#VENTA-001', fecha: '2024-11-16 10:30', total: 81.00, metodo: 'Efectivo', productos: 'Coca-Cola 600ml x3 = $45.00, Sabritas Originales 45g x2 = $36.00' },
        { id: '#VENTA-002', fecha: '2024-11-16 11:15', total: 82.00, metodo: 'Transferencia', productos: 'Bimbo Pan Blanco Grande x1 = $38.00, Leche Lala Entera 1L x2 = $44.00' },
        { id: '#VENTA-003', fecha: '2024-11-16 12:00', total: 102.00, metodo: 'Efectivo', productos: 'Takis Fuego 62g x4 = $72.00, Agua Ciel 600ml x3 = $30.00' },
        { id: '#VENTA-004', fecha: '2024-11-16 13:30', total: 65.00, metodo: 'Transferencia', productos: 'Doritos Nacho 62g x2 = $38.00, Pepsi 600ml x2 = $27.00' },
        { id: '#VENTA-005', fecha: '2024-11-16 14:45', total: 75.00, metodo: 'Efectivo', productos: 'Gansito Marinela x5 = $60.00, Coca-Cola 600ml x1 = $15.00' },
        { id: '#VENTA-006', fecha: '2024-11-16 15:20', total: 96.00, metodo: 'Efectivo', productos: 'Ruffles Queso 55g x3 = $60.00, Sabritas Originales 45g x2 = $36.00' }
    ];

    return (
        <div className="table-card">
            <h3 className="history-title">Historial de Ventas</h3>
            <div className="sales-stack">
                {ventasData.map((venta) => (
                    <div key={venta.id} className="sale-card-item">
                        <div className="sale-info-col">
                            <span className="sale-id-text" style={{ marginBottom: '5px', display: 'block' }}>
                                {venta.id}
                            </span>
                            <span className="sale-date-text">{venta.fecha}</span>
                            <div className="products-section">
                                <p className="products-label">Productos:</p>
                                <ul style={{ paddingLeft: '20px', margin: '0', listStyleType: 'disc' }}>
                                    {venta.productos.split(',').map((prod, index) => (
                                        <li key={index} className="product-line">
                                            {prod.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="sale-price-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                            <span className={`method-badge-new ${venta.metodo.toLowerCase()}`}>
                                {venta.metodo}
                            </span>
                            <span className="sale-total-blue">${venta.total.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}