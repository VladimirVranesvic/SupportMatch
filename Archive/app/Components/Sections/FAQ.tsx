import React from "react";
import { ArrowRight } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import { FAQS } from "../../data";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Help centre"
          title={
            <>
              Frequently asked <GradientText>questions</GradientText>
            </>
          }
          center
        />

        <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group p-6 open:bg-slate-50" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                <span>{f.q}</span>
                <ArrowRight className="h-5 w-5 shrink-0 rotate-90 transition group-open:-rotate-90" />
              </summary>
              <p className="mt-3 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}