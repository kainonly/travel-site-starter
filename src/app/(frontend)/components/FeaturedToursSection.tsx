import Link from 'next/link'
import React from 'react'
import DestinationCard from './DestinationCard'

export interface Tour {
  id: string | number
  title: string
  price: number
  originalPrice?: number | null
  duration: string
  destination: string
  video?: string
  image?: string
}

interface FeaturedToursSectionProps {
  tours: Tour[]
}

export default function FeaturedToursSection({ tours }: FeaturedToursSectionProps) {
  return (
    <section className="section section-featured-tours">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">精选旅游线路</h2>
          <p className="section-subtitle">
            这些是我们最受欢迎的旅游线路，精心为您挑选。希望您能在下面找到感兴趣的目的地。
          </p>
        </div>
        <div className="featured-tours-grid-new">
          {tours.map((tour) => (
            <DestinationCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              price={tour.price}
              originalPrice={tour.originalPrice}
              duration={tour.duration}
              destination={tour.destination}
              video={tour.video}
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
  )
}

