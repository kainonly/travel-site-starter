import React from 'react'
import HeroVideo from './HeroVideo'
import HeroAnimations from './HeroAnimations'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <HeroAnimations />
      <div className="hero-background">
        <HeroVideo videoUrl="https://cdn.kainonly.com/travel/hero.mp4" />
        <div className="hero-overlay"></div>
        <div className="hero-soft-light"></div>
      </div>
      <div className="hero-content-new">
        {/* Hero 标题 - 带装饰线 */}
        <div className="hero-title-wrapper" id="hero-title-wrapper">
          <div className="hero-title-decorative">
            <div className="hero-decorative-line"></div>
            <p className="hero-title-prefix">寻找您的</p>
            <div className="hero-decorative-line"></div>
          </div>
          <h1 className="hero-title">完美旅程</h1>
          <p className="hero-subtitle-new">
            在我们的网站上，您可以找到适合您和家人朋友的最佳梦想旅程。
            <br />
            我们为您提供最优质的旅游体验！
          </p>
        </div>
        <div className="hero-search-box" id="hero-search-box">
          <div className="hero-search-field">
            <label>目的地</label>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input type="text" placeholder="选择目的地" />
            </div>
          </div>
          <div className="hero-search-divider"></div>
          <div className="hero-search-field">
            <label>出发日期</label>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <input type="text" placeholder="选择日期" />
            </div>
          </div>
          <div className="hero-search-divider"></div>
          <div className="hero-search-field">
            <label>人数</label>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <input type="text" placeholder="几位旅客" />
            </div>
          </div>
          <button className="hero-search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            预订
          </button>
        </div>
      </div>
    </section>
  )
}

