import React from "react";
import { Phone } from "lucide-react";
import Container from "../UI/Container";
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
}

interface ContactFormProps {
  form: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  sending: boolean;
}

export default function ContactForm({ form, onChange, onSubmit, sending }: ContactFormProps) {
  return (
    <section id="request" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.18),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.18),transparent_40%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to find a great match?</h3>
          <p className="mt-3 text-slate-600">Post a request or book a 10-minute walkthrough. No obligations.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid gap-1">
              <label htmlFor="name2" className="text-sm font-medium">Your name</label>
              <input
                id="name2"
                name="name"
                onChange={onChange}
                value={form.name}
                required
                className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="email2" className="text-sm font-medium">Email</label>
              <input
                id="email2"
                name="email"
                type="email"
                onChange={onChange}
                value={form.email}
                required
                className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1">
                <label htmlFor="company2" className="text-sm font-medium">Company (optional)</label>
                <input
                  id="company2"
                  name="company"
                  onChange={onChange}
                  value={form.company}
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="location2" className="text-sm font-medium">Location</label>
                <input
                  id="location2"
                  name="location"
                  onChange={onChange}
                  value={form.location}
                  placeholder="Suburb, State"
                  required
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1">
                <label htmlFor="role2" className="text-sm font-medium">I am a&hellip;</label>
                <select
                  id="role2"
                  name="role"
                  onChange={onChange}
                  value={form.role}
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                >
                  <option>Support Coordinator</option>
                  <option>Participant / Family</option>
                  <option>Support Worker</option>
                </select>
              </div>
              <div className="grid gap-1">
                <label htmlFor="phone" className="text-sm font-medium">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="1300 543 123"
                  onChange={onChange}
                  value={form.phone}
                  className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-1">
              <label htmlFor="needs2" className="text-sm font-medium">Supports needed</label>
              <textarea
                id="needs2"
                name="needs"
                rows={5}
                onChange={onChange}
                value={form.needs}
                placeholder="Tell us about duties, preferences, days/times, and any important notes."
                className="rounded-xl border border-slate-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <SubmitButton className="!px-6 !py-3">{sending ? "Sending..." : "Send request"}</SubmitButton>
              <GhostButton href="tel:1300543123" icon={Phone}>Call 1300 543 123</GhostButton>
            </div>
            <p className="text-xs text-slate-500">
              By contacting us you consent to communications about your enquiry. We follow the NDIS Price Guide and your privacy matters to us.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}