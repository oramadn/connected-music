import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "./api/api";
import { type Song } from "./types/songs";
import "./App.css";

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
    <div>
      <h1>Songs</h1>
      <ul>
        {songs?.map((song) => (
          <li key={song.id}>
            {song.name} - {song.genre} ({song.release_date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
