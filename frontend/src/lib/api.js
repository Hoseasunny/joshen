const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiRequest(path, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  };
  const response = await fetch(`${API_BASE}${path}`, config);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    let message = error.error || "Request failed";
    if (Array.isArray(error.details) && error.details.length > 0) {
      const detailText = error.details
        .map((item) => `${item.path?.join(".") || "field"}: ${item.message}`)
        .join(", ");
      message = `${message} (${detailText})`;
    }
    throw new Error(message);
  }
  return response.json();
}

export async function authRequest(path, token, options = {}) {
  return apiRequest(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });
}
