import React, { useState, useRef } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Shield,
  Info,
} from "lucide-react";
import "../stylesheets/SignUp.css";
import "../stylesheets/shared-styles.css";
import Footer from "../components/Footer";
import PasswordStrength from "../../assets/components/PasswordStrength";
import { registrarUsuario } from "../../api/services";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const navigate = useNavigate();
const successRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [touched, setTouched] = useState({});
  const [successData, setSuccessData] = useState(null);

  // ─── Validaciones ───
  const usernameRules = {
    minLength: formData.username.length >= 3,
    maxLength: formData.username.length <= 20,
    validChars: /^[a-zA-Z0-9_]*$/.test(formData.username),
    notEmpty: formData.username.length > 0,
  };

  const isUsernameValid =
    usernameRules.notEmpty &&
    usernameRules.minLength &&
    usernameRules.maxLength &&
    usernameRules.validChars;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = formData.email.trim().length > 0 && emailRegex.test(formData.email.trim());

  const passwordRules = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(formData.password),
  };

  const allPasswordRulesPassed = Object.values(passwordRules).every(Boolean);
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const isFormValid = isUsernameValid && isEmailValid && allPasswordRulesPassed && passwordsMatch;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (apiError) setApiError("");
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const { response, data } = await registrarUsuario({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.status === 201 && data.status === "ok") {
        setSuccessData({
        username: data.data?.username || formData.username,
        email: data.data?.email || formData.email,
        domain: data.data?.domain || "im.bmstecnology.com",
    });
        setIsSubmitting(false);
        setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
    return;
      } else if (response.status === 409) {
        setApiError(data.message || "El nombre de usuario o correo ya está registrado.");
      } else if (response.status === 422) {
        const details = data.details ? data.details.map((d) => d.message).join("\n") : data.message;
        setApiError(details || "Error de validación en los datos.");
      } else if (response.status === 429) {
        const min = Math.ceil((data.retryAfter || 3600) / 60);
        setApiError(`Demasiados intentos. Intenta de nuevo en ${min} minuto(s).`);
      } else {
        setApiError(data.message || "Error al registrar. Intenta más tarde.");
      }
    } catch {
      setApiError("Error de conexión con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Header */}
        <div className="signup-header animate-fade-in-up">
          <div className="signup-icon-box">
            <User size={28} />
          </div>
          <h1>Registro de nuevo usuario</h1>
          <p>Crea tu cuenta en el sistema de comunicaciones seguras de BMSTecnology.</p>
        </div>

        {/* Instructions Alert */}
        <div className="sc-alert sc-alert-info animate-fade-in-up delay-100">
          <Info className="alert-icon" size={16} />
          <div className="alert-content">
            <strong>¿Cómo registrarte correctamente?</strong>
            <ol>
              <li>
                Crea un <strong>nombre de usuario</strong> único (3-20 caracteres, letras, números y guiones bajos).
              </li>
              <li>
                Ingresa una <strong>contraseña segura</strong> (mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial).
              </li>
              <li>
                Proporciona un <strong>correo electrónico válido</strong> para verificación.
              </li>
              <li>
                Después del registro, abre la app <strong>Monocles Chat</strong> e inicia sesión con tu usuario +{" "}
                <code className="server-code">@im.bmstecnology.com</code>
              </li>
            </ol>
          </div>
        </div>

        {/* Form Card */}
        <div className="sc-card-solid signup-form-card animate-fade-in-up delay-200">
          <div className="form-card-header">
            <h2>
              <Shield size={20} />
              Formulario de Registro
            </h2>
            <p>Completa todos los campos para crear tu cuenta segura.</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
                      {/* API Error */}
          {apiError && (
            <div className="sc-alert sc-alert-destructive">
              <span className="alert-icon">⚠</span>
              <span>{apiError}</span>
            </div>
          )}

          {/* Success Screen */}
          {successData ? (
            <div ref={successRef} className="signup-success animate-scale-in">
              <div className="success-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>¡Cuenta creada exitosamente!</h3>
              <div className="success-details">
                <div className="success-detail-item">
                  <span className="success-label">Usuario XMPP:</span>
                  <code className="success-code">{successData.username}@{successData.domain}</code>
                </div>
                <div className="success-detail-item">
                  <span className="success-label">Correo:</span>
                  <span>{successData.email}</span>
                </div>
              </div>
              <p className="success-tip">
                Ahora abre la app <strong>Monocles Chat</strong> en tu dispositivo e inicia sesión con los datos anteriores.
              </p>
                <div className="success-buttons">
                  <a
                    href="http://comsec.bmstecnology.com/monocles.apk"
                    download
                    className="sc-btn sc-btn-primary"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    📱 Descargar Monocles Chat
                  </a>
                  <button
                    type="button"
                    className="sc-btn sc-btn-outline"
                    onClick={() => navigate("/instructions")}
                  >
                    Ver instrucciones de conexión
                  </button>
                  <button
                    type="button"
                    className="sc-btn sc-btn-outline"
                    onClick={() => {
                      setSuccessData(null);
                      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
                      setTouched({});
                    }}
                  >
                    Registrar otro usuario
                  </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
              {/* ... AQUI VA EL FORMULARIO EXISTENTE CON TODOS LOS CAMPOS ... */}
            </form>
          )}

            {/* Username */}
            <div className="form-group">
              <label className="sc-label">
                <User size={14} className="label-icon" />
                Nombre de usuario
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  name="username"
                  placeholder="ej: usuario_seguro"
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  onBlur={() => handleBlur("username")}
                  value={formData.username}
                  className={`sc-input ${
                    touched.username && !isUsernameValid && formData.username.length > 0
                      ? "sc-input-error"
                      : isUsernameValid
                        ? "sc-input-success"
                        : ""
                  }`}
                  autoComplete="username"
                />
                <div className="input-status-icon">
                  {formData.username.length > 0 &&
                    (isUsernameValid ? (
                      <CheckIcon />
                    ) : (
                      <XIcon />
                    ))}
                </div>
              </div>
              {(touched.username || formData.username.length > 0) && (
                <div className="validation-rules">
                  <ValidationItem label="Mínimo 3 caracteres" passed={usernameRules.minLength} />
                  <ValidationItem label="Solo letras, números y guiones bajos" passed={usernameRules.validChars} />
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="sc-label">
                <Mail size={14} className="label-icon" />
                Correo electrónico
              </label>
              <div className="input-with-icon">
                <input
                  type="email"
                  name="email"
                  placeholder="ej: correo@ejemplo.com"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  value={formData.email}
                  className={`sc-input ${
                    touched.email && formData.email.trim().length > 0 && !isEmailValid
                      ? "sc-input-error"
                      : isEmailValid
                        ? "sc-input-success"
                        : ""
                  }`}
                  autoComplete="email"
                />
                <div className="input-status-icon">
                  {formData.email.trim().length > 0 &&
                    (isEmailValid ? <CheckIcon /> : <XIcon />)}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="sc-label">
                <Lock size={14} className="label-icon" />
                Contraseña
              </label>
              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  value={formData.password}
                  className="sc-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={formData.password} />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="sc-label">
                <Lock size={14} className="label-icon" />
                Confirmar contraseña
              </label>
              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  value={formData.confirmPassword}
                  className={`sc-input ${
                    touched.confirmPassword &&
                    formData.confirmPassword.length > 0 &&
                    !passwordsMatch
                      ? "sc-input-error"
                      : passwordsMatch
                        ? "sc-input-success"
                        : ""
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.confirmPassword.length > 0 && (
                <div className="match-indicator">
                  {passwordsMatch ? (
                    <>
                      <span className="match-dot match-dot-success">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="match-text match-text-success">Las contraseñas coinciden</span>
                    </>
                  ) : (
                    <>
                      <span className="match-dot match-dot-error">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="match-text match-text-error">Las contraseñas no coinciden</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="sc-btn sc-btn-primary submit-btn"
            >
              {isSubmitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" className="animate-spin" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity="0.75" />
                  </svg>
                  Registrando...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Crear cuenta segura
                </>
              )}
            </button>
          </form>
        </div>

        <p className="signup-tip">
          💡 Consejo: Guarda tu contraseña en un lugar seguro. Puedes cambiarla a través de la
          aplicación, pero en caso de pérdida será necesario contactar soporte.
        </p>
      </div>

      
    </div>
  );
}

/* ─── Micro Components ─── */

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ValidationItem({ label, passed }) {
  return (
    <div className={`validation-item ${passed ? "validation-passed" : ""}`}>
      <span className={`validation-dot ${passed ? "validation-dot-passed" : ""}`}>
        {passed && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </div>
  );
}

export default SignUp;
