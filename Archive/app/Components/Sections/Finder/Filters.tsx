import React from "react";

export interface FilterState {
  region: "All" | string;
  isAu: "Any" | "Yes" | "No";
  minExp: number;
  qInput: string;
}

interface FiltersProps {
  regions: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ regions, filters, onFilterChange }: FiltersProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Region</label>
        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          value={filters.region}
          onChange={(e) => onFilterChange({ ...filters, region: e.target.value })}
        >
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium">Australian (citizen/PR)</label>
        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          value={filters.isAu}
          onChange={(e) => onFilterChange({ ...filters, isAu: e.target.value as "Any" | "Yes" | "No" })}
        >
          <option>Any</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium">Min experience (years)</label>
        <input
          type="number"
          min={0}
          step={0.5}
          className="rounded-xl border border-slate-300 px-3 py-2"
          value={filters.minExp}
          onChange={(e) => onFilterChange({ ...filters, minExp: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-medium">Name</label>
        <input
          className="rounded-xl border border-slate-300 px-3 py-2"
          placeholder="e.g. Arshdeep"
          value={filters.qInput}
          onChange={(e) => onFilterChange({ ...filters, qInput: e.target.value })}
        />
      </div>
    </div>
  );
}