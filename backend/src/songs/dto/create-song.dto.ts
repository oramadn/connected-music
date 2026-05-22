import { IsNotEmpty, MinLength } from "class-validator";

export class CreateSongDto {
  @MinLength(6)
  @IsNotEmpty()
  name: string;
}
