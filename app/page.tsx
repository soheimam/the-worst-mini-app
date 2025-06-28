"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { QuickAuth } from "./components/QuickAuth";
import { ShareComposeButton } from "./components/ShareComposeButton";
import DocumentationLink from "./components/DocumentationLink";
import HapticButton from "./components/HapticButton";
import TransactionCard from "./components/TransactionCard";
import ConnectWalletCard from "./components/ConnectWalletCard";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <QuickAuth>
      {({ user, loading, error, isAuthenticated, authenticate }) => (
        <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
          <div className="w-full max-w-md mx-auto px-4 py-3">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-6 h-11">
              <div>
                <div className="flex items-center space-x-2">
                  <Wallet className="z-10">
                    <ConnectWallet>
                      <Name className="text-inherit" />
                    </ConnectWallet>
                    <WalletDropdown>
                      <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <Avatar />
                        <Name />
                        <Address />
                        <EthBalance />
                      </Identity>
                      <WalletDropdownDisconnect />
                    </WalletDropdown>
                  </Wallet>
                </div>

                {/* Quick Auth Section */}
                <div className="mt-2">
                  {!isAuthenticated ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={authenticate}
                      disabled={loading}
                      className="text-[var(--app-accent)] flex items-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-[var(--app-accent)] border-t-transparent rounded-full"></div>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="plus" size="sm" />
                          <span>Sign in with Farcaster</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    user && (
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium text-green-600">
                          ✓ Authenticated as FID: {user.fid}
                        </span>
                        {user.primaryAddress && (
                          <span className="text-xs text-[var(--ock-text-foreground-muted)]">
                            {user.primaryAddress.slice(0, 6)}...{user.primaryAddress.slice(-4)}
                          </span>
                        )}
                      </div>
                    )
                  )}
                  
                  {error && (
                    <div className="mt-1 text-xs text-red-500">
                      Auth failed: {error}
                    </div>
                  )}
                </div>
              </div>
              <div>{saveFrameButton}</div>
            </header>

            <main className="flex-1 space-y-8">
              {/* App Detection Section */}
              <section>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    🔍 App Detection
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Check if this app is running inside a mini app environment
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push('/miniapp-check')}
                  className="w-full text-[var(--app-accent)] border-[var(--app-accent)]"
                >
                  Check Mini App Status
                </Button>
              </section>

              {/* Social Features Section */}
              <section>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    📱 Social Features
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Share content and interact with the Farcaster ecosystem
                  </p>
                </div>
                <div className="space-y-3">
                  <ShareComposeButton />
                </div>
              </section>

              {/* Haptic Feedback Section */}
              <section>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    📳 Haptic Feedback Demo
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Experience device haptic feedback when interacting with elements
                  </p>
                </div>
                <HapticButton />
              </section>

              {/* Developer Resources Section */}
              <section>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    📚 Developer Resources
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Access documentation and development guides -- this is a Anchor link will break in cb
                  </p>
                </div>
                <DocumentationLink />
              </section>

              {/* Wallet & Transactions Section */}
              <section>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    💰 Wallet & Transactions
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Connect your wallet and experience blockchain transactions
                  </p>
                </div>
                <div className="space-y-4">
                  <ConnectWalletCard />
                  <TransactionCard />
                </div>
              </section>

              {/* Additional Content */}
              {activeTab === "home" && <Home />}
              {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
            </main>

            <footer className="mt-8 pt-4 flex justify-center border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="text-[var(--ock-text-foreground-muted)] text-xs"
                onClick={() => openUrl("https://base.org/builders/minikit")}
              >
                Built on Base with MiniKit
              </Button>
            </footer>
          </div>
        </div>
      )}
    </QuickAuth>
  );
}
