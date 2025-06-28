import { Errors, createClient } from '@farcaster/quick-auth'
import { NextRequest, NextResponse } from 'next/server'

const client = createClient()

// Resolve information about the authenticated Farcaster user
async function resolveUser(fid: number) {
  const primaryAddress = await (async () => {
    try {
      const res = await fetch(
        `https://api.farcaster.xyz/fc/primary-address?fid=${fid}&protocol=ethereum`,
      )
      if (res.ok) {
        const data = await res.json() as {
          result?: {
            address: {
              fid: number
              protocol: 'ethereum' | 'solana'
              address: string
            }
          }
        }

        return data.result?.address?.address
      }
    } catch (error) {
      console.error('Error fetching primary address:', error)
    }
    return undefined
  })()

  return {
    fid,
    primaryAddress,
  }
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('Authorization')
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  try {
    const token = authorization.split(' ')[1] as string
    const domain = request.headers.get('host') || 'localhost:3000'
    
    const payload = await client.verifyJwt({
      token,
      domain,
    })

    const user = await resolveUser(Number(payload.sub))
    
    return NextResponse.json(user)
  } catch (e) {
    if (e instanceof Errors.InvalidTokenError) {
      console.info('Invalid token:', e.message)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    console.error('Auth error:', e)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
} 