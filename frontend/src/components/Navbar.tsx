import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="w-full px-4 md:px-8 xl:px-16 h-14 flex items-center justify-between gap-4">
        <a
          href="#"
          className="font-bold text-lg tracking-tight flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <MusicalNoteIcon className="size-8" />
          <div className="flex flex-col leading-none">
            <span>Connected</span>
            <span>Music</span>
          </div>
        </a>

        <nav className="flex items-center">
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary border border-border bg-primary text-primary-foreground hover:bg-muted hover:text-foreground hover:border-ring h-9 px-4 py-2"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
