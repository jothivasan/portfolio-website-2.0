import { MOCK_WRITING_POSTS, type WritingPost } from "../data/writing";

/** The writing section's data source, separate from its presentation. */
export async function getWritingPosts(): Promise<WritingPost[]> {
  // TODO: Once the real table/columns are provided, use getSupabaseClient()
  // from ../lib/supabase to query published posts and map rows to WritingPost.
  // Credentials alone do not enable database requests; no schema is assumed.
  return MOCK_WRITING_POSTS;
}
