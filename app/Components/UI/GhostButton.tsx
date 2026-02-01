import React from "react";
import type { LucideIcon } from "lucide-react";

//Defining props 
interface GhostButtonProps {
    children: React.ReactNode;
    icon?: LucideIcon;
    href?: string;
    className?: string;
  }
  
//Secondary/outlined button for less prominent actions
const GhostButton = ({ children, icon: Icon, href = "#", className = "" }: GhostButtonProps) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white/90 backdrop-blur transition hover:border-white/40 hover:bg-white/10 ${className}`}
    >
      {Icon && <Icon className="h-5 w-5" />} {children}
    </a>
  );

//Makes available for other files to use. 
export default GhostButton;