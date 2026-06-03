import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor | ResumeForge AI",
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Editor specific top navbar can go here if needed, or we just use full screen */}
      {children}
    </div>
  );
}
