import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import { FAQS } from "../../data";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="relative hidden h-full min-h-[200px] w-full lg:block lg:rounded-2xl">
            <Image
              src="/Images/Image-2.png"
              alt=""
              fill
              className="object-contain object-right"
              sizes="(max-width: 1023px) 100px, 50vw"
            />
          </div>

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

          <div className="relative hidden h-full min-h-[200px] w-full lg:block lg:rounded-2xl">
            <Image
              src="/Images/Image-1.png"
              alt=""
              fill
              className="object-contain object-left"
              sizes="(max-width: 1023px) 0px, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}