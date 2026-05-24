import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "./interfaces/songs.interface";
import { SongsService } from "./songs.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor("cover_file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createSongDto: CreateSongDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Song> {
    const coverUrl = file ? `/uploads/${file.filename}` : null;
    const songData = {
      ...createSongDto,
      cover_url: coverUrl,
    };

    return this.songsService.create(songData);
  }
}
