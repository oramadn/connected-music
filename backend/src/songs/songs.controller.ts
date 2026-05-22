import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
// import { NullableType } from "src/utils/types/nullable.types";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "./interfaces/songs.interface";
import { SongsService } from "./songs.service";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): string {
    return this.songsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSongDto: CreateSongDto): string {
    return "This action adds a new song";
  }
}
