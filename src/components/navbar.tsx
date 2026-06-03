"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Optional: add a scroll listener for isScrolled

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm py-3"
          : "bg-white border-slate-100 py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">
            ResumeForge AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/analyze" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Upload Resume
          </Link>
          <Link href="/templates" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Templates
          </Link>
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
            <Link href="/templates" className={buttonVariants({ variant: "outline", className: "rounded-full" })}>View Templates</Link>
            <Link href="/editor" className={buttonVariants({ className: "rounded-full shadow-sm" })}>Build Resume</Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <Link href="/analyze" className="text-base font-medium text-slate-600">Upload Resume</Link>
              <Link href="/editor" className={buttonVariants({ className: "w-full mt-2" })}>Build Resume</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
