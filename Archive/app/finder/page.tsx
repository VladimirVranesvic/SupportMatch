"use client";

import React from "react";
import Container from "../Components/UI/Container";
import Filters from "../Components/Sections/Finder/Filters";
import WorkersCard from "../Components/Sections/Finder/WorkersCard";
import Pagination from "../Components/Sections/Finder/Pagination";
import ResultsCount from "../Components/Sections/Finder/ResultsCount";
import { useWorkers } from "../hooks/useWorkers";
import { useWorkerFilters } from "../hooks/useWorkerFilters";
import { usePagination } from "../hooks/usePagination";

export default function FinderPage() {
  const { data, loading, error } = useWorkers();
  const { filtered, regions, filters, setFilters } = useWorkerFilters(data);
  const { page, totalPages, paged, setPage } = usePagination(filtered, 24);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Find your perfect support worker
        </h1>

        {loading && <p className="mt-4 text-slate-600">Loading candidates…</p>}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <>
            <Filters 
              regions={regions}
              filters={filters}
              onFilterChange={setFilters}
            />
            <ResultsCount count={filtered.length} />
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((worker) => (
                <WorkersCard key={worker.id} worker={worker} />
              ))}
            </div>
            <Pagination 
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </Container>
    </main>
  );
}