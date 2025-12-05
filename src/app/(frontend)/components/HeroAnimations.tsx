'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function HeroAnimations() {
  useEffect(() => {
    const titleWrapper = document.getElementById('hero-title-wrapper')
    const searchBox = document.getElementById('hero-search-box')

    if (titleWrapper) {
      // Hero 标题淡入和上浮动画
      gsap.fromTo(
        titleWrapper,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        },
      )
    }

    if (searchBox) {
      // 搜索栏延迟 0.2s 淡入
      gsap.fromTo(
        searchBox,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        },
      )
    }
  }, [])

  return null
}

