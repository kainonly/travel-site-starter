import React from 'react'
import { Star, Quote } from 'lucide-react'

export interface Testimonial {
  id: string | number
  name: string
  location: string
  rating: number
  comment: string
  avatar: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section section-testimonials">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">客户评价</h2>
          <p className="section-subtitle">阅读来自满意客户的真实评价</p>
        </div>
        <div className="testimonials-grid-new">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card-new">
              {/* 引号装饰 */}
              <div className="testimonial-quote-icon">
                <Quote className="testimonial-quote" />
              </div>

              {/* 评分 */}
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="testimonial-star" />
                ))}
              </div>

              {/* 评论内容 */}
              <p className="testimonial-content-new">"{testimonial.comment}"</p>

              {/* 用户信息 */}
              <div className="testimonial-author-new">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-location">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

