import { config } from '../data/content'

export default function PhotoWall() {
  const photos = config.photos

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-14 reveal">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">MEMORIES</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">日常点滴</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">📷</span>
          </div>
          <p className="mt-4 text-sm text-muted font-sans max-w-sm mx-auto leading-relaxed">
            每一张照片，都是我们故事的一页
          </p>
        </div>

        {/* 照片墙 — 瀑布流 */}
        <div className="columns-2 sm:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 4) + 1} break-inside-avoid group relative rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-400`}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                /* 占位卡片（无图片时显示） */
                <div
                  className="w-full flex flex-col items-center justify-center gap-2 bg-blush"
                  style={{ minHeight: i % 3 === 0 ? '200px' : i % 3 === 1 ? '160px' : '220px' }}
                >
                  <div className="text-4xl opacity-60">{photo.emoji}</div>
                  <div className="text-xs text-muted font-sans px-4 text-center leading-relaxed">
                    把你们的照片放到<br />
                    <code className="text-deeprose text-[10px]">public/images/</code><br />
                    然后修改 content.ts
                  </div>
                </div>
              )}

              {/* 悬浮文字遮罩 */}
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-sans leading-tight">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
