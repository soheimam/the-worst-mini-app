"use client";

import { Button } from "./DemoComponents";
import { Icon } from "./DemoComponents";

export function ShareComposeButton() {
  const handleShareCompose = () => {
    const text = "Just tried out this amazing MiniApp built with @base and MiniKit! 🚀 The seamless Web3 experience is incredible. #Base #MiniKit #Web3";
    const encodedText = encodeURIComponent(text);
    const intentUrl = `https://warpcast.com/~/compose?text=${encodedText}`;
    
    window.open(intentUrl, '_blank');
  };

  return (
    <Button
      variant="outline"
      onClick={handleShareCompose}
      className="w-full text-[var(--app-accent)] border-[var(--app-accent)] hover:bg-blue-50 dark:hover:bg-blue-950"
      icon={<Icon name="plus" size="sm" />}
    >
      Share on Farcaster
    </Button>
  );
} 