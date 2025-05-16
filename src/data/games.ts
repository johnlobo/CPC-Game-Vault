
export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  rvmGameId: string; // Kept for potential other uses, or if old emulator is reinstated
  diskUrl: string; // New field for the .dsk file URL
  genre: string;
  year: number;
  developer: string;
  publisher: string;
}

// IMPORTANT: Ensure your .dsk files are placed in the `public/gamez/` directory.
export const games: Game[] = [
  {
    id: "Ams3s",
    title: "Ams 3s",
    description: "Amsthrees is the free adaptation of the mobile platforms game Threes.The main goal of the game is to slide cards in a grid to combine them to create the highest multiple of three possible.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvODIxMTUyLzQ2MDI5NzcucG5n/original/FhAERi.png",
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00080",
    diskUrl: "/gamez/Ams3s.dsk", // Updated path
    genre: "Puzzle",
    year: 2015,
    developer: "John Lobo",
    publisher: "Glasnost Corp.",
  },
  {
    id: "batman-the-movie",
    title: "Batman: The Movie",
    description: "Based on the 1989 film, Batman: The Movie features several levels mirroring scenes from the film, including platforming, driving, and puzzle-solving elements. The CPC version was highly acclaimed.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00053",
    diskUrl: "/gamez/batman-the-movie.dsk", // Updated path
    genre: "Action-adventure",
    year: 1989,
    developer: "Ocean Software",
    publisher: "Ocean Software",
  },
  {
    id: "arkanoid",
    title: "Arkanoid",
    description: "Arkanoid is an arcade game developed by Taito in 1986. It is a block breaker game where the player controls a paddle-like craft known as the Vaus at the bottom of the screen, and must deflect a ball towards a number of bricks at the top of the screen to destroy them.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00031",
    diskUrl: "/gamez/arkanoid.dsk", // Updated path
    genre: "Breakout clone",
    year: 1986,
    developer: "Taito",
    publisher: "Imagine Software",
  },
  {
    id: "gryzor",
    title: "Gryzor (Contra)",
    description: "Gryzor, known as Contra in some regions, is a run-and-gun action game. Players battle aliens and enemy soldiers through various levels, collecting power-ups to upgrade their weaponry.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00292",
    diskUrl: "/gamez/gryzor.dsk", // Updated path
    genre: "Run and gun",
    year: 1987,
    developer: "Konami",
    publisher: "Ocean Software",
  },
  {
    id: "sorcery",
    title: "Sorcery+",
    description: "Sorcery+ is an action-adventure game where the player controls a sorcerer on a quest to rescue fellow sorcerers. It features exploration, puzzle-solving, and combat with magical spells.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00556",
    diskUrl: "/gamez/sorcery.dsk", // Updated path
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
