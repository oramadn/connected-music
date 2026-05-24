import { MusicalNoteIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { LoginDialog } from "./LoginDialog";
import { Button } from "./ui/button";
import { logout } from "@/api/api";

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, onLoginSuccess, onLogout }: NavbarProps) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="w-full px-4 md:px-8 xl:px-16 h-16 flex items-center justify-between gap-4">
        <a
          href="/"
          className="tracking-tight flex items-center gap-2 text-primary whitespace-nowrap"
        >
          <MusicalNoteIcon className="size-10" strokeWidth={2} />
          <div className="flex flex-col leading-none text-xl italic font-bold text-black">
            <span>Connected</span>
            <span>Music</span>
          </div>
        </a>

        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="rounded-md text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <ArrowRightStartOnRectangleIcon className="size-4" />
              Logout
            </Button>
          ) : (
            <LoginDialog onLoginSuccess={onLoginSuccess} />
          )}
        </nav>
      </div>
    </header>
  );
}
