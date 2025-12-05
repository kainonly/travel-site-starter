'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const isInHeroRef = useRef(true)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
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

  useEffect(() => {
    if (!headerRef.current) return

    const header = headerRef.current
    const heroSection = document.querySelector('.hero-section')

    const getHeroHeight = () => {
      if (!heroSection) return window.innerHeight
      return heroSection.clientHeight || window.innerHeight
    }

    const updateHeaderStyle = (progress: number) => {
      // progress: 0 = 在Hero顶部, 1 = 完全离开Hero
      const logo = header.querySelector('.logo')
      const navLinks = header.querySelectorAll('.nav-link')
      const btnInquire = header.querySelector('.btn-inquire')
      const menuToggleSpans = header.querySelectorAll('.mobile-menu-toggle span')

      // 背景色：透明 -> 白色
      const bgAlpha = progress
      const bgColor = `rgba(255, 255, 255, ${bgAlpha})`
      const backdropBlur = 8 * (1 - progress)
      const boxShadow = progress > 0
        ? `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * progress}), 0 2px 4px -1px rgba(0, 0, 0, ${0.06 * progress})`
        : '0 2px 10px rgba(0, 0, 0, 0)'

      gsap.to(header, {
        duration: 0.1,
        backgroundColor: bgColor,
        backdropFilter: `blur(${backdropBlur}px)`,
        WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        boxShadow: boxShadow,
        ease: 'none',
      })

      // 文字颜色：白色 -> 深灰
      const textColor = progress > 0.5
        ? `rgba(${31 + (255 - 31) * (1 - (progress - 0.5) * 2)}, ${41 + (255 - 41) * (1 - (progress - 0.5) * 2)}, ${55 + (255 - 55) * (1 - (progress - 0.5) * 2)}, 1)`
        : `rgba(255, 255, 255, ${1 - progress * 2})`

      if (logo) {
        gsap.to(logo, {
          duration: 0.1,
          color: progress > 0.5 ? '#1f2937' : '#ffffff',
          ease: 'none',
        })
      }

      if (navLinks.length > 0) {
        navLinks.forEach((link) => {
          gsap.to(link, {
            duration: 0.1,
            color: progress > 0.5 ? '#1f2937' : 'rgba(255, 255, 255, 0.95)',
            ease: 'none',
          })
        })
      }

      // 按钮样式
      if (btnInquire) {
        if (progress > 0.5) {
          gsap.to(btnInquire, {
            duration: 0.1,
            color: '#ffffff',
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
            ease: 'none',
          })
        } else {
          gsap.to(btnInquire, {
            duration: 0.1,
            color: '#ffffff',
            backgroundColor: 'transparent',
            borderColor: `rgba(255, 255, 255, ${0.6 + 0.4 * (1 - progress * 2)})`,
            ease: 'none',
          })
        }
      }

      // 移动端菜单按钮
      if (menuToggleSpans.length > 0) {
        gsap.to(menuToggleSpans, {
          duration: 0.1,
          backgroundColor: progress > 0.5 ? '#1f2937' : '#ffffff',
          ease: 'none',
        })
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = getHeroHeight()
      const headerHeight = header.clientHeight || 80
      
      // 计算在Hero区域内的进度
      // 从Hero高度的50%开始渐变，到Hero底部完全变色
      const startFadePoint = heroHeight * 0.5
      const endFadePoint = heroHeight - headerHeight
      
      let progress = 0
      if (scrollY >= endFadePoint) {
        progress = 1
      } else if (scrollY >= startFadePoint) {
        progress = (scrollY - startFadePoint) / (endFadePoint - startFadePoint)
      }

      updateHeaderStyle(progress)
    }

    const handleResize = () => {
      handleScroll()
    }

    // 初始状态检查
    const initCheck = () => {
      handleScroll()
    }

    // 等待 DOM 完全加载
    if (document.readyState === 'complete') {
      setTimeout(initCheck, 100)
    } else {
      window.addEventListener('load', () => {
        setTimeout(initCheck, 100)
      })
    }

    // 页面加载时的淡入动画
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const navItems = ['首页', '目的地', '旅行产品', '旅游攻略', '联系我们']

  return (
    <header ref={headerRef} className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          Traveler
        </Link>
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item, index) => (
            <div key={index} className="nav-item">
              <Link href="#" className="nav-link">
                {item}
              </Link>
            </div>
          ))}
        </nav>
        <Link href="/contact" className="btn-inquire">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          立即咨询
        </Link>
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
