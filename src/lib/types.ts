export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    github: string;
    summary: string;
    linkedin?: string;
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
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    summary?: string;
  }>;
}

export const initialData: ResumeData = {
  personal: {
    name: "Vivek S",
    email: "vivekvic57@gmail.com",
    phone: "8951195126",
    github: "https://github.com/Vivek8951",
    linkedin: "https://linkedin.com/in/vivek-s",
    summary: "Entry-Level DevOps Engineer with hands-on experience in Linux, Git, GitHub Actions, Jenkins, Docker, Kubernetes, Terraform, AWS, and CI/CD automation. Experienced in building containerized applications, automating software delivery pipelines, provisioning infrastructure using Terraform, and deploying applications on Kubernetes. Passionate about cloud computing, DevOps practices, and continuous learning.",
  },
  education: [
    {
      id: "1",
      degree: "Bachelor of Computer Applications (BCA)",
      school: "Seshadripuram Academy of Business Studies",
      board: "",
      date: "2022 - 2025",
      marks: "CGPA: 7.92/10",
      certificateUrl: "",
    },
    {
      id: "2",
      degree: "Senior Secondary (XII)",
      school: "Janaseva Independent PU College",
      board: "",
      date: "2020 - 2022",
      marks: "84%",
      certificateUrl: "",
    },
    {
      id: "3",
      degree: "Secondary (X)",
      school: "Websters High School",
      board: "",
      date: "2019 - 2020",
      marks: "76%",
      certificateUrl: "",
    }
  ],
  experience: [
    {
      id: "1",
      title: "DevOps Intern",
      company: "Elevate Labs",
      location: "Bengaluru, Karnataka",
      date: "Present",
      description: "• Built CI/CD pipelines using GitHub Actions and Jenkins.\n• Containerized Node.js applications using Docker.\n• Provisioned infrastructure using Terraform.\n• Deployed applications to Kubernetes using Minikube.\n• Managed source code using Git branching, Pull Requests, and version control.\n• Automated build and deployment workflows following DevOps best practices.",
      certificateUrl: "",
    },
    {
      id: "2",
      title: "Web Development Intern",
      company: "Zidio",
      location: "Bengaluru, Karnataka",
      date: "2024",
      description: "• Developed responsive web applications using React.js and Node.js.\n• Built REST APIs and integrated frontend with backend services.\n• Used Git for version control and collaborated using Agile development practices.\n• Improved debugging, problem-solving, and software development skills.",
      certificateUrl: "",
    }
  ],
  trainings: [
    {
      id: "1",
      title: "DevOps Training",
      company: "Livetech",
      location: "Bengaluru, Karnataka",
      date: "Sep 2025 - Jan 2026",
      description: "• Hands-on training in Linux administration.\n• Worked with Git and GitHub for version control.\n• Built CI/CD pipelines using GitHub Actions and Jenkins.\n• Containerized applications using Docker.\n• Deployed applications using Kubernetes.\n• Provisioned infrastructure using Terraform.\n• Learned AWS cloud fundamentals and DevOps best practices.",
      certificateUrl: "",
    }
  ],
  projects: [
    {
      id: "1",
      title: "End-to-End DevOps CI/CD Pipeline",
      date: "2025",
      description: "• Developed a Node.js application and managed source code using Git.\n• Automated build and deployment using GitHub Actions and Jenkins.\n• Containerized the application using Docker.\n• Provisioned infrastructure using Terraform.\n• Deployed the application to Kubernetes (Minikube).\n• Implemented monitoring using Netdata.\n• Built an end-to-end CI/CD workflow from code commit to deployment.\n\nTechnologies: Git • GitHub Actions • Jenkins • Docker • Kubernetes • Terraform • Linux • Netdata • Node.js",
      link: "",
    },
    {
      id: "2",
      title: "AI Powered E-Learning Web App",
      date: "2024",
      description: "• Developed a full-stack AI-powered e-learning platform.\n• Implemented student and teacher role-based authentication.\n• Added AI video summarization and chat functionality.\n• Built responsive dashboards using React.js and Node.js.\n\nTechnologies: React.js • Node.js • JavaScript • HTML • CSS • REST API",
      link: "",
    }
  ],
  skills: [
    { id: "1", name: "DevOps" },
    { id: "2", name: "Git" },
    { id: "3", name: "GitHub" },
    { id: "4", name: "GitHub Actions" },
    { id: "5", name: "Jenkins" },
    { id: "6", name: "CI/CD" },
    { id: "7", name: "Containers" },
    { id: "8", name: "Docker" },
    { id: "9", name: "Kubernetes" },
    { id: "10", name: "Minikube" },
    { id: "11", name: "Cloud" },
    { id: "12", name: "AWS" },
    { id: "13", name: "Cloud Computing" },
    { id: "14", name: "Infrastructure as Code" },
    { id: "15", name: "Terraform" },
    { id: "16", name: "Operating Systems" },
    { id: "17", name: "Linux (Ubuntu)" },
    { id: "18", name: "Programming" },
    { id: "19", name: "Python" },
    { id: "20", name: "Bash" },
    { id: "21", name: "Node.js" },
    { id: "22", name: "Networking" },
    { id: "23", name: "TCP/IP" },
    { id: "24", name: "HTTP" },
    { id: "25", name: "HTTPS" },
    { id: "26", name: "DNS" },
    { id: "27", name: "SSH" },
    { id: "28", name: "REST APIs" }
  ],
  certifications: [
    { 
      id: "1", 
      name: "DevOps Training Certificate", 
      issuer: "Livetech",
      summary: "Comprehensive training covering CI/CD pipelines (GitHub Actions, Jenkins), containerization (Docker, Kubernetes), IaC (Terraform), Linux administration, and AWS cloud fundamentals."
    },
    { 
      id: "2", 
      name: "DevOps Internship Certificate", 
      issuer: "Elevate Labs",
      summary: "Hands-on experience building automated software delivery pipelines, containerizing applications, provisioning cloud resources, and deploying on Kubernetes clusters."
    },
    { 
      id: "3", 
      name: "Web Development Internship Certificate", 
      issuer: "Zidio",
      summary: "Developed responsive frontend interfaces with React, built secure RESTful APIs with Node.js, and implemented database integrations."
    }
  ]
};
