/**
 * SecureCom - API Services
 * Reemplaza tu archivo api/register.js con este
 */

const API_BASE = "https://im.bmstecnology.com";

export async function registrarUsuario(data) {
  const response = await fetch(`${API_BASE}/create_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { response, data: await response.json() };
}

export async function adminLogin(data) {
  const response = await fetch(`${API_BASE}/admin_login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { response, data: await response.json() };
}

export async function getAdminUsers(token, page = 1, limit = 20, search = "") {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (search) params.set("search", search);

  const response = await fetch(
    `${API_BASE}/admin_users.php?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return { response, data: await response.json() };
}

export async function deleteAdminUser(token, username) {
  const response = await fetch(
    `${API_BASE}/admin_users.php?username=${encodeURIComponent(username)}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return { response, data: await response.json() };
}
