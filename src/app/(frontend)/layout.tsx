import React from 'react'
import './styles.css'

export const metadata = {
  description: '探索世界各地的精彩旅程',
  title: '旅游探索',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="zh-CN">
      <body>
        <header className="header">
          <div className="header-container">
            <a href="/" className="logo">Traveler</a>
            <nav className="nav">
              <div className="nav-item has-dropdown">
                <a href="/destinations">目的地</a>
                <div className="dropdown">
                  <a href="/destinations/asia">亚洲</a>
                  <a href="/destinations/europe">欧洲</a>
                  <a href="/destinations/americas">美洲</a>
                  <a href="/destinations/oceania">大洋洲</a>
                </div>
              </div>
              <div className="nav-item has-dropdown">
                <a href="/tours">旅游线路</a>
                <div className="dropdown">
                  <a href="/tours/beach">海岛度假</a>
                  <a href="/tours/culture">文化探索</a>
                  <a href="/tours/adventure">冒险之旅</a>
                </div>
              </div>
              <div className="nav-item">
                <a href="/about">关于我们</a>
              </div>
              <div className="nav-item">
                <a href="/contact">联系我们</a>
              </div>
            </nav>
            <div className="header-actions">
              <a href="/admin" className="btn-login">登录</a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3>Traveler</h3>
                <p>让每一次旅行都成为难忘的回忆</p>
              </div>
              <div className="footer-links">
                <h4>快速链接</h4>
                <a href="/">首页</a>
                <a href="/destinations">目的地</a>
                <a href="/tours">旅游线路</a>
              </div>
              <div className="footer-links">
                <h4>支持</h4>
                <a href="/about">关于我们</a>
                <a href="/contact">联系我们</a>
                <a href="/faq">常见问题</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2024 Traveler. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
