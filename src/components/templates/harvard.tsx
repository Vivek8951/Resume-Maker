import React from "react";
import { ResumeData } from "@/lib/types";

export function HarvardTemplate({ data }: { data: ResumeData }) {
  if (!data) return null;
  
  return (
    <div className="w-full min-h-full bg-white p-[20px] font-sans text-[10pt] leading-snug text-slate-700">
      {/* Header */}
      <header className="flex justify-between items-end pb-1.5 border-b border-slate-300 mb-2.5">
        <div>
          <h1 className="text-3xl font-bold text-black border-b-4 border-blue-600 inline-block pb-1">
            {data.personal.name}
          </h1>
        </div>
        <div className="text-right text-[10pt] text-slate-500 flex flex-col">
          {data.personal.email && (
            <a href={`mailto:${data.personal.email}`} className="hover:underline text-blue-600">
              {data.personal.email}
            </a>
          )}
          {data.personal.phone && (
            <a href={`tel:${data.personal.phone}`} className="hover:underline text-blue-600">
              {data.personal.phone}
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.personal.summary && (
        <section className="flex mb-2.5 break-inside-avoid">
          <div className="w-1/4 shrink-0 pr-4">
            <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
              Summary
            </h2>
          </div>
          <div className="w-3/4">
            <p className="text-slate-600 whitespace-pre-wrap">
              {data.personal.summary}
            </p>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-2.5">
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="flex">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Education
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1">
              {data.education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">
                    {edu.degree}
                    {edu.certificateUrl && (
                      <a href={edu.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[9pt] font-normal ml-2 print:text-blue-600">
                        [Certificate]
                      </a>
                    )}
                  </h3>
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
          <section className="flex">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Work Experience
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1.5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">
                    {exp.title}
                    {exp.certificateUrl && (
                      <a href={exp.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[9pt] font-normal ml-2 print:text-blue-600">
                        [Certificate]
                      </a>
                    )}
                  </h3>
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
          <section className="flex">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Trainings/Courses
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1">
              {data.trainings.map((trn) => (
                <div key={trn.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">
                    {trn.title}
                    {trn.certificateUrl && (
                      <a href={trn.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[9pt] font-normal ml-2 print:text-blue-600">
                        [Certificate]
                      </a>
                    )}
                  </h3>
                  <div className="text-slate-600">{trn.company}</div>
                  {trn.location && <div className="text-slate-600">{trn.location}</div>}
                  <div className="text-slate-500">{trn.date}</div>
                  {trn.description && (
                    <p className="text-slate-600 mt-1 whitespace-pre-wrap">{trn.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="flex">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Projects
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1.5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">{proj.title}</h3>
                  <div className="text-slate-500 mb-1">{proj.date}</div>
                  <p className="text-slate-600 mb-1 whitespace-pre-wrap">
                    {proj.description}
                  </p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
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
          <section className="flex">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Skills
              </h2>
            </div>
            <div className="w-3/4 grid grid-cols-2 gap-y-0.5 gap-x-8">
              {data.skills.map((skill) => (
                <div key={skill.id} className="font-bold text-black">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="flex break-inside-avoid">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Certifications
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black text-[11pt]">
                    {cert.name}
                  </h3>
                  <div className="text-slate-600 font-medium">{cert.issuer}</div>
                  {cert.summary && (
                    <p className="text-slate-600 mt-0.5 whitespace-pre-wrap">{cert.summary}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Samples */}
        {(data.personal.github || data.personal.linkedin) && (
          <section className="flex break-inside-avoid">
            <div className="w-1/4 shrink-0 pr-4">
              <h2 className="text-[10pt] text-slate-400 font-medium tracking-wider uppercase">
                Work Samples
              </h2>
            </div>
            <div className="w-3/4 flex flex-col gap-1.5">
              {data.personal.github && (
                <div>
                  <h3 className="font-bold text-black text-[11pt]">GitHub profile</h3>
                  <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                    {data.personal.github}
                  </a>
                </div>
              )}
              {data.personal.linkedin && (
                <div>
                  <h3 className="font-bold text-black text-[11pt]">LinkedIn profile</h3>
                  <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                    {data.personal.linkedin}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
