import React from "react";
import { ResumeData } from "@/lib/types";

export function HarvardTemplate({ data }: { data: ResumeData }) {
  if (!data) return null;
  
  return (
    <div className="w-full min-h-full bg-white p-[30px] font-sans text-[10pt] leading-snug text-slate-700">
      {/* Header */}
      <header className="flex justify-between items-end pb-3 border-b border-slate-300 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-black border-b-4 border-blue-600 inline-block pb-1">
            {data.personal.name}
          </h1>
        </div>
        <div className="text-right text-[10pt] text-slate-500 flex flex-col">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="flex mb-4">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Education
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">{edu.degree}</h3>
                  <div className="text-slate-600">{edu.school}</div>
                  {edu.board && <div className="text-slate-600">{edu.board}</div>}
                  <div className="text-slate-500">{edu.date}</div>
                  {edu.marks && <div className="text-slate-600">{edu.marks}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="flex mb-4">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Work Experience
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">{exp.title}</h3>
                  <div className="text-slate-600">{exp.company}</div>
                  {exp.location && <div className="text-slate-600">{exp.location}</div>}
                  <div className="text-slate-500">{exp.date}</div>
                  {exp.description && (
                    <p className="text-slate-600 mt-1 whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trainings/Courses */}
        {data.trainings && data.trainings.length > 0 && (
          <section className="flex mb-4">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Trainings/Courses
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-2">
              {data.trainings.map((trn) => (
                <div key={trn.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">{trn.title}</h3>
                  <div className="text-slate-600">{trn.company}</div>
                  {trn.location && <div className="text-slate-600">{trn.location}</div>}
                  <div className="text-slate-500">{trn.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="flex mb-4">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Projects
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">{proj.title}</h3>
                  <div className="text-slate-500 mb-1">{proj.date}</div>
                  <p className="text-slate-600 mb-1 whitespace-pre-wrap">
                    {proj.description}
                  </p>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 hover:underline break-all">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="flex mb-4">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Skills
              </h2>
            </div>
            <div className="w-3/4 grid grid-cols-2 gap-y-1 gap-x-8">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="font-bold text-black">{skill.name}</div>
                  <div className="text-slate-500">{skill.level}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Samples */}
        {data.personal.github && (
          <section className="flex mb-4 break-inside-avoid">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Work Samples
              </h2>
            </div>
            <div className="w-3/4">
              <h3 className="font-bold text-black text-[11pt]">GitHub profile</h3>
              <a href={data.personal.github} className="text-blue-600 hover:underline break-all">
                {data.personal.github}
              </a>
            </div>
          </section>
        )}

        {/* Additional Details */}
        {data.personal.summary && (
          <section className="flex break-inside-avoid">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Additional Details
              </h2>
            </div>
            <div className="w-3/4">
              <p className="text-slate-600 whitespace-pre-wrap">
                {data.personal.summary}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
