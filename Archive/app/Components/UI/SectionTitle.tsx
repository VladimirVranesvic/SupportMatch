import React from "react";

//Defining props
interface SectionTitleProps {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    center?: boolean;
  }

//Main section title component
const SectionTitle = ({ eyebrow, title, subtitle, center = false }: SectionTitleProps) => (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-pink-300/40 bg-pink-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700">
          {eyebrow}
        </div>
      )}
      <h2 className={`text-3xl font-bold text-slate-900 sm:text-4xl ${center ? "mx-auto max-w-3xl" : ""}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-slate-600 ${center ? "mx-auto max-w-3xl" : ""}`}>{subtitle}</p>
      )}
    </div>
  );

//Makes available for other files to use. 
export default SectionTitle;