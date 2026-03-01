import React, { useState } from 'react';
import { Info, Search } from 'lucide-react';
import { PRODUCTOS_DUENO_DATA } from '../../components/ListaProductosDueno';
import './Inventario.css';

export default function Inventario() {
    const [searchTerm, setSearchTerm] = useState('');

    const PRODUCTOS_ESTATICOS = PRODUCTOS_DUENO_DATA.map((prod, index) => {
        const stocksFijos = [48, 35, 5, 12, 24, 30, 41, 32, 65, 40, 11, 9, 15, 9, 16, 12, 8, 6, 10, 18];
        return {
            ...prod,
            stock: stocksFijos[index] || 0
        };
    });

    const productosFiltrados = PRODUCTOS_ESTATICOS.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.includes(searchTerm)
    );

    const calcularUtilidadReal = (costo, precio) => {
        const ganancia = precio - costo;
        const porcentaje = ((ganancia / precio) * 100).toFixed(1);
        return { ganancia, porcentaje };
    };

    return (
        <div className="inventario-view-container">
            <div className="inv-header-titles">
                <h1 className="inv-title">Inventario</h1>
                <p className="inv-subtitle">Visualiza el estado del inventario</p>
            </div>

            <div className="inv-alert-info">
                <div className="inv-alert-content">
                    <div className="inv-info-icon-circle">
                        <Info size={16} />
                    </div>
                    <span>Esta es una vista de <strong>solo lectura</strong> del inventario. Para editar productos, ve al menú de <strong>Productos</strong>.</span>
                </div>
            </div>

            <div className="inv-search-section">
                <div className="inv-search-wrapper">
                    <Search size={20} className="inv-search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por codigo o nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="inv-table-scroll">
                <table className="inv-main-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock Actual</th>
                            <th>Costo Unitario</th>
                            <th>Precio de Venta</th>
                            <th>Ganancia/Utilidad</th>
                            <th>Estado del Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((prod) => {
                            const { ganancia, porcentaje } = calcularUtilidadReal(prod.costo, prod.precio);
                            const lowStock = prod.stock <= 10;
                            return (
                                <tr key={prod.id}>
                                    <td>
                                        <div className="inv-prod-info">
                                            <span className="inv-prod-name">{prod.nombre}</span>
                                            <span className="inv-prod-id">{prod.id}</span>
                                        </div>
                                    </td>
                                    <td>{prod.categoria}</td>
                                    <td>{prod.stock}</td>
                                    <td>${prod.costo.toFixed(2)}</td>
                                    <td>${prod.precio.toFixed(2)}</td>
                                    <td>
                                        <span className="inv-text-profit">
                                            ${ganancia.toFixed(2)} ({porcentaje}%)
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`inv-badge ${lowStock ? 'inv-badge-low' : 'inv-badge-ok'}`}>
                                            {lowStock ? 'Stock Bajo' : 'Disponible'}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}