import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  Search,
  Users,
  UserCheck,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import "../stylesheets/AdminPanel.css";

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  // ─── Auto-login si hay token ───
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchUsers(1, "");
    }
  }, []);

  const fetchUsers = useCallback(async (page = 1, search = "") => {
    setIsLoading(true);
    try {
      const { registrarUsuario, ...rest } = await import("../../api/services");
      const { response, data } = await rest.obtenerUsuarios(page, search);
      if (response.status === 200) {
        setUsers(data.data || []);
        setTotalPages(data.pages || 1);
        setCurrentPage(page);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const { adminLogin } = await import("../../api/services");
      const { response, data } = await adminLogin(loginForm.username, loginForm.password);
      if (response.status === 200) {
        localStorage.setItem("admin_token", data.token);
        setIsLoggedIn(true);
        fetchUsers(1, "");
      } else {
        setLoginError(data.error || "Credenciales incorrectas.");
      }
    } catch {
      setLoginError("Error de conexión.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setUsers([]);
  };

  const handleDelete = async (id) => {
    try {
      const { registrarUsuario, ...rest } = await import("../../api/services");
      const { response, data } = await rest.eliminarUsuario(id);
      if (response.status === 200) {
        setDeleteConfirm(null);
        fetchUsers(currentPage, searchQuery);
      }
    } catch { /* ignore */ }
  };

  // ─── Login Form ───
  if (!isLoggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login-container">
          <div className="admin-login-header">
            <div className="admin-icon-box">
              <Shield size={28} />
            </div>
            <h1>Panel de Administración</h1>
            <p>Ingresa tus credenciales para acceder.</p>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form">
            {loginError && <div className="admin-error">{loginError}</div>}
            <div className="admin-field">
              <label>Usuario</label>
              <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="admin" required />
            </div>
            <div className="admin-field">
              <label>Contraseña</label>
              <div className="admin-input-icon">
                <input type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" required />
                <button type="button" className="admin-toggle-pw" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoggingIn} className="admin-submit-btn">
              {isLoggingIn ? <><Loader2 size={16} className="spin" /> Accediendo...</> : <><Lock size={16} /> Iniciar sesión</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  const stats = [
    { icon: <Users size={20} />, label: "Total Usuarios", value: users.length, color: "emerald" },
    { icon: <UserCheck size={20} />, label: "Activos", value: users.length, color: "teal" },
    { icon: <UserPlus size={20} />, label: "Nuevos (hoy)", value: users.filter(u => new Date(u.created_at).toDateString() === new Date().toDateString()).length, color: "cyan" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <h1>Panel de Administración</h1>
            <p>Gestión de usuarios del sistema.</p>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {stats.map((s, i) => (
            <div key={i} className={`admin-stat-card stat-${s.color}`}>
              <div className={`stat-icon stat-icon-${s.color}`}>{s.icon}</div>
              <div>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="admin-search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por usuario o email..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); fetchUsers(1, e.target.value); }}
          />
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          {isLoading ? (
            <div className="admin-loading"><Loader2 size={24} className="spin" /> Cargando...</div>
          ) : users.length === 0 ? (
            <div className="admin-empty">No se encontraron usuarios.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.email}</td>
                    <td>{new Date(u.created_at).toLocaleDateString("es-CO")}</td>
                    <td>
                      {deleteConfirm === u.id ? (
                        <div className="confirm-delete">
                          <span>¿Eliminar?</span>
                          <button className="btn-confirm-yes" onClick={() => handleDelete(u.id)}>Sí</button>
                          <button className="btn-confirm-no" onClick={() => setDeleteConfirm(null)}>No</button>
                        </div>
                      ) : (
                        <button className="btn-delete" onClick={() => setDeleteConfirm(u.id)}>
                          <Trash2 size={14} /> Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button disabled={currentPage <= 1} onClick={() => fetchUsers(currentPage - 1, searchQuery)}>
              <ChevronLeft size={16} /> Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button disabled={currentPage >= totalPages} onClick={() => fetchUsers(currentPage + 1, searchQuery)}>
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
