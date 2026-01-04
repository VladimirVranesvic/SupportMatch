import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-xl border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-xl border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}