import {
  AbstractFileService,
  FileServiceUploadResult,
  DeleteFileType,
  UploadStreamDescriptorType,
  FileServiceGetUploadStreamResult,
  GetUploadedFileType,
} from "@medusajs/medusa";
import * as fs from "fs";
import path from "path";

class GithubPrivateFileService extends AbstractFileService {
  private readonly path: string;
  private readonly github_token: string;

  constructor(container, options) {
    super(container);

    console.log(options);

    if (!options.path || !options.github_token) {
      throw new Error("Invalid medusa-file-github-private config");
    }

    this.path = options.path;
    this.github_token = options.github_token;

    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
  }

  async upload(file: Express.Multer.File): Promise<FileServiceUploadResult> {
    return new Promise((resolve, reject) => {
      fs.copyFile(
        file.path,
        path.join(this.path, file.filename + path.extname(file.originalname)),
        (err) => {
          if (err) throw err;
          resolve({
            url: `"localhost:9000/${this.path}/${file.filename}${path.extname(
              file.originalname
            )}`,
          });
        }
      );
    });
  }

  async uploadProtected(
    fileData: Express.Multer.File
  ): Promise<FileServiceUploadResult> {
    throw new Error("Method not implemented.");
  }

  async delete(fileData: DeleteFileType): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getUploadStreamDescriptor(
    fileData: UploadStreamDescriptorType
  ): Promise<FileServiceGetUploadStreamResult> {
    throw new Error("Method not implemented.");
  }

  async getDownloadStream(
    fileData: GetUploadedFileType
  ): Promise<NodeJS.ReadableStream> {
    throw new Error("Method not implemented.");
  }

  async getPresignedDownloadUrl(
    fileData: GetUploadedFileType
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default GithubPrivateFileService;
