import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 获取目的地列表（更多数量用于热门目的地展示）
  const { docs: destinations } = await payload.find({
    collection: 'destinations',
    limit: 9,
  })

  // 获取热门线路
  const { docs: tours } = await payload.find({
    collection: 'tours',
    limit: 6,
  })

  // 模拟数据 - 热门目的地（带数量）
  const popularDestinations = [
    { name: '印度', tours: 20 },
    { name: '希腊', tours: 67 },
    { name: '法国', tours: 50 },
    { name: '英国', tours: 17 },
    { name: '意大利', tours: 22 },
    { name: '埃及', tours: 93 },
    { name: '新西兰', tours: 27 },
    { name: '马尔代夫', tours: 51 },
    { name: '克罗地亚', tours: 33 },
  ]

  // 模拟数据 - 最后一刻优惠
  const lastMinuteOffers = [
    {
      title: '加尔达湖附近的森林探险',
      originalPrice: 1400,
      discountPrice: 435,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    },
    {
      title: '日本穷游之旅',
      originalPrice: 1400,
      discountPrice: 399,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    },
    {
      title: '探索加勒比海岛屿',
      originalPrice: 1400,
      discountPrice: 555,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    },
  ]

  // 模拟数据 - 客户评价
  const testimonials = [
    {
      content: '我想非常感谢您为我和我姐姐计划了这次法国之旅。这次旅行非常棒，超出了我的预期！我们度过了一段美好的时光，非常满意。',
      author: '简·史密斯',
    },
    {
      content: '我们在马达加斯加、津巴布韦和博茨瓦纳的旅行非常愉快，体验非常棒。您的服务很出色，每个人都非常细心！',
      author: '彼得·麦克米伦',
    },
    {
      content: '我想说非常感谢您帮我安排了一次精彩的哥斯达黎加冒险之旅！我和我的侄子玩得很开心！所有的住宿都很完美，谢谢！',
      author: '凯特·威尔逊',
    },
    {
      content: '您为我们安排的意大利之旅非常完美。每一个接触点，每一次冒险，都感觉您是精心为我们计划和安排的。感谢您所做的一切！',
      author: '萨曼莎·李',
    },
  ]

  return (
    <div className="home-page">
      {/* Hero 区域 - 视频背景 */}
      <section className="hero">
        <div className="hero-video-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          >
            <source
              src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
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
      </section>

      {/* 热门目的地 */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">热门目的地</h2>
            <Link href="/destinations" className="section-link">查看全部</Link>
          </div>
          <div className="popular-destinations-grid">
            {popularDestinations.map((dest, idx) => {
              const destinationImages = [
                'https://images.unsplash.com/photo-1533050487297-09b450131914?w=400&q=80',
                'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&q=80',
                'https://images.unsplash.com/photo-1499856871958-5b962c5dcc8f?w=400&q=80',
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
                'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
              ]
              return (
                <div key={idx} className="popular-destination-card">
                  <div className="popular-dest-image">
                    <Image
                      src={destinationImages[idx % destinationImages.length]}
                      alt={dest.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="popular-dest-content">
                    <h3>{dest.name}</h3>
                    <p className="tour-count">{dest.tours} 条线路</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 精选旅游线路 */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">精选线路</h2>
          <div className="featured-tours-grid">
            {tours.slice(0, 6).map((tour) => {
              const imageUrl =
                typeof tour.image === 'object' && tour.image?.url
                  ? tour.image.url
                  : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80'

              return (
                <div key={tour.id} className="featured-tour-card">
                  <div className="tour-card-image">
                    <Image
                      src={imageUrl}
                      alt={tour.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="tour-rating">
                      <span>⭐</span>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="tour-card-content">
                    <div className="tour-hotel">豪华酒店 5*</div>
                    <h3>{tour.title}</h3>
                    <div className="tour-meta">
                      <span className="tour-reviews">4 评价</span>
                      <span className="tour-duration">{tour.duration || '5天'}</span>
                    </div>
                    <div className="tour-price">
                      <span className="price">¥{tour.price}</span>
                      <span className="price-label">起/人</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {tours.length === 0 && (
            <p className="empty-text">暂无旅游线路，请在后台添加</p>
          )}
          <div className="section-footer">
            <Link href="/tours" className="btn-view-all">查看所有线路</Link>
          </div>
        </div>
      </section>

      {/* 最快预订方式 - 统计数据 */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-content">
            <h2 className="stats-title">最快方式预订超过 450 条精彩线路</h2>
            <p className="stats-description">
              我们为全球旅行者和客户提供各种精彩的旅行线路。我们以实惠的价格提供最优惠的交易！
              <br />
              我们的旅行社是廉价机票以及为喜欢探索未旅行世界路径的游客和人们提供优惠的领先提供商。我们可以为您、您的家人和朋友创造最难忘的假期！
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5690</div>
              <div className="stat-label">已售机票</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1346</div>
              <div className="stat-label">已预订线路</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10679</div>
              <div className="stat-label">网站访客</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">678+</div>
              <div className="stat-label">认证酒店</div>
            </div>
          </div>
        </div>
      </section>

      {/* 最后一刻优惠 */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">最后一刻优惠</h2>
            <p className="section-subtitle">
              我们为您挑选了一些令人惊叹的最后一刻假期优惠供您选择。这些优惠不会持续太久，所以赶快预订您的吧！
            </p>
          </div>
          <div className="last-minute-grid">
            {lastMinuteOffers.map((offer, idx) => (
              <div key={idx} className="last-minute-card">
                <div className="last-minute-image">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="discount-badge">-{offer.discount}%</div>
                </div>
                <div className="last-minute-content">
                  <h3>{offer.title}</h3>
                  <div className="last-minute-price">
                    <span className="original-price">¥{offer.originalPrice}</span>
                    <span className="discount-price">¥{offer.discountPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户评价 */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">客户评价</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-content">{testimonial.content}</p>
                <p className="testimonial-author">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 找到完美旅程 */}
      <section className="section find-tour-section">
        <div className="container">
          <div className="find-tour-content">
            <h2>找到您的完美旅程</h2>
            <p>在我们的网站上，您可以找到梦想中的旅程，100% 保证。</p>
            <button className="find-tour-btn">搜索</button>
          </div>
        </div>
      </section>
    </div>
  )
}
