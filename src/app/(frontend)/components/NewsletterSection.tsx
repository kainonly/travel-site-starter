import React from 'react'

export default function NewsletterSection() {
  return (
    <section className="section newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h2 className="newsletter-title">订阅我们的邮件</h2>
          <p className="newsletter-subtitle">
            获取最新旅游优惠、目的地指南和独家优惠，直接发送到您的收件箱
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="输入您的邮箱地址" className="newsletter-input" />
            <button className="newsletter-btn">订阅</button>
          </div>
          <p className="newsletter-privacy">我们尊重您的隐私，您可以随时取消订阅。</p>
        </div>
      </div>
    </section>
  )
}

