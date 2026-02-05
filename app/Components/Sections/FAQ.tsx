//Imports
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import { FAQS } from "../../data";

//Exporting the FAQ component
export default function FAQ() {
  return ( //must return 
    //how the section is styled - visually (layout, spacing, colors) and semantically (meaning/structure for browsers, screen readers, and search engines).
    // sets the id of the component (can be called later/page anchors) and apply the layout of the container.
    //py-16 sm:py-24 - padding on y-axis (top/bottom) - mobile: 64px, desktop: 96px, how padding the section gets.
    <section id="faq" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24"> 
      <Container className="px-4 sm:px-6 lg:px-8">
      {/*lg - breakpoint for larger than specific screen size (1024px),
      grid container - single grid for smaller than lg, 3 columns for larger,
      minmax(180px,380px)_min(100%,48rem)_minmax(180px,380px)] - column sizes, rem is relative.
      along with spacing between columns when lg.
      */}
        <div
          className="
            grid grid-cols-1 items-start gap-8 
            lg:grid-cols-[minmax(180px,380px)_min(100%,48rem)_minmax(180px,380px)] 
            lg:items-center lg:gap-10 xl:gap-16 
          "
        >
  
          {/* LEFT IMAGE 
          only applies if lg, vertically centered, horizontally aligned to the right but changed to center*/}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <Image
              src="/Images/Image-2.png"
              alt="Decorative illustration"
              width={420}
              height={320}
              className="
                w-full max-w-[380px] h-auto 
                object-contain 
                drop-shadow-xl
              "
              priority={false}
            />
          </div>

          {/* CENTER – FAQ CONTENT */}
          <div className="flex min-w-0 flex-col gap-6 lg:min-w-[min(100%,48rem)]">
            <SectionTitle
              eyebrow="Help centre"
              title={
                <>
                  Frequently asked <GradientText>questions</GradientText>
                </>
              }
              center
            />
            <div className="mx-auto w-full max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:flex lg:items-center lg:justify-start">
            <Image
              src="/Images/Image-1.png"
              alt="Decorative illustration"
              width={420}
              height={320}
              className="
                w-full max-w-[380px] h-auto 
                object-contain 
                drop-shadow-xl
              "
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}