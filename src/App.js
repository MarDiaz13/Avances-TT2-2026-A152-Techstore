import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registrer from "./pages/Registrer"; 
import ForgotPassword from "./pages/ForgotPassword";
import { About } from "./pages/About"; 
import { HelpCenter } from "./pages/HelpCenter"; 
import DashboardAdmin from "./pages/Superadministrador/Dashboard"; 
import DashboardDueno from "./pages/Dueno/Dashboard"; 
import logoStore from "./logo.jpg"; 
import BannerIPN from "./components/BannerIPN";

function AppContent() {
  const navigate = useNavigate();

  // Función central para volver al inicio
  const handleBackToHome = () => navigate("/");
  const handleLogout = () => navigate("/login");

  return (
    <Routes>
      <Route path="/" element={
        <Home 
          logo={logoStore} 
          onLoginClick={() => navigate("/login")} 
          onRegisterClick={() => navigate("/register")}
          onAboutClick={() => navigate("/about")} 
          onHelpClick={() => navigate("/help")} 
        />
      } />

      {/* Se usa onBackClick para que coincida con tus componentes */}
      <Route path="/about" element={
        <About 
          logo={logoStore} 
          onBackClick={handleBackToHome} 
        />
      } />
      
      <Route path="/help" element={
        <HelpCenter 
          onBackClick={handleBackToHome} 
        />
      } />
      
      <Route path="/login" element={
        <Login 
          logo={logoStore} 
          onBackClick={handleBackToHome} 
        />
      } />
      
      <Route path="/register" element={
        <Registrer 
          logo={logoStore} 
          onBackClick={handleBackToHome} 
        />
      } />
      
      <Route path="/forgot-password" element={
        <ForgotPassword 
          logo={logoStore} 
          onBackClick={() => navigate("/login")} 
        />
      } />
      
      <Route 
        path="/superadmin/dashboard" 
        element={<DashboardAdmin onLogout={handleLogout} />} 
      />
      <Route 
        path="/dueno/dashboard" 
        element={<DashboardDueno onLogout={handleLogout} />} 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BannerIPN /> 
        <AppContent />
      </div>
    </BrowserRouter>
  );
}