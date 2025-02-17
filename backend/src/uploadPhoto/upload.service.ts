import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

@Injectable()
export class UploadService {
  storage = diskStorage({
    destination: "./uploads",
    filename: (_, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      callback(null, filename);
    },
  });
}
