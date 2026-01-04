import React from "react";
import Link from "next/link";
import { Star, MapPin, Languages } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import GhostButton from "../UI/GhostButton";
import Tag from "../UI/Tag";
import { WORKERS } from "../../data";

export default function WorkersGrid() {
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKERS.map((w) => (
            <div key={w.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{w.name}</h3>
                  <p className="text-sm text-slate-600">{w.role}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">{w.rating}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                {w.location}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <Languages className="h-4 w-4" /> {w.languages.join(", ")}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {w.skills.map((s) => (
                  <span key={s} className="rounded-xl border border-slate-200 px-3 py-1 text-xs">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <PrimaryButton className="!px-4 !py-2 text-sm" href="#request">
                  Request intro
                </PrimaryButton>
                <GhostButton className="!px-4 !py-2 text-sm" href="#">
                  Save
                </GhostButton>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}