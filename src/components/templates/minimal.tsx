import React from "react";
import { ResumeData } from "@/lib/types";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  if (!data) return null;

  return (
    <div className="w-full min-h-full bg-white p-[20px] font-sans text-[10pt] leading-snug text-gray-800">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-medium">
          {data.personal.email && (
            <a href={`mailto:${data.personal.email}`} className="hover:underline text-blue-500">
              {data.personal.email}
            </a>
          )}
          {data.personal.phone && (
            <a href={`tel:${data.personal.phone}`} className="hover:underline text-blue-500">
              {data.personal.phone}
            </a>
          )}
        </div>
        {data.personal.summary && (
          <p className="mt-2.5 text-gray-600 leading-relaxed text-sm">
            {data.personal.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Experience
          </h2>
          <div className="flex flex-col gap-2.5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {exp.title}
                    {exp.certificateUrl && (
                      <a href={exp.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs font-normal ml-2 print:text-blue-500">
                        [Certificate]
                      </a>
                    )}
                  </h3>
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
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Education
          </h2>
          <div className="flex flex-col gap-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {edu.degree}
                    {edu.certificateUrl && (
                      <a href={edu.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs font-normal ml-2 print:text-blue-500">
                        [Certificate]
                      </a>
                    )}
                  </h3>
                  <div className="text-sm text-gray-600">{edu.school} {edu.board && `• ${edu.board}`}</div>
                  {edu.marks && <div className="text-sm text-gray-500 mt-1">{edu.marks}</div>}
                </div>
                <span className="text-sm text-gray-500">{edu.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trainings/Courses */}
      {data.trainings && data.trainings.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Trainings & Certifications
          </h2>
          <div className="flex flex-col gap-2">
            {data.trainings.map((trn) => (
              <div key={trn.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {trn.title}
                    {trn.certificateUrl && (
                      <a href={trn.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs font-normal ml-2 print:text-blue-500">
                        [Certificate]
                      </a>
                    )}
                  </h3>
                  <span className="text-sm text-gray-500">{trn.date}</span>
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {trn.company} {trn.location && `• ${trn.location}`}
                </div>
                {trn.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{trn.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Selected Projects
          </h2>
          <div className="flex flex-col gap-2">
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
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{proj.link}</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Certifications
          </h2>
          <div className="flex flex-col gap-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {cert.name}
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">{cert.issuer}</span>
                </div>
                {cert.summary && (
                  <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{cert.summary}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Samples */}
      {(data.personal.github || data.personal.linkedin) && (
        <section className="mb-4 break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-1 mb-2">
            Work Samples
          </h2>
          <div className="flex flex-col gap-2">
            {data.personal.github && (
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">GitHub profile</h3>
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline break-all">
                  {data.personal.github}
                </a>
              </div>
            )}
            {data.personal.linkedin && (
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">LinkedIn profile</h3>
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline break-all">
                  {data.personal.linkedin}
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
