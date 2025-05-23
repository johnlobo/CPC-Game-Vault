
"use client";

import { useEffect, useRef, useState } from 'react';

interface EmulatorProps {
  diskUrl: string; // URL to the .dsk file
  command: string; // Command to run the game
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

export function Emulator({ diskUrl, command, title }: EmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerStatus, setPlayerStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const currentContainer = containerRef.current; 

    if (!currentContainer) {
      setErrorMessage("Error: Emulator container element not found.");
      setPlayerStatus('error');
      console.error("[EMULATOR INIT] Container ref not found for", title);
      return;
    }

    // Clear previous emulator instance or messages before loading new one
    console.log(`[EMULATOR INIT] Clearing container for ${title}`);
    while (currentContainer.firstChild) {
      currentContainer.removeChild(currentContainer.firstChild);
    }
    currentContainer.innerHTML = ''; // Ensure it's empty

    setPlayerStatus('loading');
    setErrorMessage(null);
    console.log(`[EMULATOR INIT] Loading emulator for ${title} with command: ${command}`);

    if (typeof window.rvmPlayer_cpc6128 === 'function') {
      try {
        window.rvmPlayer_cpc6128(currentContainer, {
          disk: {
            type: 'dsk',
            url: diskUrl,
          },
          command: command,
          warpFrames: 20 * 50,
          waitAudio: true,
        });
        setPlayerStatus('success');
        console.log(`[EMULATOR INIT] Successfully initialized RVM Player for ${title}`);
        currentContainer.focus(); 
      } catch (error) {
        console.error(`[EMULATOR INIT] Error initializing RVM Player for ${title}:`, error);
        const msg = error instanceof Error ? error.message : "An unknown error occurred during initialization.";
        setErrorMessage(`Error loading emulator: ${msg}`);
        setPlayerStatus('error');
      }
    } else {
      console.warn(`[EMULATOR INIT] RVM Player script (rvmPlayer_cpc6128) not found for ${title}. Ensure it's loaded correctly.`);
      setErrorMessage("Emulator script not loaded. Please try refreshing. If the problem persists, the script might be blocked or unavailable.");
      setPlayerStatus('error');
    }

    return () => {
      // This is the cleanup function
      const containerForCleanup = containerRef.current; // Re-fetch ref at cleanup time, though usually the captured one is fine
      console.log(`[EMULATOR CLEANUP] Starting cleanup for: ${title}`);

      if (containerForCleanup) {
        console.log(`[EMULATOR CLEANUP] Container found for ${title}. Proceeding with DOM cleanup.`);
        
        // Remove all child nodes one by one.
        // This is more deliberate than innerHTML = '' and can help if the library
        // has attached event listeners to children.
        while (containerForCleanup.firstChild) {
          containerForCleanup.removeChild(containerForCleanup.firstChild);
        }
        // As a fallback, ensure it's empty.
        containerForCleanup.innerHTML = ''; 

        if (document.activeElement && containerForCleanup.contains(document.activeElement)) {
          console.log(`[EMULATOR CLEANUP] Blurring active element within container for ${title}.`);
          (document.activeElement as HTMLElement).blur();
        }
        console.log(`[EMULATOR CLEANUP] Finished cleanup for: ${title}. Player status was: ${playerStatus}`);
      } else {
        console.warn(`[EMULATOR CLEANUP] Container ref was null for ${title} during cleanup.`);
      }
    };
  }, [diskUrl, command, title]); // Effect dependencies

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
      tabIndex={0} 
      onClick={handleContainerClick} 
      className="rvm-player-container mx-auto bg-black rounded-lg shadow-xl overflow-hidden outline-none" 
      style={{ 
        position: 'relative', 
        width: '800px', 
        height: '600px', 
        border: '2px solid hsl(var(--primary))', 
      }}
      title={`${title} - Amstrad CPC Emulator. Click to activate and control.`} 
      aria-label={`Amstrad CPC Emulator for ${title}`}
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
          allowing RVM player to control the container's DOM. */}
    </div>
  );
}
