export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    github: string;
    summary: string;
  };
  education: Array<{
    id: string;
    degree: string;
    school: string;
    board: string;
    date: string;
    marks: string;
    certificateUrl?: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    date: string;
    description: string;
    certificateUrl?: string;
  }>;
  trainings: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    date: string;
    certificateUrl?: string;
    description?: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
    link: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
}

export const initialData: ResumeData = {
  personal: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    github: "https://github.com/johndoe",
    summary: "Experienced Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly.",
  },
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      board: "",
      date: "2018 - 2022",
      marks: "GPA: 3.8/4.0",
      certificateUrl: "",
    }
  ],
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      date: "2022 - Present",
      description: "Led a team of 5 developers to create a new scalable cloud-based architecture. Improved application performance by 40% and reduced server costs by 15%.",
      certificateUrl: "",
    }
  ],
  trainings: [],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      date: "2023",
      description: "Developed a full-stack e-commerce platform using Next.js and Node.js. Integrated Stripe for payments and achieved a 99.9% uptime over the first 6 months.",
      link: "https://github.com/johndoe/ecommerce"
    }
  ],
  skills: [
    { id: "1", name: "JavaScript / TypeScript", level: "Advanced" },
    { id: "2", name: "React & Next.js", level: "Advanced" },
    { id: "3", name: "Node.js", level: "Intermediate" },
    { id: "4", name: "AWS", level: "Intermediate" },
  ]
};
