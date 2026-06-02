import { sqliteTable, text, integer, blob, uniqueIndex, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// ── Users ──
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}))

// ── Organizations ──
export const organizations = sqliteTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ── Organization Members ──
export const organizationMembers = sqliteTable('organization_members', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('viewer'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  orgUserIdx: uniqueIndex('org_member_org_user_idx').on(table.organizationId, table.userId),
}))

// ── Projects ──
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  logoUrl: text('logo_url'),
  primaryColor: text('primary_color').default('#3b82f6'),
  docsRootPath: text('docs_root_path').default('/'),
  faviconUrl: text('favicon_url'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(true).notNull(),
  status: text('status').default('active').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  orgSlugIdx: uniqueIndex('projects_org_slug_idx').on(table.organizationId, table.slug),
}))

// ── Project Members ──
export const projectMembers = sqliteTable('project_members', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('viewer'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectUserIdx: uniqueIndex('proj_member_proj_user_idx').on(table.projectId, table.userId),
}))

// ── Pages ──
export const pages = sqliteTable('pages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  parentId: text('parent_id').references((): any => pages.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  icon: text('icon'),
  status: text('status').notNull().default('draft'),
  contentJson: text('content_json'),
  frontmatterJson: text('frontmatter_json'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  ogImageUrl: text('og_image_url'),
  githubPath: text('github_path'),
  githubSha: text('github_sha'),
  order: integer('order').default(0).notNull(),
  locale: text('locale').default('en').notNull(),
  version: text('version').default('latest').notNull(),
  isHidden: integer('is_hidden', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectSlugIdx: uniqueIndex('pages_proj_slug_idx').on(table.projectId, table.slug, table.locale, table.version),
}))

// ── Page Versions ──
export const pageVersions = sqliteTable('page_versions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  versionNumber: integer('version_number').notNull(),
  contentJson: text('content_json'),
  frontmatterJson: text('frontmatter_json'),
  title: text('title').notNull(),
  createdBy: text('created_by').references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  pageVersionIdx: index('page_versions_page_idx').on(table.pageId, table.versionNumber),
}))

// ── Navigation Items ──
export const navItems = sqliteTable('nav_items', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  parentId: text('parent_id').references((): any => navItems.id, { onDelete: 'set null' }),
  type: text('type').notNull().default('page'),
  title: text('title').notNull(),
  icon: text('icon'),
  pageId: text('page_id').references(() => pages.id, { onDelete: 'set null' }),
  externalUrl: text('external_url'),
  order: integer('order').default(0).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ── Assets ──
export const assets = sqliteTable('assets', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  type: text('type').notNull().default('image'),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  storagePath: text('storage_path').notNull(),
  url: text('url').notNull(),
  width: integer('width'),
  height: integer('height'),
  alt: text('alt'),
  caption: text('caption'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ── Snippets ──
export const snippets = sqliteTable('snippets', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  contentJson: text('content_json'),
  githubPath: text('github_path'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectSlugIdx: uniqueIndex('snippets_proj_slug_idx').on(table.projectId, table.slug),
}))

// ── GitHub Installations ──
export const githubInstallations = sqliteTable('github_installations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  installationId: integer('installation_id').notNull(),
  repoOwner: text('repo_owner').notNull(),
  repoName: text('repo_name').notNull(),
  branch: text('branch').default('main').notNull(),
  permissionsJson: text('permissions_json'),
  accessTokenEncrypted: text('access_token_encrypted'),
  webhookSecretEncrypted: text('webhook_secret_encrypted'),
  installedBy: text('installed_by').references(() => users.id),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectIdx: uniqueIndex('github_install_project_idx').on(table.projectId),
}))

// ── Sync Jobs ──
export const syncJobs = sqliteTable('sync_jobs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  source: text('source').notNull(),
  commitSha: text('commit_sha'),
  prUrl: text('pr_url'),
  status: text('status').default('pending').notNull(),
  summaryJson: text('summary_json'),
  errorLog: text('error_log'),
  startedAt: text('started_at'),
  finishedAt: text('finished_at'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ── Deployments ──
export const deployments = sqliteTable('deployments', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  source: text('source').notNull(),
  commitSha: text('commit_sha'),
  branch: text('branch').default('main').notNull(),
  status: text('status').notNull().default('queued'),
  previewUrl: text('preview_url'),
  productionUrl: text('production_url'),
  logs: text('logs'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  finishedAt: text('finished_at'),
})

// ── Search Documents ──
export const searchDocuments = sqliteTable('search_documents', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  contentText: text('content_text'),
  headingsJson: text('headings_json'),
  version: text('version').default('latest').notNull(),
  locale: text('locale').default('en').notNull(),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectPageIdx: uniqueIndex('search_doc_proj_page_idx').on(table.projectId, table.pageId),
}))

// ── Domains ──
export const domains = sqliteTable('domains', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  domain: text('domain').notNull().unique(),
  type: text('type').notNull().default('custom'),
  status: text('status').notNull().default('pending'),
  dnsTarget: text('dns_target'),
  sslStatus: text('ssl_status').default('pending'),
  verifiedAt: text('verified_at'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ── Audit Events ──
export const auditEvents = sqliteTable('audit_events', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id),
  eventType: text('event_type').notNull(),
  entityType: text('entity_type'),
  entityId: text('entity_id'),
  metadataJson: text('metadata_json'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectEventIdx: index('audit_project_event_idx').on(table.projectId, table.eventType, table.createdAt),
}))

// ── Analytics Events ──
export const analyticsEvents = sqliteTable('analytics_events', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull(),
  eventType: text('event_type').notNull(),
  pageId: text('page_id').references(() => pages.id, { onDelete: 'set null' }),
  path: text('path'),
  query: text('query'),
  metadataJson: text('metadata_json'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectEventIdx: index('analytics_project_event_idx').on(table.projectId, table.eventType, table.createdAt),
}))

// ── API Specs ──
export const apiSpecs = sqliteTable('api_specs', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  sourceType: text('source_type').notNull(),
  githubPath: text('github_path'),
  contentJson: text('content_json'),
  parsedAt: text('parsed_at'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

// ── API Operations ──
export const apiOperations = sqliteTable('api_operations', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  apiSpecId: text('api_spec_id').notNull().references(() => apiSpecs.id, { onDelete: 'cascade' }),
  method: text('method').notNull(),
  path: text('path').notNull(),
  operationId: text('operation_id'),
  summary: text('summary'),
  description: text('description'),
  schemaJson: text('schema_json'),
  tag: text('tag'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ── Versions ──
export const versions = sqliteTable('versions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  branch: text('branch'),
  isDefault: integer('is_default', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectSlugIdx: uniqueIndex('versions_proj_slug_idx').on(table.projectId, table.slug),
}))

// ── Locales ──
export const locales = sqliteTable('locales', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  label: text('label').notNull(),
  isDefault: integer('is_default', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  projectCodeIdx: uniqueIndex('locales_proj_code_idx').on(table.projectId, table.code),
}))

// ── Preview Tokens ──
export const previewTokens = sqliteTable('preview_tokens', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  pageId: text('page_id').references(() => pages.id, { onDelete: 'cascade' }),
  scope: text('scope').default('project'),
  expiresAt: text('expires_at'),
  isRevoked: integer('is_revoked', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// ── Sessions ──
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
}, (table) => ({
  userIdx: index('sessions_user_idx').on(table.userId),
}))
