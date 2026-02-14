import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { usuariosPrueba } from "./usuariosPrueba";
import './Login.css';

function Login({ logo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarioEncontrado = usuariosPrueba.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      navigate(usuarioEncontrado.path); 
    } else {
      alert("Correo o contraseña incorrectos. Intenta con los datos de prueba.");
    }
  };

  return (
    <div className="login-screen-blue">
      {/* Botón Volver - Esquina superior izquierda */}
      <button onClick={() => navigate("/")} className="login-nav-back">
        <ArrowLeft size={18} /> <span>Volver</span>
      </button>

      <div className="login-central-container">
        <header className="login-header-centered">
          <div className="login-logo-holder">
            <img src={logo} alt="Logo" className="login-logo-img" />
          </div>
          <h1 className="login-main-name">TECHSTORE</h1>
          <p className="login-main-tagline">
            Prototipo de aplicación web para el apoyo de la administración de microempresas en la CDMX
          </p>
        </header>

        <div className="login-form-card">
          <h2 className="login-card-title">Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="login-input-row">
              <label>Correo Electrónico *</label>
              <div className="login-field-with-icon">
                <Mail size={16} className="login-field-icon" />
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="login-input-row">
              <label>Contraseña *</label>
              <div className="login-field-with-icon">
                <Lock size={16} className="login-field-icon" />
                <input 
                  type="password" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* Enlace centrado solicitado */}
            <div className="login-forgot-container">
              <p className="login-forgot-pass" onClick={() => navigate("/forgot-password")}>
                ¿Olvidaste tu contraseña?
              </p>
            </div>

            <button type="submit" className="login-enter-btn">
              Ingresar
            </button>
          </form>

          <div className="login-register-redirect">
            <p>
              ¿No tienes una cuenta? <span className="login-bold-link" onClick={() => navigate("/register")}>Regístrate aquí</span>
            </p>
          </div>
        </div>

        <footer className="login-footer-simple">
            © 2026 TechStore. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

export default Login;