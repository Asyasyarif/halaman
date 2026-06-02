import { createHmac, timingSafeEqual } from 'node:crypto'

export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!signature) return false

  const sig = signature.startsWith('sha256=') ? signature.slice(7) : signature
  const computed = createHmac('sha256', secret).update(payload).digest('hex')

  try {
    return timingSafeEqual(Buffer.from(computed), Buffer.from(sig))
  } catch {
    return false
  }
}

export function parseWebhookEvent(headers: Record<string, string | undefined>): {
  event: string
  deliveryId: string
} {
  return {
    event: headers['x-github-event'] || '',
    deliveryId: headers['x-github-delivery'] || '',
  }
}
