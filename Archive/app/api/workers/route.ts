import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import Papa from "papaparse";
import type { WorkersCSVRow, WorkersResponse, WorkersErrorResponse } from "../../Types/api";
import { cleanRegion, parseBoolean, parseNumber } from "../utils/workers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CSV_FILE_PATH = "support_workers_clean.csv";

function transformCSVRow(row: WorkersCSVRow, id: number): WorkersResponse | null {
  const name = (row.name ?? "").trim();
  const region = cleanRegion(row.region);

  // Skip rows without valid region
  if (!region) return null;

  return {
    id: String(id),
    name,
    region,
    is_australian: parseBoolean(row.is_australian),
    experience_years: parseNumber(row.experience_years),
    qualification: row.qualification ?? "",
    previous_role: row.previous_role ?? "",
    previous_work_place: row.previous_work_place ?? "",
    name_lc: name.toLowerCase(),
  };
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", CSV_FILE_PATH);

    // Read CSV file
    const csv = await fs.readFile(filePath, "utf8");

    // Parse CSV
    const parsed = Papa.parse<WorkersCSVRow>(csv, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(), // Remove BOM
    });

    // Transform rows
    let id = 0;
    const workers: WorkersResponse[] = parsed.data
      .map((row) => {
        id++;
        return transformCSVRow(row, id);
      })
      .filter((worker): worker is WorkersResponse => worker !== null);

    // Sort by experience (highest first)
    workers.sort((a, b) => b.experience_years - a.experience_years);

    return NextResponse.json(workers, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load workers";
    console.error("[/api/workers] error:", err);
    return NextResponse.json(
      { error: message } as WorkersErrorResponse,
      { status: 500 }
    );
  }
}