"use client";

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    // Ensure the container div and the RVM player script are available
    if (containerRef.current && typeof window.rvmPlayer_cpc6128 === 'function') {
      // Clear any previous emulator instance if the component re-renders with a new game
      // This might be necessary if the RVM player doesn't clean up itself.
      // For now, we assume it handles re-initialization or the parent component unmounts/remounts.
      // containerRef.current.innerHTML = ''; // Simple cleanup if needed

      try {
        window.rvmPlayer_cpc6128(containerRef.current, {
          disk: {
            type: 'dsk',
            url: diskUrl,
          },
          command: 'run"disc\n', // As per your snippet, might need to be dynamic
          warpFrames: 20 * 50,   // As per your snippet
          waitAudio: true,       // Good practice for web audio
        });
      } catch (error) {
        console.error("Error initializing RVM Player:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<p class="text-destructive text-center p-4">Error loading emulator. Please ensure the disk URL is correct and the RVM Player script is loaded.</p>';
        }
      }
    } else if (typeof window.rvmPlayer_cpc6128 !== 'function') {
        console.warn("RVM Player script (rvmPlayer_cpc6128) not found. Ensure it's loaded correctly.");
         if (containerRef.current) {
          containerRef.current.innerHTML = '<p class="text-muted-foreground text-center p-4">Emulator script not loaded. Please try refreshing.</p>';
        }
    }
  }, [diskUrl]); // Re-run the effect if diskUrl changes

  return (
    <div
      ref={containerRef}
      className="rvm-player-container mx-auto bg-black rounded-lg shadow-xl overflow-hidden" // Added some existing styling
      style={{ 
        position: 'relative', 
        width: '800px', 
        height: '600px', 
        border: '2px solid hsl(var(--primary))', // Themed border
      }}
      title={`${title} - Amstrad CPC Emulator`}
    >
      {/* RVM Player will initialize here. Adding a placeholder message. */}
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading emulator...</p>
      </div>
    </div>
  );
}
