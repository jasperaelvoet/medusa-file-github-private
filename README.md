> Note: This plugin is not tested in any proper way, I wrote this for myself to store product images in between deployment, which it does. Please report any issues you encounter to help me (and the community) improve the plugin.
Note 2: This does NOT use GitHub as a cdn, files are served by the backend server.
# medusa-file-github-private

  Medusa file plugin to store files on GitHub, in a private repository. So that they are stored in between deployments.
- New files are uploaded to GitHub, and stored locally, where they will be served by the backend.
- On startup, the plugin will download all the images from GitHub and store them locally.
## Requirements
- Functional medusa server
- [Fine grained GitHub access token](https://github.com/settings/tokens?type=beta) with read/write permission to the repository where images will be stored (can be the same as your medusa project repository)

## Configuration
To configure your Medusa server, simply add the following plugin configuration to your `medusa-config.js` file:
```
const plugins = [
	...
	
	{
		resolve: medusa-file-github-private,
		options: {
			path:  "images",
			github_token:  process.env.GITHUB_TOKEN,
			repo:  "my_medusa_project",
			owner:  "jasperaelvoet",
			backend_url:  process.env.BACKEND_URL,
		},
	},

	...
]
```
- `path`: Folder where images will be stored in the GitHub repository
- `github_token`: Stored in a .env file as GITHUB_TOKEN=my_token
- `repo`: The repository where the images will be stored
- `owner`: The owner of the repository (username)
- `backend_url`: The url of your backend (without trailing slash - i.e. `http://localhost:9000` or `https://api.your-domain.com`).

## Installation
yarn: `yarn add medusa-file-github-private`
npm: `npm install medusa-file-github-private`
