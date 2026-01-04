import React from "react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Support Match found us a worker who shares our son&apos;s love of gaming and basketball. Rapport was instant.",
      name: "Rebecca V.",
      role: "Parent, Brisbane",
    },
    {
      quote:
        "The profiles are clear and compliance is easy to verify. Placements are faster and more reliable.",
      name: "Monique P.",
      role: "Support Coordinator, Sydney",
    },
    {
      quote:
        "Great experience. Transparent rates and an easy meet-and-greet process.",
      name: "Harri S.",
      role: "Participant, Melbourne",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title={
            <>
              Coordinators &amp; families <GradientText>love the fit</GradientText>
            </>
          }
          subtitle="Real feedback from real placements."
          center
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 text-sm font-semibold">{t.name}</div>
              <div className="text-sm text-slate-500">{t.role}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}