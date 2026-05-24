import { Injectable } from "@nestjs/common";
import { db } from "../db/db";
import { songs } from "../db/schema";
import { Song } from "./interfaces/songs.interface";
import { CreateSongDto } from "./dto/create-song.dto";
import { count } from "drizzle-orm";
import { SongGenreEnum } from "../db/enums/song-genre.enum";

@Injectable()
export class SongsService {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const data = await db.select().from(songs).limit(limit).offset(offset);

    const totalRecords = await db.select({ value: count() }).from(songs);
    const total = totalRecords[0].value;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  getGenres() {
    return SongGenreEnum;
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const result = await db
      .insert(songs)
      .values({
        name: createSongDto.name,
        genre: createSongDto.genre,
        release_date: createSongDto.release_date,
        artist: createSongDto.artist,
        cover_url: createSongDto.cover_url,
      })
      .returning();
    return result[0];
  }
}
