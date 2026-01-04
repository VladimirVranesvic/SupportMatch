import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
}

//Give text gradent with colour
const GradientText = ({ children }: GradientTextProps) => (
  <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
    {children}
  </span>
);

export default GradientText;
