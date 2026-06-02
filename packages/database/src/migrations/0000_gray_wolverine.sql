CREATE TABLE `page_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`version_number` integer NOT NULL,
	`content_json` text,
	`frontmatter_json` text,
	`title` text NOT NULL,
	`created_by` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `page_versions_page_idx` ON `page_versions` (`page_id`,`version_number`);--> statement-breakpoint
CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`parent_id` text,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`icon` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`content_json` text,
	`frontmatter_json` text,
	`seo_title` text,
	`seo_description` text,
	`og_image_url` text,
	`order` integer DEFAULT 0 NOT NULL,
	`locale` text DEFAULT 'en' NOT NULL,
	`is_hidden` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parent_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_user_slug_idx` ON `pages` (`user_id`,`slug`,`locale`);--> statement-breakpoint
CREATE TABLE `search_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`page_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content_text` text,
	`headings_json` text,
	`locale` text DEFAULT 'en' NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `search_doc_user_page_idx` ON `search_documents` (`user_id`,`page_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sessions_user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password_hash` text NOT NULL,
	`avatar_url` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);