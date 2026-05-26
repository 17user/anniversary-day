import { config } from '../data/content'

export default function Timeline() {
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
                  {/* 内容卡片 */}
                  <div className={`flex-1 ${isRight ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                    <div className="inline-block bg-blush rounded-2xl px-5 py-4 shadow-card hover:shadow-hover transition-shadow duration-300 text-left">
                      <div className="text-xs text-muted font-sans tracking-wider mb-1">{item.date}</div>
                      <div className="text-base sm:text-lg font-serif-sc text-ink mb-1.5">
                        {item.emoji} {item.title}
                      </div>
                      <div className="text-sm text-muted font-sans leading-relaxed">{item.desc}</div>
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
    </section>
  )
}
