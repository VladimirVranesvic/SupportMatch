import { useState, useEffect, useMemo } from "react";
import type { Candidate } from "../Types/api";

export interface FilterState {
  region: "All" | string;
  isAu: "Any" | "Yes" | "No";
  minExp: number;
  qInput: string;
}

export function useWorkerFilters(data: Candidate[]) {
  const [filters, setFilters] = useState<FilterState>({
    region: "All",
    isAu: "Any",
    minExp: 0,
    qInput: "",
  });

  // Debounced query
  const [q, setQ] = useState<string>("");
  useEffect(() => {
    const h = setTimeout(() => setQ(filters.qInput.trim().toLowerCase()), 250);
    return () => clearTimeout(h);
  }, [filters.qInput]);

  // Extract unique regions
  const regions = useMemo(() => {
    const set = new Set<string>();
    for (const c of data) set.add(c.region);
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  // Filter data
  const filtered = useMemo(() => {
    return data.filter((c) => {
      if (filters.region !== "All" && c.region !== filters.region) return false;
      if (filters.isAu !== "Any" && c.is_australian !== (filters.isAu === "Yes")) return false;
      if (c.experience_years < filters.minExp) return false;
      if (q && !c.name_lc.includes(q)) return false;
      return true;
    });
  }, [data, filters.region, filters.isAu, filters.minExp, q]);

  return { filtered, regions, filters, setFilters };
}