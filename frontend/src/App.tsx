import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "./api/api";
import { type Song } from "./types/songs";
import { Navbar } from "./components/Navbar";
import { SongCard } from "./components/SongCard";
import { SongsEmptyState } from "./components/SongsEmptyState";
import { PlusIcon } from "@heroicons/react/24/outline";

function App() {
  const {
    data: songs,
    isPending,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  const hasSongs = songs && songs.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />

      <main className="w-full px-4 md:px-8 xl:px-16 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {" "}
              Latest Additions{" "}
            </h1>
            <span className="text-sm text-muted-foreground">
              {isPending
                ? "Loading..."
                : hasSongs
                  ? `Showing 1-${songs.length} of ${songs.length} songs`
                  : "No results"}
            </span>
          </div>
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 shadow h-9 px-3 gap-2">
            <PlusIcon className="size-5"></PlusIcon>
            Add Song
          </div>
        </div>

        {isPending && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-center">
            Failed to load songs. Please try again later.
          </div>
        )}

        {!isPending && !error && (
          <>
            {hasSongs ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                  {songs.map((song) => (
                    <SongCard key={song.id} song={song} />
                  ))}
                </div>
              </>
            ) : (
              <SongsEmptyState />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
