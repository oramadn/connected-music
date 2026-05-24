export interface Song {
  id: number;
  name: string;
  genre: string;
  release_date: string;
  artist?: string;
  cover_url?: string | null;
}
