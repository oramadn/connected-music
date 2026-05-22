import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container h-16 flex items-center justify-between px-20">
        <span className="flex items-center justify-between gap-2">
          <MusicalNoteIcon className="size-8 text-primary" strokeWidth={1.5} />
          <div className="flex flex-col font-bold leading-4.5">
            <span>Connected</span>
            <span>Music</span>
          </div>
        </span>
      </div>
    </header>
  );
}
