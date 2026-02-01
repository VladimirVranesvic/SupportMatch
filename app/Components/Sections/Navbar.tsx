import React from "react";
import { HeartHandshake, Phone } from "lucide-react";
import Container from "../UI/Container";
import GradientText from "../UI/GradientText";
import PrimaryButton from "../UI/PrimaryButton";
import GhostButton from "../UI/GhostButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Support <GradientText>Match</GradientText>
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <a href="#features" className="hover:text-slate-900">Features</a>
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#coordinators" className="hover:text-slate-900">For coordinators</a>
          <a href="#workers" className="hover:text-slate-900">For workers</a>
          <a href="#faq" className="hover:text-slate-900">FAQs</a>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <GhostButton href="tel:1300543123" icon={Phone}>
            1300 543 123
          </GhostButton>
          <PrimaryButton href="#request">Get started</PrimaryButton>
        </div>
      </Container>
    </header>
  );
}