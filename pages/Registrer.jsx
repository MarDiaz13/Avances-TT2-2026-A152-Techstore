import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Phone, Check, X } from 'lucide-react';
import './Registrer.css'; 

export default function Registrer({ logo }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const getSecurityLevel = () => {
    if (password.length === 0) return { width: '0%', color: '#e5e7eb', label: '' };
    const score = Object.values(validations).filter(Boolean).length;
    switch (score) {
      case 1: return { width: '25%', color: '#dc2626', label: 'Nivel Muy Bajo' };
      case 2: return { width: '50%', color: '#facc15', label: 'Nivel Medio' };
      case 3: return { width: '75%', color: '#fb923c', label: 'Nivel Seguro' };
      case 4: return { width: '100%', color: '#16a34a', label: 'Nivel Muy Seguro' };
      default: return { width: '10%', color: '#dc2626', label: 'Insegura' };
    }
  };

  const security = getSecurityLevel();

  return (
    <div className="register-screen">
      <button onClick={() => navigate("/")} className="register-nav-back">
        <ArrowLeft size={18} /> <span>Volver al inicio</span>
      </button>

      <div className="register-central-container">
        <header className="register-header-centered">
          <img src={logo} alt="Logo" className="register-logo-img" />
          <h1 className="register-main-name">TECHSTORE</h1>
          <p className="register-main-tagline">
            Prototipo de aplicación web para el apoyo de la administración de microempresas en la CDMX
          </p>
        </header>

        <div className="register-form-card">
          <h2 className="register-card-title">Crear Cuenta</h2>
          <p className="register-card-subtitle">Completa los datos para registrarte</p>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="register-input-row">
              <label>Nombres *</label>
              <div className="register-field-with-icon">
                <User size={16} className="register-field-icon" />
                <input type="text" placeholder="Ingresa tus nombres" required />
              </div>
            </div>

            <div className="register-input-row">
              <label>Apellidos *</label>
              <div className="register-field-with-icon">
                <User size={16} className="register-field-icon" />
                <input type="text" placeholder="Ingresa tus apellidos" required />
              </div>
            </div>

            <div className="register-input-row">
              <label>Correo Electrónico *</label>
              <div className="register-field-with-icon">
                <Mail size={16} className="register-field-icon" />
                <input type="email" placeholder="ejemplo@correo.com" required />
              </div>
            </div>

            <div className="register-input-row">
              <label>Teléfono *</label>
              <div className="register-field-with-icon">
                <Phone size={16} className="register-field-icon" />
                <input type="tel" placeholder="55 1234 5678" required />
              </div>
            </div>

            <div className="register-input-row">
              <label>Contraseña *</label>
              <div className="register-field-with-icon">
                <Lock size={16} className="register-field-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Crea una contraseña segura" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="register-eye-btn">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="register-strength-meter">
                <div className="register-bar-bg">
                  <div className="register-bar-fill" style={{ width: security.width, background: security.color }}></div>
                </div>
                <span style={{ color: security.color }} className="register-strength-label">{security.label}</span>
              </div>

              <div className="register-validations-box">
                <div className={validations.length ? "val-ok" : "val-no"}>
                  {validations.length ? <Check size={12}/> : <X size={12}/>} Al menos 8 caracteres
                </div>
                <div className={validations.upper ? "val-ok" : "val-no"}>
                  {validations.upper ? <Check size={12}/> : <X size={12}/>} Una letra mayúscula
                </div>
                <div className={validations.number ? "val-ok" : "val-no"}>
                  {validations.number ? <Check size={12}/> : <X size={12}/>} Al menos un número
                </div>
                <div className={validations.special ? "val-ok" : "val-no"}>
                  {validations.special ? <Check size={12}/> : <X size={12}/>} Un carácter especial
                </div>
              </div>
            </div>

            <div className="register-input-row">
              <label>Confirmar Contraseña *</label>
              <div className="register-field-with-icon">
                <Lock size={16} className="register-field-icon" />
                <input 
                  type="password" 
                  placeholder="Confirma tu contraseña" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="register-terms-row">
              <input type="checkbox" required />
              <p>
                Al registrarme como cliente de TECHSTORE, acepto que mis datos personales serán tratados conforme a la Ley Federal de Protección de Datos Personales.
              </p>
            </div>

            <div className="register-terms-row">
              <input type="checkbox" required />
              <p>
                Al registrarme como cliente de TECHSTORE, acepto que mis datos personales (nombre, apellidos, correo electrónico y teléfono) serán tratados conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Los datos podrán ser utilizados para gestionar mi cuenta, procesar mis pedidos, enviar notificaciones sobre el estatus de mis compras y, con mi consentimiento, recibir comunicaciones promocionales de productos o servicios. Puedo ejercer mis derechos de acceso, rectificación, cancelación y oposición en cualquier momento.
              </p>
            </div>

            <button type="submit" className="register-submit-btn">
              Registrarme
            </button>
          </form>

          <div className="register-redirect">
            <p>
              ¿Ya tienes una cuenta? <span onClick={() => navigate("/login")} className="register-link-bold">Inicia sesión aquí</span>
            </p>
          </div>
        </div>

        <footer className="register-footer-simple">
            © 2026 TechStore. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}