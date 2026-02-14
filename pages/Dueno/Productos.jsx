import React, { useState } from 'react';
import { Plus, Store, ChevronRight, ArrowLeft } from 'lucide-react';
import { DATA_PRODUCTOS_INICIAL } from '../../components/ListaProductos'; // Ruta corregida
import { SUCURSALES } from '../../components/datosTienda';
import './Productos.css';

export default function Productos() {
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState(null);
    const [productos] = useState(DATA_PRODUCTOS_INICIAL);

    const productosFiltrados = productos.filter((prod) => {
        if (!tiendaSeleccionada) return false;
        return prod.sucursal === tiendaSeleccionada.nombre;
    });

    return (
        <div className="view-container">
            {!tiendaSeleccionada ? (
                <>
                    <h1 className="view-title">Inventario por Sucursal</h1>
                    <div className="table-card-wrapper">
                        {SUCURSALES.map((tienda) => (
                            <div key={tienda.id} className="store-item-row" onClick={() => setTiendaSeleccionada(tienda)}>
                                <div className="store-info-flex">
                                    <Store size={20} color="#3b82f6" />
                                    <span>{tienda.nombre}</span>
                                </div>
                                <ChevronRight size={18} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button className="btn-back" onClick={() => setTiendaSeleccionada(null)}>
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <h2>Productos en {tiendaSeleccionada.nombre}</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Stock</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.stock || 0}</td>
                                    <td>${prod.precio.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}