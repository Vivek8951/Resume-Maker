"use client";

import { useState, useRef, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  User, Briefcase, GraduationCap, Code, 
  Settings, Download, Home, FileText, ChevronLeft, LayoutTemplate,
  Plus, Trash2, UploadCloud, Sparkles, Loader2
} from "lucide-react";
import Link from "next/link";
import { HarvardTemplate } from "@/components/templates/harvard";
import { MinimalTemplate } from "@/components/templates/minimal";
import { ResumeData, initialData } from "@/lib/types";
import { useReactToPrint } from "react-to-print";

type Section = "personal" | "education" | "experience" | "trainings" | "projects" | "skills";

export default function Editor() {
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [activeTemplate, setActiveTemplate] = useState<"harvard" | "minimal">("harvard");
  const [data, setData] = useState<ResumeData>(initialData);
  const printRef = useRef<HTMLDivElement>(null);
  const [enhancingFields, setEnhancingFields] = useState<{ [key: string]: boolean }>({});

  const enhanceText = async (
    section: keyof ResumeData | "personal_summary",
    index: number | null,
    field: string,
    currentText: string,
    type: "experience" | "project" | "summary"
  ) => {
    if (!currentText || !currentText.trim()) {
      alert("Please enter some text first to enhance.");
      return;
    }
    
    const key = index !== null ? `${section}_${index}_${field}` : `${section}_${field}`;
    setEnhancingFields(prev => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentText, type }),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        if (index !== null) {
          updateArrayItem(section as keyof ResumeData, index, field, resData.data);
        } else if (section === "personal_summary") {
          updatePersonal("summary", resData.data);
        }
      } else {
        alert(resData.error || "Enhancement failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to enhancement server.");
    } finally {
      setEnhancingFields(prev => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    // Check if there is data imported from the AI analyzer
    const importedDataStr = localStorage.getItem("imported_resume_data");
    if (importedDataStr) {
      try {
        const importedData = JSON.parse(importedDataStr);
        setData(importedData);
        // Clear the data after parsing so it doesn't always override local changes on refresh
        localStorage.removeItem("imported_resume_data");
      } catch (e) {
        console.error("Failed to parse imported resume data");
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.personal.name || 'Resume'}_Resume`,
  });

  const updatePersonal = (field: keyof ResumeData["personal"], value: string) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateArrayItem = (section: keyof ResumeData, index: number, field: string, value: string) => {
    setData(prev => {
      const arr = [...(prev[section] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addArrayItem = (section: keyof ResumeData, defaultItem: any) => {
    setData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), { ...defaultItem, id: Date.now().toString() }]
    }));
  };

  const removeArrayItem = (section: keyof ResumeData, index: number) => {
    setData(prev => {
      const arr = [...(prev[section] as any[])];
      arr.splice(index, 1);
      return { ...prev, [section]: arr };
    });
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* 1. Left Sidebar */}
      <aside className="w-16 md:w-64 bg-white border-r border-slate-200 flex flex-col transition-all shrink-0">
        <div className="h-14 border-b border-slate-100 flex items-center justify-center md:justify-start md:px-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg hidden md:block">ResumeForge</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-2 md:px-3">
          <NavButton icon={<User className="w-5 h-5" />} label="Personal Details" isActive={activeSection === "personal"} onClick={() => setActiveSection("personal")} />
          <NavButton icon={<GraduationCap className="w-5 h-5" />} label="Education" isActive={activeSection === "education"} onClick={() => setActiveSection("education")} />
          <NavButton icon={<Briefcase className="w-5 h-5" />} label="Experience" isActive={activeSection === "experience"} onClick={() => setActiveSection("experience")} />
          <NavButton icon={<FileText className="w-5 h-5" />} label="Trainings" isActive={activeSection === "trainings"} onClick={() => setActiveSection("trainings")} />
          <NavButton icon={<LayoutTemplate className="w-5 h-5" />} label="Projects" isActive={activeSection === "projects"} onClick={() => setActiveSection("projects")} />
          <NavButton icon={<Code className="w-5 h-5" />} label="Skills" isActive={activeSection === "skills"} onClick={() => setActiveSection("skills")} />
        </nav>

        <div className="p-3 border-t border-slate-100 shrink-0 space-y-2">
          <Link href="/analyze" className={buttonVariants({ variant: "outline", className: "w-full justify-start gap-2 hidden md:flex border-primary/20 text-primary hover:bg-primary/5" })}>
             <UploadCloud className="w-4 h-4" /> AI Import
          </Link>
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", className: "w-full justify-start gap-2 hidden md:flex" })}>
             <ChevronLeft className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "icon", className: "w-full md:hidden" })}>
             <Home className="w-5 h-5" />
          </Link>
        </div>
      </aside>

      {/* 2. Center Panel (Editable Form) */}
      <section className="flex-1 flex flex-col min-w-0 bg-slate-50 border-r border-slate-200">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 justify-between">
          <h2 className="font-semibold text-slate-800 capitalize">{activeSection} Information</h2>
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => handlePrint()}>
            <Download className="w-4 h-4 mr-2" /> PDF
          </Button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {activeSection === "personal" && (
              <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={data.personal.name} onChange={e => updatePersonal("name", e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={data.personal.email} onChange={e => updatePersonal("email", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={data.personal.phone} onChange={e => updatePersonal("phone", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>GitHub / Portfolio Link</Label>
                  <Input value={data.personal.github} onChange={e => updatePersonal("github", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Additional Details (Summary)</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      disabled={enhancingFields["personal_summary"]}
                      onClick={() => enhanceText("personal_summary", null, "summary", data.personal.summary, "summary")}
                      className="border-primary/20 text-primary hover:bg-primary/5 gap-1 font-semibold"
                    >
                      {enhancingFields["personal_summary"] ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                      {enhancingFields["personal_summary"] ? "Enhancing..." : "Enhance with AI"}
                    </Button>
                  </div>
                  <Textarea className="h-32" value={data.personal.summary} onChange={e => updatePersonal("summary", e.target.value)} />
                </div>
              </div>
            )}

            {activeSection === "education" && (
              <div className="space-y-6">
                {data.education.map((item, idx) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("education", idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Degree / Certificate</Label>
                        <Input value={item.degree} onChange={e => updateArrayItem("education", idx, "degree", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>School / Institution</Label>
                        <Input value={item.school} onChange={e => updateArrayItem("education", idx, "school", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Board (Optional)</Label>
                        <Input value={item.board} onChange={e => updateArrayItem("education", idx, "board", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <DateRangeSelector
                          label="Education Period"
                          value={item.date}
                          onChange={(val) => updateArrayItem("education", idx, "date", val)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Marks / Percentage / CGPA</Label>
                        <Input value={item.marks} onChange={e => updateArrayItem("education", idx, "marks", e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Certificate / Document Link (Optional)</Label>
                        <Input value={item.certificateUrl || ""} onChange={e => updateArrayItem("education", idx, "certificateUrl", e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => addArrayItem("education", { degree: "", school: "", board: "", date: "", marks: "", certificateUrl: "" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Education
                </Button>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="space-y-6">
                {data.experience.map((item, idx) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("experience", idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input value={item.title} onChange={e => updateArrayItem("experience", idx, "title", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input value={item.company} onChange={e => updateArrayItem("experience", idx, "company", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Location / Type</Label>
                        <Input value={item.location} onChange={e => updateArrayItem("experience", idx, "location", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <DateRangeSelector
                          label="Employment Period"
                          value={item.date}
                          onChange={(val) => updateArrayItem("experience", idx, "date", val)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Certificate / Document Link (Optional)</Label>
                        <Input value={item.certificateUrl || ""} onChange={e => updateArrayItem("experience", idx, "certificateUrl", e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Description</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          disabled={enhancingFields[`experience_${idx}_description`]}
                          onClick={() => enhanceText("experience", idx, "description", item.description, "experience")}
                          className="border-primary/20 text-primary hover:bg-primary/5 gap-1 font-semibold"
                        >
                          {enhancingFields[`experience_${idx}_description`] ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          )}
                          {enhancingFields[`experience_${idx}_description`] ? "Enhancing..." : "Enhance with AI"}
                        </Button>
                      </div>
                      <Textarea className="h-32" value={item.description} onChange={e => updateArrayItem("experience", idx, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => addArrayItem("experience", { title: "", company: "", location: "", date: "", description: "", certificateUrl: "" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </div>
            )}

            {activeSection === "projects" && (
              <div className="space-y-6">
                {data.projects.map((item, idx) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("projects", idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Project Title</Label>
                        <Input value={item.title} onChange={e => updateArrayItem("projects", idx, "title", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <DateRangeSelector
                          label="Project Date"
                          value={item.date}
                          onChange={(val) => updateArrayItem("projects", idx, "date", val)}
                          singleDateOnly={true}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Project Link</Label>
                        <Input value={item.link} onChange={e => updateArrayItem("projects", idx, "link", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Description</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          disabled={enhancingFields[`projects_${idx}_description`]}
                          onClick={() => enhanceText("projects", idx, "description", item.description, "project")}
                          className="border-primary/20 text-primary hover:bg-primary/5 gap-1 font-semibold"
                        >
                          {enhancingFields[`projects_${idx}_description`] ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          )}
                          {enhancingFields[`projects_${idx}_description`] ? "Enhancing..." : "Enhance with AI"}
                        </Button>
                      </div>
                      <Textarea className="h-24" value={item.description} onChange={e => updateArrayItem("projects", idx, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => addArrayItem("projects", { title: "", date: "", description: "", link: "" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </div>
            )}

            {activeSection === "trainings" && (
              <div className="space-y-6">
                {data.trainings.map((item, idx) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeArrayItem("trainings", idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Training Title</Label>
                        <Input value={item.title} onChange={e => updateArrayItem("trainings", idx, "title", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Organization / Company</Label>
                        <Input value={item.company} onChange={e => updateArrayItem("trainings", idx, "company", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={item.location} onChange={e => updateArrayItem("trainings", idx, "location", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <DateRangeSelector
                          label="Training Date / Period"
                          value={item.date}
                          onChange={(val) => updateArrayItem("trainings", idx, "date", val)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Certificate / Credential Link (Optional)</Label>
                        <Input value={item.certificateUrl || ""} onChange={e => updateArrayItem("trainings", idx, "certificateUrl", e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Description (Optional)</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          disabled={enhancingFields[`trainings_${idx}_description`]}
                          onClick={() => enhanceText("trainings", idx, "description", item.description || "", "experience")}
                          className="border-primary/20 text-primary hover:bg-primary/5 gap-1 font-semibold"
                        >
                          {enhancingFields[`trainings_${idx}_description`] ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          )}
                          {enhancingFields[`trainings_${idx}_description`] ? "Enhancing..." : "Enhance with AI"}
                        </Button>
                      </div>
                      <Textarea className="h-24" value={item.description || ""} onChange={e => updateArrayItem("trainings", idx, "description", e.target.value)} placeholder="Describe what you learned, key topics covered, or projects completed..." />
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => addArrayItem("trainings", { title: "", company: "", location: "", date: "", certificateUrl: "", description: "" })}>
                  <Plus className="w-4 h-4 mr-2" /> Add Training
                </Button>
              </div>
            )}

            {activeSection === "skills" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.skills.map((item, idx) => (
                      <div key={item.id} className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs">Skill</Label>
                          <Input value={item.name} onChange={e => updateArrayItem("skills", idx, "name", e.target.value)} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs">Level</Label>
                          <select 
                            value={item.level} 
                            onChange={e => updateArrayItem("skills", idx, "level", e.target.value)}
                            className="w-full h-9 px-3 py-1 rounded-md border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 mb-0.5 shrink-0" onClick={() => removeArrayItem("skills", idx)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline" onClick={() => addArrayItem("skills", { name: "", level: "" })}>
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Right Panel (Live Preview) */}
      <section className="w-[45%] hidden lg:flex flex-col bg-slate-200/50 relative">
        <header className="h-14 bg-slate-100/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 shrink-0 absolute top-0 w-full z-10">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Template:</span>
            <select 
              className="text-sm bg-white border border-slate-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value as any)}
            >
              <option value="harvard">Harvard Professional</option>
              <option value="minimal">Minimal Modern</option>
            </select>
          </div>
          <Button size="sm" className="gap-2 shadow-sm" onClick={() => handlePrint()}>
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </header>
        
        {/* A container that scales to fit the A4 page on smaller screens if needed */}
        <div className="flex-1 overflow-y-auto pt-20 pb-8 px-4 xl:px-8 flex justify-center custom-scrollbar">
          {/* Print container reference */}
          <div 
            ref={printRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-xl shadow-slate-300/50 shrink-0 print:shadow-none print:w-[210mm] print:h-auto origin-top"
          >
             {activeTemplate === "harvard" && <HarvardTemplate data={data} />}
             {activeTemplate === "minimal" && <MinimalTemplate data={data} />}
          </div>
        </div>
      </section>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <div className={isActive ? "text-primary" : "text-slate-500"}>
        {icon}
      </div>
      <span className="hidden md:block truncate">{label}</span>
    </button>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() + 2 - i).toString());

function parseDateRange(dateStr: string) {
  const result = {
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    isPresent: false,
    isRange: true
  };

  if (!dateStr) return result;

  const parts = dateStr.split("-").map(p => p.trim());
  
  const parsePart = (part: string) => {
    if (part.toLowerCase() === "present") {
      return { month: "", year: "", isPresent: true };
    }
    const words = part.split(/\s+/);
    if (words.length >= 2) {
      return { month: words[0], year: words[1], isPresent: false };
    } else if (words.length === 1 && words[0]) {
      if (/^\d{4}$/.test(words[0])) {
        return { month: "", year: words[0], isPresent: false };
      } else {
        return { month: words[0], year: "", isPresent: false };
      }
    }
    return { month: "", year: "", isPresent: false };
  };

  if (parts.length >= 2) {
    const start = parsePart(parts[0]);
    const end = parsePart(parts[1]);
    result.startMonth = start.month;
    result.startYear = start.year;
    result.endMonth = end.month;
    result.endYear = end.year;
    result.isPresent = end.isPresent;
  } else if (parts.length === 1) {
    const single = parsePart(parts[0]);
    result.startMonth = single.month;
    result.startYear = single.year;
    result.isPresent = single.isPresent;
    result.isRange = false;
  }

  return result;
}

function formatDateRange(parsed: {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isPresent: boolean;
  isRange: boolean;
}) {
  const startPart = [parsed.startMonth, parsed.startYear].filter(Boolean).join(" ");
  
  if (!parsed.isRange) {
    return startPart;
  }

  let endPart = "";
  if (parsed.isPresent) {
    endPart = "Present";
  } else {
    endPart = [parsed.endMonth, parsed.endYear].filter(Boolean).join(" ");
  }

  if (startPart && endPart) {
    return `${startPart} - ${endPart}`;
  } else if (startPart) {
    return startPart;
  } else if (endPart) {
    return endPart;
  }
  return "";
}

interface DateRangeSelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  singleDateOnly?: boolean;
}

function DateRangeSelector({ label, value, onChange, singleDateOnly = false }: DateRangeSelectorProps) {
  const parsed = parseDateRange(value);
  
  if (singleDateOnly && parsed.isRange) {
    parsed.isRange = false;
  } else if (!singleDateOnly && !parsed.isRange && parsed.startYear) {
    parsed.isRange = true;
  }

  const updateField = (field: keyof typeof parsed, val: any) => {
    const updated = { ...parsed, [field]: val };
    
    if (field === "isPresent" && val === true) {
      updated.endMonth = "";
      updated.endYear = "";
    }
    
    const formatted = formatDateRange(updated);
    onChange(formatted);
  };

  return (
    <div className="space-y-2 border border-slate-100 rounded-lg p-3 bg-slate-50/50">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {!singleDateOnly && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`present-checkbox-${label}`}
              checked={parsed.isPresent}
              onChange={(e) => updateField("isPresent", e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
            />
            <label htmlFor={`present-checkbox-${label}`} className="text-xs text-slate-500 font-medium cursor-pointer">
              Present / Current
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
            {singleDateOnly ? "Date" : "Start Date"}
          </span>
          <div className="flex gap-2">
            <select
              value={parsed.startMonth}
              onChange={(e) => updateField("startMonth", e.target.value)}
              className="flex-1 h-9 px-2 rounded-md border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Month</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              value={parsed.startYear}
              onChange={(e) => updateField("startYear", e.target.value)}
              className="flex-1 h-9 px-2 rounded-md border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {!singleDateOnly && (
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              End Date
            </span>
            <div className="flex gap-2">
              <select
                disabled={parsed.isPresent}
                value={parsed.endMonth}
                onChange={(e) => updateField("endMonth", e.target.value)}
                className="flex-1 h-9 px-2 rounded-md border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:bg-slate-100"
              >
                <option value="">Month</option>
                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select
                disabled={parsed.isPresent}
                value={parsed.endYear}
                onChange={(e) => updateField("endYear", e.target.value)}
                className="flex-1 h-9 px-2 rounded-md border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:bg-slate-100"
              >
                <option value="">Year</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

