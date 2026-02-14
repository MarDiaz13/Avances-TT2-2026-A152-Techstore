import React, { useState, useEffect } from 'react';
import './HelpCenter.css';
import logoStore from '../logo.jpg';

export function HelpCenter({ onBackClick }) {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            q: '¿Cómo crear una cuenta?',
            a: 'Para crear una cuenta, haz clic en "Regístrate aquí" desde la página de inicio de sesión. Completa el formulario con tu información personal, de contacto y crea una contraseña segura.'
        },
        {
            q: '¿Cómo recuperar mi contraseña?',
            a: 'Si olvidaste tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Recibirás un correo electrónico con instrucciones para restablecerla.'
        },
        {
            q: '¿Por qué no puedo iniciar sesión después de registrarme?',
            a: 'Verifica que hayas confirmado tu dirección de correo electrónico haciendo clic en el enlace que te enviamos. También asegúrate de estar usando las credenciales correctas.'
        },
        {
            q: '¿Cómo buscar un producto?',
            a: 'Utiliza la barra de búsqueda en la parte superior de cualquier página. También puedes navegar por categorías en el menú principal para encontrar lo que necesitas.'
        },
        {
            q: '¿Cómo agregar productos al carrito?',
            a: 'En la página del producto que deseas comprar, selecciona las opciones necesarias (como tamaño o color) y haz clic en "Agregar al carrito". El producto se guardará hasta que estés listo para finalizar tu compra.'
        },
        {
            q: '¿Puedo modificar la cantidad de producto en el carrito?',
            a: 'Sí, puedes modificar la cantidad directamente desde tu carrito de compras usando los botones "+" y "-" junto a cada producto. También puedes eliminar productos completamente.'
        },
        {
            q: '¿Cómo finalizar mi compra?',
            a: 'Una vez que hayas agregado todos los productos deseados a tu carrito, haz clic en "Finalizar compra". Completa la información de envío y pago para confirmar tu pedido.'
        },
        {
            q: '¿Cuál es el estado de mi pedido?',
            a: 'Puedes verificar el estado de tu pedido en tu cuenta, en la sección "Mis Pedidos". También recibirás actualizaciones por correo electrónico en cada etapa del proceso de entrega.'
        },
        {
            q: '¿Cómo se sincroniza el inventario con las ventas?',
            a: 'El sistema descuenta automáticamente las unidades del stock en cuanto se confirma una venta. Esto permite que los clientes siempre vean la disponibilidad real de los productos en la tienda.'
        },
        {
            q: '¿El sistema permite gestionar diferentes categorías de productos?',
            a: 'Sí, TECHSTORE organiza los productos por categorías como Abarrotes, Lácteos, Limpieza, etc., facilitando tanto la administración para el tendero como la búsqueda para el cliente.'
        },
        {
            q: '¿Cómo puedo ver el reporte de ventas diarias?',
            a: 'Desde el panel de administración, el sistema genera un resumen de las transacciones realizadas, permitiendo ver el total de ingresos y los productos más vendidos durante el día.'
        },
        {
            q: '¿Es posible actualizar los precios de forma masiva?',
            a: 'El sistema cuenta con un panel de edición de catálogo donde el administrador puede modificar precios, descripciones e imágenes de forma rápida para mantener la información al día.'
        },
        {
            q: '¿El sistema envía alertas de stock bajo?',
            a: 'Sí, TECHSTORE incluye una función de monitoreo que notifica visualmente al administrador cuando un producto está por debajo de su límite mínimo, ayudando a prevenir desabastos.'
        },
        {
            q: '¿Se pueden registrar ventas realizadas directamente en el mostrador?',
            a: '¡Claro! El sistema está diseñado para ser una herramienta integral, permitiendo registrar tanto pedidos en línea como ventas físicas para llevar un control total de la caja.'
        },
        {
            q: '¿Cómo reemplaza este sistema el uso de cuadernos de notas?',
            a: 'TECHSTORE digitaliza cada entrada y salida, eliminando el riesgo de perder información por libretas maltratadas o anotaciones ilegibles, centralizando todo en una base de datos segura.'
        },
        {
            q: '¿Puedo llevar el control de lo que le debo a mis proveedores?',
            a: 'El sistema permite registrar las entradas de mercancía y asociarlas a facturas o notas de proveedores, ayudándote a saber exactamente cuánto debes y cuándo son tus próximos pagos.'
        },
        {
            q: '¿Qué tan rápido puedo consultar el precio de un producto?',
            a: 'Gracias al buscador optimizado, tanto empleados como dueños pueden consultar el precio exacto de cualquier artículo al instante, evitando errores de memoria en el mostrador.'
        },
        {
            q: '¿El sistema ayuda a identificar los productos que más ganancia dejan?',
            a: 'Sí, a través de los reportes inteligentes, puedes visualizar no solo lo que más se vende, sino qué productos tienen el mejor margen de utilidad para tu negocio.'
        }
    ];

    return (
        <div className="help-container">
            <div className="back-nav">
                <button onClick={onBackClick} className="btn-back">
                    <span>← Volver</span>
                </button>
            </div>

            <div className="help-header-main">
                <img src={logoStore} alt="Logo" className="help-logo" />
                <h1 className="help-title-text">Preguntas Frecuentes</h1>
                <p className="help-subtitle-text">Encuentra respuestas a las preguntas más comunes</p>
            </div>

            <div className="faq-list-container">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-row">
                        <button
                            className="faq-trigger"
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            <span>{faq.q}</span>
                            <span className={`arrow ${openFaq === index ? 'up' : 'down'}`}>⌵</span>
                        </button>
                        {openFaq === index && (
                            <div className="faq-content">
                                <p>{faq.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="help-footer-box">
                <p>¿Necesitas más ayuda?</p>
                <p>Escríbenos a:</p>
                <a href="mailto:correo@techstore.com" className="help-mail">correo</a>
            </div>
        </div>
    );
}