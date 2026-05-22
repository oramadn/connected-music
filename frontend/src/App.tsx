import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "./api/api";
import { type Song } from "./types/songs";
import { Navbar } from "./components/Navbar";

function App() {
  const {
    data: songs,
    isLoading,
    error,
  } = useQuery<Song[]>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="container min-w-screen px-20 py-4">
        <section className="mx-auto">
          <header className="flex justify-between mb-2">
            <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl mb-4">
              Latest Additions
            </h1>
            <p>Showing 1-10 of 48 songs</p>
          </header>

          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-center">
              Failed to load songs. Please try again later.
            </div>
          )}

          {!isLoading && !error && (
            <ul className="grid gap-4">
              {songs?.map((song) => (
                <li
                  key={song.id}
                  className="group p-6 bg-card text-card-foreground border border-border rounded-xl shadow-sm hover:shadow-md transition-all hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                        {song.name}
                      </h3>
                      <div className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs font-semibold uppercase tracking-wider">
                          {song.genre}
                        </span>
                        <span>•</span>
                        <span>{song.release_date}</span>
                      </div>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
