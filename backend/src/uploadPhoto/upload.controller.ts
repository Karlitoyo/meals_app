import { Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("venue-image")
  @UseInterceptors(FileInterceptor("file", { storage: new UploadService().storage }))
  uploadVenueImage(@UploadedFile() file: Express.Multer.File) {
    return { imageUrl: `/uploads/${file.filename}` };
  }
}
