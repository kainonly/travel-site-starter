import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import HeroVideo from './components/HeroVideo'
import HeroAnimations from './components/HeroAnimations'
import DestinationCard from './components/DestinationCard'
import './styles.css'
import { Building2, Landmark, Mountain, Waves, Shield, Award, Headphones, DollarSign } from 'lucide-react'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 获取热门线路
  const { docs: tours } = await payload.find({
    collection: 'tours',
    limit: 6,
  })

  // 精选旅游线路数据（从后端获取或使用模拟数据）
  const featuredTours =
    tours.length > 0
      ? tours.map((tour) => ({
        id: tour.id,
        title: tour.title,
        price: tour.price,
        duration: tour.duration || '3天',
        destination:
          typeof tour.destination === 'object' && tour.destination
            ? tour.destination.name || '未知'
            : '未知',
        image:
          typeof tour.image === 'object' && tour.image?.url
            ? tour.image.url
            : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        originalPrice: null,
      }))
      : [
        {
          id: 1,
          title: '马尔代夫探险之旅',
          price: 11999,
          duration: '5天',
          destination: '马尔代夫',
          image:
            'https://images.unsplash.com/photo-1698726654862-377c0218dfdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWxkaXZlcyUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2NDc5ODgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 15999,
        },
        {
          id: 2,
          title: '巴黎浪漫之旅',
          price: 9999,
          duration: '7天',
          destination: '法国',
          image:
            'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyfGVufDF8fHx8MTc2NDg0NzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 12000,
        },
        {
          id: 3,
          title: '东京发现之旅',
          price: 6999,
          duration: '6天',
          destination: '日本',
          image:
            'https://images.unsplash.com/photo-1640871426525-a19540c45a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMEphcGFuJTIwY2l0eXxlbnwxfHx8fDE3NjQ4NTEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 8999,
        },
        {
          id: 4,
          title: '圣托里尼家庭游',
          price: 13999,
          duration: '5天',
          destination: '希腊',
          image:
            'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW50b3JpbmklMjBHcmVlY2V8ZW58MXx8fHwxNzY0OTAzMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 16999,
        },
        {
          id: 5,
          title: '瑞士阿尔卑斯探险',
          price: 15999,
          duration: '10天',
          destination: '瑞士',
          image:
            'https://images.unsplash.com/photo-1633942515749-f93dddbbcff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTd2lzcyUyMEFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY0OTAzMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 19999,
        },
        {
          id: 6,
          title: '迪拜奢华之旅',
          price: 11999,
          duration: '5天',
          destination: '阿联酋',
          image:
            'https://images.unsplash.com/photo-1649158779127-d3c740ddeddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGx1eHVyeSUyMHRyYXZlbHxlbnwxfHx8fDE3NjQ5MDMwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          originalPrice: 14999,
        },
      ]

  // 按类别旅行
  const travelCategories = [
    {
      icon: Waves,
      title: '海滩海岛',
      description: '热带天堂目的地',
      image:
        'https://images.unsplash.com/photo-1579077926357-365f07b70b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZhY2F0aW9uJTIwdHJvcGljYWx8ZW58MXx8fHwxNzY0ODM0NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: 128,
    },
    {
      icon: Mountain,
      title: '山地自然',
      description: '探险与徒步之旅',
      image:
        'https://images.unsplash.com/photo-1609373066983-cee8662ea93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjQ4MDExNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: 96,
    },
    {
      icon: Building2,
      title: '城市观光',
      description: '都市探索之旅',
      image:
        'https://images.unsplash.com/photo-1595273647789-54432cefc8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHVyYmFufGVufDF8fHx8MTc2NDc5ODI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: 152,
    },
    {
      icon: Landmark,
      title: '文化遗产',
      description: '历史与传统',
      image:
        'https://images.unsplash.com/photo-1696857674757-185edd346e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlJTIwdGVtcGxlfGVufDF8fHx8MTc2NDkwNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      count: 84,
    },
  ]

  // 客户评价
  const testimonials = [
    {
      rating: 5,
      content: '一次很棒的体验!行程安排很好，导游知识渊博，一定会再次预订。',
      author: '王美丽',
      location: '上海, 中国',
    },
    {
      rating: 5,
      content: '我用过最好的旅行社。价格优惠，服务出色。强烈推荐，值得拥有!',
      author: '陈浩然',
      location: '上海, 中国',
    },
    {
      rating: 5,
      content: '对细节的关注令人印象深刻。从头到尾都非常完美，感谢这次难忘的旅行!',
      author: '李晓玲',
      location: '广州, 中国',
    },
  ]

  return (
    <div className="home-page">
      {/* Hero 区域 */}
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

      {/* 精选旅游线路 */}
      <section className="section section-featured-tours">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">精选旅游线路</h2>
            <p className="section-subtitle">
              这些是我们最受欢迎的旅游线路，精心为您挑选。希望您能在下面找到感兴趣的目的地。
            </p>
          </div>
          <div className="featured-tours-grid-new">
            {featuredTours.map((tour) => (
              <DestinationCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                price={tour.price}
                originalPrice={tour.originalPrice}
                duration={tour.duration}
                destination={tour.destination}
                image={tour.image}
              />
            ))}
          </div>
          <div className="section-footer-center">
            <Link href="/tours" className="btn-view-all-new">
              查看全部线路
            </Link>
          </div>
        </div>
      </section>

      {/* 按类别旅行 */}
      <section className="section section-alt-new">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">按类别旅行</h2>
            <p className="section-subtitle">从我们多样化的旅行体验中选择</p>
          </div>
          <div className="categories-grid">
            {travelCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div key={idx} className="category-card">
                  {/* 背景图 */}
                  <div className="category-image">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="category-image-bg"
                    />
                    <div className="category-overlay"></div>
                  </div>

                  {/* 底部内容区域（包含图标和文字） */}
                  <div className="category-content">
                    {/* 图标 */}
                    <div className="category-icon-wrapper">
                      <Icon className="category-icon" />
                    </div>

                    {/* 文字内容 */}
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                    <p className="category-count">{category.count} 条线路可选</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="section section-features">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">为什么选择我们</h2>
            <p className="section-subtitle">我们提供卓越的服务和难忘的体验</p>
          </div>
          <div className="features-grid">
            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3 className="feature-title">安全支付</h3>
              <p className="feature-description">安全加密的支付处理，全面的买家保护</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Award className="feature-icon" />
              </div>
              <h3 className="feature-title">品质保证</h3>
              <p className="feature-description">精心挑选的旅游线路，真实评价和质量保障</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Headphones className="feature-icon" />
              </div>
              <h3 className="feature-title">24/7 客服</h3>
              <p className="feature-description">全天候客户服务，让您安心无忧</p>
            </div>
            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <DollarSign className="feature-icon" />
              </div>
              <h3 className="feature-title">最优价格</h3>
              <p className="feature-description">价格匹配保证，会员专享优惠</p>
            </div>
          </div>
        </div>
      </section>

      {/* 客户评价 */}
      <section className="section section-alt-new">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">客户评价</h2>
            <p className="section-subtitle">真实来自真实客户的真实评价</p>
          </div>
          <div className="testimonials-grid-new">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card-new">
                <div className="testimonial-rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="testimonial-content-new">{testimonial.content}</p>
                <div className="testimonial-author-new">
                  <span className="testimonial-name">{testimonial.author}</span>
                  <span className="testimonial-location">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 邮件订阅 */}
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
    </div>
  )
}
