import { Info } from "lucide-react";

interface HelpProps {
  size?: number; // size of the info icon (default 16)
  children: React.ReactNode;
}

const Help = ({ size, children }: HelpProps) => {
  return (
    <p className="inline-block relative top-1 group z-10 cursor-pointer">
      <Info size={size || 16} className="text-primary" />
      <span className="text-xs text-foreground absolute bottom-[24px] left-1/3 w-max max-w-60 mx-2 px-2 py-1 rounded-sm z-50 hidden group-hover:block bg-muted shadow-sm ring-1 ring-primary/10">
        {children}
      </span>
    </p>
  );
};

export default Help;
