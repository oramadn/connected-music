import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSong, fetchGenres } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AddSongDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: genres = [], isLoading: isLoadingGenres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: createSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setOpen(false);
    },
  });

  const handleAction = (formData: FormData) => {
    mutation.mutate(formData);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      mutation.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="rounded-md gap-2 cursor-pointer">
            <PlusIcon className="size-5" />
            Add Song
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form action={handleAction} className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Add song</DialogTitle>
            <DialogDescription>
              Add a song to the songs collection.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Bohemian Rhapsody"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="artist-1">Artist</Label>
              <Input id="artist-1" name="artist" placeholder="Queen" required />
            </Field>
            <Field>
              <Label htmlFor="genre-1">Genre</Label>
              <Select name="genre" required>
                <SelectTrigger id="genre-1">
                  <SelectValue
                    placeholder={
                      isLoadingGenres ? "Loading genres..." : "Select a genre"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre: string) => (
                    <SelectItem key={genre} value={genre}>
                      {genre.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="release_date-1">Release Date</Label>
              <Input
                id="release_date-1"
                name="release_date"
                type="date"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="cover_file-1">Cover Image</Label>
              <Input
                id="cover_file-1"
                name="cover_file"
                type="file"
                accept="image/*"
              />
            </Field>
          </FieldGroup>
          {mutation.isError && (
            <p className="text-sm text-destructive font-medium">
              {mutation.error.message}
            </p>
          )}
          <DialogFooter>
            <DialogClose
              render={
                <Button className="rounded-md" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button
              className="rounded-md"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
