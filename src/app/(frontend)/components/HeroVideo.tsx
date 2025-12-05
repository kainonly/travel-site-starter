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
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        pip={false}
        controls={false}
        light={false}
        volume={0}
        playbackRate={1}
        playsInline={true}
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
