import React from "react";

export interface FilterState {
  region: "All" | string;
  isAu: "Any" | "Yes" | "No";
  minExp: number;
  qInput: string;
  tier: "All" | "1" | "2" | "3" | "4";
}

interface FiltersProps {
  regions: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Filters({ regions, filters, onFilterChange }: FiltersProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="grid gap-1">
        <label className="text-sm font-bold text-slate-900 tracking-tight">Region</label>
        <select
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          value={filters.region}
          onChange={(e) => onFilterChange({ ...filters, region: e.target.value })}
        >
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-bold text-slate-900 tracking-tight">Australian (citizen/PR)</label>
        <select
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          value={filters.isAu}
          onChange={(e) => onFilterChange({ ...filters, isAu: e.target.value as "Any" | "Yes" | "No" })}
        >
          <option>Any</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-bold text-slate-900 tracking-tight">Min experience (years)</label>
        <input
          type="number"
          min={0}
          step={0.5}
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          value={filters.minExp}
          onChange={(e) => onFilterChange({ ...filters, minExp: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-bold text-slate-900 tracking-tight">Name</label>
        <input
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          placeholder="e.g. Arshdeep"
          value={filters.qInput}
          onChange={(e) => onFilterChange({ ...filters, qInput: e.target.value })}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm font-bold text-slate-900 tracking-tight">Data Completeness</label>
        <select
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          value={filters.tier}
          onChange={(e) => onFilterChange({ ...filters, tier: e.target.value as "All" | "1" | "2" | "3" | "4" })}
        >
          <option value="All">All tiers</option>
          <option value="1">Tier 1 (Complete)</option>
          <option value="2">Tier 2 (1 field missing)</option>
          <option value="3">Tier 3 (2 fields missing)</option>
          <option value="4">Tier 4 (3+ fields missing)</option>
        </select>
      </div>
    </div>
  );
}