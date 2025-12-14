import React from 'react'
import { LucideIcon } from 'lucide-react'

export interface TravelCategory {
  icon: LucideIcon
  title: string
  description: string
  image: string
  count: number
}

interface TravelCategoriesSectionProps {
  categories: TravelCategory[]
}

export default function TravelCategoriesSection({ categories }: TravelCategoriesSectionProps) {
  return (
    <section className="section section-alt-new">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">按类别旅行</h2>
          <p className="section-subtitle">从我们多样化的旅行体验中选择</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, idx) => {
            const Icon = category.icon
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

