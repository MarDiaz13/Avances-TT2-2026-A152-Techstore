// src/components/datosDashboard.jsx

export const informacionFinanciera = {
    stats: [
        {
            title: "Ventas del Dia",
            value: "$2,450.00 MXN",
            sub: "↑ +10% desde ayer",
            color: "#3b82f6",
            type: 'ventas'
        },
        {
            title: "Utilidad Total",
            value: "$1,820.00 MXN",
            sub: "↑ +5% desde ayer",
            color: "#ef4444",
            type: 'utilidad'
        },
        {
            title: "Margen de Ganancia",
            value: "$630.00 MXN",
            sub: "↑ Margen 30%",
            color: "#10b981",
            type: 'margen'
        },
        {
            title: "Productos en Stock",
            value: "315",
            sub: "125 disponibles",
            color: "#8b5cf6",
            type: 'stock'
        }
    ],
    graficaIngresos: [
        { name: 'Ene', Ingresos: 6500 },
        { name: 'Feb', Ingresos: 8200 },
        { name: 'Mar', Ingresos: 7500 },
        { name: 'Abr', Ingresos: 9100 },
        { name: 'May', Ingresos: 8500 },
        { name: 'Jun', Ingresos: 9500 },
        { name: 'Jul', Ingresos: 10500 }
    ],
    graficaUtilidad: [
        { name: 'Ene', Utilidad: 3000 },
        { name: 'Feb', Utilidad: 4100 },
        { name: 'Mar', Utilidad: 3700 },
        { name: 'Abr', Utilidad: 4800 },
        { name: 'May', Utilidad: 4600 },
        { name: 'Jun', Utilidad: 5500 },
        { name: 'Jul', Utilidad: 5600 }
    ],
    productosDemanda: [
        { id: 1, nombre: 'Coca-Cola 600ml', cat: 'Bebidas', precio: '$15.00 MXN' },
        { id: 2, nombre: 'Sabritas Originales 45g', cat: 'Botanas', precio: '$18.00 MXN' },
        { id: 3, nombre: 'Takis Fuego 62g', cat: 'Botanas', precio: '$18.00 MXN' },
        { id: 4, nombre: 'Bimbo Pan Blanco Grande', cat: 'Panaderia', precio: '$38.00 MXN' },
        { id: 5, nombre: 'Leche Lala Entera 1L', cat: 'Lacteos', precio: '$22.00 MXN' }
    ]
};

export const InformacionUsuarios = [
    { id: 1, nombre: 'Super Admin', email: 'admin@gmail.com', rol: 'Superadministrador', fecha: '31/11/2023' },
    { id: 2, nombre: 'María García', email: 'dueno@gmail.com', rol: 'Dueño', fecha: '31/12/2023' },
    { id: 3, nombre: 'Carlos López', email: 'empleado@gmail.com', rol: 'Empleado', fecha: '14/1/2024' },
    { id: 4, nombre: 'Ana Martínez', email: 'cliente@gmail.com', rol: 'Cliente', fecha: '3/1/2024' },
    { id: 5, nombre: 'Pedro Ramírez', email: 'pedro@gmail.com', rol: 'Empleado', fecha: '09/03/2024' }
];

export const HistorialVentasDueno = [
    { id: 'V-1001', fecha: '2026-03-01', cliente: 'Juan Pérez', total: '$450.00 MXN', estado: 'Completado' },
    { id: 'V-1002', fecha: '2026-03-01', cliente: 'María G.', total: '$120.00 MXN', estado: 'Completado' },
    { id: 'V-1003', fecha: '2026-02-28', cliente: 'Carlos L.', total: '$890.00 MXN', estado: 'Pendiente' },
    { id: 'V-1004', fecha: '2026-02-28', cliente: 'Ana M.', total: '$215.00 MXN', estado: 'Completado' },
    { id: 'V-1005', fecha: '2026-02-27', cliente: 'Publico General', total: '$55.00 MXN', estado: 'Completado' }
];