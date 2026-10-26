import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProjectTitleBar from '../components/ProjectTitleBar.jsx';
import {
  BLOG_CATEGORY_TABS,
  OFFICIAL_BLOG_POSTS,
} from '../data/blogsData.js';
import './BlogsPage.css';

export default function BlogsPage({ initialCategory = '' } = {}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return OFFICIAL_BLOG_POSTS;
    }
    return OFFICIAL_BLOG_POSTS.filter(
      (post) =>
        post.category.toLowerCase() === selectedCategory.trim().toLowerCase()
    );
  }, [selectedCategory]);

  const handleCategorySelect = (categoryLabel) => {
    setSelectedCategory((prev) =>
      prev.toLowerCase() === categoryLabel.toLowerCase() ? '' : categoryLabel
    );
  };

  return (
    <div className="sld-blogs-page">
      {/* 1. Compact Dark Navy Title Bar */}
      <ProjectTitleBar
        title="Blog & Updates"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Blog & Updates', path: null },
        ]}
        backgroundImage="/assets/hero-slide-2.jpg"
      />

      {/* 2. Main Blog Section */}
      <section
        className="sld-blogs-section"
        aria-label="Sree Laxmi Developers Blog & Updates"
      >
        <div className="sld-blogs-section__pattern" aria-hidden="true" />

        <div className="sld-blogs-section__container">
          {/* Blog Category Tabs (Company News | Project Updates | Buying Tips) */}
          <nav
            className="sld-blogs-tabs-nav"
            aria-label="Blog Category Filter"
          >
            <div className="sld-blogs-tabs" role="tablist">
              {BLOG_CATEGORY_TABS.map((tab) => {
                const isActive =
                  selectedCategory.toLowerCase() === tab.id.toLowerCase();

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`sld-blogs-tab ${
                      isActive ? 'sld-blogs-tab--active' : ''
                    }`}
                    onClick={() => handleCategorySelect(tab.id)}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedCategory && (
              <div className="sld-blogs-tabs__reset-wrap">
                <button
                  type="button"
                  className="sld-blogs-tabs__reset-btn"
                  onClick={() => setSelectedCategory('')}
                >
                  View All Articles ({OFFICIAL_BLOG_POSTS.length})
                </button>
              </div>
            )}
          </nav>

          {/* 3. Blog Posts Grid (3 columns desktop, 2 tablet, 1 mobile) */}
          <div className="sld-blogs-grid" role="list">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="sld-blog-card"
                role="listitem"
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="sld-blog-card__link"
                  aria-label={`${post.title} — ${post.category}`}
                >
                  {/* 16:9 Featured Image Container */}
                  <div className="sld-blog-card__media">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="sld-blog-card__img"
                      loading="lazy"
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

                  {/* Card Body: strictly Category Label + Blog Title only */}
                  <div className="sld-blog-card__body">
                    <span className="sld-blog-card__category">
                      {post.category}
                    </span>
                    <h2 className="sld-blog-card__title">{post.title}</h2>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
