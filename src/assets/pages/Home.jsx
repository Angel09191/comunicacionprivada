import React from "react";
import {
  Shield,
  Lock,
  MessageSquare,
  Send,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Server,
  Smartphone,
  UserPlus,
  Zap,
  CheckCircle2,
  Globe,
  ArrowRight,
} from "lucide-react";
import "../stylesheets/Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* ─── Hero Section ─── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>
        <div className="sc-container hero-content">
          <div className="hero-text">
            <div className="animate-scale-in">
              <span className="sc-badge">
                <Shield className="badge-icon" />
                Seguridad de nivel empresarial
              </span>
            </div>
            <h1 className="animate-fade-in-up delay-100">
              Comunicaciones{" "}
              <span className="gradient-text">
                Seguras y Privadas
              </span>
            </h1>
            <p className="animate-fade-in-up delay-200">
              Protege tus conversaciones con cifrado extremo a extremo. Conecta con
              Monocles Chat y disfruta de mensajería privada, segura y libre de
              vigilancia.
            </p>
            <div className="hero-buttons animate-fade-in-up delay-300">
              <a href="/signup" className="sc-btn sc-btn-primary sc-btn-lg">
                <UserPlus size={20} />
                Registrarse
                <ArrowRight size={16} />
              </a>
              <a href="/contact" className="sc-btn sc-btn-outline sc-btn-lg">
                <Send size={16} />
                Contáctanos
              </a>
            </div>
            <div className="trust-indicators animate-fade-in delay-500">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                Cifrado E2E
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                Sin rastreo
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                Servidor propio
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                Código abierto
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="features-section">
        <div className="sc-container">
          <div className="section-header animate-fade-in-up">
            <span className="sc-badge">
              <Zap className="badge-icon" />
              Características
            </span>
            <h2>¿Por qué elegir SecureCom?</h2>
            <p>
              Nuestra plataforma ofrece las herramientas que necesitas para comunicarte
              con total privacidad y seguridad.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card animate-fade-in-up delay-100">
              <div className="sc-card">
                <div className="feature-icon-box icon-emerald">
                  <Lock size={28} />
                </div>
                <h3>Cifrado Extremo a Extremo</h3>
                <p>
                  Todas tus conversaciones están protegidas con cifrado de extremo
                  a extremo. Solo tú y tu destinatario pueden leer los mensajes.
                </p>
              </div>
            </div>
            <div className="feature-card animate-fade-in-up delay-200">
              <div className="sc-card">
                <div className="feature-icon-box icon-teal">
                  <Server size={28} />
                </div>
                <h3>Plataforma Robusta</h3>
                <p>
                  Un servicio sólido basado en servidores propios que funciona de
                  manera estable y eficiente, garantizando disponibilidad continua.
                </p>
              </div>
            </div>
            <div className="feature-card animate-fade-in-up delay-300">
              <div className="sc-card">
                <div className="feature-icon-box icon-cyan">
                  <Smartphone size={28} />
                </div>
                <h3>Experiencia Sencilla</h3>
                <p>
                  Todo diseñado para que el uso sea rápido, práctico y sin
                  complicaciones técnicas. Conecta con Monocles Chat en minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="about-section">
        <div className="sc-container">
          <div className="about-grid">
            <div className="about-text animate-fade-in-up">
              <span className="sc-badge">
                <Globe className="badge-icon" />
                Sobre nosotros
              </span>
              <h2>Comprometidos con tu privacidad</h2>
              <div className="about-description">
                <p>
                  Somos una empresa dedicada a ofrecer comunicaciones privadas y
                  seguras, diseñadas para quienes valoran la confidencialidad, la
                  confianza y la estabilidad.
                </p>
                <p>
                  Nuestro sistema ha sido creado para garantizar un entorno robusto,
                  confiable y adaptado a las necesidades modernas de privacidad, tanto
                  para individuos como para organizaciones.
                </p>
                <p>
                  Utilizamos tecnología de código abierto y protocolos estándar de
                  cifrado para que puedas verificar la seguridad de nuestras
                  comunicaciones por ti mismo.
                </p>
              </div>
            </div>
            <div className="about-cards animate-fade-in-up delay-200">
              <div className="about-card-glow" />
              <div className="sc-card-solid about-info-card">
                <div className="about-info-item">
                  <div className="sc-icon-box sc-icon-box-sm" style={{ background: 'var(--color-primary-10)' }}>
                    <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h4>Servidor Propio</h4>
                    <p>Control total sobre los datos y la infraestructura.</p>
                  </div>
                </div>
                <hr className="sc-separator" />
                <div className="about-info-item">
                  <div className="sc-icon-box sc-icon-box-sm" style={{ background: 'var(--color-primary-10)' }}>
                    <Lock size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h4>Cifrado XMPP</h4>
                    <p>Protocolos de seguridad estándar de la industria.</p>
                  </div>
                </div>
                <hr className="sc-separator" />
                <div className="about-info-item">
                  <div className="sc-icon-box sc-icon-box-sm" style={{ background: 'var(--color-primary-10)' }}>
                    <MessageSquare size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h4>Multiplataforma</h4>
                    <p>Compatible con Monocles Chat en Android e iOS.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Steps Section ─── */}
      <section className="steps-section">
        <div className="sc-container">
          <div className="section-header animate-fade-in-up">
            <span className="sc-badge">
              <Smartphone className="badge-icon" />
              Cómo empezar
            </span>
            <h2>Comienza en 4 simples pasos</h2>
          </div>
          <div className="steps-grid">
            {[
              {
                step: "01",
                title: "Regístrate",
                description: "Crea tu cuenta con un nombre de usuario, contraseña y correo electrónico.",
                icon: <UserPlus size={20} />,
              },
              {
                step: "02",
                title: "Descarga Monocles",
                description: "Obtén la aplicación Monocles Chat desde a trav`s del siguiente enlace: ",
                icon: <Smartphone size={20} />,
              },
              {
                step: "03",
                title: "Configura el servidor",
                description: 'Selecciona "Servidor personalizado" e ingresa im.bmstecnology.com',
                icon: <Server size={20} />,
              },
              {
                step: "04",
                title: "¡Conecta!",
                description: "Ingresa tu usuario completo y contraseña. ¡Listo para chatear de forma segura!",
                icon: <MessageSquare size={20} />,
              },
            ].map((item, i) => (
              <div key={item.step} className={`step-card animate-fade-in-up delay-${(i + 1) * 100}`}>
                <div className="sc-card">
                  <div className="step-card-header">
                    <div className="sc-icon-box sc-icon-box-sm" style={{ background: 'var(--color-primary-10)', color: 'var(--color-primary)' }}>
                      {item.icon}
                    </div>
                    <span className="step-number">{item.step}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="cta-section">
        <div className="sc-container">
          <div className="cta-card animate-fade-in-up">
            <div className="cta-pattern" />
            <div className="cta-content">
              <Shield size={48} className="cta-shield" />
              <h2>¿Listo para comunicarte con seguridad?</h2>
              <p>
                Regístrate hoy y únete a miles de usuarios que confían en nuestras
                comunicaciones privadas y cifradas.
              </p>
              <div className="cta-buttons">
                <a href="/signup" className="sc-btn sc-btn-white sc-btn-lg">
                  <UserPlus size={20} />
                  Crear mi cuenta
                  <ArrowRight size={16} />
                </a>
                <a href="/contact" className="sc-btn sc-btn-white-outline sc-btn-lg">
                  <Send size={16} />
                  Más información
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
