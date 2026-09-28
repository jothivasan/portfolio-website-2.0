import { Project } from "../types";
import Images from "../assets/images/Image";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "TeethEase Academy",
    category: "Online course platform · Ongoing",
    description:
      "A complete frontend implementation for an online NEET coaching platform featuring live classes, dashboards, and responsive landing pages.",
    role: "Frontend Developer",
    responsibilities: [
      "Delivered a production-ready frontend for a full-scale NEET coaching platform.",
      "Improved user experience through responsive design and clean UI architecture.",
      "Enabled seamless student onboarding via intuitive landing pages and contact workflows.",
    ],
    image: Images.ToothEaseImg,
    tags: ["ReactJS", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    link: "https://teetheaseacademy.com/",
  },
  {
    id: "2",
    title: "RightBrains",
    category: "Digital marketing agency website",
    description:
      "A responsive, highly animated interface for a digital marketing agency focused on user engagement.",
    role: "Frontend Developer",
    responsibilities: [
      "Delivered a responsive, animated interface using Framer Motion to significantly improve user engagement.",
      "Validated interactive lead capture forms to enhance input accuracy and streamline communication workflows.",
      "Implemented performance optimizations that reduced initial load times through asset lazy-loading.",
    ],
    image: Images.RightBrainImg,
    tags: [
      "ReactJS",
      "Tailwind CSS",
      "Framer Motion",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    link: "https://rightbrains.co.in/",
  },
  {
    id: "4",
    title: "Geethanjali Builders",
    category: "Construction and real estate website",
    description:
      "A responsive business website developed for a construction company to showcase projects, services, and company information with a clean and professional design.",
    role: "Frontend Developer",
    responsibilities: [
      "Developed a responsive website to present projects, services, and company details.",
      "Built reusable UI components and structured navigation for better user experience.",
      "Optimized performance and ensured smooth functionality across devices.",
    ],
    image: Images.GeethanjaliBuildersImg,
    tags: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "ReactJS", "Supabase"],
    link: "https://www.geethanjalibuilders.com/",
  },
];
