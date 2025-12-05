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
    if (!heroSection) return

    const updateHeaderStyle = (isInHero: boolean) => {
      if (isInHero === isInHeroRef.current) return

      isInHeroRef.current = isInHero

      if (isInHero) {
        // 在 Hero 区域：透明背景，白色文字
        gsap.to(header, {
          duration: 0.6,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0)',
          ease: 'power2.out',
        })

        const logo = header.querySelector('.logo')
        const navLinks = header.querySelectorAll('.nav-link')
        const btnInquire = header.querySelector('.btn-inquire')
        const menuToggleSpans = header.querySelectorAll('.mobile-menu-toggle span')

        if (logo) {
          gsap.to(logo, {
            duration: 0.6,
            color: '#ffffff',
            ease: 'power2.out',
          })
        }

        if (navLinks.length > 0) {
          gsap.to(navLinks, {
            duration: 0.6,
            color: 'rgba(255, 255, 255, 0.95)',
            ease: 'power2.out',
          })
        }

        if (btnInquire) {
          gsap.to(btnInquire, {
            duration: 0.6,
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            ease: 'power2.out',
          })
        }

        if (menuToggleSpans.length > 0) {
          gsap.to(menuToggleSpans, {
            duration: 0.6,
            backgroundColor: '#ffffff',
            ease: 'power2.out',
          })
        }
      } else {
        // 离开 Hero 区域：深色背景，深色文字
        gsap.to(header, {
          duration: 0.6,
          backgroundColor: 'rgb(53, 53, 53)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
          ease: 'power2.out',
        })

        const logo = header.querySelector('.logo')
        const navLinks = header.querySelectorAll('.nav-link')
        const btnInquire = header.querySelector('.btn-inquire')
        const menuToggleSpans = header.querySelectorAll('.mobile-menu-toggle span')

        if (logo) {
          gsap.to(logo, {
            duration: 0.6,
            color: '#ffffff',
            ease: 'power2.out',
          })
        }

        if (navLinks.length > 0) {
          gsap.to(navLinks, {
            duration: 0.6,
            color: 'rgba(255, 255, 255, 0.95)',
            ease: 'power2.out',
          })
        }

        if (btnInquire) {
          gsap.to(btnInquire, {
            duration: 0.6,
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            ease: 'power2.out',
          })
        }

        if (menuToggleSpans.length > 0) {
          gsap.to(menuToggleSpans, {
            duration: 0.6,
            backgroundColor: '#ffffff',
            ease: 'power2.out',
          })
        }
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = heroSection.clientHeight
      const isInHero = scrollY < heroHeight - 100 // 提前一点切换，更自然

      updateHeaderStyle(isInHero)
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
