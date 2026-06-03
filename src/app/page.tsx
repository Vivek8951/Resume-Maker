"use client";

import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, FileText, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-24 pb-32">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary/10 blur-3xl rounded-full mix-blend-multiply" />
            <div className="absolute top-0 -right-24 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full mix-blend-multiply" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-primary mb-8">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered Resume Builder 2.0</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                  Build Your ATS-Friendly <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    Resume in Minutes
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Craft a premium, professional resume with our AI assistant. Get hired faster with templates tested by recruiters and optimized for Applicant Tracking Systems.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                  <Link href="/editor" className={buttonVariants({ size: "lg", className: "rounded-full h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all" })}>
                    Create My Resume <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link href="/analyze" className={buttonVariants({ size: "lg", variant: "secondary", className: "rounded-full h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all" })}>
                    Upload & Analyze <Sparkles className="ml-2 w-5 h-5" />
                  </Link>
                  <Link href="/templates" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full h-14 px-8 text-base bg-white" })}>
                    View Templates
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card required</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> 10+ Premium Templates</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-20 relative max-w-5xl mx-auto"
            >
              <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-xl p-2 md:p-4 shadow-2xl">
                <div className="rounded-xl overflow-hidden border border-slate-100 bg-white aspect-[16/9] relative flex items-center justify-center">
                   {/* Fallback mockup since we don't have a real image yet */}
                   <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                      <div className="w-3/4 h-5/6 bg-white shadow-sm border border-slate-200 rounded flex gap-4 p-4">
                        <div className="w-64 border-r border-slate-100 pr-4 flex flex-col gap-3 opacity-50">
                          <div className="h-4 w-24 bg-slate-200 rounded" />
                          <div className="h-8 w-full bg-primary/10 rounded" />
                          <div className="h-8 w-full bg-slate-100 rounded" />
                          <div className="h-8 w-full bg-slate-100 rounded" />
                        </div>
                        <div className="flex-1 flex flex-col gap-6 p-8 opacity-80">
                           <div className="text-center border-b pb-4">
                             <div className="h-8 w-48 bg-slate-800 rounded mx-auto mb-2" />
                             <div className="h-3 w-64 bg-slate-400 rounded mx-auto" />
                           </div>
                           <div className="space-y-3">
                             <div className="h-4 w-32 bg-slate-800 rounded" />
                             <div className="h-3 w-full bg-slate-200 rounded" />
                             <div className="h-3 w-5/6 bg-slate-200 rounded" />
                             <div className="h-3 w-4/6 bg-slate-200 rounded" />
                           </div>
                        </div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything you need to land the interview
              </h2>
              <p className="text-lg text-slate-600">
                Our platform combines premium design with advanced AI to give you the perfect edge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: "AI Content Generation", desc: "Say goodbye to writer's block. Our AI writes impactful bullet points tailored to your role." },
                { icon: Shield, title: "ATS-Optimized Formats", desc: "Tested with major Applicant Tracking Systems to ensure your resume gets read by human eyes." },
                { icon: Zap, title: "Real-time Preview", desc: "See your changes instantly. No more guessing what your exported PDF will look like." },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-white" />
                <span className="font-serif font-bold text-xl text-white">ResumeForge AI</span>
              </Link>
              <p className="max-w-sm">The premium AI resume builder for modern professionals. Land your dream job faster.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} ResumeForge AI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
