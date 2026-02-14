import React from 'react';

export const productosData = [
    { id: '7501055300013', nombre: 'Coca-Cola 600ml', categoria: 'Bebidas', proveedor: 'Coca-Cola FEMSA', costo: 10.00, precio: 15.00, stock: 50, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501055300020', nombre: 'Sabritas Originales 45g', categoria: 'Botanas', proveedor: 'Sabritas México', costo: 12.00, precio: 18.00, stock: 8, estado: 'Stock Bajo', sucursal: 'Sucursal Norte' },
    { id: '7501055300037', nombre: 'Ruffles Queso 55g', categoria: 'Botanas', proveedor: 'Sabritas México', costo: 13.00, precio: 20.00, stock: 20, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501000100019', nombre: 'Bimbo Pan Blanco Grande', categoria: 'Panadería', proveedor: 'Grupo Bimbo', costo: 28.00, precio: 38.00, stock: 15, estado: 'Disponible', sucursal: 'Sucursal Norte' },
    { id: '7501055300044', nombre: 'Leche Lala Entera 1L', categoria: 'Lácteos', proveedor: 'Grupo Lala', costo: 17.00, precio: 22.00, stock: 5, estado: 'Stock Bajo', sucursal: 'Sucursal Centro' },
    { id: '7501055300051', nombre: 'Doritos Nacho 62g', categoria: 'Botanas', proveedor: 'Sabritas México', costo: 13.00, precio: 19.00, stock: 1, estado: 'Stock Bajo', sucursal: 'Sucursal Norte' },
    { id: '7501055300068', nombre: 'Pepsi 600ml', categoria: 'Bebidas', proveedor: 'PepsiCo', costo: 9.00, precio: 13.50, stock: 40, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501055300075', nombre: 'Takis Fuego 62g', categoria: 'Botanas', proveedor: 'Barcel', costo: 12.00, precio: 18.00, stock: 3, estado: 'Stock Bajo', sucursal: 'Sucursal Norte' },
    { id: '7501055300082', nombre: 'Agua Ciel 600ml', categoria: 'Bebidas', proveedor: 'Coca-Cola FEMSA', costo: 6.00, precio: 10.00, stock: 100, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501055300099', nombre: 'Gansito Marinela', categoria: 'Panadería', proveedor: 'Grupo Bimbo', costo: 8.00, precio: 12.00, stock: 25, estado: 'Disponible', sucursal: 'Sucursal Norte' },
    { id: '7501055300105', nombre: 'Cheetos Puffs 45g', categoria: 'Botanas', proveedor: 'Sabritas México', costo: 11.00, precio: 16.00, stock: 12, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501055300112', nombre: 'Sprite 600ml', categoria: 'Bebidas', proveedor: 'Coca-Cola FEMSA', costo: 9.00, precio: 14.00, stock: 30, estado: 'Disponible', sucursal: 'Sucursal Norte' },
    { id: '7501055300129', nombre: 'Panditas Ricolino 100g', categoria: 'Dulces', proveedor: 'Ricolino', costo: 15.00, precio: 22.00, stock: 18, estado: 'Disponible', sucursal: 'Sucursal Centro' },
    { id: '7501055300136', nombre: 'Choco Roles Marinela', categoria: 'Panadería', proveedor: 'Grupo Bimbo', costo: 9.00, precio: 13.00, stock: 20, estado: 'Disponible', sucursal: 'Sucursal Norte' },
    { id: '7501055300143', nombre: 'Gamesa Arcoiris 150g', categoria: 'Galletas', proveedor: 'Gamesa', costo: 16.00, precio: 24.00, stock: 14, estado: 'Disponible', sucursal: 'Sucursal Centro' }
];

export const DATA_PRODUCTOS_INICIAL = productosData;

const ListaProductos = () => {
    return (
        <div className="table-card">
            <div className="demand-header">
                <h3 className="chart-title">Productos con Mayor Demanda</h3>
                <span className="view-all" style={{ color: '#0c3b8d', cursor: 'pointer', fontWeight: '600' }}>Ver Todos</span>
            </div>
            <div className="demand-list">
                {productosData.slice(0, 5).map((p, i) => (
                    <div key={p.id} className="demand-row">
                        <div className="demand-left">
                            <div className="rank-badge-blue">{i + 1}</div>
                            <div className="prod-info">
                                <span className="prod-name">{p.nombre}</span>
                                <span className="prod-cat">{p.categoria}</span>
                            </div>
                        </div>
                        <div className="prod-price">${p.precio.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaProductos;