import React, { useState } from 'react';
/* CORRECCIÓN: Eliminamos 'Info' para evitar el warning de compilación */
import { Shield, X, FileText, ExternalLink } from 'lucide-react';
import './BannerIPN.css';

export default function BannerIPN() {
  const [showModal, setShowModal] = useState(false);

  const leyes = [
    {
      titulo: "Ley Federal de Protección de Datos Personales",
      sub: "en Posesión de los Particulares",
      url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf"
    },
    {
      titulo: "Ley Orgánica del Instituto Politécnico Nacional",
      sub: "Publicada en el DOF el 29-12-1981",
      url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/171.pdf"
    },
    {
      titulo: "Ley Federal del Derecho de Autor",
      sub: "Última reforma publicada DOF 01-07-2020",
      url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFDA.pdf"
    }
  ];

  return (
    <>
      <div className="banner-aesthetic-container">
        {/* Fila superior: Identificación y Acciones */}
        <div className="banner-top-bar">
          <div className="banner-left-section">
            <div className="tt-badge-new">TT: 2026-A152</div>
            <div className="institution-tag">
              <Shield size={14} className="shield-icon" />
              <span>Proyecto Académico ESCOM - IPN</span>
            </div>
          </div>
          
          <div className="banner-right-section">
            <button className="btn-legal-glass" onClick={() => setShowModal(true)}>
              <FileText size={14} />
              <span>Políticas y Marco Jurídico</span>
            </button>
          </div>
        </div>

        {/* Fila inferior: Título Real con estilo tipográfico */}
        <div className="banner-title-area">
          <h1 className="main-project-title">
            TECHSTORE: Prototipo de aplicación web para el apoyo de la administración de microempresas en la CDMX
          </h1>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-glass">
            <button className="modal-close-icon" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-header-styled">
              <h2>Aviso de Privacidad</h2>
              <p>Marco Normativo TT: 2026-A152</p>
            </div>
            <div className="modal-body-custom">
              <div className="leyes-container">
                {leyes.map((ley, index) => (
                  <a key={index} href={ley.url} target="_blank" rel="noopener noreferrer" className="ley-card">
                    <div className="ley-info">
                      <strong>{ley.titulo}</strong>
                      <small>{ley.sub}</small>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </div>
            <button className="btn-modal-confirm" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}