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
                <p>
                  您值得信赖的旅行伙伴。为您创造世界各地的旅行体验。让我们带您探索目的地和区域。
                </p>
                <div className="footer-contact">
                  <div>地址：中国上海市浦东新区</div>
                  <div>电话：400-123-4567</div>
                  <div>邮箱：info@traveler.com</div>
                </div>
              </div>
              <div className="footer-links">
                <h4>公司</h4>
                <Link href="/about">关于我们</Link>
                <Link href="/contact">联系我们</Link>
                <Link href="/careers">加入我们</Link>
              </div>
              <div className="footer-links">
                <h4>支持</h4>
                <Link href="/help">帮助中心</Link>
                <Link href="/faq">常见问题</Link>
                <Link href="/contact">联系我们</Link>
              </div>
              <div className="footer-links">
                <h4>快速链接</h4>
                <Link href="/">首页</Link>
                <Link href="/destinations">目的地</Link>
                <Link href="/tours">旅游线路</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 Traveler. 保留所有权利。</p>
              <div className="footer-social">
                <div className="footer-social-icons">
                  <a href="#" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" aria-label="YouTube">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                  <a href="#" aria-label="Pinterest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 2.98-.42 4.22-1.14l-1.8-4.64c-.39 1.25-1.56 2.24-2.93 2.24-1.93 0-3.49-1.56-3.49-3.49 0-1.93 1.56-3.49 3.49-3.49 1.37 0 2.54.99 2.93 2.24l1.8-4.64C15.02 3.58 13.54 2 12 2z"></path>
                    </svg>
                  </a>
                </div>
                <div className="footer-social-links">
                  <Link href="/privacy">隐私政策</Link>
                  <Link href="/terms">服务条款</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
