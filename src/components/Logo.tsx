import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <div className={cn("w-full h-full", inverted && "invert", className)}>
      <img 
        src="/logo.svg"
        alt="Atelier Grünenwald Logo"
        className="w-full h-full"
        style={{ filter: inverted ? 'invert(1)' : 'none' }}
      />
    </div>
  );
}