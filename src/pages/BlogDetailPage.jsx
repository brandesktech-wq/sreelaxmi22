import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import {
  OFFICIAL_BLOG_POSTS,
  getBlogBySlug,
} from '../data/blogsData.js';
import './BlogsPage.css';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const post = useMemo(() => getBlogBySlug(slug), [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return OFFICIAL_BLOG_POSTS.slice(0, 3);
    const sameCategory = OFFICIAL_BLOG_POSTS.filter(
      (item) => item.id !== post.id && item.category === post.category
    );
    const others = OFFICIAL_BLOG_POSTS.filter(
      (item) => item.id !== post.id && item.category !== post.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="sld-blog-detail-page">
        <ProjectTitleBar
          title="Article Not Found"
          breadcrumbs={[
            { label: 'Home', path: '/' },
            { label: 'Blog & Updates', path: '/blogs' },
          ]}
          backgroundImage="/assets/hero-slide-2.jpg"
        />
        <section className="sld-blog-detail-missing">
          <div className="sld-blog-detail__container">
            <div className="sld-blog-detail-missing__box">
              <span className="sld-blog-detail__category">BLOG & UPDATES</span>
              <h2 className="sld-blog-detail-missing__title">
                Article Not Found
              </h2>
              <p className="sld-blog-detail-missing__text">
                The requested blog article could not be found. Browse all
                official Sree Laxmi Developers articles and updates below.
              </p>
              <Link to="/blogs" className="sld-blog-detail__back-btn">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Blog & Updates</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="sld-blog-detail-page">
      {/* 1. Dark Navy Title Bar Displaying Selected Blog Post Title */}
      <ProjectTitleBar
        title={post.title}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog & Updates', path: '/blogs' },
          { label: post.category, path: null },
        ]}
        backgroundImage="/assets/hero-slide-2.jpg"
      />

      {/* 2. Redesigned Blog Article Layout */}
      <article className="sld-blog-detail">
        <div className="sld-blog-detail__container">
          {/* 1. Back-to-Blog Navigation Row */}
          <nav
            className="sld-blog-detail__topbar"
            aria-label="Article Navigation"
          >
            <Link to="/blogs" className="sld-blog-detail__back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Blog & Updates</span>
            </Link>
          </nav>

          {/* 2. Category Label (Without Duplicate Blog Heading) */}
          <div className="sld-blog-detail__meta">
            <span className="sld-blog-detail__category">{post.category}</span>
            <span className="sld-blog-detail__category-line" aria-hidden="true" />
          </div>

          {/* 3. Featured Image */}
          <div className="sld-blog-detail__media">
            <img
              src={post.image}
              alt={post.title}
              className="sld-blog-detail__img"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (
                  post.remoteImage &&
                  e.currentTarget.src !== post.remoteImage
                ) {
                  e.currentTarget.src = post.remoteImage;
                }
              }}
            />
          </div>

          {/* 4. Full Article Content */}
          <div
            className="sld-blog-detail__content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Bottom Article Navigation */}
          <footer className="sld-blog-detail__footer">
            <Link to="/blogs" className="sld-blog-detail__back-btn">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Blog & Updates</span>
            </Link>

            <Link to="/projects" className="sld-blog-detail__projects-btn">
              <span>Explore Our Projects</span>
            </Link>
          </footer>
        </div>
      </article>

      {/* Related Official Blog Posts */}
      {relatedPosts.length > 0 && (
        <section
          className="sld-blog-related"
          aria-label="More Articles from Sree Laxmi Developers"
        >
          <div className="sld-blog-related__container">
            <header className="sld-blog-related__header">
              <div className="sld-blog-related__eyebrow">
                <span className="sld-blog-related__eyebrow-line" />
                <span>MORE FROM OUR BLOG</span>
                <span className="sld-blog-related__eyebrow-line" />
              </div>
              <h2 className="sld-blog-related__heading">Related Articles</h2>
              <div className="sld-blog-related__rule" aria-hidden="true">
                <span className="sld-blog-related__rule-line" />
                <span className="sld-blog-related__rule-diamond" />
                <span className="sld-blog-related__rule-line" />
              </div>
            </header>

            <div className="sld-blogs-grid" role="list">
              {relatedPosts.map((item) => (
                <article
                  key={item.id}
                  className="sld-blog-card"
                  role="listitem"
                >
                  <Link
                    to={`/blogs/${item.slug}`}
                    className="sld-blog-card__link"
                    aria-label={`${item.title} — ${item.category}`}
                  >
                    <div className="sld-blog-card__media">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="sld-blog-card__img"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (
                            item.remoteImage &&
                            e.currentTarget.src !== item.remoteImage
                          ) {
                            e.currentTarget.src = item.remoteImage;
                          }
                        }}
                      />
                    </div>
                    <div className="sld-blog-card__body">
                      <span className="sld-blog-card__category">
                        {item.category}
                      </span>
                      <h3 className="sld-blog-card__title">{item.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
