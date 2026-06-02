# Halaman

Beautiful documentation, made simple. A self-hosted docs platform with a visual editor, GitHub sync,
and instant search.

## Features

- **Visual Rich Editor** — Tiptap-based block editor with callouts, code blocks, cards, tabs, steps, tables, embeds, and more
- **GitHub Sync** — Import docs from any repo, publish as direct commits or pull requests
- **Instant Search** — Pagefind for static search, optional Meilisearch for advanced use
- **Live Preview** — See drafts exactly as they'll appear before publishing
- **API Reference** — Built-in OpenAPI spec viewer with interactive try-it console
- **Versioning & Localization** — Multiple doc versions and languages per project
- **Reusable Snippets** — Write once, reference anywhere via `<Snippet name="x" />`
- **Self-Hosted** — Single Docker Compose command, SQLite or PostgreSQL, MIT licensed

## Quickstart

### Prerequisites

- Node.js 22+
- pnpm 9+
- SQLite (default, zero config) or PostgreSQL

### Development

```bash
# Clone
git clone https://github.com/halaman/halaman.git
cd halaman

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Start dev server (port 3333)
pnpm dev
```

Open [http://localhost:3333](http://localhost:3333).

### Docker (Production)

```bash
docker compose up -d
```

## Architecture

```
apps/
  web/                   # Nuxt 4 app (frontend + Nitro API)
    pages/
      docs/              # Public documentation routes
      admin/             # Admin dashboard routes
      auth/              # Login / register
    server/
      api/               # REST API handlers
    components/
      docs/              # Public docs components
      admin/             # Admin UI components

packages/
  database/              # Drizzle ORM schema, migrations
  editor/                # Tiptap ↔ MDX serializer/parser
  docs-renderer/         # Document AST → HTML renderer
  github/                # GitHub API client, webhook handler
  search/                # Content extractor, search adapters
  config/                # mint.json config parser
  ui/                    # Shared docs components
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite file path or PostgreSQL connection string | Yes |
| `DATABASE_AUTH_TOKEN` | Turso auth token (only for remote SQLite) | No |
| `SESSION_SECRET` | Session encryption secret | Yes |
| `ENCRYPTION_KEY` | Key for encrypting GitHub tokens | Yes |
| `GITHUB_APP_ID` | GitHub App ID | For GitHub sync |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key | For GitHub sync |
| `GITHUB_APP_WEBHOOK_SECRET` | GitHub webhook secret | For GitHub sync |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | For GitHub login |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | For GitHub login |

## Tech Stack

- **Framework:** Nuxt 4 + Vue 3 + TypeScript
- **UI:** Naive UI (admin), custom components (docs)
- **Editor:** Tiptap 2
- **Database:** SQLite via `@libsql/client` (Drizzle ORM)
- **Search:** Pagefind (default), Meilisearch (optional)
- **Syntax Highlighting:** Shiki
- **Auth:** Session-based with bcrypt

## License

MIT
