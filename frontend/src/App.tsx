import { Navbar } from "./components/Navbar";
import { AddSongDialog } from "./components/AddSongDialog";
import { SongsView } from "./components/SongsView";
import { useState, useEffect } from "react";
import { Input } from "./components/ui/input";
import { useDebounce } from "./lib/use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      <main className="w-full px-4 md:px-8 xl:px-16 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight">
              Latest Additions
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Discover and manage your music collection.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search songs or artists..."
                className="pl-9 text-sm lg:text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {isLoggedIn && <AddSongDialog />}
          </div>
        </div>

        <SongsView searchQuery={debouncedSearch} />
      </main>
    </div>
  );
}

export default App;
