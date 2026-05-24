const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeader() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(data: any) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  const result = await response.json();
  localStorage.setItem("access_token", result.access_token);
  return result;
}

export async function logout() {
  localStorage.removeItem("access_token");
}

export async function fetchSongs(
  page: number = 1,
  limit: number = 10,
  search?: string,
) {
  let url = `${API_URL}/songs?page=${page}&limit=${limit}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  const response = await fetch(url, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}

export async function fetchGenres() {
  const response = await fetch(`${API_URL}/songs/genres`, {
    headers: { ...getAuthHeader() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
}

export async function createSong(formData: FormData) {
  const response = await fetch(`${API_URL}/songs`, {
    method: "POST",
    headers: { ...getAuthHeader() },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = Array.isArray(errorData.message)
      ? errorData.message.join(", ")
      : errorData.message || "Failed to create song";
    throw new Error(message);
  }

  return response.json();
}
