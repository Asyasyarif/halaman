# 📋 Halaman — Task Plan Eksekusi

> Total: **227 task** | Core MVP (Phase 0–7): **120 task** | Estimasi MVP: **16–24 minggu**
>
> Ceklis task yang sudah selesai dengan `[x]`.

---

## 🏗️ Phase 0 — Foundation (Estimasi: 1–2 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 0.1 | **Setup Nuxt 4 TypeScript project** | Inisialisasi Nuxt 4 + TypeScript, setup `nuxt.config.ts`, struktur direktori `apps/web` | [ ] |
| 0.2 | **Setup Naive UI provider** | Install `naive-ui`, setup plugin provider, configure tree-shaking, register global components | [ ] |
| 0.3 | **Setup Design Tokens / Theme** | CSS variables, light/dark mode tokens, `primaryColor`, `radius`, spacing scale, typography scale | [ ] |
| 0.4 | **Setup Database (PostgreSQL)** | Docker Compose untuk PostgreSQL lokal, connection string, setup Drizzle ORM / Prisma | [ ] |
| 0.5 | **Run Database Migration** | Generate initial migration dari schema inti: `users`, `organizations`, `projects`, `project_members` | [ ] |
| 0.6 | **Setup Auth Session** | Login/logout flow, session-based auth (`nuxt-auth-utils` / Lucia), password hashing, CSRF protection | [ ] |
| 0.7 | **Setup Admin Shell Layout** | `layouts/admin.vue` — AppSidebar, ProjectSidebar, topbar, outlet | [ ] |
| 0.8 | **Setup Public Docs Shell Layout** | `layouts/docs.vue` — DocsTopbar, DocsSidebar, content area, DocsToc placeholder | [ ] |
| 0.9 | **Setup Lint / Test / Build CI** | ESLint, Prettier, Vitest, GitHub Actions workflow untuk lint + typecheck + test | [ ] |
| 0.10 | **Setup Monorepo Structure** | `apps/web/`, `packages/editor/`, `packages/docs-renderer/`, `packages/github/`, `packages/search/`, `packages/config/`, `packages/ui/`, `packages/database/` | [ ] |

---

## 🌐 Phase 1 — Public Docs MVP (Estimasi: 2–3 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 1.1 | **Build DocsLayout component** | Shell layout dengan sidebar kiri + content tengah + TOC kanan, responsive breakpoints | [ ] |
| 1.2 | **Build DocsTopbar** | Logo, product name, search input (`⌘K`), support link, dashboard button, theme toggle, mobile hamburger | [ ] |
| 1.3 | **Build DocsSidebar (navigasi kiri)** | Section groups, nested pages, active state, icons, collapsible groups, scroll, sticky position | [ ] |
| 1.4 | **Build DocsToc (right sidebar)** | "On this page", auto-generated headings dari content, active heading scroll-spy, smooth scroll | [ ] |
| 1.5 | **Build DocsContent (renderer)** | Render MDX / parsed document AST, breadcrumb, title, description, copy page button, previous/next nav | [ ] |
| 1.6 | **Build Callout component** | 4 variants: info, warning, error, success; title + body; icon | [ ] |
| 1.7 | **Build Card + CardGroup components** | Card: icon, title, description, link; CardGroup: grid layout 2-3 kolom | [ ] |
| 1.8 | **Build CodeBlock component** | Syntax highlighting (Shiki), language label, copy button, line numbers, filename header | [ ] |
| 1.9 | **Build Tabs component** | Horizontal tab bar, tab panel content, active tab management | [ ] |
| 1.10 | **Build Steps component** | Numbered step list, step title + body, connected visual | [ ] |
| 1.11 | **Build Accordion component** | Collapsible sections, title + content, multi-open support | [ ] |
| 1.12 | **Build DocsFooterNav** | Previous/next page buttons, label + title per button | [ ] |
| 1.13 | **Build Mobile Docs Drawer** | Slide-over sidebar, hamburger toggle, backdrop | [ ] |
| 1.14 | **Build DocsThemeToggle** | Light/dark/system toggle, persisted preference | [ ] |
| 1.15 | **Route setup public docs** | `/docs`, `/docs/:slug+`, `/:version/:slug+`, `/:locale/:slug+` | [ ] |

---

## 📋 Phase 2 — Admin Page Management (Estimasi: 2–3 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 2.1 | **Create Project Dashboard** | Route `/admin/projects`, list projects, create project form, project card | [ ] |
| 2.2 | **Create Project Detail Shell** | Route `/admin/projects/:projectId`, sub-navigation: Editor, Navigation, Assets, Snippets, GitHub, Deployments, Settings, Preview | [ ] |
| 2.3 | **Database: Run full schema migration** | Semua 15 tabel dari plan: users, organizations, projects, project_members, pages, page_versions, nav_items, assets, snippets, github_installations, sync_jobs, deployments, search_documents, domains, analytics_events | [ ] |
| 2.4 | **Create Page CRUD API** | `GET/POST /api/projects/:projectId/pages`, `GET/PATCH/DELETE /api/pages/:pageId` | [ ] |
| 2.5 | **Build PageTree component** | Hierarchical tree view, folder/group support, drag-to-reorder, indentasi visual | [ ] |
| 2.6 | **Build PageTreeItem component** | Single tree node: title, icon, status badge (draft/published), context menu (rename, duplicate, delete, hide, change slug, move) | [ ] |
| 2.7 | **Build Navigation Manager** | `GET/PATCH /api/projects/:projectId/navigation`, visual nav editor, group ↔ page ↔ external link | [ ] |
| 2.8 | **Build Page Settings Panel** | Slug editor, SEO metadata editor (title, description, og:image), frontmatter fields, status toggle | [ ] |
| 2.9 | **Build DraftStatusBadge** | Komponen badge: draft (kuning), published (hijau), archived (abu-abu) | [ ] |
| 2.10 | **Build SettingsPanel** | Project settings: name, slug, description, logo URLs, primary color, docs root path, status | [ ] |
| 2.11 | **Build Audit Log Base** | `audit_events` table / log, capture: page.created, page.updated, page.deleted, page.published, github.synced, settings.updated, domain.added, member.invited | [ ] |
| 2.12 | **Build Project Members Management** | Invite user, role assignment (owner/admin/editor/viewer), remove member | [ ] |

---

## ✏️ Phase 3 — Tiptap Editor (Estimasi: 3–5 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 3.1 | **Setup Tiptap Vue + Nuxt integration** | Install `@tiptap/vue-3`, `@tiptap/starter-kit`, `@tiptap/pm`, register plugin | [ ] |
| 3.2 | **Create Editor Shell** | Layout: PageTree (kiri) + Tiptap Editor (tengah) + Settings/Outline panel (kanan) + Topbar | [ ] |
| 3.3 | **Create Editor Topbar** | Save status indicator, "Ask Agent" button, Preview button, PublishDropdown, More Actions, User Avatar | [ ] |
| 3.4 | **Create PublishDropdown** | Options: Publish now, Publish as PR, Schedule publish, Save draft, Discard draft | [ ] |
| 3.5 | **Build Toolbar / Floating Menu** | Text formatting (bold, italic, heading, link, list), block insert buttons | [ ] |
| 3.6 | **Build Bubble Menu** | Inline formatting saat seleksi teks: bold, italic, link, strikethrough, code | [ ] |
| 3.7 | **Build Slash Command** | `/` trigger, menu dropdown, grouped commands: Basic blocks, Docs blocks, Embeds, AI | [ ] |
| 3.8 | **Build CalloutExtension (Tiptap)** | Tiptap Node + Vue renderer, 4 variants, title + content, toolbar integration | [ ] |
| 3.9 | **Build CodeBlockExtension (Tiptap)** | Language selector dropdown, syntax highlight preview, copy button | [ ] |
| 3.10 | **Build CodeGroupExtension (Tiptap)** | Multiple code blocks in tabs, language label per tab | [ ] |
| 3.11 | **Build TabsExtension (Tiptap)** | Custom tab block: multiple tab panels, add/remove tab, rename tab | [ ] |
| 3.12 | **Build CardExtension (Tiptap)** | Card + CardGroup blocks, card: icon, title, description, link fields | [ ] |
| 3.13 | **Build StepsExtension (Tiptap)** | Numbered step block, step title + rich content | [ ] |
| 3.14 | **Build AccordionExtension (Tiptap)** | Collapsible block, title + content | [ ] |
| 3.15 | **Build ImageExtension (Tiptap)** | Upload (local → storage), paste, drag-drop, alt text, caption, resize handles | [ ] |
| 3.16 | **Build EmbedExtension (Tiptap)** | YouTube, Loom, CodeSandbox, Figma embed, URL parse → iframe | [ ] |
| 3.17 | **Build MermaidExtension (Tiptap)** | Mermaid diagram block, live preview, code editor | [ ] |
| 3.18 | **Build HeadingWithAnchorExtension** | Auto-id generation, hover anchor link icon, scroll target | [ ] |
| 3.19 | **Build SnippetReferenceExtension** | Insert `<Snippet name="x" />` reference, inline preview | [ ] |
| 3.20 | **Build TableExtension** | Table insert, row/column add-delete, header toggle | [ ] |
| 3.21 | **Build ApiEndpointExtension** | Method badge, path input, parameter fields, request/response body | [ ] |
| 3.22 | **Build Page Title Editor** | Inline editable H1 field, separate dari Tiptap content | [ ] |
| 3.23 | **Build Frontmatter Editor** | Visual form editor: title, description, icon, status, slug, SEO fields, sidebar panel | [ ] |
| 3.24 | **Implement Autosave API + Hook** | `PATCH /api/pages/:pageId/draft`, debounce 800-1500ms, save status indicator | [ ] |
| 3.25 | **Implement Version Snapshots** | `page_versions` table, auto-snapshot every N minutes, manual checkpoint, version history UI | [ ] |
| 3.26 | **Implement Undo/Redo** | Tiptap built-in history + custom history UI buttons | [ ] |
| 3.27 | **Build Editor Preview (side panel)** | Split pane: editor kiri, preview renderer kanan, mobile toggle | [ ] |

---

## 🔗 Phase 4 — GitHub Sync (Estimasi: 4–6 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 4.1 | **Create GitHub App Manifest Docs** | Dokumentasi setup GitHub App, permission scopes, callback URL, webhook URL | [ ] |
| 4.2 | **Implement Installation Callback** | `POST /api/github/install`, OAuth flow, receive `installation_id`, store metadata | [ ] |
| 4.3 | **Store Installation Metadata** | `github_installations` table: `installation_id`, `repo_owner`, `repo_name`, `permissions_json`, encrypted `access_token`, `webhook_secret` | [ ] |
| 4.4 | **Implement Installation Token Generation** | Generate short-lived installation access token via GitHub App JWT → installation token | [ ] |
| 4.5 | **Implement Repo File Reader** | `packages/github/contents.ts`: read file, list directory, fetch raw content via REST API | [ ] |
| 4.6 | **Implement MDX Parser** | `packages/docs-renderer/parsers/`: parse MDX, extract frontmatter (title, description, icon, status), parse markdown body → document AST | [ ] |
| 4.7 | **Implement Docs Config Parser** | `packages/config/parser.ts`: parse `mint.json` config, extract: name, logo, theme, navigation, api settings | [ ] |
| 4.8 | **Implement Import from Repo** | `POST /api/projects/:projectId/github/sync`: fetch all docs files, parse, create/update `pages`, `nav_items`, `assets` | [ ] |
| 4.9 | **Implement Webhook Endpoint** | `POST /api/github/webhook`: receive `push`, `pull_request`, `installation`, `installation_repositories`, `repository` events | [ ] |
| 4.10 | **Verify Webhook Signature** | HMAC-SHA256 validation dengan `webhook_secret`, reject invalid payloads | [ ] |
| 4.11 | **Implement Push Sync Job** | `sync_jobs` table + Redis Queue: fetch changed files via GitHub compare API, parse & update pages | [ ] |
| 4.12 | **Implement Tiptap JSON → MDX Serializer** | `packages/editor/serializers/`: convert Tiptap JSON nodes → Markdown/MDX, handle all custom blocks (callout, cards, tabs, steps, etc.) | [ ] |
| 4.13 | **Implement Publish Direct Commit** | `POST /api/pages/:pageId/publish`: JSON→MDX, create/update file via GitHub Contents API (Base64), commit to branch | [ ] |
| 4.14 | **Implement Publish as Pull Request** | Create `docs-draft` branch, commit changes, create PR via GitHub REST API, link PR to sync job | [ ] |
| 4.15 | **Implement GitHub → Tiptap JSON Converter** | `packages/editor/parsers/`: convert Markdown/MDX AST → Tiptap JSON, map standard blocks + custom components | [ ] |
| 4.16 | **Implement Conflict Detection** | Compare: local draft base SHA vs current GitHub file SHA vs latest synced SHA, flag conflict | [ ] |
| 4.17 | **Build Conflict UI / Modal** | Left: GitHub version, Right: Admin draft, Bottom: merged output, actions: Keep Admin / Keep GitHub / Manual merge / Create PR | [ ] |
| 4.18 | **Build SyncStatusBadge** | Indicator: synced (hijau), pending (kuning), conflict (merah), never-synced (abu-abu) | [ ] |
| 4.19 | **Build GitHubPanel (admin settings)** | GitHub connection status, repo info, branch selector, manual sync trigger, webhook delivery log, disconnect | [ ] |
| 4.20 | **Implement Content Update (batch) via Git Database API** | Tree creation, commit, branch ref update untuk batch publish | [ ] |

---

## 👁️ Phase 5 — Live Preview (Estimasi: 2–3 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 5.1 | **Create Preview Routes** | `/preview/:projectId/:previewToken/:slug+`, `/admin/projects/:projectId/preview/page/:pageId`, `/admin/projects/:projectId/preview/site` | [ ] |
| 5.2 | **Build Draft Renderer** | Render Tiptap JSON → internal document AST → DocsRenderer components, tanpa perlu publish ke GitHub | [ ] |
| 5.3 | **Create Preview Token Model** | Generate unique tokens, set expiration, store di database, revoke capability | [ ] |
| 5.4 | **Build Preview Topbar** | Banner: "You are viewing a preview", draft indicator, close/back button, desktop/mobile toggle | [ ] |
| 5.5 | **Build Desktop/Mobile Toggle** | Switch preview viewport, iframe atau resize | [ ] |
| 5.6 | **Build Branch Preview Selector** | Dropdown pilih branch untuk preview, load docs dari branch berbeda | [ ] |
| 5.7 | **Build Preview Access Guard** | Middleware: validasi preview token, check expiration, project access, redirect unauthorized | [ ] |
| 5.8 | **Build Shareable Preview UI** | Copy preview link button, preview link dengan token, expiration info | [ ] |
| 5.9 | **Ensure Preview uses same renderer as Production** | `packages/docs-renderer/` digunakan oleh preview DAN public docs — single source of truth | [ ] |

---

## 🔍 Phase 6 — Search (Estimasi: 2–4 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 6.1 | **Build Search Document Schema** | `search_documents` table: `project_id`, `page_id`, `title`, `slug`, `content_text`, `headings_json`, `version`, `locale` | [ ] |
| 6.2 | **Implement Content Extractor** | `packages/search/extract.ts`: dari Tiptap JSON / published MDX → plain text + headings array | [ ] |
| 6.3 | **Integrate Pagefind (Production)** | Nuxt build hook → generate HTML → run Pagefind CLI → output search bundle → serve static | [ ] |
| 6.4 | **Build DocsSearchModal** | Modal overlay, search input, result list, grouping by section, highlight matched text, keyboard navigation (↑↓ Enter Esc), empty state, recent searches | [ ] |
| 6.5 | **Build DocsSearchButton** | Search icon + "Search documentation" text + `⌘K` shortcut badge, trigger modal | [ ] |
| 6.6 | **Add Keyboard Shortcut** | `⌘K` / `Ctrl+K` global listener, open search modal, scope: public docs + admin | [ ] |
| 6.7 | **Add Search Result Grouping** | Group by section/top-level nav, sub-item indentasi, icon per section | [ ] |
| 6.8 | **Add No-Result State** | "No results for X", suggestions: check spelling, browse docs, search suggestions | [ ] |
| 6.9 | **Integrate Meilisearch (Advanced)** | Docker Compose service, configurable via `SEARCH_DRIVER=meilisearch`, send documents on publish/sync | [ ] |
| 6.10 | **Implement Meilisearch Adapter** | `packages/search/meilisearch.ts`: index document, search query, delete document, reindex all, typo tolerance settings | [ ] |
| 6.11 | **Build Admin Search** | Search inside admin: pages list, settings, navigation items; use PostgreSQL full-text search untuk MVP | [ ] |
| 6.12 | **Build Search Reindex Job** | `POST /api/projects/:projectId/search/reindex`: bulk re-extract + re-index semua pages | [ ] |
| 6.13 | **Build Search API Endpoint** | `GET /api/projects/:projectId/search?q=...&version=...&locale=...` → return matching documents | [ ] |
| 6.14 | **Add Search Analytics Tracking** | Log: `search_query`, `search_no_result` events ke `analytics_events` | [ ] |

---

## 🐳 Phase 7 — Self-Hosting Polish (Estimasi: 2–3 minggu)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 7.1 | **Build Dockerfile (App)** | Multi-stage build: Node.js builder → production runner, env config, healthcheck | [ ] |
| 7.2 | **Build Dockerfile (Worker)** | Background job worker untuk sync jobs, deployment jobs | [ ] |
| 7.3 | **Build docker-compose.yml** | Services: `app`, `worker`, `postgres`, `redis`, `meilisearch` (optional), `minio` (optional S3 storage) | [ ] |
| 7.4 | **Build Setup Wizard** | First-run onboarding: create admin user, connect database, configure app URL, GitHub App setup guide | [ ] |
| 7.5 | **Build First Project Flow** | Guided flow: connect GitHub, import docs, view public site, create first page | [ ] |
| 7.6 | **Write GitHub App Setup Guide** | Step-by-step: register GitHub App, set permissions, generate private key, configure env vars, install app | [ ] |
| 7.7 | **Write Self-Hosting Docs** | `docs/self-hosting.mdx`: prerequisites, Docker Compose, env reference, deployment targets (Railway, Fly.io, Render, VPS) | [ ] |
| 7.8 | **Write Backup & Restore Guide** | PostgreSQL dump/restore, volume backup, disaster recovery | [ ] |
| 7.9 | **Write Upgrade Guide** | Docker image tag strategy, migration running, breaking change notes | [ ] |
| 7.10 | **Create Example Docs Repo** | `examples/basic-docs/`: sample `mint.json` + pages + snippets + assets, ready-to-import | [ ] |
| 7.11 | **Create API Docs Example** | `examples/api-docs/`: OpenAPI spec, API reference pages | [ ] |
| 7.12 | **Create Multilingual Docs Example** | `examples/multilingual-docs/`: versioned + localized docs structure | [ ] |
| 7.13 | **Build Environment Validator** | Startup check: database connection, Redis connection, GitHub App config, storage config, search config | [ ] |

---

## 🔌 Phase 8 — OpenAPI / API Reference (paralel dengan Phase 3–5)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 8.1 | **Create API Spec Model + Table** | `api_specs` table: source_type, github_path, content_json, parsed_at | [ ] |
| 8.2 | **Create API Operations Table** | `api_operations` table: method, path, operation_id, summary, description, schema_json | [ ] |
| 8.3 | **Build OpenAPI Parser** | Parse `openapi.yaml` / `openapi.json`, extract operations, parameters, request bodies, response schemas | [ ] |
| 8.4 | **Build OpenAPI Uploader UI** | Upload file di admin, paste URL, or select from GitHub path | [ ] |
| 8.5 | **Build ApiEndpoint Renderer** | Method badge (GET/POST/PUT/DELETE color-coded), path display, copy URL button | [ ] |
| 8.6 | **Build ParamField Component** | Parameter name, type badge, required indicator, description, default value | [ ] |
| 8.7 | **Build RequestExample Component** | Code block dengan sample request body, language tabs (cURL, JS, Python) | [ ] |
| 8.8 | **Build ResponseExample Component** | JSON response schema viewer, collapsible nested objects | [ ] |
| 8.9 | **Build OpenApiViewer Component** | Full API reference page: list endpoints, group by tag, expand/collapse per endpoint | [ ] |
| 8.10 | **Route API Reference Public** | `/api-reference` (list semua endpoint grouped by tag), `/api-reference/:operationId` (detail page + schema) | [ ] |
| 8.11 | **Build OpenApiOperationExtension (Tiptap)** | Insert API endpoint reference langsung di editor, link ke OpenAPI operation | [ ] |
| 8.12 | **Build Try-It Console (V1)** | Interactive API tester: auth header config, environment variables, execute request, response viewer | [ ] |
| 8.13 | **Build Example Response Tabs** | Multiple language tabs untuk code examples (cURL, JavaScript, Python, Go) | [ ] |

---

## 📦 Phase 9 — Reusable Snippets (paralel dengan Phase 3–4)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 9.1 | **Create Snippets Model + Table** | `snippets` table: `project_id`, `name`, `slug`, `content_json`, `github_path` | [ ] |
| 9.2 | **Create Snippets CRUD API** | `GET/POST /api/projects/:projectId/snippets`, `GET/PATCH/DELETE /api/snippets/:snippetId` | [ ] |
| 9.3 | **Build Snippets Admin UI** | Snippets menu di project sidebar, list snippets, create/edit snippet dengan Tiptap mini-editor, delete | [ ] |
| 9.4 | **Build Slash Command Snippet Insert** | `/snippet` command di editor, search & select snippet, insert sebagai `<Snippet name="x" />` reference | [ ] |
| 9.5 | **Build SnippetReference Renderer** | Render snippet inline di docs content (ekspansi placeholder → content snippet), update otomatis jika snippet berubah | [ ] |
| 9.6 | **Build Snippet Usage Warning** | Warn admin jika snippet dipakai di banyak pages (saat edit/delete snippet), tampilkan list pages yang terpengaruh | [ ] |

---

## 🌐 Phase 10 — Versioning & Localization (paralel dengan Phase 5–6)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 10.1 | **Create Versions Model + Table** | `versions` table: `project_id`, `name`, `slug`, `branch`, `is_default` | [ ] |
| 10.2 | **Create Versions CRUD API** | `GET/POST /api/projects/:projectId/versions`, `PATCH/DELETE /api/versions/:versionId`, set default | [ ] |
| 10.3 | **Build Version Selector (Public Docs)** | Dropdown di topbar: latest, v1, v2, beta; URL: `/:version/:slug+`; redirect `/docs/x` → `/:defaultVersion/x` | [ ] |
| 10.4 | **Build GitHub Branch Mapping** | Map version slug → GitHub branch (main → latest, v1-docs → v1, v2-docs → v2); pull docs dari branch yang sesuai | [ ] |
| 10.5 | **Create Locales Model + Table** | `locales` table: `project_id`, `code`, `label`, `is_default` | [ ] |
| 10.6 | **Create Locales CRUD API** | `GET/POST /api/projects/:projectId/locales`, `PATCH/DELETE /api/locales/:localeId`, set default | [ ] |
| 10.7 | **Build Locale Selector (Public Docs)** | Dropdown di topbar: EN, ID, JA; URL: `/:locale/:slug+` | [ ] |
| 10.8 | **Build Version + Locale URL Middleware** | Parse URL params, resolve version & locale, filter pages by version/locale, 404 jika tidak ada | [ ] |
| 10.9 | **Build Version Management UI (Admin)** | Settings → Versions: list, add, edit, delete version; map branch; default selector | [ ] |
| 10.10 | **Build Locale Management UI (Admin)** | Settings → Locales: list, add, edit, delete locale; default selector | [ ] |

---

## 🌍 Phase 11 — Domain Management (Defer setelah MVP stabil)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 11.1 | **Create Domains Model + Table** | `domains` table: `project_id`, `domain`, `type` (subdomain/custom), `status` (pending/verified/active/failed), `dns_target`, `ssl_status` | [ ] |
| 11.2 | **Create Domains CRUD API** | `GET/POST /api/projects/:projectId/domains`, `PATCH/DELETE /api/domains/:domainId`, trigger verification | [ ] |
| 11.3 | **Build Domain Verification** | Generate DNS target (CNAME), user sets DNS record, system verifies via DNS lookup, update status | [ ] |
| 11.4 | **Build SSL Provisioning** | Auto-provision TLS via Let's Encrypt / Traefik / Caddy, track SSL status, auto-renewal | [ ] |
| 11.5 | **Build Domain Admin UI** | Settings → Domain: list domains, add custom domain, view DNS target, verification status, SSL status, delete | [ ] |
| 11.6 | **Build Reverse Proxy Routing** | Host-based project resolver: extract domain from request → lookup project → serve docs | [ ] |
| 11.7 | **Build Redirect Middleware** | www ↔ non-www redirect, canonical URL, sitemap.xml generation, robots.txt | [ ] |

---

## 🤖 Phase 12 — AI Agent (Defer setelah MVP stabil)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 12.1 | **Create AI Settings Model** | Per-project: `ai_enabled` flag, `ai_provider`, `ai_api_key_encrypted`, `ai_model`, `ai_temperature` | [ ] |
| 12.2 | **Build LLM Provider Adapter** | Abstraction layer: OpenAI, Anthropic, Ollama, local OpenAI-compatible endpoint | [ ] |
| 12.3 | **Implement Document Chunking** | Split docs content into chunks, configurable chunk size & overlap | [ ] |
| 12.4 | **Implement Embeddings Pipeline** | Generate embeddings (`text-embedding-3-small` / local model), store in vector index (pgvector) | [ ] |
| 12.5 | **Implement Retrieval (RAG)** | Query → embedding → vector similarity search → retrieve top-k chunks → context assembly | [ ] |
| 12.6 | **Build "Ask Docs" (Public Docs)** | Search bar / chat widget di public docs, RAG pipeline, streamed answer via SSE | [ ] |
| 12.7 | **Build "Ask Agent" (Admin Editor)** | Button di editor topbar, input prompt, AI actions: generate outline, improve writing, fix grammar, convert notes to docs, generate examples | [ ] |
| 12.8 | **Build AI Actions Menu** | Contextual: "Create quickstart from this page", "Find pages without description", "Generate examples for this endpoint", "Make this page clearer" | [ ] |
| 12.9 | **Build AI Self-Hosted Mode** | AI fully optional, user bawa API key sendiri, bisa disable total, per-project settings, audit log AI actions | [ ] |
| 12.10 | **Build AI Audit Log** | Track: ai.prompt_sent, ai.response_received, ai.page_generated, model, tokens used | [ ] |
| 12.11 | **Build AI Consent Guard** | Tidak kirim private docs ke external AI tanpa explicit opt-in, per-project toggle | [ ] |

---

## 📊 Phase 13 — Analytics (Defer setelah MVP stabil)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 13.1 | **Create Analytics Events Table** | `analytics_events` table: `project_id`, `session_id`, `event_type`, `page_id`, `path`, `query`, `metadata_json`, `created_at` | [ ] |
| 13.2 | **Build Analytics Tracking Script** | Client-side tracker: page_view, search_query, search_no_result, copy_code, copy_page, feedback_positive, feedback_negative, outbound_link_click, api_endpoint_view, theme_toggle, version_change, locale_change | [ ] |
| 13.3 | **Implement Privacy Mode (Basic)** | No cookies, anonymous sessions (random session_id), aggregate-only data | [ ] |
| 13.4 | **Implement Privacy Mode (Advanced)** | Session-based journey tracking, configurable retention days, IP anonymization | [ ] |
| 13.5 | **Build Analytics Dashboard** | Top pages, search queries, no-result searches, feedback score, popular API endpoints, broken links, traffic by version, traffic by locale, docs health score | [ ] |
| 13.6 | **Build Analytics API** | `GET /api/projects/:projectId/analytics/overview`, `GET /api/projects/:projectId/analytics/pages`, `GET /api/projects/:projectId/analytics/search` | [ ] |
| 13.7 | **Build Feedback Widget (Public Docs)** | "Was this page helpful?" thumbs up/down + optional text feedback, submit to analytics | [ ] |

---

## ✅ Phase 14 — Testing (paralel di semua phase)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 14.1 | **Unit Tests — Markdown Serializer** | Test: Tiptap JSON → MDX conversion, semua custom blocks (callout, cards, tabs, steps, code) | [ ] |
| 14.2 | **Unit Tests — Markdown Parser** | Test: MDX → Tiptap JSON conversion, frontmatter extraction, custom component mapping | [ ] |
| 14.3 | **Unit Tests — GitHub Payload Validator** | Test: webhook signature verification (valid + invalid), event type routing | [ ] |
| 14.4 | **Unit Tests — Search Document Extractor** | Test: plain text + headings extraction dari Tiptap JSON + MDX | [ ] |
| 14.5 | **Unit Tests — Navigation Builder** | Test: nav tree building dari flat pages list, nested structure, sorting | [ ] |
| 14.6 | **Unit Tests — Slug Generator** | Test: slug generation, uniqueness, collision handling, special chars | [ ] |
| 14.7 | **Integration Tests — Page CRUD** | Test: create page → read → update → delete via API, status changes | [ ] |
| 14.8 | **Integration Tests — Autosave** | Test: draft save interval, version snapshot creation, restore version | [ ] |
| 14.9 | **Integration Tests — Publish Flow** | Test: Tiptap JSON → MDX → GitHub commit → status update | [ ] |
| 14.10 | **Integration Tests — GitHub Webhook Sync** | Test: webhook payload processing, file change detection, page update | [ ] |
| 14.11 | **Integration Tests — Search Indexing** | Test: Pagefind index generation, search query returns results; Meilisearch document indexing + search | [ ] |
| 14.12 | **Integration Tests — Asset Upload** | Test: upload image → store → retrieve → delete, file type validation | [ ] |
| 14.13 | **Integration Tests — Preview Rendering** | Test: draft JSON → renderer → HTML output, preview token validation | [ ] |
| 14.14 | **E2E Tests — Login Admin** | Test: full login flow, session persistence, logout | [ ] |
| 14.15 | **E2E Tests — Create Documentation Page** | Test: admin → create page → edit title → add callout → add code block → add card → save draft | [ ] |
| 14.16 | **E2E Tests — Preview & Publish** | Test: preview page → publish to GitHub → view public docs page → verify content | [ ] |
| 14.17 | **E2E Tests — Search** | Test: open search modal → type query → select result → navigate to page | [ ] |
| 14.18 | **Visual Regression Tests** | Public docs layout (light + dark), admin editor layout, mobile docs view, search modal, API reference page | [ ] |

---

## 🔒 Phase 15 — Security Hardening (paralel di semua phase)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 15.1 | **Password Hashing** | bcrypt/argon2 untuk password storage, salt rounds | [ ] |
| 15.2 | **Session-Based Auth** | Secure httpOnly cookies, session expiry, refresh mechanism | [ ] |
| 15.3 | **CSRF Protection** | CSRF tokens untuk semua admin mutating actions (POST/PATCH/DELETE) | [ ] |
| 15.4 | **RBAC Implementation** | Owner, Admin, Editor, Viewer roles; middleware check per route + per API | [ ] |
| 15.5 | **Encrypt GitHub Tokens & Keys** | AES-256-GCM encryption untuk `access_token`, `webhook_secret`, `github_private_key` | [ ] |
| 15.6 | **Verify GitHub Webhook Signatures** | HMAC-SHA256 validation, constant-time comparison, reject invalid | [ ] |
| 15.7 | **Rate Limiting** | Rate limit: auth endpoints, webhook endpoint, API generik; configurable thresholds | [ ] |
| 15.8 | **Audit Log** | Semua event: page.created/updated/deleted/published, github.synced, settings.updated, domain.added, member.invited | [ ] |
| 15.9 | **Preview Token Security** | Expiration time, single-use option, scope (single page vs full site), revoke | [ ] |
| 15.10 | **Asset Upload Validation** | File type whitelist, max file size, malware scan (optional), sanitize filenames | [ ] |
| 15.11 | **HTML Sanitization** | DOMPurify / sanitize-html untuk embed content, strip XSS vectors | [ ] |
| 15.12 | **CSP Headers** | Content-Security-Policy: script-src, style-src, frame-src, img-src directives | [ ] |
| 15.13 | **No Secrets in Client Bundle** | Ensure no `ENCRYPTION_KEY`, `DATABASE_URL`, `GITHUB_*` keys leak ke client | [ ] |

---

## 🚀 Phase 16 — Deployments & Build Pipeline (paralel dengan Phase 5–7)

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 16.1 | **Create Deployments Model + Table** | `deployments` table: `project_id`, `source`, `commit_sha`, `branch`, `status`, `preview_url`, `production_url`, `logs`, `created_at`, `finished_at` | [ ] |
| 16.2 | **Create Deployments API** | `GET/POST /api/projects/:projectId/deployments`, trigger build, get status, get logs | [ ] |
| 16.3 | **Implement Build Pipeline** | Draft → validate → export MDX → commit → trigger docs build → generate search index → deployment ready | [ ] |
| 16.4 | **Implement Deployment Status Tracking** | Job queue (Redis/BullMQ): queued → building → ready → failed; real-time status updates | [ ] |
| 16.5 | **Build Deployments Admin UI** | Deployment history list, status indicator, commit SHA link, preview URL link, log viewer, manual trigger | [ ] |

---

## 📝 Phase 17 — Documentation & Open Source Release

| # | Task | Sub-task Detail | ✅ |
|---|------|-----------------|----|
| 17.1 | **Write `README.md`** | Project overview, features, quickstart, architecture diagram, contributing guide | [ ] |
| 17.2 | **Write `CONTRIBUTING.md`** | Development setup, code style, PR process, issue templates | [ ] |
| 17.3 | **Write `CHANGELOG.md`** | Version history, breaking changes, migration notes | [ ] |
| 17.4 | **Write `LICENSE`** | Choose open-source license (MIT / AGPL) | [ ] |
| 17.5 | **Write Architecture Docs** | `docs/architecture.mdx`: system design, data flow, component tree | [ ] |
| 17.6 | **Write API Reference Docs** | `docs/api-reference/`: internal API documentation untuk self-hosters | [ ] |
| 17.7 | **Publish Example Projects** | `examples/basic-docs/`, `examples/api-docs/`, `examples/multilingual-docs/` | [ ] |

---

## 📊 Ringkasan Semua Phase

| Phase | Nama | Estimasi | Jumlah Task | Prioritas |
|-------|------|----------|-------------|-----------|
| 0 | Foundation | 1–2 minggu | 10 | 🔴 Wajib |
| 1 | Public Docs MVP | 2–3 minggu | 15 | 🔴 Wajib |
| 2 | Admin Page Management | 2–3 minggu | 12 | 🔴 Wajib |
| 3 | Tiptap Editor | 3–5 minggu | 27 | 🔴 Wajib |
| 4 | GitHub Sync | 4–6 minggu | 20 | 🔴 Wajib |
| 5 | Live Preview | 2–3 minggu | 9 | 🔴 Wajib |
| 6 | Search | 2–4 minggu | 14 | 🔴 Wajib |
| 7 | Self-Hosting Polish | 2–3 minggu | 13 | 🔴 Wajib |
| 8 | OpenAPI / API Reference | (paralel) | 13 | 🟡 Penting |
| 9 | Reusable Snippets | (paralel) | 6 | 🟡 Penting |
| 10 | Versioning & Localization | (paralel) | 10 | 🟡 Penting |
| 11 | Domain Management | (defer) | 7 | 🔵 Defer |
| 12 | AI Agent | (defer) | 11 | 🔵 Defer |
| 13 | Analytics | (defer) | 7 | 🔵 Defer |
| 14 | Testing | (paralel) | 18 | 🟡 Penting |
| 15 | Security Hardening | (paralel) | 13 | 🟡 Penting |
| 16 | Deployments & Build | (paralel) | 5 | 🟡 Penting |
| 17 | Docs & OSS Release | (paralel) | 7 | 🟡 Penting |

> **Total: 227 task** | **Core MVP (Phase 0–7): 120 task** | **MVP Estimasi: 16–24 minggu**

---

## 🗺️ Execution Order (Dependency Graph)

```
Phase 0 (Foundation)
 │
 ├─► Phase 1 (Public Docs MVP)
 │    │
 │    └─► Phase 2 (Admin Page Management)
 │          │
 │          ├─► Phase 3 (Tiptap Editor) ── paralel ──► Phase 8 (OpenAPI), Phase 9 (Snippets)
 │          │    │
 │          │    └─► Phase 5 (Live Preview)
 │          │
 │          └─► Phase 4 (GitHub Sync) ── paralel ──► Phase 14 (Testing), Phase 15 (Security)
 │               │
 │               ├─► Phase 5 (Live Preview)
 │               │
 │               ├─► Phase 6 (Search) ── paralel ──► Phase 10 (Versioning/Locale)
 │               │
 │               ├─► Phase 7 (Self-Hosting Polish)
 │               │
 │               └─► Phase 16 (Deployments & Build)

Phase 10 (Versioning/Localization)
 │
 └─► Phase 11 (Domain Management) [DEFER]

Phase 7 (Self-Hosting Polish)
 │
 └─► Phase 12 (AI Agent) [DEFER]
 └─► Phase 13 (Analytics) [DEFER]
 └─► Phase 17 (Docs & OSS Release)
```
