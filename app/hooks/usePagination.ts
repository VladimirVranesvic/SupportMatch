import { useState, useEffect, useMemo } from "react";

export function usePagination<T>(items: T[], pageSize: number = 24) {
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // Reset to page 1 when items change
  useEffect(() => {
    setPage(1);
  }, [items.length]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, totalPages, paged, setPage };
}