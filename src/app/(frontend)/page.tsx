import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import HeroSection from './components/HeroSection'
import FeaturedToursSection, { Tour } from './components/FeaturedToursSection'
import TravelCategoriesSection, { TravelCategory } from './components/TravelCategoriesSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'
import TestimonialsSection, { Testimonial } from './components/TestimonialsSection'
import NewsletterSection from './components/NewsletterSection'
import './styles.css'
import { Building2, Landmark, Mountain, Waves } from 'lucide-react'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 获取热门线路
  const { docs: tours } = await payload.find({
    collection: 'tours',
    limit: 6,
  })

  // 精选旅游线路数据（从后端获取或使用模拟数据）
  const featuredTours: Tour[] =
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
  const travelCategories: TravelCategory[] = [
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
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: '王美丽',
      location: '北京，中国',
      rating: 5,
      comment: '非常棒的体验！行程安排得很好，导游知识渊博。一定会再次预订。',
      avatar: 'https://images.unsplash.com/photo-1589553009868-c7b2bb474531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0OTAxNTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      name: '陈浩然',
      location: '上海，中国',
      rating: 5,
      comment: '我用过最好的旅行社。价格优惠，服务出色，回忆难忘。强烈推荐！',
      avatar: 'https://images.unsplash.com/photo-1633177188754-980c2a6b6266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDk0NzA2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      name: '李晓婷',
      location: '广州，中国',
      rating: 5,
      comment: '对细节的关注令人印象深刻。从头到尾一切都很完美。感谢这次难忘的旅行！',
      avatar: 'https://images.unsplash.com/photo-1747707499498-7077014c4423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHlvdW5nJTIwd29tYW58ZW58MXx8fHwxNzY0OTQ3MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ]

  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedToursSection tours={featuredTours} />
      <TravelCategoriesSection categories={travelCategories} />
      <WhyChooseUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection />
    </div>
  )
}
