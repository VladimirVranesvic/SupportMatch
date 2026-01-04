import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Tag from "../../UI/Tag";
import type { Candidate } from "../../../Types/api";

interface WorkersCardProps {
  worker: Candidate;
}

export default function WorkersCard({ worker }: WorkersCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{worker.name}</h3>
          <p className="text-sm text-slate-600">{worker.previous_role || "—"}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {worker.experience_years}y exp
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
        <MapPin className="h-4 w-4" /> {worker.region}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <Tag>{worker.is_australian ? "Australian" : "Non-Australian"}</Tag>
        {worker.previous_work_place && <Tag>{worker.previous_work_place}</Tag>}
      </div>
      {worker.qualification && (
        <p className="mt-3 text-sm text-slate-700">
          <span className="font-semibold">Qualification:</span> {worker.qualification}
        </p>
      )}
      <div className="mt-4 flex gap-3">
        <Link
          href="/#request"
          className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Request intro
        </Link>
        <button
          type="button"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}