'use client'

import React, { useState } from 'react'
import ReactPlayer from 'react-player'

interface HeroVideoProps {
  videoUrl: string
}

export default function HeroVideo({ videoUrl }: HeroVideoProps) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="hero-video-wrapper">
      {!isReady && (
        <div className="video-loading">
          <div className="video-loading-spinner"></div>
        </div>
      )}
      <ReactPlayer
        src={videoUrl}
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        className="react-player"
        pip={false}
        controls={false}
        light={false}
        volume={0}
        playbackRate={1}
        onReady={() => setIsReady(true)}
        onStart={() => setIsReady(true)}
        onError={(error) => {
          console.error('Video playback error:', error)
          setIsReady(true)
        }}
      />
    </div>
  )
}
