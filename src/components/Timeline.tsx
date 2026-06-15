import { useState, useEffect, useRef } from 'react'
import { config } from '../data/content'

type TimelineItem = typeof config.timeline[0]

const AUTO_PLAY_INTERVAL = 3000 // 3秒自动切换

// 弹窗组件
function TimelineModal({
  item,
  onClose,
}: {
  item: TimelineItem
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const photos = item.photos ?? []
  const hasPhotos = photos.some(p => p.src)

  const prev = () => { setCurrent(i => (i - 1 + photos.length) % photos.length); setPaused(true) }
  const next = () => { setCurrent(i => (i + 1) % photos.length); setPaused(true) }

  // 自动轮播
  useEffect(() => {
    if (!hasPhotos || photos.length <= 1 || paused) return
    timerRef.current = setInterval(() => {
      setCurrent(i => (i + 1) % photos.length)
    }, AUTO_PLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [hasPhotos, photos.length, paused])

  // 手动操作后3秒恢复自动播放
  useEffect(() => {
    if (!paused) return
    const t = setTimeout(() => setPaused(false), 3000)
    return () => clearTimeout(t)
  }, [paused])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(61,43,43,0.5)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-hover animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-blush flex items-center justify-center text-muted hover:bg-petal transition-colors duration-200"
          aria-label="关闭"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#8B6F6F" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 头部 */}
        <div className="px-7 pt-7 pb-4 text-center border-b border-petal">
          <div className="text-3xl mb-2">{item.emoji}</div>
          <div className="text-xs text-muted font-sans tracking-widest mb-1">{item.date}</div>
          <h3 className="text-xl font-serif-sc text-ink">{item.title}</h3>
        </div>

        {/* 照片区域 */}
        {hasPhotos ? (
          <div className="px-6 pt-5">
            {/* 主图 */}
            <div className="relative rounded-2xl overflow-hidden bg-blush"
              style={{ minHeight: '220px' }}>
              {photos[current].src ? (
                <img
                  src={photos[current].src}
                  alt={photos[current].caption}
                  className="w-full object-cover max-h-72"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-52 gap-2">
                  <div className="text-4xl opacity-40">📷</div>
                  <div className="text-xs text-muted font-sans">照片待添加</div>
                </div>
              )}

              {/* 左右切换按钮（多于1张才显示） */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-soft hover:bg-white transition-colors duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="#C97B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-soft hover:bg-white transition-colors duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="#C97B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* 照片说明 */}
            {photos[current].caption && (
              <p className="text-center text-xs text-muted font-sans mt-2 mb-1">
                {photos[current].caption}
              </p>
            )}

            {/* 缩略图指示点 + 进度条 */}
            {photos.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setPaused(true) }}
                    className="relative rounded-full overflow-hidden bg-petal transition-all duration-300"
                    style={{ width: i === current ? '16px' : '8px', height: '8px' }}
                  >
                    {i === current && !paused && (
                      <span
                        className="absolute inset-0 rounded-full bg-deeprose origin-left"
                        style={{ animation: `progressBar ${AUTO_PLAY_INTERVAL}ms linear forwards` }}
                      />
                    )}
                    {i === current && paused && (
                      <span className="absolute inset-0 rounded-full bg-deeprose" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 没有照片时只显示占位 */
          <div className="mx-6 mt-5 rounded-2xl bg-blush flex flex-col items-center justify-center py-10 gap-2">
            <div className="text-4xl opacity-40">📷</div>
            <div className="text-xs text-muted font-sans text-center leading-relaxed">
              在 content.ts 的 timeline 里<br/>给这个节点添加照片吧
            </div>
          </div>
        )}

        {/* 文字描述 */}
        <div className="px-7 py-6">
          <p className="font-serif-sc text-ink leading-[2] text-sm sm:text-base text-center">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const [activeItem, setActiveItem] = useState<TimelineItem | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16 reveal">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">OUR STORY</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">重要的日子</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">♥</span>
          </div>
          <p className="mt-4 text-xs text-muted font-sans tracking-wider">点击卡片查看照片</p>
        </div>

        {/* 时间轴 */}
        <div className="relative">
          {/* 中轴线 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, transparent, #E8A4A4 10%, #E8A4A4 90%, transparent)' }}
          />
          {/* 移动端左轴线 */}
          <div className="absolute left-6 top-0 bottom-0 w-px sm:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, #E8A4A4 10%, #E8A4A4 90%, transparent)' }}
          />

          <div className="flex flex-col gap-10">
            {config.timeline.map((item, i) => {
              const isRight = i % 2 === 0
              return (
                <div
                  key={item.date}
                  className={`reveal reveal-delay-${(i % 4) + 1} relative flex items-start gap-4
                    sm:flex-row ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                    flex-row pl-14 sm:pl-0`}
                >
                  {/* 内容卡片 — 可点击 */}
                  <div className={`flex-1 ${isRight ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                    <div
                      onClick={() => setActiveItem(item)}
                      className="inline-block bg-blush rounded-2xl px-5 py-4 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer group"
                    >
                      <div className="text-xs text-muted font-sans tracking-wider mb-1">{item.date}</div>
                      <div className="text-base sm:text-lg font-serif-sc text-ink mb-1.5 group-hover:text-deeprose transition-colors duration-200">
                        {item.emoji} {item.title}
                      </div>
                      <div className="text-sm text-muted font-sans leading-relaxed">{item.desc}</div>
                      {/* 点击提示 */}
                      <div className="mt-2 flex items-center gap-1 text-gold text-xs font-sans">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <circle cx="5" cy="5" r="4" stroke="#E8A4A4" strokeWidth="1"/>
                          <path d="M3.5 5h3M5 3.5v3" stroke="#E8A4A4" strokeWidth="1" strokeLinecap="round"/>
                        </svg>
                        查看照片
                      </div>
                    </div>
                  </div>

                  {/* 中心节点 */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-4 w-5 h-5 rounded-full border-2 border-gold bg-white flex items-center justify-center z-10 shadow-soft">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>

                  {/* 占位（桌面端对称布局用） */}
                  <div className="hidden sm:block flex-1" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      {activeItem && (
        <TimelineModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  )
}
