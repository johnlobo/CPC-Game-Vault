export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  rvmGameId: string;
  genre: string;
  year: number;
  developer: string;
  publisher: string;
}

export const games: Game[] = [
  {
    id: "bomb-jack",
    title: "Bomb Jack",
    description: "Bomb Jack is an arcade platform game by Tehkan. Players control Jack, who must collect all the bombs on the screen to progress. The game features various enemies and power-ups.",
    coverImage: "https://placehold.co/300x400.png",
    screenshots: [
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
      "https://placehold.co/600x400.png",
    ],
    rvmGameId: "00080",
    genre: "Platform",
    year: 1984,
    developer: "Tehkan",
    publisher: "Elite Systems",
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
    rvmGameId: "00053", // RVM ID for Batman The Movie (1989)
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
