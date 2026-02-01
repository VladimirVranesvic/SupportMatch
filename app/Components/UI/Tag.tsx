import React from "react";

interface TagProps {
  children: React.ReactNode;
}

const Tag = ({ children }: TagProps) => (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );

  export default Tag;