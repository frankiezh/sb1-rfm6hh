import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLang: "de" | "en";
  onLanguageChange: (lang: "de" | "en") => void;
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange("de")}
        className={cn(
          "px-2 font-medium",
          currentLang === "de" ? "text-neutral-900" : "text-neutral-400"
        )}
      >
        DE
      </Button>
      <span className="text-neutral-300">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLanguageChange("en")}
        className={cn(
          "px-2 font-medium",
          currentLang === "en" ? "text-neutral-900" : "text-neutral-400"
        )}
      >
        EN
      </Button>
    </div>
  );
}