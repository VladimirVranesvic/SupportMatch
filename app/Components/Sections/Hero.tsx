import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <section id="top" className="relative overflow-hidden min-h-[90vh] md:min-h-[100vh]">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.25),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.25),transparent_40%)]" />

      {/* Decorative image container – positioned independently */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
        <div className="absolute bottom-0 left-0 w-[80%] max-w-[900px] lg:w-[70%] lg:max-w-[680px]">
          <Image
            src="/Images/Image-4.png"
            alt=""
            width={1100}
            height={800}
            className="object-contain object-bottom drop-shadow-2xl opacity-90"
            priority={true}
          />
        </div>
      </div>

      {/* Main content – raised layer */}
      <Container className="relative z-10 grid grid-cols-1 items-start gap-12 pt-12 md:pt-20 lg:pt-24 pb-16 md:grid-cols-2 md:gap-16 lg:gap-24">
        {/* Left column – intro text, moved up */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Find the right <GradientText>NDIS support worker</GradientText> — fast.
          </motion.h1>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <PrimaryButton>Post a request</PrimaryButton>
            <Link
              href="/#request"
              className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900 hover:text-slate-700"
            >
              Book a quick demo <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Right column – quick request form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-lg md:p-8 lg:p-10"
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