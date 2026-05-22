import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSongDto {
  @ApiProperty({
    example: "Bohemian Rhapsody",
    description: "The name of the song",
  })
  @IsNotEmpty()
  name: string;
}
