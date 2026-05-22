const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSongs() {
  const response = await fetch(`${API_URL}/songs`);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}
