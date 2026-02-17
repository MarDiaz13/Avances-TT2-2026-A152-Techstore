import React, { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { PRODUCTOS_DUENO_DATA } from '../../components/ListaProductosDueno';
import ModificacionesProductos from './ModificacionesProductos';
import './Productos.css';

export default function Productos() {
    const [productos] = useState(PRODUCTOS_DUENO_DATA);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });

    const abrirModal = (tipo, producto) => {
        setModalConfig({
            isOpen: true,
            type: tipo,
            data: {
                codigo: producto.id,
                nombre: producto.nombre,
                cat: producto.categoria,
                precio: `$${producto.precio.toFixed(2)}`,
                stock: producto.stock || 0
            }
        });
    };

    const cerrarModal = () => {
        setModalConfig({ isOpen: false, type: '', data: null });
    };

    const manejarConfirmacion = (data) => {
        console.log("Accion confirmada:", data);
        cerrarModal();
    };

    return (
        <div className="contenedor-principal-dueno">
            <section className="seccion-encabezado">
                <h1>Productos</h1>
                <p>Gestiona la informacion completa de productos</p>
            </section>

            <div className="tabla-contenedor-bordes">
                <table className="tabla-productos-exacta">
                    <thead>
                        <tr>
                            <th>Codigo de Barras</th>
                            <th>Producto</th>
                            <th>Categoria</th>
                            <th>Proveedor</th>
                            <th>Costo</th>
                            <th>Precio</th>
                            <th className="texto-centrado">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((prod) => (
                            <tr key={prod.id}>
                                <td className="col-sku">{prod.id}</td>
                                <td className="col-nombre">{prod.nombre}</td>
                                <td className="col-categoria">{prod.categoria}</td>
                                <td className="col-proveedor">{prod.proveedor}</td>
                                <td className="col-precio">${prod.costo.toFixed(2)}</td>
                                <td className="col-precio">${prod.precio.toFixed(2)}</td>
                                <td className="col-acciones">
                                    <button className="accion-edit" onClick={() => abrirModal('editar', prod)}>
                                        <Edit3 size={18} />
                                    </button>
                                    <button className="accion-delete" onClick={() => abrirModal('borrar', prod)}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModificacionesProductos
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                data={modalConfig.data}
                onClose={cerrarModal}
                onConfirm={manejarConfirmacion}
            />

            <footer className="footer-replica-original">
                &copy; 2026 TechStore. Todos los derechos reservados.
            </footer>
        </div>
    );
}