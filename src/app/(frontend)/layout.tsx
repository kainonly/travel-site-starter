import React from 'react'
import Header from './components/Header'
import './styles.css'
import Link from 'next/link'

export const metadata = {
  description: '探索世界各地的精彩旅程',
  title: '旅游探索',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="zh-CN">
      <body>
        <Header />
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
                <Link href="/">首页</Link>
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
              <p>© 2025 Design By Kain. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
