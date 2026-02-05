import React from "react";
import { Check, MapPin } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import Tag from "../UI/Tag";
import Image from "next/image";

export default function Coordinators() {
  return (
    <section id="coordinators" className="relative py-10 sm:py-13">
        {/* Decorative image - absolute positioned, independent of grid */}
        <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
          <div className="absolute bottom-0 right-0 w-[50%] max-w-[650px]">
            <Image
              src="/Images/Image-3.png"
              alt=""
              width={600}
              height={500}
              className="object-contain object-right-bottom w-full h-auto"
            />
          </div>
        </div>

      <Container>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* LEFT COLUMN - Title + Sample Profile */}
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
          
          {/* Sample profile moved here */}
          <div className="relative mt-8">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-pink-200/60 to-purple-200/60 blur-2xl" />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Sample profile</h4>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Hugh P.</h3>
                  <p className="text-sm text-slate-900">Community Access &amp; Mentoring</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900">
                    5y exp
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                    Tier 1
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-900">
                <MapPin className="h-4 w-4" /> Sydney • Inner West
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Tag>Australian</Tag>
                <Tag>Community Services</Tag>
              </div>
              <div className="mt-3 text-sm text-slate-900">
                <span className="font-semibold">Qualification:</span> Certificate IV in Disability
              </div>
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
              <p className="mt-4 text-xs text-slate-500">Profiles are anonymised for privacy until a meet &amp; greet is confirmed.</p>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}