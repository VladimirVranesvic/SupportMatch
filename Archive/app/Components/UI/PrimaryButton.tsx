import React from "react";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

//Defining props for the PrimaryButton component.
interface PrimaryButtonProps {
    children: React.ReactNode;
    icon?: LucideIcon;
    href?: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }

//Main call-to-action button. It's used for the most important actions on the page.
const PrimaryButton = ({ children, icon: Icon = ArrowRight, href = "#request", className = "", onClick }: PrimaryButtonProps) => (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${className}`}
    >
      {children}
      <Icon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
    </a>
  );

//Makes available for other files to use. 
export default PrimaryButton;