import { Navbar } from "./components/Navbar";
import { AddSongDialog } from "./components/AddSongDialog";
import { SongsView } from "./components/SongsView";

function App() {
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
          </div>

          <AddSongDialog />
        </div>

        <SongsView />
      </main>
    </div>
  );
}

export default App;
