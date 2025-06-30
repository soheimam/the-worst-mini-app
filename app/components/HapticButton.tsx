"use client";

import { useCallback } from "react";
import { useOpenUrl } from "@coinbase/onchainkit/minikit";
import { sdk } from "@farcaster/frame-sdk";

export default function HapticButton() {
  const openUrl = useOpenUrl();

  const handleClick = useCallback(async () => {
  
    
    // Trigger heavy impact feedback (more noticeable)
    await sdk.haptics.impactOccurred('heavy');
  
    
    // Open Google in a new tab/window
    openUrl("https://google.com");
  }, [openUrl]);

  return (
    <button
      onClick={handleClick}
      className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
    >
      📳 Try Haptic Feedback
    </button>
  );
} 