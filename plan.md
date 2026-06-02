Berikut plan komprehensif untuk membuat **open-source documentation platform seperti Mintlify**, dengan stack utama **Nuxt + Tiptap Editor + Naive UI**, fokus pada **GitHub sync, self-hosted, live editor, live preview, dan search docs**.

## 1. Visi produk

Bangun platform dokumentasi open-source yang bisa dipakai untuk:

1. Membuat dan mengelola dokumentasi produk/API secara visual.
2. Menyimpan dokumentasi sebagai file di GitHub.
3. Menyediakan editor admin seperti CMS.
4. Menyediakan public docs site seperti Mintlify.
5. Bisa di-self-host oleh tim developer.
6. Memiliki preview sebelum publish.
7. Memiliki search cepat untuk dokumentasi.
8. Bisa dikembangkan ke domain custom, AI agent, dan analytics.

Target produk: **developer-first documentation CMS + docs renderer**.

---

## 2. Prinsip utama produk

Platform ini harus punya tiga permukaan utama:

### A. Public Documentation Site

Mengikuti standar UI seperti gambar pertama:

- Top navbar dengan logo, search, support link, dashboard button, theme toggle.
- Left sidebar untuk navigasi docs.
- Main content area untuk artikel.
- Right sidebar untuk table of contents.
- Copy page button.
- Previous/next navigation.
- Cards, callouts, steps, tabs, accordion, code block, API reference.
- Responsive untuk mobile.
- Dark mode dan light mode.

### B. Admin / Editor

Mengikuti standar UI seperti gambar kedua:

- App sidebar paling kiri untuk menu global.
- Sidebar navigasi docs.
- Tree navigation untuk pages.
- Tombol add new.
- Area editor utama di tengah.
- Publish dropdown di kanan atas.
- Ask Agent entry point.
- Page settings.
- Draft/published status.
- Preview mode.
- GitHub sync status.

### C. Live Preview

Halaman khusus untuk melihat hasil dokumentasi sebelum dipublish:

- Preview draft.
- Preview branch tertentu.
- Preview per page.
- Preview full docs site.
- Preview mobile/desktop.
- Preview theme.
- Preview version/language.

---

## 3. Landasan stack teknis

Gunakan **Nuxt 4** sebagai full-stack framework karena Nuxt menyediakan struktur app, rendering, dan server API dalam satu project. Nuxt juga memiliki direktori `server/` untuk API dan server handlers yang otomatis diregister oleh framework. ([Nuxt][1])

Gunakan **Tiptap** sebagai rich text editor karena Tiptap adalah headless rich-text editor framework yang cocok untuk membuat editor custom. Tiptap juga punya panduan resmi untuk integrasi Nuxt dan mendukung format content seperti HTML, Markdown, dan Tiptap JSON. ([tiptap.dev][2])

Gunakan **Naive UI** untuk komponen admin dan docs UI karena Naive UI adalah Vue 3 component library yang mendukung TypeScript dan theme customization. ([naiveui.com][3])

Untuk GitHub sync, pendekatan terbaik adalah menggunakan **GitHub App**. GitHub webhooks memungkinkan app menerima event seperti push atau pull request secara real-time, dan GitHub REST API dapat dipakai untuk membuat, mengubah, dan menghapus file repository. ([GitHub Docs][4])

Untuk search, sediakan dua mode: **Pagefind** untuk static/self-hosted ringan tanpa infrastruktur tambahan, dan **Meilisearch** untuk search dinamis, multi-project, dan preview search. Pagefind membuat static search bundle setelah site dibuild, sementara Meilisearch cocok untuk self-hosted search engine dengan API pencarian. ([Pagefind][5])

---

## 4. Arsitektur tingkat tinggi

```txt
                           ┌──────────────────────┐
                           │      GitHub Repo      │
                           │ docs/*.mdx, config    │
                           └──────────┬───────────┘
                                      │
                       webhook / REST / Git API
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│                            Nuxt Application                              │
│                                                                           │
│  ┌─────────────────┐   ┌─────────────────┐   ┌────────────────────────┐  │
│  │ Public Docs UI  │   │ Admin / Editor  │   │ Live Preview Renderer  │  │
│  └─────────────────┘   └─────────────────┘   └────────────────────────┘  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Nuxt Server API / Nitro                                             │  │
│  │ Auth, Projects, Pages, GitHub Sync, Search, Preview, Assets         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │                           │                           │
┌─────────▼─────────┐       ┌─────────▼─────────┐       ┌─────────▼─────────┐
│   PostgreSQL      │       │ Redis / Queue     │       │ Object Storage    │
│ content metadata  │       │ sync/build jobs   │       │ images/files      │
└───────────────────┘       └───────────────────┘       └───────────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Search Engine           │
                         │ Pagefind / Meilisearch  │
                         └─────────────────────────┘
```

---

## 5. Pilihan mode deployment

### Mode 1: Single-project self-hosted

Cocok untuk open-source MVP.

Satu instance hanya mengelola satu documentation project.

Contoh:

```txt
docs.example.com
admin.docs.example.com
```

Kelebihan:

- Simpel.
- Lebih mudah untuk open-source.
- Konfigurasi lebih sedikit.
- Cocok untuk tim kecil.

### Mode 2: Multi-project self-hosted

Satu instance bisa mengelola banyak docs project.

Contoh:

```txt
docs.company.com/project-a
docs.company.com/project-b
admin.company.com/projects/project-a
```

Kelebihan:

- Cocok untuk SaaS.
- Bisa berkembang menjadi hosted platform.
- Mendukung multi-tenant.

Rekomendasi: mulai dari **single-project**, tetapi desain database tetap mendukung `organization_id` dan `project_id` sejak awal.

---

## 6. Modul utama produk

### 6.1 Public Docs Renderer

Fungsi:

- Render halaman dokumentasi.
- Render navigation sidebar.
- Render table of contents.
- Render code block.
- Render callout.
- Render cards.
- Render API reference.
- Render search modal.
- Render theme light/dark.
- Render version selector.
- Render language selector.
- Render previous/next page.
- Render breadcrumb.
- Render page feedback.

Route utama:

```txt
/
 /docs
 /docs/:slug+
 /api-reference
 /blog
 /changelog
 /:version/:slug+
 /:locale/:slug+
```

Komponen public docs:

```txt
components/docs/
  DocsLayout.vue
  DocsTopbar.vue
  DocsSidebar.vue
  DocsToc.vue
  DocsSearchButton.vue
  DocsSearchModal.vue
  DocsContent.vue
  DocsFooterNav.vue
  DocsThemeToggle.vue
  DocsVersionSelect.vue
  DocsLocaleSelect.vue
  DocsFeedback.vue
```

---

### 6.2 Admin Dashboard

Fungsi:

- Login.
- Pilih project.
- Kelola docs tree.
- Kelola pages.
- Kelola assets.
- Kelola snippets.
- Kelola redirects.
- Kelola theme.
- Kelola GitHub integration.
- Kelola deployments.
- Kelola users/roles.
- Kelola settings.
- Kelola preview.
- Publish docs.

Route admin:

```txt
/admin
/admin/projects
/admin/projects/:projectId
/admin/projects/:projectId/editor/:pageId
/admin/projects/:projectId/navigation
/admin/projects/:projectId/assets
/admin/projects/:projectId/snippets
/admin/projects/:projectId/git
/admin/projects/:projectId/deployments
/admin/projects/:projectId/settings
/admin/projects/:projectId/preview
```

Komponen admin:

```txt
components/admin/
  AdminShell.vue
  AdminSidebar.vue
  ProjectSidebar.vue
  PageTree.vue
  PageTreeItem.vue
  PublishDropdown.vue
  SyncStatusBadge.vue
  DraftStatusBadge.vue
  CommandMenu.vue
  SettingsPanel.vue
  GitHubPanel.vue
```

---

### 6.3 Tiptap Live Editor

Editor harus terasa seperti CMS modern, bukan sekadar markdown textarea.

Fitur editor:

- Rich text editing.
- Slash command.
- Bubble menu.
- Floating toolbar.
- Drag block.
- Autosave.
- Undo/redo.
- Page title editor.
- Frontmatter editor.
- SEO metadata editor.
- Visual callout block.
- Code block dengan language selector.
- Tabs block.
- Accordion block.
- Cards block.
- Steps block.
- API endpoint block.
- Image upload.
- Embed block.
- Reusable snippet block.
- Table block.
- Mermaid/diagram block.
- Keyboard shortcuts.
- Draft status.
- Publish status.
- Git sync status.
- Preview side panel.

Tiptap `StarterKit` bisa menjadi starting point karena berisi extension umum untuk editor dasar. Untuk kebutuhan dokumentasi, perlu custom extensions di atasnya: callout, code group, cards, tabs, API endpoint, dan reusable snippets. ([tiptap.dev][6])

Penting: Tiptap Markdown extension saat ini ditandai sebagai early release/beta, jadi untuk MVP lebih aman menyimpan **Tiptap JSON sebagai canonical draft format**, lalu export ke Markdown/MDX saat publish. ([tiptap.dev][7])

---

## 7. Content model

Gunakan dua format content:

### Draft format

Disimpan di database.

```ts
type DraftContent = {
  type: "tiptap-json";
  content: Record<string, any>;
};
```

Kegunaan:

- Editor cepat.
- Autosave.
- Bisa menyimpan block custom.
- Bisa preview instan.
- Bisa versioning internal.
- Tidak bergantung pada parser Markdown saat editing.

### Published format

Disimpan ke GitHub sebagai Markdown/MDX.

```mdx
---
title: "Quickstart"
description: "Start building documentation in minutes"
icon: "rocket"
status: "published"
---

# Quickstart

Content here...
```

Kegunaan:

- Git-friendly.
- Bisa direview melalui PR.
- Bisa digunakan oleh static renderer.
- Mudah dimigrasikan.
- Cocok untuk open source.

---

## 8. Struktur repository docs

Rekomendasi struktur GitHub repo:

```txt
docs/
  mint.json
  pages/
    introduction.mdx
    quickstart.mdx
    development.mdx
  api-reference/
    authentication.mdx
    users.mdx
  blog/
    first-post.mdx
  snippets/
    auth-token.mdx
  assets/
    logo.svg
    images/
      hero.png
  openapi/
    api.yaml
```

File config:

```json
{
  "name": "Project Docs",
  "logo": {
    "light": "/assets/logo-light.svg",
    "dark": "/assets/logo-dark.svg"
  },
  "theme": {
    "primaryColor": "#10b981",
    "radius": "medium"
  },
  "navigation": [
    {
      "group": "Getting started",
      "pages": [
        "pages/introduction.mdx",
        "pages/quickstart.mdx",
        "pages/development.mdx"
      ]
    }
  ],
  "api": {
    "openapi": "openapi/api.yaml"
  }
}
```

Untuk kompatibilitas dengan ekosistem docs modern, config bisa memakai format sendiri dulu, lalu sediakan adapter untuk format Mintlify/Nextra/Docusaurus nanti.

---

## 9. Database schema inti

### users

```txt
id
name
email
avatar_url
password_hash / oauth_provider
created_at
updated_at
```

### organizations

```txt
id
name
slug
owner_user_id
created_at
updated_at
```

### projects

```txt
id
organization_id
name
slug
description
logo_light_url
logo_dark_url
primary_color
github_repo_owner
github_repo_name
github_default_branch
docs_root_path
status
created_at
updated_at
```

### project_members

```txt
id
project_id
user_id
role: owner | admin | editor | viewer
created_at
```

### pages

```txt
id
project_id
parent_id
title
slug
path
type: page | api | blog | changelog
status: draft | published | archived
draft_content_json
published_content_hash
frontmatter_json
github_path
github_sha
position
created_by
updated_by
created_at
updated_at
published_at
```

### page_versions

```txt
id
page_id
version_number
content_json
frontmatter_json
source: autosave | manual | publish | github_sync
created_by
created_at
```

### nav_items

```txt
id
project_id
parent_id
label
type: group | page | external
page_id
href
icon
position
created_at
updated_at
```

### assets

```txt
id
project_id
filename
mime_type
size
storage_key
public_url
github_path
created_by
created_at
```

### snippets

```txt
id
project_id
name
slug
content_json
github_path
created_at
updated_at
```

### github_installations

```txt
id
organization_id
project_id
installation_id
repo_owner
repo_name
permissions_json
access_token_encrypted
token_expires_at
webhook_secret_encrypted
created_at
updated_at
```

### sync_jobs

```txt
id
project_id
type: pull | push | publish | webhook | conflict_check
status: pending | running | success | failed
payload_json
result_json
error_message
created_at
started_at
finished_at
```

### deployments

```txt
id
project_id
source: local | github | manual
commit_sha
branch
status: queued | building | ready | failed
preview_url
production_url
logs
created_at
finished_at
```

### search_documents

```txt
id
project_id
page_id
title
slug
content_text
headings_json
version
locale
indexed_at
```

### domains

```txt
id
project_id
domain
type: subdomain | custom
status: pending | verified | active | failed
dns_target
ssl_status
created_at
updated_at
```

### analytics_events

```txt
id
project_id
session_id
event_type
page_id
path
query
metadata_json
created_at
```

---

## 10. GitHub sync design

### 10.1 Integrasi GitHub

Gunakan GitHub App, bukan personal access token sebagai default.

Alasan:

- Permission bisa scoped per repository.
- Bisa menerima webhook.
- Lebih cocok untuk produk multi-user.
- Token installation bisa dipakai untuk akses repo.
- Permission bisa dibuat minimum.

GitHub App installation token bisa dipakai untuk Git-over-HTTPS access selama app memiliki permission repository contents. ([GitHub Docs][8])

Permission minimum:

```txt
Repository permissions:
- Contents: Read & Write
- Metadata: Read
- Pull requests: Read & Write, optional
- Webhooks: managed by GitHub App
```

Webhook events:

```txt
push
pull_request
installation
installation_repositories
repository
```

Webhook harus divalidasi sebelum diproses. GitHub merekomendasikan validasi signature webhook agar server hanya memproses payload yang benar-benar dikirim GitHub dan tidak dimodifikasi. ([GitHub Docs][9])

---

### 10.2 Sync direction

Ada dua arah sync:

```txt
GitHub → App
App → GitHub
```

#### GitHub → App

Dipakai saat:

- User push file docs dari local.
- PR di-merge.
- Branch berubah.
- File docs diubah langsung di GitHub.

Flow:

```txt
GitHub push webhook
→ verify signature
→ enqueue sync job
→ fetch changed files
→ parse MDX/frontmatter
→ update pages/nav/assets
→ rebuild search index
→ trigger deployment
```

#### App → GitHub

Dipakai saat:

- User edit di admin.
- User publish page.
- User update navigation.
- User upload asset.
- User update config.

Flow direct commit:

```txt
Editor draft
→ user clicks Publish
→ convert Tiptap JSON to MDX
→ create/update file in repo
→ commit to configured branch
→ update local published state
→ trigger deployment
```

Flow pull request:

```txt
Editor draft
→ user clicks Publish as PR
→ create docs-draft branch
→ commit changes
→ create pull request
→ wait for merge
→ webhook sync after merge
```

GitHub REST API repository contents endpoint bisa membuat, mengubah, dan menghapus file repo dengan content Base64. Untuk batch update besar, Git database API bisa membuat tree, commit, lalu update branch reference. ([GitHub Docs][10])

---

### 10.3 Conflict handling

Conflict case:

1. Page diedit di admin.
2. File yang sama juga diedit di GitHub.
3. User ingin publish.

Strategi:

```txt
Compare:
- local draft base SHA
- current GitHub file SHA
- latest synced SHA
```

Jika SHA berubah:

- Tampilkan conflict modal.
- Opsi:
  - Keep admin version.
  - Keep GitHub version.
  - Manual merge.
  - Create PR instead of direct commit.

Conflict UI:

```txt
Left: GitHub version
Right: Admin draft
Bottom: merged output
```

---

## 11. Live editor architecture

### 11.1 Editor state

Editor menyimpan state ke tiga layer:

```txt
Browser state
→ debounced autosave API
→ database draft_content_json
→ publish exporter
→ GitHub MDX
```

Autosave:

```txt
onUpdate editor event
→ debounce 800–1500ms
→ PATCH /api/pages/:id/draft
→ save JSON
→ create page_version every N minutes or manual checkpoint
```

### 11.2 Editor layout

```txt
┌─────────────────────────────────────────────────────────────┐
│ Topbar: Ask Agent | Save status | Preview | Publish          │
├───────────────┬───────────────────────────────┬─────────────┤
│ Page Tree     │ Tiptap Editor                 │ Settings    │
│               │                               │ / Outline   │
│ - Intro       │ # Quickstart                  │             │
│ - Quickstart  │ Start building docs...        │ Slug        │
│ - API         │                               │ SEO         │
└───────────────┴───────────────────────────────┴─────────────┘
```

### 11.3 Custom Tiptap extensions

Wajib untuk docs platform:

```txt
CalloutExtension
CardGroupExtension
CardExtension
CodeBlockExtension
CodeGroupExtension
TabsExtension
StepsExtension
AccordionExtension
ApiEndpointExtension
OpenApiOperationExtension
SnippetReferenceExtension
ImageExtension
EmbedExtension
MermaidExtension
HeadingWithAnchorExtension
```

Contoh block data:

```json
{
  "type": "callout",
  "attrs": {
    "variant": "warning",
    "title": "Important"
  },
  "content": [
    {
      "type": "paragraph",
      "content": [{ "type": "text", "text": "Check your API key." }]
    }
  ]
}
```

---

## 12. Live preview design

### 12.1 Preview modes

Sediakan tiga mode preview:

```txt
/admin/projects/:projectId/preview/page/:pageId
/admin/projects/:projectId/preview/site
/preview/:projectId/:previewToken/:slug+
```

Mode:

1. **Editor split preview**
   Editor di kiri, preview di kanan.

2. **Full page preview**
   Membuka halaman docs lengkap dengan layout production.

3. **Shareable preview**
   Link preview dengan token aman untuk reviewer.

### 12.2 Preview rendering

Preview harus memakai renderer yang sama dengan production.

Jangan buat renderer terpisah untuk admin, karena nanti hasil editor dan hasil public docs bisa berbeda.

```txt
Tiptap JSON
→ internal document AST
→ DocsRenderer components
→ preview HTML
```

Saat publish:

```txt
Tiptap JSON
→ MDX
→ GitHub
→ production build/render
```

---

## 13. Search docs

### 13.1 Search UX

Search harus seperti documentation modern:

- Shortcut `⌘K` / `Ctrl+K`.
- Modal search.
- Recent searches.
- Grouped result by section.
- Highlight matched text.
- Keyboard navigation.
- Empty state.
- Search suggestions.
- “No result” analytics.
- Search inside current version/locale.
- Optional API reference search.

UI:

```txt
┌────────────────────────────────────────┐
│ Search documentation...           ⌘K   │
├────────────────────────────────────────┤
│ Quickstart                             │
│ Get your documentation running locally │
│                                        │
│ Authentication                         │
│ Learn how to use API keys              │
└────────────────────────────────────────┘
```

### 13.2 Search engine strategy

#### MVP: Pagefind

Use case:

- Static docs.
- Self-hosted ringan.
- Tanpa service tambahan.
- Cocok untuk public docs production.

Flow:

```txt
Nuxt build
→ generated HTML
→ Pagefind index
→ static search bundle
→ public docs search modal
```

Pagefind cocok untuk static HTML output dan tidak membutuhkan infrastruktur search tambahan. ([Pagefind][5])

#### Advanced: Meilisearch

Use case:

- Admin search.
- Draft preview search.
- Multi-project.
- Large docs.
- Analytics search.
- Typo tolerance.
- API-based search.

Flow:

```txt
Page saved/published
→ extract plain text + headings
→ send document to Meilisearch
→ search via /api/search
```

Meilisearch bisa di-self-host dan menyediakan endpoint search API. ([Meilisearch][11])

Rekomendasi implementasi:

```txt
MVP:
- Pagefind untuk production docs
- PostgreSQL full text simple untuk admin

V1:
- Meilisearch optional via Docker Compose

V2:
- Hybrid search + AI retrieval
```

---

## 14. UI standard public docs

### 14.1 Topbar

Wajib:

- Logo.
- Product/docs name.
- Search input.
- `⌘K` shortcut hint.
- Main nav: Guides, API Reference, Blog.
- Support link.
- Dashboard button.
- Theme toggle.

Responsive:

- Mobile hamburger.
- Search icon.
- Collapsible sidebar.

### 14.2 Left sidebar

Wajib:

- Section group.
- Nested pages.
- Active state.
- Icons.
- External links.
- Collapsible groups.
- Scrollable sidebar.
- Sticky position.

Contoh struktur:

```txt
Documentation
Blog

Getting started
  Introduction
  Quickstart
  Development

Customization
  Global Settings
  Navigation

Writing content
  Markdown syntax
  Code blocks
  Images and embeds
  Reusable snippets

AI tools
  Cursor setup
  Claude Code setup
```

### 14.3 Content area

Wajib:

- Breadcrumb atau category label.
- Title.
- Description.
- Copy page button.
- Content blocks.
- Cards.
- Callouts.
- Code blocks.
- Tabs.
- Steps.
- Image.
- Video/embed.
- API examples.
- Previous/next navigation.
- Feedback.

### 14.4 Right sidebar

Wajib:

- “On this page”.
- Auto-generated headings.
- Active heading detection.
- Smooth scroll.
- Mobile hidden atau drawer.

### 14.5 Docs components

Komponen yang harus tersedia:

```txt
Callout
Card
CardGroup
CodeBlock
CodeGroup
Tabs
Steps
Accordion
ParamField
ResponseField
RequestExample
ResponseExample
ApiEndpoint
OpenApiViewer
Image
Embed
Tooltip
Badge
```

---

## 15. UI standard admin/editor

### 15.1 App sidebar

Menu global:

```txt
Projects
Docs
Analytics
AI Agent
Integrations
Settings
Account
```

### 15.2 Project sidebar

Menu project:

```txt
Documentation
Blog
Guides
API reference
Add new

Site configurations
Navigation
Theme
Domain
GitHub
Deployments
```

### 15.3 Editor topbar

Wajib:

```txt
Ask Agent
Save status
Last synced
Preview
Publish dropdown
More actions
User avatar
```

Publish dropdown:

```txt
Publish now
Publish as pull request
Schedule publish
Save draft
Discard draft
```

### 15.4 Page tree actions

- Create page.
- Create folder/group.
- Rename.
- Duplicate.
- Delete.
- Drag reorder.
- Move to group.
- Change slug.
- Hide from navigation.
- External link.
- Add icon.

---

## 16. API backend

Contoh API internal:

```txt
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/me

GET    /api/projects
POST   /api/projects
GET    /api/projects/:projectId
PATCH  /api/projects/:projectId
DELETE /api/projects/:projectId

GET    /api/projects/:projectId/pages
POST   /api/projects/:projectId/pages
GET    /api/pages/:pageId
PATCH  /api/pages/:pageId
DELETE /api/pages/:pageId

PATCH  /api/pages/:pageId/draft
POST   /api/pages/:pageId/publish
POST   /api/pages/:pageId/restore-version

GET    /api/projects/:projectId/navigation
PATCH  /api/projects/:projectId/navigation

POST   /api/projects/:projectId/assets
GET    /api/projects/:projectId/assets
DELETE /api/assets/:assetId

GET    /api/projects/:projectId/search
POST   /api/projects/:projectId/search/reindex

POST   /api/github/install
POST   /api/github/webhook
POST   /api/projects/:projectId/github/sync
POST   /api/projects/:projectId/github/publish

GET    /api/projects/:projectId/deployments
POST   /api/projects/:projectId/deployments

GET    /api/preview/:token/:slug+
```

---

## 17. Self-hosted setup

### 17.1 Docker Compose

Services:

```txt
app
postgres
redis
worker
meilisearch optional
minio optional
```

Contoh environment:

```env
APP_URL=https://docs.example.com
ADMIN_URL=https://admin.docs.example.com

DATABASE_URL=postgresql://docs:docs@postgres:5432/docs
REDIS_URL=redis://redis:6379

GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

STORAGE_DRIVER=local
STORAGE_S3_ENDPOINT=
STORAGE_S3_BUCKET=
STORAGE_S3_ACCESS_KEY=
STORAGE_S3_SECRET_KEY=

SEARCH_DRIVER=pagefind
MEILISEARCH_HOST=http://meilisearch:7700
MEILISEARCH_API_KEY=

AUTH_SECRET=
ENCRYPTION_KEY=
```

### 17.2 Deployment targets

Support:

```txt
Docker Compose
Railway
Fly.io
Render
VPS
Kubernetes later
```

### 17.3 Build modes

```txt
SSR mode:
- Docs rendered dynamically from database/GitHub state.
- Better for live preview and admin.

Static export mode:
- Docs generated into static HTML.
- Search generated by Pagefind.
- Best for simple self-hosting.

Hybrid mode:
- Admin SSR.
- Public docs can be static or dynamic.
```

Rekomendasi: mulai dengan **hybrid**.

---

## 18. Security

Wajib:

- Password hashing.
- Session-based auth.
- CSRF protection untuk admin actions.
- RBAC per project.
- Encrypt GitHub tokens/private keys.
- Verify GitHub webhook signatures.
- Rate limit auth dan webhook endpoints.
- Audit log untuk publish/delete/settings.
- Preview token expiration.
- Asset upload validation.
- HTML sanitization untuk embeds.
- CSP headers.
- No secret in client bundle.

RBAC:

```txt
Owner:
- full access
- billing/domain/security

Admin:
- project settings
- publish
- GitHub sync

Editor:
- create/edit pages
- publish if allowed

Viewer:
- read-only admin access
```

Audit events:

```txt
page.created
page.updated
page.deleted
page.published
github.synced
settings.updated
domain.added
member.invited
```

---

## 19. Build dan rendering pipeline

### Draft preview pipeline

```txt
Tiptap JSON
→ normalize document nodes
→ render Vue docs components
→ preview page
```

### Publish pipeline

```txt
Tiptap JSON
→ validate document
→ generate frontmatter
→ serialize to MDX
→ commit to GitHub
→ update published state
→ trigger docs build
→ generate search index
→ deployment ready
```

### GitHub import pipeline

```txt
GitHub MDX
→ parse frontmatter
→ parse markdown body
→ convert to internal document AST
→ convert to Tiptap JSON
→ save page draft/published state
```

---

## 20. OpenAPI / API reference

Fitur API reference perlu disiapkan sejak awal karena documentation platform biasanya membutuhkan ini.

MVP:

- Upload `openapi.yaml` atau `openapi.json`.
- Parse endpoint list.
- Render endpoint page.
- Render method badge.
- Render path.
- Render parameters.
- Render request body.
- Render response schema.
- Render code examples manually.

V1:

- Auto-generate API reference navigation.
- Try-it console.
- Auth header config.
- Environment variables.
- Example response tabs.

Route:

```txt
/api-reference
/api-reference/:operationId
```

Data model:

```txt
api_specs
  id
  project_id
  source_type: upload | github_path | url
  github_path
  content_json
  parsed_at

api_operations
  id
  api_spec_id
  method
  path
  operation_id
  summary
  description
  schema_json
```

---

## 21. Reusable snippets

Snippets penting untuk dokumentasi besar.

Contoh:

```mdx
<Snippet name="auth-token" />
```

Admin UX:

- Snippets menu.
- Create snippet.
- Insert snippet dari slash command.
- Preview snippet inline.
- Warn jika snippet dipakai di banyak pages.
- Update snippet otomatis reflected ke semua page.

---

## 22. Versioning dan localization

### Versioning

Support:

```txt
latest
v1
v2
beta
```

URL:

```txt
/docs/quickstart
/v1/quickstart
/v2/quickstart
```

Data:

```txt
versions
  id
  project_id
  name
  slug
  branch
  is_default
```

GitHub mapping:

```txt
main → latest
v1-docs → v1
v2-docs → v2
```

### Localization

Support:

```txt
en
id
ja
```

URL:

```txt
/en/quickstart
/id/quickstart
```

Data:

```txt
locales
  id
  project_id
  code
  label
  is_default
```

---

## 23. Testing strategy

### Unit tests

- Markdown serializer.
- Markdown parser.
- Tiptap JSON transformer.
- GitHub payload validator.
- Search document extractor.
- Navigation builder.
- Slug generator.

### Integration tests

- Create page.
- Edit page.
- Autosave.
- Publish page.
- GitHub webhook sync.
- Search indexing.
- Asset upload.
- Preview rendering.

### E2E tests

- Login admin.
- Create documentation page.
- Add callout/code block/card.
- Preview page.
- Publish to GitHub.
- Open public docs page.
- Search page.

### Visual regression

- Public docs layout.
- Admin editor layout.
- Dark mode.
- Mobile docs view.
- Search modal.
- API reference page.

---

## 24. Repo structure

```txt
apps/
  web/
    app.vue
    pages/
    components/
    server/
    plugins/
    composables/
    middleware/
    layouts/

packages/
  editor/
    extensions/
    serializers/
    parsers/
    components/

  docs-renderer/
    components/
    renderers/
    toc/
    navigation/

  github/
    app.ts
    webhook.ts
    contents.ts
    commits.ts
    sync.ts

  search/
    pagefind.ts
    meilisearch.ts
    extract.ts

  config/
    schema.ts
    parser.ts

  ui/
    theme/
    components/

  database/
    schema/
    migrations/

docker/
  Dockerfile
  docker-compose.yml

examples/
  basic-docs/
  api-docs/
  multilingual-docs/

docs/
  contributing.mdx
  self-hosting.mdx
  architecture.mdx
```

---

## 25. Roadmap implementasi

## Phase 0 — Foundation

Durasi estimasi: 1–2 minggu.

Deliverables:

- Nuxt project setup.
- Naive UI setup.
- App layout.
- Auth skeleton.
- PostgreSQL schema.
- Basic project model.
- Public docs layout static.
- Admin layout static.
- Design tokens.

Task detail:

```txt
[ ] Setup Nuxt TypeScript project
[ ] Setup Naive UI provider
[ ] Setup theme tokens
[ ] Setup database
[ ] Setup migration
[ ] Setup auth session
[ ] Setup admin shell
[ ] Setup docs shell
[ ] Setup lint/test/build CI
```

---

## Phase 1 — Public docs MVP

Durasi estimasi: 2–3 minggu.

Deliverables:

- Docs renderer.
- Sidebar navigation.
- Table of contents.
- Markdown/MDX page loading.
- Search modal placeholder.
- Theme toggle.
- Responsive docs layout.

Task detail:

```txt
[ ] Build DocsLayout
[ ] Build topbar
[ ] Build sidebar
[ ] Build right TOC
[ ] Build content renderer
[ ] Build callout component
[ ] Build card component
[ ] Build code block component
[ ] Build tabs component
[ ] Build steps component
[ ] Build page footer nav
[ ] Build mobile docs drawer
```

---

## Phase 2 — Admin page management

Durasi estimasi: 2–3 minggu.

Deliverables:

- Project dashboard.
- Page tree.
- CRUD page.
- Navigation manager.
- Draft state.
- Basic settings.

Task detail:

```txt
[ ] Create project dashboard
[ ] Create page tree
[ ] Create page CRUD API
[ ] Create drag reorder
[ ] Create navigation config
[ ] Create page settings panel
[ ] Create slug editor
[ ] Create status badge
[ ] Create audit log base
```

---

## Phase 3 — Tiptap editor

Durasi estimasi: 3–5 minggu.

Deliverables:

- Tiptap editor integrated in Nuxt.
- Autosave.
- Custom docs blocks.
- Slash command.
- Bubble menu.
- Draft preview.

Task detail:

```txt
[ ] Setup Tiptap Vue/Nuxt editor
[ ] Setup StarterKit
[ ] Create editor shell
[ ] Create toolbar
[ ] Create bubble menu
[ ] Create slash command
[ ] Create callout extension
[ ] Create code block extension
[ ] Create tabs extension
[ ] Create card extension
[ ] Create steps extension
[ ] Create image extension
[ ] Create autosave API
[ ] Create version snapshots
[ ] Create editor preview
```

---

## Phase 4 — GitHub sync

Durasi estimasi: 4–6 minggu.

Deliverables:

- GitHub App setup.
- Install integration.
- Repo import.
- Webhook receiver.
- Publish to GitHub.
- Conflict detection.

Task detail:

```txt
[ ] Create GitHub App manifest docs
[ ] Implement installation callback
[ ] Store installation metadata
[ ] Implement installation token generation
[ ] Implement repo file reader
[ ] Implement MDX parser
[ ] Implement docs config parser
[ ] Implement import from repo
[ ] Implement webhook endpoint
[ ] Verify webhook signature
[ ] Implement push sync job
[ ] Implement Tiptap JSON → MDX serializer
[ ] Implement publish direct commit
[ ] Implement publish as PR
[ ] Implement conflict detection
[ ] Implement sync status UI
```

---

## Phase 5 — Live preview

Durasi estimasi: 2–3 minggu.

Deliverables:

- Full site preview.
- Page preview.
- Shareable preview token.
- Preview from draft.
- Preview from branch.

Task detail:

```txt
[ ] Create preview route
[ ] Create draft renderer
[ ] Create preview token model
[ ] Create preview topbar
[ ] Create desktop/mobile toggle
[ ] Create branch preview selector
[ ] Create preview access guard
```

---

## Phase 6 — Search

Durasi estimasi: 2–4 minggu.

Deliverables:

- Pagefind production search.
- Search modal.
- Index generation.
- Optional Meilisearch adapter.

Task detail:

```txt
[ ] Extract searchable content
[ ] Build search document schema
[ ] Add Pagefind build step
[ ] Build search modal
[ ] Add keyboard shortcut
[ ] Add result grouping
[ ] Add no-result state
[ ] Add Meilisearch adapter
[ ] Add search reindex job
[ ] Add admin search
```

---

## Phase 7 — Self-hosting polish

Durasi estimasi: 2–3 minggu.

Deliverables:

- Docker Compose.
- Setup wizard.
- Env docs.
- Backup docs.
- Upgrade docs.
- Example project.

Task detail:

```txt
[ ] Dockerfile
[ ] docker-compose.yml
[ ] Setup wizard
[ ] First project flow
[ ] GitHub App setup guide
[ ] Backup guide
[ ] Restore guide
[ ] Upgrade guide
[ ] Example docs repo
```

---

## 26. Next step: domain

Domain management masuk setelah MVP stabil.

Fitur:

- Custom domain per project.
- Subdomain default.
- DNS verification.
- SSL status.
- Redirect www/non-[www](http://www).
- Canonical URL.
- Sitemap.
- Robots.txt.

Data flow:

```txt
User adds domain
→ system generates DNS target
→ user sets CNAME
→ system verifies DNS
→ system provisions SSL
→ domain becomes active
```

Admin UI:

```txt
Settings → Domain

Default domain:
project.localhost / project.yourdocs.com

Custom domains:
docs.example.com
Status: verified / pending / failed
```

Technical requirement:

- Reverse proxy routing.
- Host-based project resolver.
- TLS automation.
- Domain verification job.
- Redirect middleware.

---

## 27. Next step: AI agent

AI agent bisa menjadi pembeda utama.

Entry point:

- Public docs search: “Ask docs”.
- Admin editor: “Ask Agent”.
- Page editor: “Improve this page”.
- GitHub sync: “Summarize changes”.
- API reference: “Explain endpoint”.

Fitur AI agent:

```txt
Ask documentation
Generate page outline
Improve writing
Fix grammar
Convert notes to docs
Generate API docs from OpenAPI
Suggest missing docs
Summarize changelog
Generate migration guide
Find outdated pages
```

Arsitektur:

```txt
Docs content
→ chunking
→ embeddings
→ vector index
→ retrieval
→ LLM provider adapter
→ streamed answer
```

Provider adapter:

```txt
OpenAI
Anthropic
Ollama
Local OpenAI-compatible endpoint
```

Self-hosted requirement:

- AI optional.
- Bisa disable total.
- User membawa API key sendiri.
- Per-project AI settings.
- Audit log untuk AI actions.
- Tidak kirim private docs tanpa explicit opt-in.

Admin AI UX:

```txt
Ask Agent
- "Create a quickstart from this page"
- "Find pages without description"
- "Generate examples for this endpoint"
- "Make this page clearer"
```

---

## 28. Next step: analytics

Analytics harus privacy-friendly dan documentation-specific.

Events:

```txt
page_view
search_query
search_no_result
copy_code
copy_page
feedback_positive
feedback_negative
outbound_link_click
api_endpoint_view
theme_toggle
version_change
locale_change
```

Dashboard:

```txt
Top pages
Search queries
No-result searches
Feedback score
Popular API endpoints
Broken links
Traffic by version
Traffic by locale
Docs health score
```

Privacy mode:

```txt
Basic:
- no cookies
- anonymous sessions
- aggregate only

Advanced:
- session-based journey
- retention setting
- IP anonymization
```

Storage MVP:

```txt
analytics_events table in PostgreSQL
```

Storage advanced:

```txt
ClickHouse optional
```

---

## 29. Definition of Done MVP

MVP dianggap selesai kalau user bisa:

1. Self-host app via Docker Compose.
2. Login admin.
3. Connect GitHub repository.
4. Import docs dari repo.
5. Melihat public docs site.
6. Membuat page baru dari admin.
7. Edit page dengan Tiptap.
8. Preview page sebelum publish.
9. Publish page ke GitHub.
10. Menerima update dari GitHub webhook.
11. Search dokumentasi.
12. Mengubah navigation.
13. Mengubah theme dasar.
14. Menggunakan dark/light mode.
15. Deploy docs secara stabil.

---

## 30. Prioritas implementasi final

Urutan paling aman:

```txt
1. Nuxt app foundation
2. Public docs layout
3. Admin layout
4. Database schema
5. Page CRUD
6. Tiptap editor
7. Draft preview
8. GitHub import
9. GitHub publish
10. Webhook sync
11. Search
12. Docker self-hosting
13. Domain
14. AI agent
15. Analytics
```

Untuk open-source release pertama, fokuskan scope pada:

```txt
Core:
- Self-hosted
- Public docs UI
- Admin editor
- GitHub sync
- Live preview
- Search

Defer:
- AI agent
- Analytics advanced
- Custom domain automation
- Multi-tenant SaaS billing
```

[1]: https://nuxt.com/docs/4.x?utm_source=chatgpt.com "Introduction · Get Started with Nuxt v4"
[2]: https://tiptap.dev/docs/editor/getting-started/overview?utm_source=chatgpt.com "Get started | Tiptap Editor Docs"
[3]: https://www.naiveui.com/?utm_source=chatgpt.com "Naive UI: A Vue 3 Component Library"
[4]: https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps?utm_source=chatgpt.com "Using webhooks with GitHub Apps"
[5]: https://pagefind.app/?utm_source=chatgpt.com "Pagefind"
[6]: https://tiptap.dev/docs/editor/extensions/functionality/starterkit?utm_source=chatgpt.com "StarterKit extension | Tiptap Editor Docs"
[7]: https://tiptap.dev/docs/editor/markdown?utm_source=chatgpt.com "Markdown Introduction | Tiptap Editor Docs"
[8]: https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation?utm_source=chatgpt.com "Authenticating as a GitHub App installation"
[9]: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries?utm_source=chatgpt.com "Validating webhook deliveries"
[10]: https://docs.github.com/en/rest/repos/contents?utm_source=chatgpt.com "REST API endpoints for repository contents"
[11]: https://meilisearch.com/docs/resources/self_hosting/overview?utm_source=chatgpt.com "Self-hosting Meilisearch"
