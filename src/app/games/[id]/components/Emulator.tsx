"use client";

interface EmulatorProps {
  rvmGameId: string;
  title: string;
}

export function Emulator({ rvmGameId, title }: EmulatorProps) {
  const emulatorUrl = `https://www.retrovirtualmachine.org/rvm-player/rvm-player.php?db_id=GAMES&id_game=${rvmGameId}&play=true&source=CPCMania_v2`;

  return (
    <div className="aspect-[4/3] w-full max-w-4xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden border-2 border-primary/50">
      <iframe
        src={emulatorUrl}
        title={`${title} - Amstrad CPC Emulator`}
        width="100%"
        height="100%"
        allowFullScreen
        className="border-0"
        loading="lazy"
      />
    </div>
  );
}
