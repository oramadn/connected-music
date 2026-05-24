import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { type Song } from "../types/songs";
import { Card, CardContent } from "./ui/card";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const year = new Date(song.release_date).getFullYear();
  const artist = song.artist || "Unknown Artist";
  const API_URL = import.meta.env.VITE_API_URL;

  const coverUrl = song.cover_url
    ? song.cover_url.startsWith("http")
      ? song.cover_url
      : `${API_URL}${song.cover_url}`
    : null;

  return (
    <Card className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden group hover:border-primary/50 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background p-0 py-0 gap-0">
      <div className="aspect-square w-full overflow-hidden bg-muted flex items-center justify-center">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={song.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <MusicalNoteIcon className="size-12 text-muted-foreground/50 group-hover:scale-110 transition-transform duration-300" />
        )}
      </div>
      <CardContent className="p-4 flex flex-col h-26">
        <h3 className="font-semibold leading-none tracking-tight mb-1 truncate">
          <span className="outline-none hover:text-primary transition-colors">
            {song.name}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3 truncate">{artist}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
            {song.genre.replace(/_/g, " ")}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {year}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
