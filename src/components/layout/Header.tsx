import Link from "next/link";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          JobBoard
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Post a Job
          </Link>
        </nav>
      </div>
    </header>
  );
}
