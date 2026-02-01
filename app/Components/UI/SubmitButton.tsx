import React from "react";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ children, className = "" }: SubmitButtonProps) => (
  <button
    type="submit"
    className={`group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${className}`}
  >
    {children}
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
  </button>
);

export default SubmitButton;