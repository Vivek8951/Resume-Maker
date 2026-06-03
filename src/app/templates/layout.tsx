import { Navbar } from "@/components/navbar";

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        {children}
      </div>
    </div>
  );
}
