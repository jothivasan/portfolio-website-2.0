import type { StaticImageData } from "next/image";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
  role: string;
  responsibilities: string[];
  tags: string[];
  link: string;
}
