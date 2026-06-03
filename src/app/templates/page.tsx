"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Templates() {
  const templates = [
    {
      id: "harvard",
      name: "Harvard Professional",
      description: "Clean, ATS-friendly, academic-style resume. Perfect for traditional industries.",
      tags: ["Featured", "ATS-Friendly", "Professional"],
      featured: true,
      popular: true,
    },
    {
      id: "minimal",
      name: "Minimal Modern",
      description: "Sleek and typography-focused. Great for tech and design roles.",
      tags: ["Modern", "Creative"],
    },
    {
      id: "executive",
      name: "Executive Dark",
      description: "A bold, dark-themed resume for leadership positions.",
      tags: ["Leadership", "Premium"],
    },
    {
      id: "tech",
      name: "Two-column Tech",
      description: "Maximize space with a clean two-column layout.",
      tags: ["Tech", "Compact"],
    },
    {
      id: "creative",
      name: "Elegant Creative",
      description: "Stand out with subtle colors and unique typography.",
      tags: ["Creative", "Design"],
    },
    {
      id: "startup",
      name: "Startup Modern",
      description: "Vibrant and dynamic. Ideal for fast-paced startup roles.",
      tags: ["Startup", "Modern"],
    }
  ];

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6">
          Job-winning Resume Templates
        </h1>
        <p className="text-lg text-slate-600">
          Choose from our selection of premium, ATS-optimized templates. Every template is highly customizable and guaranteed to pass Applicant Tracking Systems.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <Button variant="default" className="rounded-full">All Templates</Button>
        <Button variant="outline" className="rounded-full bg-white">ATS-Friendly</Button>
        <Button variant="outline" className="rounded-full bg-white">Professional</Button>
        <Button variant="outline" className="rounded-full bg-white">Creative</Button>
        <Button variant="outline" className="rounded-full bg-white">Tech</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {templates.map((template) => (
          <Card key={template.id} className={`overflow-hidden border-2 transition-all hover:shadow-xl group ${template.featured ? 'border-primary/50' : 'border-slate-100 hover:border-slate-200'}`}>
            <div className="aspect-[1/1.4] bg-slate-100 relative p-4 flex items-center justify-center overflow-hidden">
              {template.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary hover:bg-primary text-white border-0 shadow-sm gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </Badge>
                </div>
              )}
              {/* Template Mockup Graphic */}
              <div className="w-[85%] h-[95%] bg-white shadow-md rounded-sm flex flex-col p-4 transform group-hover:scale-105 transition-transform duration-500">
                 {template.id === 'harvard' ? (
                   <div className="opacity-60">
                     <div className="w-32 h-4 bg-slate-800 mx-auto mb-2"></div>
                     <div className="w-48 h-2 bg-slate-400 mx-auto mb-6"></div>
                     <div className="w-full h-px bg-slate-300 mb-2"></div>
                     <div className="w-24 h-3 bg-slate-800 mb-2"></div>
                     <div className="w-full h-2 bg-slate-200 mb-1"></div>
                     <div className="w-full h-2 bg-slate-200 mb-1"></div>
                     <div className="w-3/4 h-2 bg-slate-200 mb-4"></div>
                     <div className="w-full h-px bg-slate-300 mb-2"></div>
                     <div className="w-24 h-3 bg-slate-800 mb-2"></div>
                     <div className="w-full h-2 bg-slate-200 mb-1"></div>
                     <div className="w-full h-2 bg-slate-200 mb-1"></div>
                   </div>
                 ) : (
                   <div className="flex gap-3 h-full opacity-60">
                     <div className="w-1/3 bg-slate-50 h-full p-2 border-r border-slate-100">
                       <div className="w-full h-12 bg-slate-200 rounded-full mb-4"></div>
                       <div className="w-full h-2 bg-slate-300 mb-2"></div>
                       <div className="w-2/3 h-2 bg-slate-300"></div>
                     </div>
                     <div className="w-2/3 p-2 pt-4">
                       <div className="w-full h-4 bg-slate-800 mb-4"></div>
                       <div className="w-full h-2 bg-slate-200 mb-2"></div>
                       <div className="w-full h-2 bg-slate-200 mb-2"></div>
                     </div>
                   </div>
                 )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm gap-3">
                <Link href="/editor" className={buttonVariants({ variant: "default" })}>Use Template</Link>
              </div>
            </div>
            <CardContent className="p-6 bg-white">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-slate-900">{template.name}</h3>
                {template.popular && <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50">Popular</Badge>}
              </div>
              <p className="text-sm text-slate-500 mb-4 h-10">{template.description}</p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="bg-primary/5 rounded-3xl p-10 text-center max-w-4xl mx-auto border border-primary/10">
         <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 mb-4">Ready to land your dream job?</h2>
         <p className="text-slate-600 mb-8 max-w-xl mx-auto">Create a professional, ATS-optimized resume in minutes with our AI-powered platform.</p>
         <Link href="/editor" className={buttonVariants({ size: "lg", className: "rounded-full px-8 shadow-md" })}>Start Building Now</Link>
      </div>
    </main>
  );
}
