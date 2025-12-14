import React from 'react'
import { Shield, Award, Headphones, DollarSign, LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface WhyChooseUsSectionProps {
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: Shield,
    title: '安全支付',
    description: '安全加密的支付处理，全面的买家保护',
  },
  {
    icon: Award,
    title: '品质保证',
    description: '精心挑选的旅游线路，真实评价和质量保障',
  },
  {
    icon: Headphones,
    title: '24/7 客服',
    description: '全天候客户服务，让您安心无忧',
  },
  {
    icon: DollarSign,
    title: '最优价格',
    description: '价格匹配保证，会员专享优惠',
  },
]

export default function WhyChooseUsSection({ features = defaultFeatures }: WhyChooseUsSectionProps) {
  return (
    <section className="section section-features">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">为什么选择我们</h2>
          <p className="section-subtitle">我们提供卓越的服务和难忘的体验</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="feature-item-new">
                <div className="feature-icon-wrapper">
                  <Icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

