import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsIn, IsDateString } from "class-validator";
import { type SongGenre, SongGenreEnum } from "src/db/enums/song-genre.enum";

export class CreateSongDto {
  @ApiProperty({
    example: "Bohemian Rhapsody",
    description: "The name of the song",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: SongGenreEnum,
    description: "The genre of the song",
  })
  @IsNotEmpty()
  @IsIn(SongGenreEnum)
  genre: SongGenre;

  @ApiProperty({
    example: "1975-10-31",
    description: "The release date of the song (YYYY-MM-DD)",
  })
  @IsNotEmpty()
  @IsDateString()
  release_date: string;

  @ApiProperty({
    example: "Queen",
    description: "The name of the artist",
  })
  @IsNotEmpty()
  artist: string;
}
