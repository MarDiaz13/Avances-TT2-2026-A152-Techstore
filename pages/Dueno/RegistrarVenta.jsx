import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { DATA_PRODUCTOS_INICIAL } from '../../components/ListaProductos'; 
import './RegistrarVenta.css';

export default function RegistrarVenta() {
    const [carrito, setCarrito] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    const productosFiltrados = DATA_PRODUCTOS_INICIAL.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.id.includes(busqueda)
    );

    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) {
            setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <div className="venta-container">
            <div className="venta-grid">
                {/* Buscador */}
                <div className="seccion-busqueda">
                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <div className="resultados-busqueda">
                        {productosFiltrados.map(prod => (
                            <div key={prod.id} className="item-resultado" onClick={() => agregarAlCarrito(prod)}>
                                <span>{prod.nombre}</span>
                                <b>${prod.precio.toFixed(2)}</b>
                            </div>
                        ))}
                    </div>
                </div>

            
                <div className="seccion-carrito">
                    <h3><ShoppingCart size={20} /> Carrito de Venta</h3>
                    <div className="lista-carrito">
                        {carrito.map(item => (
                            <div key={item.id} className="cart-item">
                                <span>{item.nombre} (x{item.cantidad})</span>
                                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="total-box">
                        <p>Total a Pagar:</p>
                        <h2>${total.toFixed(2)}</h2>
                        <button className="btn-cobrar"><CheckCircle size={20} /> COBRAR AHORA</button>
                    </div>
                </div>
            </div>
        </div>
    );
}