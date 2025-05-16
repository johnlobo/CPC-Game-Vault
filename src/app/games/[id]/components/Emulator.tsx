
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
    const currentContainer = containerRef.current; 

    if (!currentContainer) {
      setErrorMessage("Error: Emulator container element not found.");
      setPlayerStatus('error');
      return;
    }

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
        setPlayerStatus('success');
        // Attempt to focus the container after successful initialization.
        // The user might still need to click the canvas due to waitAudio: true.
        currentContainer.focus(); 
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

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [diskUrl]); 

  const handleContainerClick = () => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.focus();
      } else {
        containerRef.current.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0} // Make the container focusable
      onClick={handleContainerClick} // Handle clicks to attempt focus
      className="rvm-player-container mx-auto bg-black rounded-lg shadow-xl overflow-hidden outline-none" // Added outline-none for focused state
      style={{ 
        position: 'relative', 
        width: '800px', 
        height: '600px', 
        border: '2px solid hsl(var(--primary))', 
      }}
      title={`${title} - Amstrad CPC Emulator. Click to activate and control.`} // Added hint in title
    >
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
      {/* When playerStatus is 'success', React renders nothing here, 
          allowing RVM player to control the container's DOM. 
          The title attribute now suggests clicking to activate. */}
    </div>
  );
}
