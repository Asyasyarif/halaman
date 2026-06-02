import { SignJWT } from 'jose'
import type { InstallConfig, GitHubFile, GitHubDirectory } from './index'

function createAppJwt(appId: string, privateKey: string): Promise<string> {
  const key = crypto.subtle ? undefined : privateKey
  // Placeholder — real implementation uses jose SignJWT with RS256
  return new SignJWT({ iss: appId })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(new TextEncoder().encode(privateKey)) // simplified
}

export async function generateJwt(appId: string, privateKey: string): Promise<string> {
  return createAppJwt(appId, privateKey)
}

export async function getInstallationToken(config: InstallConfig): Promise<string> {
  if (config.accessTokenEncrypted) {
    // Decrypt and return
    return config.accessTokenEncrypted
  }
  const jwt = await generateJwt(config.appId, config.privateKey)
  const res = await fetch(
    `https://api.github.com/app/installations/${config.installationId}/access_tokens`,
    { method: 'POST', headers: { Authorization: `Bearer ${jwt}`, Accept: 'application/vnd.github+json' } },
  )
  const data = await res.json() as any
  return data.token
}

export async function fetchContents(config: InstallConfig, path: string): Promise<GitHubFile> {
  const token = await getInstallationToken(config)
  const res = await fetch(
    `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } },
  )
  const data = await res.json() as any
  return {
    path: data.path,
    content: data.content ? Buffer.from(data.content, 'base64').toString('utf-8') : '',
    sha: data.sha,
    size: data.size,
  }
}

export async function fetchFile(config: InstallConfig, path: string): Promise<string> {
  const file = await fetchContents(config, path)
  return file.content
}

export async function listDirectory(config: InstallConfig, path: string): Promise<GitHubDirectory[]> {
  const token = await getInstallationToken(config)
  const res = await fetch(
    `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } },
  )
  return (await res.json()) as GitHubDirectory[]
}

export async function createOrUpdateFile(
  config: InstallConfig,
  path: string,
  content: string,
  message: string,
  branch?: string,
): Promise<void> {
  const token = await getInstallationToken(config)
  let sha: string | undefined
  try {
    const existing = await fetchContents(config, path)
    sha = existing.sha
  } catch {}

  const body = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: branch || config.branch || 'main',
    ...(sha ? { sha } : {}),
  }

  await fetch(
    `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents/${path}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify(body),
    },
  )
}

export async function createPullRequest(
  config: InstallConfig,
  title: string,
  head: string,
  base?: string,
): Promise<{ number: number; url: string }> {
  const token = await getInstallationToken(config)
  const res = await fetch(
    `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/pulls`,
    {
      method: 'POST',
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify({
        title,
        head,
        base: base || config.branch || 'main',
      }),
    },
  )
  const data = await res.json() as any
  return { number: data.number, url: data.html_url }
}

export async function compareCommits(config: InstallConfig, base: string, head: string): Promise<any> {
  const token = await getInstallationToken(config)
  const res = await fetch(
    `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/compare/${base}...${head}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } },
  )
  return res.json()
}
