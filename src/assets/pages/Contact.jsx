import React from "react";
import {
  Send,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import "../stylesheets/Contact.css";
import "../stylesheets/shared-styles.css";
import Footer from "../components/Footer";

function Contact() {
  const contactInfo = [
    {
      icon: <Phone size={20} />,
      label: "Teléfono",
      value: "+57 322 360 3288",
      href: "tel:+573223603288",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "soporteti@bmstecnology.com",
      href: "mailto:soporteti@bmstecnology.com",
    },
    {
      icon: <MapPin size={20} />,
      label: "Dirección",
      value: "Bogotá, D.C., Colombia",
      href: null,
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header animate-fade-in-up">
          <div className="contact-icon-box">
            <Send size={28} />
          </div>
          <h1>Contáctanos</h1>
          <p>
            Si deseas más información sobre nuestros servicios de comunicaciones
            seguras, no dudes en comunicarte con nosotros.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-cards">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className={`contact-card animate-fade-in-up delay-${(i + 1) * 100}`}
            >
              <div className="sc-card">
                <div className="contact-card-content">
                  <div
                    className="contact-icon-circle"
                    style={{ background: "var(--color-primary-10)", color: "var(--color-primary)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="contact-card-text">
                    <span className="contact-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact-value contact-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Embed */}
        <div className="contact-map animate-fade-in-up delay-400">
          <div className="sc-card" style={{ padding: 0, overflow: "hidden", border: "1px solid var(--color-border-50)" }}>
            <iframe
              title="Ubicación - Bogotá, Colombia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.620067644917!2d-74.0733568852377!3d4.654865196657618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a650d9931b5%3A0x633d455d31518f8!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sco!4v1625442533722!5m2!1sen!2sco"
              width="100%"
              height="300"
              style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Contact;
