import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
