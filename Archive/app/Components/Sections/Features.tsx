import React from "react";
import { motion } from "framer-motion";
import Container from "../UI/Container";
import SectionTitle from "../UI/SectionTitle";
import GradientText from "../UI/GradientText";
import { FEATURES } from "../../data";

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Capabilities"
          title={
            <>
              Everything you need to <GradientText>match with confidence</GradientText>
            </>
          }
          subtitle="Flexible matching across preferences, compliance tracking, and human support when you need it."
          center
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-pink-600/10 p-3 text-pink-600 group-hover:bg-pink-600/20">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}