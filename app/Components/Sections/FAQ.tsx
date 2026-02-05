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
  return (
<section
  id="faq"
  className="
    relative
    border-t border-slate-200
    bg-slate-50
    py-16 sm:py-16
    overflow-visible           // ← changed: allow images to extend outside if needed
  "
>
  {/* Decorative images container */}
  <div className="absolute inset-0 pointer-events-none hidden lg:block">
    {/* Left image */}
    <div className="absolute inset-y-0 left-0 w-[40%] max-w-[500px]">
      <Image
        src="/Images/Image-2.png"
        alt=""
        fill
        className="
          object-contain
          object-bottom
          drop-shadow-2xl
        "
        sizes="(min-width: 1024px) 40vw, 0px"
        priority={false}
      />
    </div>

    {/* Right image */}
    <div className="absolute inset-y-0 right-0 w-[40%] max-w-[410px]">
      <Image
        src="/Images/Image-1.png"
        alt=""
        fill
        className="
          object-contain
          object-bottom
          drop-shadow-2xl
        "
        sizes="(min-width: 1024px) 40vw, 0px"
        priority={false}
      />
    </div>
  </div>

  {/* Main content – make sure it's above images */}
  <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
    <div
      className="
        grid grid-cols-1 items-start gap-8 
        lg:grid-cols-[minmax(180px,380px)_min(100%,42rem)_minmax(180px,380px)] 
        lg:items-center lg:gap-10 xl:gap-16 
      "
    >
      <div className="col-span-1 lg:col-start-2 lg:col-end-3 flex min-w-0 flex-col gap-6 lg:min-w-[min(100%,42rem)]">
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
    </div>
  </Container>
</section>
  );
}