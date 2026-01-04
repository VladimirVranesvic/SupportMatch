import React from "react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";

export default function HowItWorks() {
  const steps = ["Tell us your preferences", "Review curated profiles", "Free meet & greet"];
  const descriptions = [
    "Age range, gender, skills, interests, availability, language, personality and more.",
    "Shortlisted workers include compliance, experience and relevant interests to help rapport.",
    "Only proceed if it feels right. We&apos;ll help set up rosters and ongoing support if you wish.",
  ];

  return (
    <section id="how" className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title={
            <>
              Simple, transparent <GradientText>matching flow</GradientText>
            </>
          }
          subtitle="We mix smart tech with human judgement to get you a great fit—quickly."
          center
        />

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, idx) => (
            <li key={step} className="relative rounded-3xl border border-slate-200 bg-white p-6">
              <div className="absolute -top-3 left-6 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30">
                {idx + 1}
              </div>
              <h4 className="mt-6 text-lg font-bold">{step}</h4>
              <p className="mt-2 text-sm text-slate-600">
                {descriptions[idx]}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}