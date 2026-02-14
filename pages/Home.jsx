import React from "react";
import "./Home.css";
import ilustracionHome from "../paginaprincipal.png"; 

function Home({ logo, onLoginClick, onRegisterClick, onAboutClick, onHelpClick }) {
  return (
    <div className="home-master-wrapper">
      <header className="home-white-strip top">
        <div className="home-container-wide">
          <div className="home-brand" onClick={() => window.location.reload()}>
            <img src={logo} alt="Logo TECHSTORE" className="home-logo-img" />
            <span className="home-brand-name">TECHSTORE</span>
          </div>
          <nav className="home-nav-links">
            <button className="nav-text-btn" onClick={onAboutClick}>Conócenos</button>
            <button className="nav-text-btn" onClick={onHelpClick}>Ayuda</button>
          </nav>
        </div>
      </header>

      <main className="home-blue-section" style={{ backgroundImage: `url(${ilustracionHome})` }}>
        <div className="hero-content-center">
          {/* Solo se muestra el título y el eslogan */}
          <h1 className="home-hero-title-main">
            TECHSTORE: Prototipo de aplicación web para el apoyo de la administración de microempresas en la CDMX
          </h1>
          
          <p className="home-hero-subtitle-elegant">
            Impulsamos la digitalización con soluciones accesibles para administrar productos, ventas y clientes.
          </p>
          
          <div className="home-hero-actions-styled">
            <button className="btn-primary-blue-new" onClick={onLoginClick}>Iniciar sesión</button>
            <button className="btn-secondary-outline" onClick={onRegisterClick}>Registrarse</button>
          </div>
        </div>
      </main>

      <footer className="home-white-strip bottom">
        <div className="home-container-wide footer-centered">
          <p className="copyright-text">© 2026 TechStore. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;