import {
  AbstractFileService,
  FileServiceUploadResult,
  DeleteFileType,
  UploadStreamDescriptorType,
  FileServiceGetUploadStreamResult,
  GetUploadedFileType,
} from "@medusajs/medusa";
import { Octokit } from "octokit";
import * as fs from "fs";
import path from "path";

class GithubPrivateFileService extends AbstractFileService {
  client_: Octokit;

  private readonly owner: string;
  private readonly path: string;
  private readonly repo: string;
  private readonly backend_url: string;

  constructor(container, options) {
    super(container);

    console.log(options);

    if (
      !options.path ||
      !options.github_token ||
      !options.repo ||
      !options.owner ||
      !options.backend_url
    ) {
      throw new Error("Invalid medusa-file-github-private config");
    }

    this.client_ = new Octokit({
      auth: options.github_token,
    });

    this.path = options.path;
    this.repo = options.repo;
    this.owner = options.owner;
    this.owner = options.owner;
    this.backend_url = options.backend_url;

    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
  }

  async upload(file: Express.Multer.File): Promise<FileServiceUploadResult> {
    const base64File = fs.readFileSync(file.path, { encoding: "base64" });

    this.client_.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: this.owner,
      repo: this.repo,
      path: `${this.path}/${file.filename + path.extname(file.originalname)}`,
      message: "Upload file",
      content: base64File,
    });

    return new Promise((resolve, reject) => {
      fs.copyFile(
        file.path,
        path.join(this.path, file.filename + path.extname(file.originalname)),
        (err) => {
          if (err) throw err;
          resolve({
            url: `${this.backend_url}/${this.path}/${
              file.filename
            }${path.extname(file.originalname)}`,
          });
        }
      );
    });
  }

  async uploadProtected(
    file: Express.Multer.File
  ): Promise<FileServiceUploadResult> {
    return this.upload(file);
  }

  async delete(fileData: DeleteFileType): Promise<void> {
    throw Error("Method not implemented.");
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
