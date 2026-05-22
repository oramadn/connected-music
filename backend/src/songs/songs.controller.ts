import { Controller, Get, Param, HttpCode, HttpStatus } from "@nestjs/common";
// import { NullableType } from "src/utils/types/nullable.types";
// import { Song } from "./interfaces/songs.interface";
import { SongsService } from "./songs.service";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): string {
    return this.songsService.findAll();
  }

  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return { message: "This actions creates a cat!", data: createCatDto };
  // }
}
