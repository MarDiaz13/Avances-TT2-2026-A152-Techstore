
export const SUCURSALES = [
  { id: 1, nombre: "Sucursal Centro", ubicación: "Col. Centro, CDMX", encargado: "Carlos López" },
  { id: 2, nombre: "Sucursal Norte", ubicación: "Lindavista, CDMX", encargado: "Ana Martínez" },
  { id: 3, nombre: "Sucursal Poniente", ubicación: "Santa Fe, CDMX", encargado: "Lucía Torres" }
];

export const USUARIOS_REGISTRADOS = [
  { id: 1, nombre: "Carlos López", correo: "carlos.lopez@gmail.com", rol: "Dueño", estado: "Activo", tiendaId: 1 },
  { id: 2, nombre: "Ana García", correo: "ana.garcia@gmail.com", rol: "Empleado", estado: "Activo", tiendaId: 2 },
  { id: 3, nombre: "Juan Pérez", correo: "juan.perez@gmail.com", rol: "Cliente", estado: "Activo", tiendaId: 1 },
  { id: 4, nombre: "María González", correo: "maria.gonzalez@gmail.com", rol: "Cliente", estado: "Activo", tiendaId: 2 },
  { id: 5, nombre: "Roberto Sánchez", correo: "roberto.sanchez@gmail.com", rol: "Empleado", estado: "Inactivo", tiendaId: 1 }
];

export const INVENTARIO_GLOBAL = [
  { id: 1, tiendaId: 1, nombre: "Coca-Cola 600ml", sku: "7501055300013", categoria: "Bebidas", stock: 48, costo: 10.00, venta: 15.00, estado: "Disponible" },
  { id: 2, tiendaId: 1, nombre: "Sabritas Originales 45g", sku: "7501055300020", categoria: "Botanas", stock: 35, costo: 12.00, venta: 18.00, estado: "Disponible" },
  { id: 3, tiendaId: 1, nombre: "Ruffles Queso 55g", sku: "7501055300037", categoria: "Botanas", stock: 5, costo: 13.00, venta: 20.00, estado: "Stock Bajo" },
  { id: 4, tiendaId: 1, nombre: "Bimbo Pan Blanco Grande", sku: "7501000100019", categoria: "Panadería", stock: 12, costo: 28.00, venta: 38.00, estado: "Disponible" },
  { id: 5, tiendaId: 1, nombre: "Leche Lala Entera 1L", sku: "7501055300044", categoria: "Lácteos", stock: 24, costo: 17.00, venta: 22.00, estado: "Disponible" },
  { id: 6, tiendaId: 1, nombre: "Gamesa Marinela", sku: "7501055300051", categoria: "Galletas", stock: 32, costo: 19.00, venta: 28.00, estado: "Disponible" },
];