'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDropdown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 992) {
      e.preventDefault()
      e.stopPropagation()
      const navItem = e.currentTarget.closest('.nav-item')
      if (navItem) {
        const isOpen = navItem.classList.contains('mobile-open')
        // 关闭其他打开的下拉菜单
        document.querySelectorAll('.nav-item.mobile-open').forEach((item) => {
          if (item !== navItem) {
            item.classList.remove('mobile-open')
          }
        })
        // 切换当前菜单
        navItem.classList.toggle('mobile-open', !isOpen)
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Traveler
        </Link>
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-item has-dropdown">
            <Link href="/" onClick={toggleDropdown}>
              首页
            </Link>
            <div className="dropdown">
              <Link href="/">首页 2</Link>
              <Link href="/">首页 3</Link>
            </div>
          </div>
          <div className="nav-item has-dropdown">
            <Link href="/tours" onClick={toggleDropdown}>
              旅游线路
            </Link>
            <div className="dropdown">
              <Link href="/tours">线路列表 1</Link>
              <Link href="/tours">线路列表 2</Link>
              <Link href="/tours">单个线路</Link>
            </div>
          </div>
          <div className="nav-item has-dropdown">
            <Link href="/destinations" onClick={toggleDropdown}>
              目的地
            </Link>
            <div className="dropdown">
              <Link href="/destinations">单个目的地</Link>
            </div>
          </div>
          <div className="nav-item has-dropdown">
            <Link href="/pages" onClick={toggleDropdown}>
              页面
            </Link>
            <div className="dropdown dropdown-mega">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <h4>元素</h4>
                  <Link href="/pages">排版</Link>
                  <Link href="/pages">按钮</Link>
                  <Link href="/pages">表单</Link>
                  <Link href="/pages">图标列表</Link>
                  <Link href="/pages">计数器与手风琴</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>页面</h4>
                  <Link href="/about">关于我们</Link>
                  <Link href="/pages">我们的团队</Link>
                  <Link href="/pages">客户评价</Link>
                  <Link href="/contact">联系我们</Link>
                  <Link href="/pages">404 页面</Link>
                  <Link href="/pages">即将上线</Link>
                  <Link href="/pages">隐私政策</Link>
                  <Link href="/pages">搜索结果</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>博客</h4>
                  <Link href="/blog">博客文章</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <Link href="/blog">博客</Link>
          </div>
        </nav>
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="菜单"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

