
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Settings } from 'lucide-react';
// No server-side metadata for client components
// import type { Metadata } from 'next';
import { getGames, type Game } from '@/data/games'; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// No server-side metadata for client components
// export const metadata: Metadata = {
//   title: 'Admin - CPC Game Vault',
//   description: 'Administration area for the CPC Game Vault.',
// };

const gameFormSchema = z.object({
  id: z.string().min(1, "ID is required.").trim().toLowerCase().replace(/\s+/g, '-'), // auto-slugify
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  coverImage: z.string().url("Must be a valid URL for cover image."),
  screenshots: z.string().min(1, "At least one screenshot URL is required. Separate multiple URLs with commas."),
  rvmGameId: z.string().min(1, "RVM Game ID is required (can be placeholder)."), // Kept for data model consistency
  diskUrl: z.string().min(1, "Disk URL is required (e.g., /gamez/yourgame.dsk)."),
  emulatorCommand: z.string().min(1, "Emulator command is required."),
  genre: z.string().min(1, "Genre is required."),
  year: z.coerce.number().int().positive("Year must be a positive number."),
  developer: z.string().min(1, "Developer is required."),
  publisher: z.string().min(1, "Publisher is required."),
  status: z.enum(['finished', 'wip'], { required_error: "Status is required." }),
});

type GameFormValues = z.infer<typeof gameFormSchema>;

// Default values for the form
const defaultValues: Partial<GameFormValues> = {
  id: "",
  title: "",
  description: "",
  coverImage: "https://placehold.co/400x300.png",
  screenshots: "https://placehold.co/400x300.png",
  rvmGameId: "00000",
  diskUrl: "/gamez/",
  emulatorCommand: 'run"disc\\n',
  genre: "",
  year: new Date().getFullYear(),
  developer: "",
  publisher: "",
  status: "finished",
};

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      const gamesData = await getGames(); // Fetch initial games
      setGames(gamesData);
      setIsLoading(false);
    }
    fetchGames();
  }, []);

  const handleAddNewClick = () => {
    setEditingGame(null);
    form.reset(defaultValues);
    setIsDialogOpen(true);
  };

  const handleEditClick = (gameToEdit: Game) => {
    setEditingGame(gameToEdit);
    const formValues = {
      ...gameToEdit,
      screenshots: gameToEdit.screenshots.join(', '), // Convert array to comma-separated string
    };
    form.reset(formValues);
    setIsDialogOpen(true);
  };

  function onSubmit(data: GameFormValues) {
    const gameDataToSave: Game = {
      ...data,
      // Convert comma-separated string to array, ensuring empty strings are filtered out
      screenshots: data.screenshots.split(',').map(s => s.trim()).filter(s => s),
    };

    if (editingGame) {
      // Update existing game in the local state
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === editingGame.id ? { ...game, ...gameDataToSave, id: editingGame.id } : game
        )
      );
      console.log("Updated game data for ID:", editingGame.id, gameDataToSave);
    } else {
      // Add new game to the local state
      // Ensure ID is unique (for client-side, basic check)
      const existingGame = games.find(g => g.id === gameDataToSave.id);
      if (existingGame) {
        form.setError("id", { type: "manual", message: "This ID is already in use. Please choose a unique ID." });
        return; 
      }
      setGames(prevGames => [...prevGames, gameDataToSave]);
      console.log("New game data added:", gameDataToSave);
    }
    setIsDialogOpen(false); 
    // Dialog onOpenChange will handle form reset if setEditingGame(null) is called there
  }
  
  if (isLoading && games.length === 0) { 
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-2xl text-muted-foreground">Loading admin area...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-2 sm:pt-3 gap-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter text-center sm:text-left">
          Admin Area
        </h1>
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-4 tracking-tight">
          Game Management
        </h2>
        <div className="mb-6 text-right">
          <Button size="lg" className="text-xl py-3 px-6" onClick={handleAddNewClick}>
            <PlusCircle className="mr-2 h-7 w-7" />
            Add New Game
          </Button>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) {
            setEditingGame(null); 
            form.reset(defaultValues); 
          }
        }}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">
                {editingGame ? `Edit Game: ${editingGame.title}` : "Add New Game"}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground pt-1">
                {editingGame ? "Update the details for this game." : "Fill in the details for the new game."} Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Game ID (Unique Slug)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., new-awesome-game (auto-formats to slug)" 
                          {...field} 
                          disabled={!!editingGame} 
                          className="bg-input" 
                          onChange={(e) => {
                            const value = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>A unique identifier for the game URL. Cannot be changed after creation. Will be auto-formatted.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Game Title" {...field} className="bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief description of the game." className="min-h-[100px] bg-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Cover Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/cover.png" {...field} className="bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenshots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Screenshot URLs (comma-separated)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="https://url1.png, https://url2.png" className="min-h-[80px] bg-input" {...field} />
                      </FormControl>
                      <FormDescription>Provide URLs for game screenshots, separated by commas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="diskUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Disk File URL (e.g., /gamez/name.dsk)</FormLabel>
                      <FormControl>
                        <Input placeholder="/gamez/your-game.dsk" {...field} className="bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emulatorCommand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Emulator Command</FormLabel>
                      <FormControl>
                        <Input placeholder='run"disc\\n' {...field} className="bg-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rvmGameId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">RVM Game ID (Legacy)</FormLabel>
                      <FormControl>
                        <Input placeholder="00000 (if applicable)" {...field} className="bg-input" />
                      </FormControl>
                      <FormDescription>Legacy ID, can be a placeholder if not used.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Genre</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Puzzle, Action" {...field} className="bg-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1987" {...field} className="bg-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="developer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Developer</FormLabel>
                        <FormControl>
                          <Input placeholder="Developer Name" {...field} className="bg-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Publisher Name" {...field} className="bg-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select game status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="finished">Finished</SelectItem>
                          <SelectItem value="wip">Work in Progress (WIP)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Game</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {games.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xl w-[30%]">Title</TableHead>
                  <TableHead className="text-xl text-center">Year</TableHead>
                  <TableHead className="text-xl">Publisher</TableHead>
                  <TableHead className="text-xl text-center">Status</TableHead>
                  <TableHead className="text-xl text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium text-xl">{game.title}</TableCell>
                    <TableCell className="text-xl text-center">{game.year}</TableCell>
                    <TableCell className="text-xl">{game.publisher}</TableCell>
                    <TableCell className="text-xl text-center">
                      <Badge 
                        variant={game.status === 'wip' ? 'secondary' : 'default'}
                        className={game.status === 'wip' ? 'bg-wip text-wip-foreground border-wip' : 'bg-primary/20 text-primary border-primary/30'}
                      >
                        {game.status === 'wip' ? 'WIP' : 'Finished'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="text-lg" onClick={() => handleEditClick(game)}>
                        <Edit className="mr-1.5 h-5 w-5" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="text-lg" disabled> {/* Delete is still disabled */}
                        <Trash2 className="mr-1.5 h-5 w-5" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
           <p className="text-xl sm:text-2xl text-muted-foreground text-center py-8">
            No games found in the library. Add one to get started!
          </p>
        )}
        
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
          Note: Changes made here are for the current session only and will not persist after a page refresh unless integrated with a backend.
        </p>
      </div>
    </div>
  );
}
    

      

    
