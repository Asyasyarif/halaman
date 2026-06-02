import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

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

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
}, (table) => ({
  userIdx: index('sessions_user_idx').on(table.userId),
}))

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
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
  order: integer('order').default(0).notNull(),
  locale: text('locale').default('en').notNull(),
  isHidden: integer('is_hidden', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  userSlugIdx: uniqueIndex('pages_user_slug_idx').on(table.userId, table.slug, table.locale),
}))

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

export const searchDocuments = sqliteTable('search_documents', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  contentText: text('content_text'),
  headingsJson: text('headings_json'),
  locale: text('locale').default('en').notNull(),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
}, (table) => ({
  userPageIdx: uniqueIndex('search_doc_user_page_idx').on(table.userId, table.pageId),
}))
