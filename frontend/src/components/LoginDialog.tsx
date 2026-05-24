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
import { login } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface LoginDialogProps {
  onLoginSuccess: () => void;
}

export function LoginDialog({ onLoginSuccess }: LoginDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      onLoginSuccess();
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-md px-4 py-2 bg-primary text-primary-foreground hover:bg-muted hover:text-foreground border border-border">
            Login
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="password-login">Password</Label>
              <Input
                id="password-login"
                name="password"
                type="password"
                required
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
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
