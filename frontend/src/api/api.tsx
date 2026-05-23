import { type CreateSong } from "../types/songs";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSongs() {
  const response = await fetch(`${API_URL}/songs`);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json();
}

export async function createSong(song: CreateSong) {
  const response = await fetch(`${API_URL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
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
