"use client";

import { sdk } from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/DemoComponents';
import { Icon } from '../components/DemoComponents';

export default function MiniAppCheckPage() {
  const [isMiniApp, setIsMiniApp] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkMiniApp = async () => {
      // Check if running in a Mini App
      const result = await sdk.isInMiniApp();
      setIsMiniApp(result);
    };

    checkMiniApp();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleRecheck = async () => {
    // Check if running in a Mini App
    const result = await sdk.isInMiniApp();
    setIsMiniApp(result);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-3 p-2"
          >
            ← Back
          </Button>
          <h1 className="text-xl font-bold">Mini App Detection</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-[var(--app-card)] rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Is this running in a Mini App?
            </h2>

            {isMiniApp === null ? (
              // Loading State
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin h-8 w-8 border-2 border-[var(--app-accent)] border-t-transparent rounded-full"></div>
                <p className="text-[var(--ock-text-foreground-muted)]">
                  Checking environment...
                </p>
              </div>
            ) : (
              // Result State
              <div className="text-center">
                <div className={`rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
                  isMiniApp 
                    ? 'bg-green-100 dark:bg-green-900/20' 
                    : 'bg-orange-100 dark:bg-orange-900/20'
                }`}>
                  {isMiniApp ? (
                    <Icon 
                      name="check" 
                      size="lg" 
                      className="text-green-600" 
                    />
                  ) : (
                    <div className="text-orange-600 text-2xl font-bold">✗</div>
                  )}
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${
                  isMiniApp ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {isMiniApp ? 'Yes!' : 'No'}
                </h3>
                
                <p className="text-[var(--ock-text-foreground-muted)] mb-6">
                  {isMiniApp 
                    ? 'This app is running in a Farcaster Mini App environment.'
                    : 'This app is running in a regular web browser environment.'
                  }
                </p>

                <Button
                  variant="ghost"
                  onClick={handleRecheck}
                  className="text-[var(--app-accent)] mb-4"
                >
                  🔄 Check Again
                </Button>
              </div>
            )}

            {/* Technical Details */}
            <div className="mt-6 pt-4 border-t border-[var(--app-border)]">
              <h4 className="font-semibold mb-2">Detection Method</h4>
              <p className="text-sm text-[var(--ock-text-foreground-muted)]">
                Uses <code className="bg-[var(--app-gray)] px-1 rounded">@farcaster/frame-sdk</code> to detect:
              </p>
              <ul className="text-sm text-[var(--ock-text-foreground-muted)] mt-2 space-y-1">
                <li>• Server-side rendering context</li>
                <li>• iframe or ReactNative WebView environment</li>
                <li>• Context communication capabilities</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 