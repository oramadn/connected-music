import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function SongsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 bg-muted rounded-full mb-4">
        <MusicalNoteIcon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No songs found</h3>
      <p className="text-muted-foreground max-w-sm">
        It looks like there are no songs in our collection yet. Check back later
        or try adding some!
      </p>
    </div>
  );
}
