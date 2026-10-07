export type WritingPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  displayDate: string;
  readTime: string;
  featured?: boolean;
};

// Temporary demo content until the Supabase table schema is provided.
export const MOCK_WRITING_POSTS: WritingPost[] = [
  {
    slug: "building-software-that-outlives-the-sprint",
    title: "Building software that outlives the sprint",
    excerpt:
      "The habits that help a codebase stay understandable long after the launch excitement is gone.",
    tag: "Engineering",
    displayDate: "Sep 24, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "designing-systems-that-are-easier-to-change",
    title: "Designing systems that are easier to change",
    excerpt:
      "A practical look at boundaries, boring technology, and the small decisions that keep software adaptable.",
    tag: "Engineering",
    displayDate: "Sep 18, 2026",
    readTime: "7 min read",
  },
  {
    slug: "shipping-a-side-project-in-public",
    title: "What I learned shipping a side project in public",
    excerpt:
      "Notes on choosing scope, talking to early users, and resisting the urge to polish everything at once.",
    tag: "Building",
    displayDate: "Sep 07, 2026",
    readTime: "5 min read",
  },
];

export const BLOG_URL = "https://blogs.jothivasan.dev";
