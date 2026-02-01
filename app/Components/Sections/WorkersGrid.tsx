"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import Tag from "../UI/Tag";
import { useWorkers } from "../../hooks/useWorkers";

export default function WorkersGrid() {
  const { data, loading } = useWorkers();
  
  // Get top 3 workers (Tier 1, highest experience)
  const featuredWorkers = data.slice(0, 3);

  return (
    <section id="workers" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Discover talent"
          title={
            <>
              Meet some of our <GradientText>support workers</GradientText>
            </>
          }
          subtitle="We highlight interests and lived experience so participants can connect on day one."
          center
        />
        <div className="mb-6 flex justify-center">
          <Link
            href="/finder"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-110"
          >
            Find your perfect support worker
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-900">Loading workers...</p>
          </div>
        ) : featuredWorkers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-900">No workers available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{worker.name}</h3>
                    <p className="text-sm text-slate-900">{worker.previous_role || "—"}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900">
                      {worker.experience_years}y exp
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        worker.tier === 1
                          ? "bg-green-100 text-green-700"
                          : worker.tier === 2
                          ? "bg-blue-100 text-blue-700"
                          : worker.tier === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
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
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}