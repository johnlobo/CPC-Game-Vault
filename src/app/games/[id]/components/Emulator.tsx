
"use client";

import type { Game } from '@/data/games';
import { useEffect, useRef, useState } from 'react';

interface EmulatorProps {
  diskUrl: string; // URL to the .dsk file
  command: string; // Command to run the game
  title: string;
  status: Game['status']; // Add status prop
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

export function Emulator({ diskUrl, command, title, status }: EmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerStatus, setPlayerStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Capture the DOM element at the time the effect runs.
    // This specific element will be used for both setup and cleanup.
    const activeContainerElement = containerRef.current;

    if (!activeContainerElement) {
      setErrorMessage("Error: Emulator container element not found.");
      setPlayerStatus('error');
      console.error("[EMULATOR INIT] Container ref not found for", title);
      return;
    }

    // Clear previous emulator instance or messages before loading new one
    console.log(`[EMULATOR INIT] Clearing container for ${title}`);
    while (activeContainerElement.firstChild) {
      activeContainerElement.removeChild(activeContainerElement.firstChild);
    }
    activeContainerElement.innerHTML = ''; // Ensure it's empty

    setPlayerStatus('loading');
    setErrorMessage(null);
    console.log(`[EMULATOR INIT] Loading emulator for ${title} with command: ${command}`);

    // Process the command to ensure \n is a real newline
    const processedCommand = command.replace(/\\n/g, '\n');
    console.log(`[EMULATOR INIT] Processed command for ${title}: ${JSON.stringify(processedCommand)}`);


    if (typeof window.rvmPlayer_cpc6128 === 'function') {
      try {
        window.rvmPlayer_cpc6128(activeContainerElement, {
          disk: {
            type: 'dsk',
            url: diskUrl,
          },
          command: processedCommand, // Use the processed command
          warpFrames: 20 * 50,
          waitAudio: true,
        });
        setPlayerStatus('success');
        console.log(`[EMULATOR INIT] Successfully initialized RVM Player for ${title}`);
        activeContainerElement.focus();
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
      // This is the cleanup function. It uses 'activeContainerElement' captured from the effect's closure.
      console.log(`[EMULATOR CLEANUP] Starting cleanup for: ${title}`);

      if (activeContainerElement) {
        console.log(`[EMULATOR CLEANUP] Container (captured at init) found for ${title}. Proceeding with DOM cleanup.`);

        // Try to blur any active element within the container first
        if (document.activeElement && activeContainerElement.contains(document.activeElement)) {
          console.log(`[EMULATOR CLEANUP] Blurring active element within captured container for ${title}.`);
          (document.activeElement as HTMLElement).blur();
        }

        // Remove all child nodes one by one.
        while (activeContainerElement.firstChild) {
          activeContainerElement.removeChild(activeContainerElement.firstChild);
        }
        // As a fallback, ensure it's empty.
        activeContainerElement.innerHTML = '';

        console.log(`[EMULATOR CLEANUP] Finished cleanup for: ${title}. Player status (at time of effect setup) was: ${playerStatus}`);
      } else {
        // This should ideally not happen if activeContainerElement was valid during setup.
        console.warn(`[EMULATOR CLEANUP] Captured container element was null for ${title} during cleanup. This is unexpected if init succeeded.`);
      }
    };
  }, [diskUrl, command, title, playerStatus]); // Added playerStatus to dependencies to re-evaluate cleanup log if status changes, though primary effect is keyed by diskUrl/command.

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

  const borderColor = status === 'wip' ? 'hsl(var(--wip))' : 'hsl(var(--primary))';

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
        border: `2px solid ${borderColor}`,
      }}
      title={`${title} - Amstrad CPC Emulator. Click to activate and control.`}
      aria-label={`Amstrad CPC Emulator for ${title}`}
    >
      {playerStatus === 'loading' && (
        <div className="flex items-center justify-center h-full text-center p-4">
          <p className="text-muted-foreground text-xl">Loading emulator...</p>
        </div>
      )}
      {playerStatus === 'error' && errorMessage && (
        <div className="flex items-center justify-center h-full text-center p-4">
          <p className="text-destructive text-xl">{errorMessage}</p>
        </div>
      )}
      {/* When playerStatus is 'success', React renders nothing here,
          allowing RVM player to control the container's DOM. */}
    </div>
  );
}
