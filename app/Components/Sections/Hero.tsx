import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import Container from "../UI/Container";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import GhostButton from "../UI/GhostButton";
import SubmitButton from "../UI/SubmitButton";

interface FormData {
  name: string;
  email: string;
  company: string;
  location: string;
  role: string;
  needs: string;
  phone: string;
  website: string;
}

interface HeroProps {
  form: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  submitted: boolean;
  error: string | null;
}

export default function Hero({ form, onChange, onSubmit, sending, submitted, error }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.25),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.25),transparent_40%)]" />

      <Container className="relative grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Find the right <GradientText>NDIS support worker</GradientText> — fast.
          </motion.h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Support Match connects participants, families and coordinators to vetted workers who match your needs and personality. Post your request, review profiles, and book a free meet & greet.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton>Post a request</PrimaryButton>
            <Link href="/#request" className="inline-flex items-center gap-2 font-semibold text-pink-600 hover:text-pink-700">
              Book a quick demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-pink-600" /> Free meet & greet</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-pink-600" /> NDIS price guide aligned</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-pink-600" /> No lock-in</div>
          </div>
        </div>

        {/* Quick request card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur md:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-pink-600/10 p-2 text-pink-600"><Mail className="h-5 w-5" /></div>
            <h3 className="text-lg font-bold">Quick request</h3>
          </div>
          {!submitted ? (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
              {/* Honeypot field - hidden from users but visible to bots */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div className="grid gap-1">
                <label htmlFor="name" className="text-sm font-medium">Your name</label>
                <input id="name" name="name" onChange={onChange} value={form.name} required className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none" />
              </div>
              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" onChange={onChange} value={form.email} required className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none" />
              </div>
              <div className="grid gap-1">
                <label htmlFor="company" className="text-sm font-medium">Company (optional)</label>
                <input id="company" name="company" onChange={onChange} value={form.company} className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-1">
                  <label htmlFor="location" className="text-sm font-medium">Location</label>
                  <input id="location" name="location" placeholder="e.g. Sydney, NSW" onChange={onChange} value={form.location} required className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none" />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="role" className="text-sm font-medium">I am a…</label>
                  <select id="role" name="role" onChange={onChange} value={form.role} className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none">
                    <option>Support Coordinator</option>
                    <option>Participant / Family</option>
                    <option>Support Worker</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="needs" className="text-sm font-medium">What supports are you looking for?</label>
                <textarea id="needs" name="needs" rows={4} placeholder="e.g. young male worker for weekends; interests in gaming & basketball; has licence & car; sessions Sat/Sun 10am–2pm" onChange={onChange} value={form.needs} className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none" />
              </div>
              <SubmitButton className="justify-center">{sending ? "Sending..." : "Submit request"}</SubmitButton>
              <p className="text-center text-xs text-slate-500">By submitting, you agree to be contacted about your request. No obligations, ever.</p>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-green-500/10 text-green-600">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-semibold">Request received</h4>
              <p className="mt-2 text-slate-600">Thanks {form.name || "there"}! We&apos;ll review your preferences and reach out shortly.</p>
              <div className="mt-4">
                <GhostButton href="tel:1300543123" icon={Phone}>Or call 1300 543 123</GhostButton>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}