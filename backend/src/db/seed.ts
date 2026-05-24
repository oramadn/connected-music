import { db } from "./db";
import { songs } from "./schema";
import { SongGenreEnum } from "./enums/song-genre.enum";

async function seed() {
  const sampleSongs = Array.from({ length: 25 }).map((_, i) => ({
    name: `Song ${i + 1}`,
    artist: `Artist ${i + 1}`,
    genre: SongGenreEnum[i % SongGenreEnum.length],
    release_date: new Date(
      Math.floor(Math.random() * 27) + 2000, // Year
      i % 12, // Month
      (i % 28) + 1, // Day
    )
      .toISOString()
      .split("T")[0],
    cover_url: `https://picsum.photos/seed/${i}/400/400`,
  }));

  try {
    await db.insert(songs).values(sampleSongs);
    console.log("Successfully seeded 25 songs!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seed();
