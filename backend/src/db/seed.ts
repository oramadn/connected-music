import { db } from "./db";
import { songs, users } from "./schema";
import { SongGenreEnum } from "./enums/song-genre.enum";
import * as bcrypt from "bcrypt";

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
    const hashedPassword = await bcrypt.hash("password", 10);
    await db.insert(users).values({
      email: "admin@example.com",
      password: hashedPassword,
    });

    await db.insert(songs).values(sampleSongs);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seed();
