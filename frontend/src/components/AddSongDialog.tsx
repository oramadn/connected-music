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

export function AddSongDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button className="rounded-md gap-2 cursor-pointer">
              <PlusIcon className="size-5" />
              Add Song
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
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
                defaultValue="Bohemian Rhapsody"
              />
            </Field>
            <Field>
              <Label htmlFor="artist-1">Artist</Label>
              <Input id="artist-1" name="artist" defaultValue="Queen" />
            </Field>
            <Field>
              <Label htmlFor="genre-1">Genre</Label>
              <Input id="genre-1" name="genre" defaultValue="pop" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button className="rounded-md" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button className="rounded-md" type="submit">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
