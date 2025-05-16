
"use client";

import { useEffect, useRef, useState } from 'react';

interface EmulatorProps {
  diskUrl: string; // URL to the .dsk file
  title: string;
}

// TypeScript declaration for the RVM Player global function
declare global {
  interface Window {
    rvmPlayer_cpc6128?: ( // Make it optional in case script hasn't loaded
      container: HTMLElement,
      options: {
        disk: { type: string; url: string };
        command: string;
        warpFrames: number;
        waitAudio?: boolean; // Optional: wait for user interaction to play audio
      }
    ) => void;
  }
}

export function Emulator({ diskUrl, title }: EmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerStatus, setPlayerStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const currentContainer = containerRef.current; // Capture for cleanup closure

    if (!currentContainer) {
      setErrorMessage("Error: Emulator container element not found.");
      setPlayerStatus('error');
      return;
    }

    // Clear previous content and set to loading for the new instance
    currentContainer.innerHTML = '';
    setPlayerStatus('loading');
    setErrorMessage(null);

    if (typeof window.rvmPlayer_cpc6128 === 'function') {
      try {
        window.rvmPlayer_cpc6128(currentContainer, {
          disk: {
            type: 'dsk',
            url: diskUrl,
          },
          command: 'run"disc\n',
          warpFrames: 20 * 50,
          waitAudio: true,
        });
        // Player has successfully initialized and taken over the container's DOM
        setPlayerStatus('success');
      } catch (error) {
        console.error("Error initializing RVM Player:", error);
        const msg = error instanceof Error ? error.message : "An unknown error occurred during initialization.";
        setErrorMessage(`Error loading emulator: ${msg}`);
        setPlayerStatus('error');
      }
    } else {
      console.warn("RVM Player script (rvmPlayer_cpc6128) not found. Ensure it's loaded correctly via the <Script> tag in layout.tsx.");
      setErrorMessage("Emulator script not loaded. Please try refreshing. If the problem persists, the script might be blocked or unavailable.");
      setPlayerStatus('error');
    }

    // Cleanup function: will run when the component unmounts
    // (e.g., due to key change in parent or navigating away)
    return () => {
      if (currentContainer) {
        // Clear the container to remove the RVM player's DOM elements
        currentContainer.innerHTML = '';
      }
    };
  }, [diskUrl]); // Effect depends on diskUrl. Title is used for the div's title attribute, not rvmPlayer options.

  return (
    <div
      ref={containerRef}
      className="rvm-player-container mx-auto bg-black rounded-lg shadow-xl overflow-hidden"
      style={{ 
        position: 'relative', 
        width: '800px', 
        height: '600px', 
        border: '2px solid hsl(var(--primary))', // Themed border
      }}
      title={`${title} - Amstrad CPC Emulator`}
    >
      {/* 
        React renders content inside this div ONLY IF the player is not 'success'.
        Once playerStatus is 'success', this block renders nothing, and the RVM player
        has full control over the containerRef.current's inner DOM.
      */}
      {playerStatus === 'loading' && (
        <div className="flex items-center justify-center h-full text-center p-4">
          <p className="text-muted-foreground">Loading emulator...</p>
        </div>
      )}
      {playerStatus === 'error' && errorMessage && (
        <div className="flex items-center justify-center h-full text-center p-4">
          <p className="text-destructive">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
