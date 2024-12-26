import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

interface ContactDialogProps {
  children: React.ReactNode;
  currentLang: 'de' | 'en';
}

export function ContactDialog({ children, currentLang }: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 bg-[#f8f8f8] border-none h-auto max-h-[90vh] overflow-hidden">
        <ContactForm isDialog currentLang={currentLang} />
      </DialogContent>
    </Dialog>
  );
} 