import React from "react";
import { MapPin } from "lucide-react";
import Tag from "../../UI/Tag";
import PrimaryButton from "../../UI/PrimaryButton";
import type { Candidate } from "../../../Types/api";

interface WorkersCardProps {
  worker: Candidate;
}

export default function WorkersCard({ worker }: WorkersCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{worker.name}</h3>
          <p className="text-sm text-slate-900">{worker.previous_role || "—"}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900">
            {worker.experience_years}y exp
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            worker.tier === 1 ? 'bg-green-100 text-green-700' :
            worker.tier === 2 ? 'bg-blue-100 text-blue-700' :
            worker.tier === 3 ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            Tier {worker.tier}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-slate-900">
        <MapPin className="h-4 w-4" /> {worker.region}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Tag>{worker.is_australian ? "Australian" : "Non-Australian"}</Tag>
        {worker.previous_work_place && <Tag>{worker.previous_work_place}</Tag>}
      </div>
      {worker.qualification && (
        <div className="mt-3 text-sm text-slate-900">
          <span className="font-semibold">Qualification:</span> {worker.qualification}
        </div>
      )}
      <div className="mt-5 flex gap-3">
        <PrimaryButton className="!px-4 !py-2 text-sm" href="/#request">
          Request intro
        </PrimaryButton>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Save
        </button>
      </div>
    </div>
  );
}