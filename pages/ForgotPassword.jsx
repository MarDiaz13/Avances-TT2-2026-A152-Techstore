import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import './ForgotPassword.css';

function ForgotPassword({ logo, onBackClick }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Se han enviado instrucciones a: " + email);
  };

  return (
    <div className="forgot-password-screen">
      {/* Botón Volver posicionado en la esquina superior izquierda */}
      <button onClick={onBackClick} className="forgot-nav-back">
        <ArrowLeft size={18} /> <span>Volver</span>
      </button>

      <div className="forgot-central-container">
        <header className="forgot-header-centered">
          <img src={logo} alt="Logo" className="forgot-logo-img" />
          <h1 className="forgot-main-name">TECHSTORE</h1>
          <p className="forgot-main-tagline">
            Prototipo de aplicación web para el apoyo de la administración de microempresas en la CDMX
          </p>
        </header>

        <div className="forgot-form-card">
          <h2 className="forgot-card-title">¿Olvidaste tu contraseña?</h2>
          <p className="forgot-card-instructions">Ingresa tu correo electrónico registrado para recibir las instrucciones de recuperación.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="forgot-input-row">
              <label>Correo Electrónico</label>
              <div className="forgot-field-with-icon">
                <Mail size={16} className="forgot-field-icon" />
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="forgot-submit-btn">
              Recuperar Contraseña
            </button>
          </form>
        </div>

        <footer className="forgot-footer-simple">
            © 2026 TechStore. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

export default ForgotPassword;