import { promises as fs } from "fs";
import path from "path";
import { Octokit } from "octokit";

export default async (
  container,
  options: Record<string, any>
): Promise<void> => {
  const client = new Octokit({
    auth: options.github_token,
  });

  const response = await client.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: options.owner,
      repo: options.repo,
      path: options.path,
    }
  );

  if (Array.isArray(response.data)) {
    // The response contains an array of files in the folder
    for (const file of response.data) {
      if (file.type === "file") {
        const filePath = path.join(options.path, file.name);
        const fileContentResponse = await client.request(file.download_url);
        const fileContent = Buffer.from(fileContentResponse.data, "base64");

        // Write the file content to the local filesystem
        await fs.writeFile(filePath, fileContent);
        console.log(`Downloaded file: ${filePath}`);
      }
    }
  }
};
