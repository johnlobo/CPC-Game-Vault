
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
  const [statusMessage, setStatusMessage] = useState<string | null>("Loading emulator...");

  useEffect(() => {
    // Ensure we have a container
    if (!containerRef.current) {
      setStatusMessage("Error: Emulator container element not found.");
      return;
    }

    // Clear any previous player instance or message if diskUrl changes.
    // This is important if the RVM player doesn't clean up itself when re-initialized.
    containerRef.current.innerHTML = ''; 
    setStatusMessage("Loading emulator..."); // Reset status message for the current attempt

    if (typeof window.rvmPlayer_cpc6128 === 'function') {
      try {
        window.rvmPlayer_cpc6128(containerRef.current, {
          disk: {
            type: 'dsk',
            url: diskUrl,
          },
          command: 'run"disc\n',
          warpFrames: 20 * 50,
          waitAudio: true,
        });
        // If the player initializes successfully, it will take over the container.
        // We can clear the React-rendered status message.
        setStatusMessage(null); 
      } catch (error) {
        console.error("Error initializing RVM Player:", error);
        const errorMessageText = error instanceof Error ? error.message : "An unknown error occurred during initialization.";
        setStatusMessage(`Error loading emulator: ${errorMessageText}`);
      }
    } else {
      console.warn("RVM Player script (rvmPlayer_cpc6128) not found. Ensure it's loaded correctly via the <Script> tag in layout.tsx.");
      setStatusMessage("Emulator script not loaded. Please try refreshing. If the problem persists, the script might be blocked or unavailable.");
    }
  }, [diskUrl]); // Re-run the effect if diskUrl changes

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
      {/* Display status message if RVM player hasn't taken over or if there's an error */}
      {statusMessage && (
        <div className="flex items-center justify-center h-full text-center p-4">
          <p className={statusMessage.toLowerCase().startsWith("error:") || statusMessage.toLowerCase().startsWith("emulator script not loaded") ? "text-destructive" : "text-muted-foreground"}>
            {statusMessage}
          </p>
        </div>
      )}
      {/* When statusMessage is null, this space is left for the RVM Player to render into containerRef.current */}
    </div>
  );
}
