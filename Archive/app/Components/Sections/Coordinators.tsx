import React from "react";
import { Check, Star, MapPin } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import GhostButton from "../UI/GhostButton";
import Tag from "../UI/Tag";

export default function Coordinators() {
  const benefits = [
    "Preference-based matching across interests, skills, and language",
    "View compliance at a glance (WWCC, Screening, First Aid)",
    "Availability &amp; travel radius baked in",
    "Free meet &amp; greet; no lock-ins",
    "We invoice in line with the NDIS Price Guide",
  ];

  const sampleTags = ["Gaming", "Basketball", "Autism Experience", "Homework Support"];

  return (
    <section id="coordinators" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="For Support Coordinators"
              title={
                <>
                  Faster placements, <GradientText>happier participants</GradientText>
                </>
              }
              subtitle="Reduce back-and-forth and place with confidence. Keep families in the loop with clean, shareable profiles."
            />
            <ul className="space-y-3 text-slate-700">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 text-pink-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-pink-200/60 to-purple-200/60 blur-2xl" />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <h4 className="text-lg font-bold">Sample profile</h4>
              <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">Hugh P.</p>
                    <p className="text-sm text-slate-600">Community Access &amp; Mentoring</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <MapPin className="h-3.5 w-3.5" /> Sydney • Inner West
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sampleTags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <PrimaryButton className="!px-4 !py-2 text-sm" href="#request">
                    Request intro
                  </PrimaryButton>
                  <GhostButton className="!px-4 !py-2 text-sm" href="#">
                    View full profile
                  </GhostButton>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">Profiles are anonymised for privacy until a meet &amp; greet is confirmed.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}