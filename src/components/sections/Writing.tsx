import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import SectionFrame, { SectionLabel } from "../common/SectionFrame";
import { BLOG_URL, WRITING_POSTS } from "../../data/writing";

export default function Writing() {
  const featured = WRITING_POSTS.find(post => post.featured) ?? WRITING_POSTS[0];
  const recent = WRITING_POSTS.filter(post => post.slug !== featured.slug);
  return (
    <SectionFrame className="folio-writing">
      <div className="folio-container">
        <div className="folio-section-top" data-reveal><SectionLabel number="04">The open notebook</SectionLabel><span className="folio-mono">Observations from the work</span></div>
        <header className="folio-heading-row" data-reveal><h2 className="folio-title">A work in progress.<br /><span>A thought on paper.</span></h2><a className="folio-text-link" href={BLOG_URL} target="_blank" rel="noreferrer">All writings <ArrowUpRight aria-hidden="true" /></a></header>
        <div className="journal-layout">
          <article className="journal-feature" data-reveal>
            <a href={`${BLOG_URL}/posts/${featured.slug}`} target="_blank" rel="noreferrer">
              <div className="journal-feature__top"><span className="folio-mono">FEATURED ESSAY</span><ArrowUpRight size={28} aria-hidden="true" /></div>
              <div className="journal-feature__quote" aria-hidden="true"><span>Build for</span><span>the next</span><span className="journal-feature__marked">reader.</span><span className="journal-feature__asterisk">✳</span></div>
              <div className="journal-feature__copy"><span className="folio-mono">{featured.tag} / {featured.readTime}</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><div className="journal-feature__footer"><span>{featured.displayDate}</span><span>Read the essay <ArrowRight aria-hidden="true" /></span></div></div>
            </a>
          </article>
          <div className="journal-notes">
            <p className="journal-notes__label folio-mono" data-reveal>RECENT ENTRIES / 02</p>
            {recent.map((post, index) => <article className="journal-note" key={post.slug} data-reveal><a href={`${BLOG_URL}/posts/${post.slug}`} target="_blank" rel="noreferrer"><div className="journal-note__meta"><span className="folio-mono">0{index + 2} / {post.tag}</span><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="journal-note__footer"><span>{post.displayDate}</span><span>{post.readTime}</span></div></a></article>)}
            <div className="journal-postscript" data-reveal><span aria-hidden="true">↳</span><p>Things I’m learning about software, building, and the space in between. Written to make sense of it all.</p></div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
