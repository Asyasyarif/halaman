export { generateJwt, getInstallationToken, fetchContents, fetchFile, listDirectory, createOrUpdateFile, createPullRequest, compareCommits } from './client'
export { verifyWebhookSignature, parseWebhookEvent } from './webhook'

export interface GitHubFile {
  path: string
  content: string
  sha: string
  size: number
}

export interface GitHubDirectory {
  path: string
  type: 'file' | 'dir'
  sha: string
  name: string
}

export interface InstallConfig {
  appId: string
  privateKey: string
  installationId: number
  repoOwner: string
  repoName: string
  branch?: string
  accessTokenEncrypted?: string
  webhookSecretEncrypted?: string
}
