import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Lock,
} from "lucide-react";
import "../stylesheets/Footer.css";

function Footer() {
  return (
    <footer className="sc-footer">
      <div className="sc-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Shield size={16} />
              </div>
              <span className="logo-text">
                Secure<span className="logo-highlight">Com</span>
              </span>
            </div>
            <p>
              Proveemos soluciones robustas en comunicaciones seguras para
              proteger a su empresa de las amenazas digitales. Su privacidad y
              confianza son nuestra prioridad.
            </p>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Nuestros Servicios</h4>
            <ul>
              <li>
                <Lock size={12} className="footer-list-icon" />
                Mensajería Segura
              </li>
              <li>
                <Lock size={12} className="footer-list-icon" />
                Videollamadas Protegidas
              </li>
              <li>
                <Lock size={12} className="footer-list-icon" />
                Cifrado Extremo a Extremo
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contáctanos</h4>
            <ul>
              <li>
                <Phone size={14} className="footer-list-icon" />
                +57 322 360 3288
              </li>
              <li>
                <Mail size={14} className="footer-list-icon" />
                soporteti@bmstecnology.com
              </li>
              <li>
                <MapPin size={14} className="footer-list-icon" />
                Bogotá, D.C., Colombia
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4>Información Legal</h4>
            <ul>
              <li>
                <Link to="/">Política de Privacidad</Link>
              </li>
              <li>
                <Link to="/">Términos y Condiciones</Link>
              </li>
              <li>
                <Link to="/">Aviso Legal</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-separator" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BMSTecnology — Comunicaciones Seguras. Todos los derechos reservados.</p>
          <p className="footer-built">
            <Lock size={12} className="footer-list-icon" />
            Construido con tecnología segura y cifrada
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
