import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 获取目的地列表
  const { docs: destinations } = await payload.find({
    collection: 'destinations',
    limit: 6,
  })

  // 获取热门线路
  const { docs: tours } = await payload.find({
    collection: 'tours',
    limit: 4,
  })

  return (
    <div className="home-page">
      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="日落海滩"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1>寻找你的完美旅行</h1>
          <p className="hero-subtitle">探索世界最美的目的地，开启一段难忘的度假时光</p>
          
          {/* 搜索条 */}
          <div className="search-box">
            <div className="search-field">
              <label>目的地</label>
              <input type="text" placeholder="想去哪里？" />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <label>出发日期</label>
              <input type="text" placeholder="选择日期" />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <label>人数</label>
              <input type="text" placeholder="2人" />
            </div>
            <button className="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              搜索
            </button>
          </div>
        </div>

        {/* 底部装饰元素 */}
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">✈️</span>
            <span>500+ 目的地</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span>精选线路</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <span>最优价格</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span>安全保障</span>
          </div>
        </div>
      </section>

      {/* 目的地列表 */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">热门目的地</h2>
          <p className="section-subtitle">探索人们最爱的旅游胜地</p>
          <div className="destinations-grid">
            {destinations.map((destination) => {
              const imageUrl =
                typeof destination.image === 'object' && destination.image?.url
                  ? destination.image.url
                  : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80'

              return (
                <div key={destination.id} className="destination-card">
                  <div className="card-image">
                    <Image
                      src={imageUrl}
                      alt={destination.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-content">
                    <h3>{destination.name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
          {destinations.length === 0 && (
            <p className="empty-text">暂无目的地，请在后台添加</p>
          )}
        </div>
      </section>

      {/* 旅游线路 */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">精选线路</h2>
          <p className="section-subtitle">专为你策划的完美行程</p>
          <div className="tours-grid">
            {tours.map((tour) => {
              const imageUrl =
                typeof tour.image === 'object' && tour.image?.url
                  ? tour.image.url
                  : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80'

              return (
                <div key={tour.id} className="tour-card">
                  <div className="card-image">
                    <Image
                      src={imageUrl}
                      alt={tour.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-content">
                    <h3>{tour.title}</h3>
                    {tour.duration && <span className="duration">{tour.duration}</span>}
                    <p className="price">¥{tour.price}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {tours.length === 0 && (
            <p className="empty-text">暂无旅游线路，请在后台添加</p>
          )}
        </div>
      </section>
    </div>
  )
}
