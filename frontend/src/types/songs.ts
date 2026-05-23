export interface Song {
  id: number;
  name: string;
  genre: string;
  release_date: string;
  artist?: string;
  cover_url?: string;
}

export type CreateSong = Omit<Song, "id" | "cover_url">;
