import React from "react";
import { HeartHandshake, Phone, Mail } from "lucide-react";
import Container from "../UI/Container";
import GradientText from "../UI/GradientText";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-sm">
      <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div className="text-lg font-extrabold">
              Support <GradientText>Match</GradientText>
            </div>
          </div>
          <p className="mt-3 max-w-xs text-slate-600">
            We connect NDIS participants and families with vetted support workers who fit their goals and interests.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Explore</h5>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li><a className="hover:text-slate-900" href="#features">Features</a></li>
            <li><a className="hover:text-slate-900" href="#how">How it works</a></li>
            <li><a className="hover:text-slate-900" href="#coordinators">For coordinators</a></li>
            <li><a className="hover:text-slate-900" href="#workers">For workers</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Company</h5>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li><a className="hover:text-slate-900" href="#faq">FAQs</a></li>
            <li><a className="hover:text-slate-900" href="#request">Contact</a></li>
            <li><a className="hover:text-slate-900" href="#">Privacy</a></li>
            <li><a className="hover:text-slate-900" href="#">Terms</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Get in touch</h5>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 1300 543 123</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> admin@supportmatch.com.au</li>
          </ul>
        </div>
      </Container>
      <Container className="mt-8 border-t border-slate-200 pt-6 text-slate-500">
        <p>© {new Date().getFullYear()} Support Match. Not affiliated with the NDIS. Pricing aligns with the NDIS Price Guide.</p>
      </Container>
    </footer>
  );
}