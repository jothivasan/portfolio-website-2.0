import * as React from "react";
import { BLOG_URL, WRITING_POSTS } from "../../data/writing";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const Writing: React.FC = () => {
  const featured = WRITING_POSTS.find((post) => post.featured) ?? WRITING_POSTS[0];
  const recent = WRITING_POSTS.filter((post) => post.slug !== featured.slug);

  return (
    <div className="writing-section">
      <div className="writing-section__inner">
        <header className="writing-heading">
          <div>
            <p className="eyebrow">Writing · Field notes</p>
            <h2>
              Ideas worth <span>keeping.</span>
            </h2>
          </div>
          <div className="writing-heading__aside">
            <p>
              Notes on software, product thinking, learning, and the practical
              details behind building things that last.
            </p>
            <a href={BLOG_URL} target="_blank" rel="noreferrer">
              Visit the complete blog <Arrow />
            </a>
          </div>
        </header>

        <a
          className="featured-writing"
          href={`${BLOG_URL}/posts/${featured.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="featured-writing__content">
            <div className="featured-writing__meta">
              <span>Featured essay</span>
              <span>{featured.tag}</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <div className="featured-writing__footer">
              <span>{featured.displayDate}</span>
              <span>{featured.readTime}</span>
              <strong>
                Read essay <Arrow />
              </strong>
            </div>
          </div>
          <div className="featured-writing__note" aria-hidden="true">
            <span className="featured-writing__number">01</span>
            <div>
              <p>Optimize for the next reader.</p>
              <span>
                Clear names, small boundaries, and honest explanations make the
                next change easier.
              </span>
            </div>
            <i />
          </div>
        </a>

        <div className="writing-list">
          <div className="writing-list__label">
            <p className="eyebrow">Recent notes</p>
            <span>{String(recent.length).padStart(2, "0")} published</span>
          </div>
          <div>
            {recent.map((post, index) => (
              <a
                className="writing-row"
                href={`${BLOG_URL}/posts/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                key={post.slug}
              >
                <span className="writing-row__number">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <div className="writing-row__copy">
                  <div>
                    <span>{post.tag}</span>
                    <span>{post.displayDate}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <div className="writing-row__action">
                  <span>{post.readTime}</span>
                  <i><Arrow /></i>
                </div>
              </a>
            ))}
          </div>
        </div>

        <footer className="writing-footer">
          <div>
            <p className="eyebrow">Explore by topic</p>
            <div className="writing-topics">
              <a href={`${BLOG_URL}/search?q=engineering`} target="_blank" rel="noreferrer">Engineering</a>
              <a href={`${BLOG_URL}/search?q=building`} target="_blank" rel="noreferrer">Building</a>
              <a href={`${BLOG_URL}/search?q=learning`} target="_blank" rel="noreferrer">Learning</a>
            </div>
          </div>
          <a className="writing-footer__all" href={BLOG_URL} target="_blank" rel="noreferrer">
            All writing <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Writing;
