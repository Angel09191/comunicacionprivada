import React, { useEffect } from "react";
import {
  Smartphone,
  Server,
  Mail,
  Lock,
  MessageSquare,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import "../stylesheets/Instructions.css";
import "../stylesheets/shared-styles.css";
import Footer from "../components/Footer";

export default function Instructions() {
  useEffect(() => {
    document.title = "Instructions - SecureCom";
  }, []);

  const steps = [
    {
      icon: <Smartphone size={20} />,
      title: "Descarga la aplicación",
      description: "Abre la aplicación Monocles Chat en tu teléfono móvil.",
    },
    {
      icon: <Server size={20} />,
      title: "Servidor personalizado",
      description: 'Selecciona "Iniciar sesión con servidor personalizado".',
    },
    {
      icon: <Mail size={20} />,
      title: "Ingresa tu usuario completo",
      description: "Escribe tu nombre de usuario registrado seguido de @im.bmstecnology.com",
    },
    {
      icon: <Lock size={20} />,
      title: "Contraseña",
      description: "Usa la misma contraseña que creaste durante el registro.",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "¡Conecta!",
      description: 'Presiona "Conectar" y espera unos segundos. ¡Listo!',
    },
  ];

  return (
    <div className="instructions-page">
      <div className="instructions-container">
        {/* Header */}
        <div className="instructions-header animate-scale-in">
          <div className="instructions-check-icon">
            <CheckCircle2 size={32} />
          </div>
          <h1>¡Registro exitoso!</h1>
          <p>
            Tu cuenta ha sido creada correctamente. Ahora sigue estos pasos para
            conectarte con Monocles Chat.
          </p>
        </div>

        {/* Server Info Card */}
        <div className="server-info-card sc-card-primary animate-fade-in-up delay-100">
          <Server size={20} className="server-icon" />
          <div className="server-details">
            <span className="server-label">Servidor XMPP</span>
            <span className="server-address">im.bmstecnology.com</span>
          </div>
          <span className="sc-badge">Servidor activo</span>
        </div>

        {/* Steps */}
        <div className="steps-list">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item animate-fade-in-up delay-${(i + 1) * 100}`}
            >
              <div className="sc-card">
                <div className="step-content">
                  <div
                    className="step-icon-box"
                    style={{ background: "var(--color-primary-10)", color: "var(--color-primary)" }}
                  >
                    {step.icon}
                  </div>
                  <div className="step-text">
                    <h3>
                      <span className="step-number">Paso {i + 1}</span>
                      {step.title}
                    </h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="instructions-footer animate-fade-in-up delay-500">
          <p>
            Si tienes algún problema de conexión, contacta con el equipo de soporte técnico.
          </p>
          <a href="/" className="sc-btn sc-btn-outline">
            <ChevronLeft size={16} />
            Volver al inicio
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
