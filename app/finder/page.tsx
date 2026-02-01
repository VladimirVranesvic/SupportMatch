"use client";

import React from "react";
import Container from "../UI/Container";
import GradientText from "../UI/GradientText";
import Filters from "../Sections/Finder/Filters";
import WorkersCard from "../Sections/Finder/WorkersCard";
import Pagination from "../Sections/Finder/Pagination";
import ResultsCount from "../Sections/Finder/ResultsCount";
import { useWorkers } from "../../hooks/useWorkers";
import { useWorkerFilters } from "../../hooks/useWorkerFilters";
import { usePagination } from "../../hooks/usePagination";

export default function FinderPage() {
  const { data, loading, error } = useWorkers();
  const { filtered, regions, filters, setFilters } = useWorkerFilters(data);
  const { page, totalPages, paged, setPage } = usePagination(filtered, 24);

  return (
    <main className="relative min-h-screen bg-white py-16 sm:py-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.18),transparent_40%)]" />
      <Container className="relative">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Find your perfect <GradientText>support worker</GradientText>
        </h1>
        <p className="mt-3 text-slate-900">
          Browse and filter through our vetted support workers to find the perfect match.
        </p>

        {loading && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl text-center">
            <p className="text-slate-900">Loading candidates…</p>
          </div>
        )}
        {error && (
          <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <Filters 
              regions={regions}
              filters={filters}
              onFilterChange={setFilters}
            />
            <ResultsCount count={filtered.length} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((worker) => (
                <WorkersCard key={worker.id} worker={worker} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination 
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </Container>
    </main>
  );
}