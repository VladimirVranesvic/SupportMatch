import React from "react";

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
  return (
    <div className="mt-4 text-sm text-slate-600">
      {count} result{count !== 1 ? "s" : ""} found
    </div>
  );
}