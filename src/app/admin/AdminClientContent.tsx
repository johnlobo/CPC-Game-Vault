
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, LogOut } from 'lucide-react';
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
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


const gameFormSchema = z.object({
  id: z.string().min(1, "ID is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  coverImage: z.string().url("Must be a valid URL for cover image.").min(1, "Cover image URL is required."),
  screenshots: z.string().min(1, "At least one screenshot URL is required. Separate multiple URLs with commas."),
  rvmGameId: z.string().min(1, "RVM Game ID is required (can be placeholder)."),
  diskUrl: z.string().min(1, "Disk URL is required (e.g., /gamez/yourgame.dsk)."),
  emulatorCommand: z.string().min(1, "Emulator command is required."),
  genre: z.string().min(1, "Genre is required."),
  year: z.coerce.number().int().positive("Year must be a positive number.").min(1900, "Year seems too old").max(new Date().getFullYear() + 5, "Year seems too far in future"),
  developer: z.string().min(1, "Developer is required."),
  publisher: z.string().min(1, "Publisher is required."),
  status: z.enum(['finished', 'wip'], { required_error: "Status is required." }),
});

type GameFormValues = z.infer<typeof gameFormSchema>;

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

interface AdminClientContentProps {
  userEmail?: string;
}

export default function AdminClientContent({ userEmail }: AdminClientContentProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      const gamesData = await getGames(); 
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
      screenshots: gameToEdit.screenshots.join(', '), 
    };
    form.reset(formValues);
    setIsDialogOpen(true);
  };

  async function onSubmit(data: GameFormValues) {
    const gameDataToSave: Game = {
      ...data,
      screenshots: data.screenshots.split(',').map(s => s.trim()).filter(s => s),
    };

    // TODO: Replace with Supabase save logic in a future step
    if (editingGame) {
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === editingGame.id ? { ...game, ...gameDataToSave, id: editingGame.id } : game
        )
      );
      toast({ title: "Game Updated (Session)", description: `"${gameDataToSave.title}" details updated for this session.` });
      console.log("Updated game data (client-side):", editingGame.id, gameDataToSave);
    } else {
      const existingGame = games.find(g => g.id === gameDataToSave.id);
      if (existingGame) {
        form.setError("id", { type: "manual", message: "This ID is already in use. Please choose a unique ID." });
        return; 
      }
      setGames(prevGames => [...prevGames, gameDataToSave]);
      toast({ title: "Game Added (Session)", description: `"${gameDataToSave.title}" added for this session.` });
      console.log("New game data added (client-side):", gameDataToSave);
    }
    setIsDialogOpen(false); 
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push('/login'); // Or router.refresh() if middleware handles redirect
    }
  };
  
  if (isLoading && games.length === 0) { 
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-muted-foreground">Loading admin area...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-1 sm:pt-2 gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tighter text-center sm:text-left">
          Admin Area
        </h1>
        {userEmail && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Logged in as: {userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1.5 h-4 w-4" /> Logout
            </Button>
          </div>
        )}
      </div>
      
      <div className="bg-card p-3 sm:p-4 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-accent tracking-tight">
            Game Management
          </h2>
          <Button size="lg" className="text-lg py-2 px-4" onClick={handleAddNewClick}>
            <PlusCircle className="mr-1.5 h-6 w-6" />
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
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">
                {editingGame ? `Edit Game: ${editingGame.title}` : "Add New Game"}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground pt-1">
                {editingGame ? "Update the details for this game." : "Fill in the details for the new game."} Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 py-1">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">Game ID (Unique Slug)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., new-awesome-game (auto-formats to slug)" 
                          {...field} 
                          disabled={!!editingGame} 
                          className="bg-input text-base" 
                          onChange={(e) => {
                            const value = e.target.value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-sm">A unique identifier for the game URL. Cannot be changed after creation. Will be auto-formatted.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Game Title" {...field} className="bg-input text-base" />
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
                      <FormLabel className="font-semibold text-base">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief description of the game." className="min-h-[80px] bg-input text-base" {...field} />
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
                      <FormLabel className="font-semibold text-base">Cover Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/cover.png" {...field} className="bg-input text-base" />
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
                      <FormLabel className="font-semibold text-base">Screenshot URLs (comma-separated)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="https://url1.png, https://url2.png" className="min-h-[70px] bg-input text-base" {...field} />
                      </FormControl>
                      <FormDescription className="text-sm">Provide URLs for game screenshots, separated by commas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="diskUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">Disk File URL (e.g., /gamez/name.dsk)</FormLabel>
                      <FormControl>
                        <Input placeholder="/gamez/your-game.dsk" {...field} className="bg-input text-base" />
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
                      <FormLabel className="font-semibold text-base">Emulator Command</FormLabel>
                      <FormControl>
                        <Input placeholder='run"disc\\n' {...field} className="bg-input text-base" />
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
                      <FormLabel className="font-semibold text-base">RVM Game ID (Legacy)</FormLabel>
                      <FormControl>
                        <Input placeholder="00000 (if applicable)" {...field} className="bg-input text-base" />
                      </FormControl>
                      <FormDescription className="text-sm">Legacy ID, can be a placeholder if not used.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">Genre</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Puzzle, Action" {...field} className="bg-input text-base" />
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
                        <FormLabel className="font-semibold text-base">Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 1987" {...field} className="bg-input text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="developer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-base">Developer</FormLabel>
                        <FormControl>
                          <Input placeholder="Developer Name" {...field} className="bg-input text-base" />
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
                        <FormLabel className="font-semibold text-base">Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Publisher Name" {...field} className="bg-input text-base" />
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
                      <FormLabel className="font-semibold text-base">Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input text-base">
                            <SelectValue placeholder="Select game status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="finished" className="text-base">Finished</SelectItem>
                          <SelectItem value="wip" className="text-base">Work in Progress (WIP)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-3">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="text-base">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="text-base">Save Game</Button>
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
                  <TableHead className="text-base w-[30%]">Title</TableHead>
                  <TableHead className="text-base text-center">Year</TableHead>
                  <TableHead className="text-base">Publisher</TableHead>
                  <TableHead className="text-base text-center">Status</TableHead>
                  <TableHead className="text-base text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium text-base">{game.title}</TableCell>
                    <TableCell className="text-base text-center">{game.year}</TableCell>
                    <TableCell className="text-base">{game.publisher}</TableCell>
                    <TableCell className="text-base text-center">
                      <Badge 
                        variant={game.status === 'wip' ? 'secondary' : 'default'}
                        className={game.status === 'wip' ? 'bg-wip text-wip-foreground border-wip text-xs' : 'bg-primary/20 text-primary border-primary/30 text-xs'}
                      >
                        {game.status === 'wip' ? 'WIP' : 'Finished'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="sm" className="text-sm" onClick={() => handleEditClick(game)}>
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="text-sm" disabled> 
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
           <p className="text-lg sm:text-xl text-muted-foreground text-center py-6">
            No games found in the library. Add one to get started!
          </p>
        )}
        
        <p className="mt-4 text-sm text-muted-foreground">
          Note: Game data changes made here are for the current session only and will not persist after a page refresh until database integration.
        </p>
      </div>
    </div>
  );
}
