
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react'; // Removed ArrowLeft
import type { Metadata } from 'next';
import { getGames, type Game } from '@/data/games'; // Import game data and type
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Admin - CPC Game Vault',
  description: 'Administration area for the CPC Game Vault.',
};

export default async function AdminPage() {
  const games: Game[] = await getGames();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-2 sm:pt-3 gap-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter text-center sm:text-left">
          Admin Area
        </h1>
        {/* "Back to Home" button removed from here, it's now in the Header component */}
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-4 tracking-tight">
          Game Management
        </h2>
        <div className="mb-6 text-right">
          <Button size="lg" className="text-xl py-3 px-6" disabled>
            <PlusCircle className="mr-2 h-7 w-7" />
            Add New Game
          </Button>
        </div>
        
        {games.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xl w-[40%]">Title</TableHead>
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
                      <Button variant="outline" size="sm" className="text-lg" disabled>
                        <Edit className="mr-1.5 h-5 w-5" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="text-lg" disabled>
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
            No games found in the library.
          </p>
        )}
        
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
          Further management tools and settings will appear here.
        </p>
      </div>
    </div>
  );
}
