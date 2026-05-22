import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsIn } from "class-validator";
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
}
