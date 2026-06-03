import React from "react";
import { ResumeData } from "@/lib/types";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  if (!data) return null;

  return (
    <div className="w-full min-h-full bg-white p-[40px] font-sans text-[10pt] leading-snug text-gray-800">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <div className="flex gap-4 text-sm text-gray-500 font-medium">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.github && <span>{data.personal.github}</span>}
        </div>
        {data.personal.summary && (
          <p className="mt-4 text-gray-600 leading-relaxed text-sm">
            {data.personal.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">
            Experience
          </h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.date}</span>
                </div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">
            Education
          </h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school} {edu.board && `• ${edu.board}`}</div>
                  {edu.marks && <div className="text-sm text-gray-500 mt-1">{edu.marks}</div>}
                </div>
                <span className="text-sm text-gray-500">{edu.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">
            Selected Projects
          </h2>
          <div className="flex flex-col gap-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {proj.title}
                  </h3>
                  <span className="text-sm text-gray-500">{proj.date}</span>
                </div>
                {proj.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap mb-1">{proj.description}</p>
                )}
                {proj.link && (
                  <a href={proj.link} className="text-sm text-blue-500 hover:underline">{proj.link}</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                {skill.name} {skill.level && <span className="opacity-50">· {skill.level}</span>}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
