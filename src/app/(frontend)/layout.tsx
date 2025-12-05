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
          <div className="container">
            <a href="/" className="logo">旅游探索</a>
            <nav className="nav">
              <a href="/">首页</a>
              <a href="/destinations">目的地</a>
              <a href="/tours">旅游线路</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p>© 2024 旅游探索. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
