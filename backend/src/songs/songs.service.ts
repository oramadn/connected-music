import { Injectable } from "@nestjs/common";
import { db } from "../db/db";
import { songs } from "../db/schema";
import { Song } from "./interfaces/songs.interface";
import { CreateSongDto } from "./dto/create-song.dto";

@Injectable()
export class SongsService {
  async findAll(): Promise<Song[]> {
    return db.select().from(songs);
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const result = await db
      .insert(songs)
      .values({
        name: createSongDto.name,
        genre: createSongDto.genre,
        release_date: createSongDto.release_date,
        artist: createSongDto.artist,
      })
      .returning();
    return result[0];
  }
}
