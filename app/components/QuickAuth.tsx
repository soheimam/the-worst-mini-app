import { useState, useCallback } from 'react'
import { sdk } from '@farcaster/frame-sdk'

interface User {
  fid: number
  primaryAddress?: string
}

interface QuickAuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

export function useQuickAuth() {
  const [state, setState] = useState<QuickAuthState>({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  })

  const authenticate = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const backendOrigin = process.env.NEXT_PUBLIC_URL || window.location.origin
      
      let res: Response
      
      // Try different QuickAuth approaches based on SDK availability
      if (sdk.quickAuth && sdk.quickAuth.fetch) {
        // Use the direct fetch method if available
        res = await sdk.quickAuth.fetch(`${backendOrigin}/api/me`)
      } else if (sdk.quickAuth && sdk.quickAuth.getToken) {
        // Fallback to getToken method
        const { token } = await sdk.quickAuth.getToken()
        res = await fetch(`${backendOrigin}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } else {
        throw new Error('QuickAuth is not available in this SDK version. Please update @farcaster/frame-sdk to the latest version.')
      }
      
      if (res.ok) {
        const user = await res.json()
        setState({ 
          user, 
          loading: false, 
          error: null, 
          isAuthenticated: true 
        })
        
        // Mark the frame as ready once authentication is complete
        sdk.actions.ready()
      } else {
        throw new Error(`Authentication failed: ${res.status}`)
      }
    } catch (error) {
      console.error('Quick Auth error:', error)
      setState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
        isAuthenticated: false,
      })
    }
  }, [])

  return { ...state, authenticate }
}

interface QuickAuthProps {
  children: (state: QuickAuthState & { authenticate: () => Promise<void> }) => React.ReactNode
}

export function QuickAuth({ children }: QuickAuthProps) {
  const authState = useQuickAuth()
  
  return <>{children(authState)}</>
} 