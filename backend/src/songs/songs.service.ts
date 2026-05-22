import { Injectable } from "@nestjs/common";

@Injectable()
export class SongsService {
  findAll(): string {
    return "Hello CM!";
  }
}
