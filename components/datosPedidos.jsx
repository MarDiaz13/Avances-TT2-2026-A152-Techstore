// src/components/datosPedidos.js
export const DATA_PEDIDOS = [
  { 
    id: '#PED-001', 
    cliente: 'Juan Pérez', 
    estado: 'Pendiente', 
    total: 245.00, 
    fecha: '2024-11-15',
    sucursal: 'Sucursal Centro',
    detalle: [
      { producto: 'Coca-Cola 600ml', cantidad: 3, precio: 15.00, total: 45.00 },
      { producto: 'Sabritas Originales 45g', cantidad: 2, precio: 18.00, total: 36.00 }
    ]
  },
  { 
    id: '#PED-002', 
    cliente: 'María González', 
    estado: 'Completado', 
    total: 189.50, 
    fecha: '2024-11-14',
    sucursal: 'Sucursal Poniente',
    detalle: [
      { producto: 'Leche Lala Entera 1L', cantidad: 4, precio: 22.00, total: 88.00 }
    ]
  },
  { 
    id: '#PED-003', 
    cliente: 'Carlos Ramírez', 
    estado: 'Completado', 
    total: 312.00, 
    fecha: '2024-11-13',
    sucursal: 'Sucursal Centro',
    detalle: [
      { producto: 'Pan Blanco Bimbo Grande', cantidad: 1, precio: 45.00, total: 45.00 }
    ]
  },
  { 
    id: '#PED-004', 
    cliente: 'Ana López', 
    estado: 'Cancelado', 
    total: 156.00, 
    fecha: '2024-11-12',
    sucursal: 'Sucursal Poniente',
    detalle: [
      { producto: 'Galletas Oreo', cantidad: 2, precio: 22.00, total: 44.00 }
    ]
  },
  { 
    id: '#PED-005', 
    cliente: 'Roberto Sánchez', 
    estado: 'Pendiente', 
    total: 278.50, 
    fecha: '2024-11-16',
    sucursal: 'Sucursal Centro',
    detalle: [
      { producto: 'Jugo Jumex 1L', cantidad: 5, precio: 25.00, total: 125.00 }
    ]
  }
];