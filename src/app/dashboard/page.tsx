"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, BarChart2, CheckCircle, Clock, Download, PenTool, Target, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's an overview of your career tools.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/analyze" className={buttonVariants({ variant: "outline", className: "rounded-full shadow-sm border-primary/20 text-primary hover:bg-primary/5" })}>
            <BarChart2 className="w-4 h-4 mr-2" /> Upload & AI Analyze
          </Link>
          <Link href="/editor" className={buttonVariants({ className: "rounded-full shadow-md" })}>
            <Plus className="w-4 h-4 mr-2" /> Create New
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatsCard icon={<FileText />} title="My Resumes" value="3" trend="+1 this week" />
        <StatsCard icon={<CheckCircle />} title="Avg. ATS Score" value="92%" trend="Excellent" trendColor="text-green-500" />
        <StatsCard icon={<Target />} title="Job Matches" value="14" trend="New matches found" trendColor="text-blue-500" />
        <StatsCard icon={<Download />} title="Downloads" value="28" trend="Last 30 days" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recently Edited */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Recently Edited</h2>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Software Engineer Role", date: "Updated 2 hours ago", score: "95%" },
                { name: "Product Manager App", date: "Updated 2 days ago", score: "88%" },
              ].map((resume, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{resume.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1"><Clock className="w-3 h-3" /> {resume.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-600">ATS Score: <span className="text-green-600">{resume.score}</span></div>
                      <Link href="/editor" className={buttonVariants({ variant: "secondary", size: "sm" })}>Edit</Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* AI Tools */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4">AI Career Tools</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <ToolCard 
                href="/analyze"
                icon={<BarChart2 />} 
                title="AI ATS Analyzer" 
                desc="Upload an existing resume to get it analyzed and imported." 
              />
              <ToolCard 
                href="#"
                icon={<PenTool />} 
                title="Cover Letter Builder" 
                desc="Generate tailored cover letters based on your resume." 
              />
              <ToolCard 
                href="#"
                icon={<BrainCircuit />} 
                title="Interview Prep AI" 
                desc="Practice technical and behavioral questions with real-time AI feedback." 
              />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">Job Match Analyzer</CardTitle>
              <CardDescription className="text-slate-300">Paste a job description to see how well your resume matches.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">Analyze Job</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Analytics</CardTitle>
              <CardDescription>Views and downloads over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 text-slate-400 text-sm">
                <BarChart2 className="w-6 h-6 mr-2 opacity-50" /> Chart Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StatsCard({ icon, title, value, trend, trendColor = "text-slate-500" }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className={`text-xs mt-4 ${trendColor} font-medium`}>{trend}</div>
      </CardContent>
    </Card>
  );
}

function ToolCard({ icon, title, desc, href }: any) {
  const Content = () => (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full">
      <CardContent className="p-6">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}><Content /></Link>;
  }
  return <Content />;
}
