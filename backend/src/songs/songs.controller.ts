import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { CreateSongDto } from "./dto/create-song.dto";
import { Song } from "./interfaces/songs.interface";
import { SongsService } from "./songs.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("songs")
@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: "Get all songs" })
  @ApiOkResponse({ description: "Return all songs." })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    return this.songsService.findAll(Number(page), Number(limit));
  }

  @Get("genres")
  @ApiOperation({ summary: "Get all song genres" })
  @ApiOkResponse({ description: "Return all song genres." })
  @HttpCode(HttpStatus.OK)
  getGenres() {
    return this.songsService.getGenres();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new song" })
  @ApiCreatedResponse({
    description: "The song has been successfully created.",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        artist: { type: "string" },
        genre: { type: "string" },
        release_date: { type: "string", format: "date" },
        cover_file: {
          type: "string",
          format: "binary",
        },
      },
      required: ["name", "artist", "genre", "release_date"],
    },
  })
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
