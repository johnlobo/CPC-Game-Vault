
export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  rvmGameId: string; // Kept for potential other uses, or if old emulator is reinstated
  diskUrl: string; // New field for the .dsk file URL
  emulatorCommand: string; // New field for the specific emulator command
  genre: string;
  year: number;
  developer: string;
  publisher: string;
}

// IMPORTANT: Ensure your .dsk files are placed in the `public/gamez/` directory.
// Update emulatorCommand for each game as needed.
export const games: Game[] = [
  {
    id: "Amsthrees",
    title: "Amsthrees",
    description: "Amsthrees is the free adaptation of the mobile platforms game Threes.The main goal of the game is to slide cards in a grid to combine them to create the highest multiple of three possible.",
    coverImage: "https://img.itch.zone/aW1hZ2UvODIxMTUyLzQ2MDI5ODAucG5n/347x500/FQrbUt.png", // Updated from 300x400
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvODIxMTUyLzQ2MDI5NzcucG5n/original/FhAERi.png", 
      "https://img.itch.zone/aW1hZ2UvODIxMTUyLzQ2MDI5NzkucG5n/347x500/qMQOAL.png",
      "https://img.itch.zone/aW1hZ2UvODIxMTUyLzQ2MDI5NzgucG5n/347x500/kUBLtq.png",
    ],
    rvmGameId: "00080",
    diskUrl: "/gamez/Amsthrees.dsk",
    emulatorCommand: 'run"loader\n',
    genre: "Puzzle",
    year: 2015,
    developer: "John Lobo",
    publisher: "Glasnost Corp.",
  },
  {
    id: "dr-roland",
    title: "DrRoland",
    description: "The patient is suffering a terrible virus infection, and your role as Dr.Roland is to get rid of those ugly and funky viruses, throwing them colored vitamin capsules. ",
    coverImage: "https://img.itch.zone/aW1hZ2UvODIxMTUxLzQ2MDI5NjgucG5n/347x500/moMECc.png", // Updated from 300x400
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvODIxMTUxLzQ2MDI5NjYucG5n/347x500/44dNrA.png",
      "https://img.itch.zone/aW1hZ2UvODIxMTUxLzQ2MDI5NjYucG5n/347x500/44dNrA.png",
    ],
    rvmGameId: "00053",
    diskUrl: "/gamez/DrRoland.dsk",
    emulatorCommand: 'run"loader\n',
    genre: "Puzzle",
    year: 2021,
    developer: "John Lobo",
    publisher: "Glasnost Corp.",
  },
  {
    id: "forms",
    title: "Forms",
    description: "Forms is a tetris-like game for your Amstrad CPC, in which you'll have to place as many forms as possible on a grid, to complete lines and colums and make them disappear.",
    coverImage: "https://img.itch.zone/aW1hZ2UvMjM0Nzg3My8xMzkxNDIyNi5wbmc=/347x500/%2BxOlVv.png", // Updated from 300x400
    screenshots: [
        "https://img.itch.zone/aW1hZ2UvMjM0Nzg3My8xMzkwODMwNS5wbmc=/347x500/SJy8FP.png",
        "https://img.itch.zone/aW1hZ2UvMjM0Nzg3My8xMzkxNDIzNS5wbmc=/347x500/xcLdsv.png",
        "https://img.itch.zone/aW1hZ2UvMjM0Nzg3My8xMzkwODMxMy5wbmc=/347x500/lPlQi9.png",
    ],
    rvmGameId: "00031",
    diskUrl: "/gamez/Forms.dsk",
    emulatorCommand: 'run"loader\n', 
    genre: "Puzzle",
    year: 2023,
    developer: "John Lobo",
    publisher: "Glasnost Corp.",
  },
  {
    id: "gryzor",
    title: "Gryzor (Contra)",
    description: "Gryzor, known as Contra in some regions, is a run-and-gun action game. Players battle aliens and enemy soldiers through various levels, collecting power-ups to upgrade their weaponry.",
    coverImage: "https://placehold.co/400x300.png", // Updated from 300x400
    screenshots: [
      "https://placehold.co/400x300.png",
      "https://placehold.co/400x300.png",
    ],
    rvmGameId: "00292",
    diskUrl: "/gamez/gryzor.dsk",
    emulatorCommand: 'run"gryzor\n', 
    genre: "Run and gun",
    year: 1987,
    developer: "Konami",
    publisher: "Ocean Software",
  },
  {
    id: "sorcery",
    title: "Sorcery+",
    description: "Sorcery+ is an action-adventure game where the player controls a sorcerer on a quest to rescue fellow sorcerers. It features exploration, puzzle-solving, and combat with magical spells.",
    coverImage: "https://placehold.co/400x300.png", // Updated from 300x400
    screenshots: [
      "https://placehold.co/400x300.png",
      "https://placehold.co/400x300.png",
    ],
    rvmGameId: "00556",
    diskUrl: "/gamez/sorcery.dsk",
    emulatorCommand: 'run"sorcery\n', 
    genre: "Action-adventure",
    year: 1985,
    developer: "Virgin Games",
    publisher: "Virgin Games",
  },
];

export const getGames = async (): Promise<Game[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return games;
};

export const getGameById = async (id: string): Promise<Game | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return games.find(game => game.id === id);
};
