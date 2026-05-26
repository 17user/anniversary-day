import { config } from '../data/content'

export default function LoveNote() {
  const paragraphs = config.loveNote.split('\n')

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff0f3 0%, #ffe8ed 50%, #ffd6e0 100%)' }}
    >
      {/* 装饰大字背景 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="text-[20rem] font-script text-petal opacity-20 leading-none">
          ♥
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 标题 */}
        <div className="reveal mb-12">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">LOVE NOTE</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">想对你说的话</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">💌</span>
          </div>
        </div>

        {/* 正文 */}
        <div className="reveal reveal-delay-2 bg-white/70 backdrop-blur-sm rounded-3xl px-8 sm:px-12 py-10 shadow-soft text-left">
          {paragraphs.map((line, i) => (
            line.trim() === '' ? (
              <div key={i} className="h-4" />
            ) : (
              <p
                key={i}
                className="font-serif-sc text-ink leading-[2] text-base sm:text-lg"
              >
                {line}
              </p>
            )
          ))}
        </div>

        {/* 签名 */}
        <div className="reveal reveal-delay-3 mt-8">
          <div className="text-2xl font-script text-deeprose">With all my love ♥</div>
        </div>
      </div>
    </section>
  )
}
