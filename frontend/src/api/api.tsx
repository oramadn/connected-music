const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSongs(page: number = 1, limit: number = 10) {
  const response = await fetch(`${API_URL}/songs?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}

export async function createSong(formData: FormData) {
  const response = await fetch(`${API_URL}/songs`, {
    method: "POST",
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
