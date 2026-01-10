import React from "react";

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
  return (
    <div className="mt-6 text-sm font-semibold text-slate-900">
      {count} result{count !== 1 ? "s" : ""} found
    </div>
  );
}