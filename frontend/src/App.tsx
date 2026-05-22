import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "./api/api";
import { type Song } from "./types/songs";

function App() {
  const {
    data: songs,
    isLoading,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground font-sans">
      <h1 className="text-4xl font-bold mb-6 text-primary ">Songs</h1>
      <ul className="space-y-4 max-w-2xl mx-auto text-left">
        {songs?.map((song) => (
          <li
            key={song.id}
            className="p-4 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-semibold text-lg">{song.name}</div>
            <div className="text-muted-foreground text-sm">
              {song.genre} • {song.release_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
