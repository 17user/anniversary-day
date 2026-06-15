import { useEffect } from 'react'
import Hero from './components/Hero'
import MusicPlayer from './components/MusicPlayer'
import Timeline from './components/Timeline'
import PhotoWall from './components/PhotoWall'
import LoveNote from './components/LoveNote'
import GiftBox from './components/GiftBox'
import Envelope from './components/Envelope'

// 滚动淡入 Hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useReveal()

  return (
    <div className="font-sans overflow-x-hidden">
      {/* 首屏 */}
      <Hero />

      {/* 我们的故事 */}
      <Timeline />
      <PhotoWall />
      <LoveNote />

      {/* 礼物盲盒 */}
      <GiftBox />

      {/* 情书信封 */}
      <Envelope />

      {/* 悬浮音乐播放器 */}
      <MusicPlayer />
    </div>
  )
}
