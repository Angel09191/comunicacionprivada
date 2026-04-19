import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  ShieldCheck,
  User,
  Users,
  Search,
  Trash2,
  LogOut,
  LogIn,
  Lock,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";
import { adminLogin, getAdminUsers, deleteAdminUser } from "../../api/services";
import "../stylesheets/Admin.css";

/* ─── Login Form ─── */
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { response, data } = await adminLogin({ username, password });

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión.");
      }

      onLogin(data.token, data.expires_at);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card animate-scale-in">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <ShieldCheck size={32} />
          </div>
          <h1>Panel de Administración</h1>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        {error && (
          <div className="sc-alert sc-alert-destructive animate-fade-in">
            <AlertCircle className="alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="sc-label">
              <User className="label-icon" />
              Usuario
            </label>
            <input
              type="text"
              className="sc-input"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="sc-label">
              <Lock className="label-icon" />
              Contraseña
            </label>
            <input
              type="password"
              className="sc-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="sc-btn sc-btn-primary sc-btn-lg admin-login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Users Table ─── */
function UsersTable({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [actionMsg, setActionMsg] = useState({ type: "", text: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

    const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const { response, data } = await getAdminUsers(token, page, pagination.limit, search);

        if (!response.ok) throw new Error(data.message || "Error al obtener usuarios.");

        setUsers(data.data || []);
        setPagination((prev) => ({
          ...prev,
          page: data.pagination?.page || 1,
          total: data.pagination?.total || 0,
          totalPages: data.pagination?.totalPages || 0,
          hasNext: data.pagination?.hasNext || false,
          hasPrev: data.pagination?.hasPrev || false,
        }));
      } catch (err) {
        setActionMsg({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    },
    [token, search, pagination.limit]
  );

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    fetchUsers(newPage);
  };

  const handleDelete = async (username) => {
    try {
      const { response, data } = await deleteAdminUser(token, username);

      if (!response.ok) {
        throw new Error(data.message || "Error al eliminar usuario.");
      }

      setActionMsg({
        type: "success",
        text: `Usuario "${username}" eliminado correctamente.`,
      });
      setConfirmDelete(null);
      fetchUsers(pagination.page);
    } catch (err) {
      setActionMsg({ type: "error", text: err.message });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "Z");
    return d.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="admin-dashboard animate-fade-in-up">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <div className="admin-header-icon">
            <Users size={24} />
          </div>
          <div>
            <h1>Gestión de Usuarios</h1>
            <p>
              {pagination.total} usuario{pagination.total !== 1 ? "s" : ""} registrado
              {pagination.total !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button className="sc-btn sc-btn-outline" onClick={onLogout}>
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>

      {/* Action Message */}
      {actionMsg.text && (
        <div
          className={`sc-alert ${
            actionMsg.type === "success"
              ? "sc-alert-info"
              : "sc-alert-destructive"
          } animate-fade-in`}
        >
          {actionMsg.type === "success" ? (
            <CheckCircle2 className="alert-icon" />
          ) : (
            <AlertCircle className="alert-icon" />
          )}
          <span>{actionMsg.text}</span>
          <button
            className="alert-close"
            onClick={() => setActionMsg({ type: "", text: "" })}
          >
            <XCircle size={16} />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="admin-search-bar">
        <form onSubmit={handleSearch} className="admin-search-form">
          <div className="admin-search-input-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              className="sc-input"
              placeholder="Buscar por usuario o correo..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="sc-btn sc-btn-primary">
            Buscar
          </button>
          {search && (
            <button
              type="button"
              className="sc-btn sc-btn-outline"
              onClick={() => {
                setSearchInput("");
                setSearch("");
                setPagination((p) => ({ ...p, page: 1 }));
              }}
            >
              Limpiar
            </button>
          )}
        </form>
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-loading">
            <Loader2 size={32} className="animate-spin" />
            <p>Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="admin-empty">
            <Users size={48} />
            <h3>No se encontraron usuarios</h3>
            <p>
              {search
                ? `No hay resultados para "${search}"`
                : "Aún no hay usuarios registrados."}
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="admin-table-id">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  <td>
                    <div className="admin-user-cell">
                      <div className="admin-avatar">
                        {user.username?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="admin-username">{user.username || "—"}</span>
                    </div>
                  </td>
                  <td className="admin-email">{user.email || "—"}</td>
                  <td className="admin-date">{formatDate(user.created_at)}</td>
                  <td>
                    <div className="admin-actions">
                      {confirmDelete === user.id ? (
                        <div className="admin-confirm-delete">
                          <span>¿Eliminar?</span>
                          <button
                            className="admin-btn-danger"
                            onClick={() => handleDelete(user.username)}
                          >
                            <CheckCircle2 size={14} />
                            Sí
                          </button>
                          <button
                            className="admin-btn-cancel"
                            onClick={() => setConfirmDelete(null)}
                          >
                            <XCircle size={14} />
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          className="admin-btn-delete"
                          onClick={() => setConfirmDelete(user.id)}
                          title="Eliminar usuario"
                        >
                          <Trash2 size={16} />
                          <span>Eliminar</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="sc-btn sc-btn-outline"
            disabled={!pagination.hasPrev}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <div className="admin-pagination-info">
            Página {pagination.page} de {pagination.totalPages}
          </div>

          <button
            className="sc-btn sc-btn-outline"
            disabled={!pagination.hasNext}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Footer info */}
      <div className="admin-footer-info">
        <Eye size={14} />
        <span>Mostrando {users.length} de {pagination.total} usuarios</span>
      </div>
    </div>
  );
}

/* ─── Admin Page (Main) ─── */
function Admin() {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem("admin_token") || null;
    } catch {
      return null;
    }
  });

  const handleLogin = (newToken, expiresAt) => {
    setToken(newToken);
    try {
      sessionStorage.setItem("admin_token", newToken);
    } catch {
      /* ignore */
    }
  };

  const handleLogout = () => {
    setToken(null);
    try {
      sessionStorage.removeItem("admin_token");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="admin-page">
      {token ? (
        <UsersTable token={token} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Admin;