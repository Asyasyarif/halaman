// Config parser — parses mint.json config files

export interface DocsConfig {
  name: string
  logo?: {
    light?: string
    dark?: string
  }
  theme?: string
  navigation?: NavGroup[]
  api?: {
    baseUrl?: string
    auth?: {
      method: string
      name: string
    }
  }
  colors?: {
    primary?: string
  }
}

export interface NavGroup {
  group: string
  pages: (string | NavGroup)[]
}

export function parseConfig(json: string): DocsConfig {
  try {
    return JSON.parse(json) as DocsConfig
  } catch {
    return { name: 'Untitled' }
  }
}

export function validateConfig(config: DocsConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!config.name) errors.push('name is required')
  return { valid: errors.length === 0, errors }
}
