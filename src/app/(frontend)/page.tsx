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
        <div className="hero-content">
          <h1>探索世界的美丽</h1>
          <p>发现令人心动的目的地，开启一段难忘的旅程</p>
        </div>
      </section>

      {/* 目的地列表 */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">热门目的地</h2>
          <div className="destinations-grid">
            {destinations.map((destination) => {
              const imageUrl =
                typeof destination.image === 'object' && destination.image?.url
                  ? destination.image.url
                  : '/placeholder.jpg'

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
          <div className="tours-grid">
            {tours.map((tour) => {
              const imageUrl =
                typeof tour.image === 'object' && tour.image?.url
                  ? tour.image.url
                  : '/placeholder.jpg'

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
