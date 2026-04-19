import React from "react";
import "../stylesheets/PasswordStrength.css";

function PasswordStrength({ password }) {
  const rules = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Una letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "Una letra minúscula", met: /[a-z]/.test(password) },
    { label: "Un número", met: /[0-9]/.test(password) },
    { label: "Un carácter especial", met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password) },
  ];

  const passedCount = rules.filter((r) => r.met).length;
  let strength = 0;
  let label = "";
  let colorClass = "";

  if (password.length === 0) {
    strength = 0;
  } else if (passedCount <= 2) {
    strength = 25;
    label = "Débil";
    colorClass = "strength-weak";
  } else if (passedCount <= 3) {
    strength = 50;
    label = "Media";
    colorClass = "strength-medium";
  } else if (passedCount <= 4) {
    strength = 75;
    label = "Fuerte";
    colorClass = "strength-strong";
  } else {
    strength = 100;
    label = "Muy fuerte";
    colorClass = "strength-very-strong";
  }

  return (
    <div className="password-strength">
      <div className="strength-bar-container">
        <div className="strength-bar">
          <div
            className={`strength-fill ${colorClass}`}
            style={{ width: `${strength}%` }}
          />
        </div>
        {password.length > 0 && (
          <span className={`strength-label ${colorClass}`}>{label}</span>
        )}
      </div>
      <div className="strength-rules">
        {rules.map((rule, i) => (
          <div key={i} className={`strength-rule ${rule.met ? "rule-met" : ""}`}>
            <span className="rule-check">
              {rule.met && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {rule.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrength;
