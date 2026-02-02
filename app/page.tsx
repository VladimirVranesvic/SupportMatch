"use client";

import React from "react";
import Hero from "./Components/Sections/Hero";
import Features from "./Components/Sections/Features";
import HowItWorks from "./Components/Sections/HowItWorks";
import Coordinators from "./Components/Sections/Coordinators";
import WorkersGrid from "./Components/Sections/WorkersGrid";
import Testimonials from "./Components/Sections/Testimonials";
import FAQ from "./Components/Sections/FAQ";
import ContactForm from "./Components/Sections/ContactForm";
import Footer from "./Components/Sections/Footer";
import { useRequestForm } from "./hooks/useRequestForm";

export default function SupportMatchSite() {
  const { form, sending, error, submitted, onChange, onSubmit } = useRequestForm();

  return (
    <div className="min-h-screen scroll-smooth bg-white text-slate-900">
      <Hero
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        sending={sending}
        submitted={submitted}
        error={error}
      />
      <Features />
      <HowItWorks />
      <Coordinators />
      <WorkersGrid />
      <Testimonials />
      <FAQ />
      <ContactForm 
        form={form} 
        onChange={onChange} 
        onSubmit={onSubmit} 
        sending={sending}
        error={error}
      />
      <Footer />
    </div>
  );
}