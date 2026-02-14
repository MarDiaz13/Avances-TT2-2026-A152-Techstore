import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import './Horario.css';

const Horario = () => {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const obtenerFechaFormateada = (date) => {
    const opciones = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    // Formato: Viernes, 16 de enero de 2026
    let stringFecha = date.toLocaleDateString('es-MX', opciones);
    return stringFecha.charAt(0).toUpperCase() + stringFecha.slice(1);
  };

  const obtenerHoraFormateada = (date) => {
    // Formato: 17:45:28
    return date.toLocaleTimeString('es-MX', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="horario-superior-display">
      <div className="horario-item">
        <Calendar size={16} className="horario-icon" />
        <span className="horario-texto-discreto">{obtenerFechaFormateada(fechaHora)}</span>
      </div>
      <div className="horario-item">
        <Clock size={16} className="horario-icon" />
        <span className="horario-texto-discreto">{obtenerHoraFormateada(fechaHora)}</span>
      </div>
    </div>
  );
};

export default Horario;