import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [hasAudio, setHasAudio] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    // 检查音乐文件是否存在
    fetch('/music/bgm.mp3', { method: 'HEAD' })
      .then(r => { if (r.ok) setHasAudio(true) })
      .catch(() => {})
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !hasAudio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/bgm.mp3" loop />
      <button
        onClick={toggle}
        title={hasAudio ? (playing ? '暂停音乐' : '播放音乐') : '请将 bgm.mp3 放入 public/music/ 目录'}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-gold transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #E8A4A4 0%, #C97B7B 100%)' }}
        aria-label="音乐控制"
      >
        {playing ? (
          // 暂停图标 — 两条竖线
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="4" y="3" width="3.5" height="12" rx="1.5" fill="white"/>
            <rect x="10.5" y="3" width="3.5" height="12" rx="1.5" fill="white"/>
          </svg>
        ) : (
          // 播放图标 + 音符
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4.5v9l8-4.5-8-4.5z" fill="white"/>
          </svg>
        )}

        {/* 播放中旋转光环 */}
        {playing && (
          <span className="absolute inset-0 rounded-full border-2 border-gold opacity-60 animate-spin-slow pointer-events-none" />
        )}
      </button>
    </>
  )
}
