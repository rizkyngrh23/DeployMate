# DeployMate.js 🚀

A zero-config CI/CD tool to automatically deploy Node.js apps to Vercel, Netlify, or DigitalOcean with a single command.

## 📦 Use case:

- Deploy full-stack apps automatically
- Git-based versioning with rollback
- Works with Docker, PM2, or serverless platforms

## 🔹 Features:
- ✅ Auto-detects project type (React, Next.js, Express, and Static HTML)
- ✅ Deploys to multiple cloud providers
- ✅ Supports rollback & environment variables

## Installation

```bash
npm install -g deploymate
```

## Usage

1. Create a `deploy.config.json` file in the root of your project:

```json
{
    "provider": "vercel", // Change to "netlify" or "digitalocean" as needed
    "envVariables": {
        "vercel": "VERCEL_TOKEN",
        "netlify": "NETLIFY_TOKEN",
        "digitalocean": "DIGITALOCEAN_TOKEN"
    }
}
```

2. Create a `.env` file in the root of your project with your deployment tokens:

```properties
VERCEL_TOKEN=your_vercel_token
NETLIFY_TOKEN=your_netlify_token
DIGITALOCEAN_TOKEN=your_digitalocean_token
```

3. Ensure `.env` is added to `.gitignore` to keep your tokens secure:

```gitignore
.vercel
.env
node_modules
```

4. Run the deploy command:

```bash
deploymate
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Security

- Uses minimal dependencies for better maintenance and security.
- Ensure your deployment tokens and secrets are stored securely in the `.env` file.
- The names of the environment variables can be specified in the `deploy.config.json` file, allowing flexibility for users to name their environment variables as they prefer.

## Links

- [Repository](https://github.com/rizkyngrh23/DeployMate)
- [Issues](https://github.com/rizkyngrh23/DeployMate/issues)
- [Homepage](https://github.com/rizkyngrh23/DeployMate#readme)
- [npm Package](https://www.npmjs.com/package/deploymate)
