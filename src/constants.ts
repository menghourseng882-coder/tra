export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "NEBULA DASHBOARD",
    category: "Web Application",
    description: "A high-performance analytics platform with real-time data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    link: "#",
    year: "2024"
  },
  {
    id: "2",
    title: "QUANTUM INTERFACE",
    category: "UI Design",
    description: "Experimental UI design system based on atomic components and motion.",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
    link: "#",
    year: "2023"
  },
  {
    id: "3",
    title: "SOLARIS E-COMMERCE",
    category: "Fullstack Development",
    description: "Next-generation shopping experience with headless architecture.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    link: "#",
    year: "2024"
  },
  {
    id: "4",
    title: "AETHER PROTOCOL",
    category: "Blockchain",
    description: "Decentralized governance platform for the modern web.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    link: "#",
    year: "2023"
  }
];

export const SKILLS = [
  "React / Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "PostgreSQL",
  "Firebase"
];
