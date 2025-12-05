'use client'

import React from 'react'

interface DestinationCardProps {
  id: string | number
  title: string
  price: number
  originalPrice?: number | null
  duration: string
  destination: string
  video?: string
  image?: string
}

export default function DestinationCard({
  id,
  title,
  price,
  originalPrice,
  duration,
  destination,
  video,
  image,
}: DestinationCardProps) {
  return (
    <div className="destination-card-figma">
      <div className="destination-card-background">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="destination-card-video"
          />
        ) : image ? (
          <img src={image} alt={title} className="destination-card-image" />
        ) : null}
        <div className="destination-card-gradient"></div>
      </div>
      {/* 价格标签 - 左上角 */}
      <div className="destination-price-label">
        <p className="destination-price-label-text">人均价格</p>
        <div className="destination-price-wrapper">
          {originalPrice && (
            <span className="destination-price-original">¥{originalPrice}</span>
          )}
          <span className="destination-price-current">¥{price}</span>
        </div>
      </div>
      {/* 底部信息区 */}
      <div className="destination-card-info">
        <h3 className="destination-card-title">{title}</h3>
        <div className="destination-card-meta">
          <div className="destination-meta-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{duration}</span>
          </div>
          <div className="destination-meta-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
            <span>{destination}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

