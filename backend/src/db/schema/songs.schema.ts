import { pgTable, serial, text, pgEnum, date } from "drizzle-orm/pg-core";
import { SongGenreEnum } from "../enums/song-genre.enum";

export const genreEnum = pgEnum("genre", SongGenreEnum);

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  genre: genreEnum("genre").notNull(),
  release_date: date("release_date").notNull(),
  artist: text("artist").notNull(),
});
