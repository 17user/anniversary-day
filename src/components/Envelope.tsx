import { useState } from 'react'
import { config } from '../data/content'

export default function Envelope() {
  const [opened, setOpened] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const lines = config.loveLetter.split('\n')

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => setLetterVisible(true), 500)
  }

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fff0f3 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-14 reveal">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">FOR YOU</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">有封信，给你的</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">✉</span>
          </div>
        </div>

        {/* 信封区域 */}
        <div className="reveal reveal-delay-2 flex flex-col items-center">
          {!opened ? (
            /* 未开封信封 */
            <button
              onClick={handleOpen}
              className="group flex flex-col items-center gap-4 focus:outline-none"
              aria-label="打开信封"
            >
              {/* 信封 SVG */}
              <div className="relative w-52 h-36 cursor-pointer transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                {/* 信封身体 */}
                <svg viewBox="0 0 208 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                  {/* 信封底部 */}
                  <rect x="2" y="20" width="204" height="122" rx="8" fill="#FFF0F3" stroke="#E8A4A4" strokeWidth="2"/>
                  {/* 左下折角 */}
                  <path d="M2 28 L100 90" stroke="#E8A4A4" strokeWidth="1.5"/>
                  {/* 右下折角 */}
                  <path d="M206 28 L108 90" stroke="#E8A4A4" strokeWidth="1.5"/>
                  {/* 信封盖（未开封） */}
                  <path d="M2 20 L104 88 L206 20 Z" fill="#FFD6E0" stroke="#E8A4A4" strokeWidth="2" strokeLinejoin="round"/>
                  {/* 封口爱心 */}
                  <path d="M104 70 C104 70 96 62 92 58 C88 54 84 56 84 60 C84 64 88 68 96 74 L104 80 L112 74 C120 68 124 64 124 60 C124 56 120 54 116 58 C112 62 104 70 104 70Z"
                    fill="#E8A4A4"/>
                </svg>
              </div>
              <div className="text-sm text-muted font-sans tracking-wider animate-pulse-soft">
                点击打开信封
              </div>
              <div className="text-xs text-gold font-script text-xl">tap to open ♥</div>
            </button>
          ) : (
            /* 已开封 — 信封 + 信纸 */
            <div className="flex flex-col items-center gap-6 w-full">
              {/* 开封后的信封（盖翻开） */}
              <div className="relative w-52 h-36">
                <svg viewBox="0 0 208 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                  <rect x="2" y="20" width="204" height="122" rx="8" fill="#FFF0F3" stroke="#E8A4A4" strokeWidth="2"/>
                  <path d="M2 28 L100 90" stroke="#E8A4A4" strokeWidth="1.5"/>
                  <path d="M206 28 L108 90" stroke="#E8A4A4" strokeWidth="1.5"/>
                  {/* 翻开的盖（朝上翻转） */}
                  <path d="M2 20 L104 -30 L206 20 Z" fill="#FFD6E0" stroke="#E8A4A4" strokeWidth="2" strokeLinejoin="round"
                    style={{ transformOrigin: '104px 20px', transform: 'rotateX(180deg)' }}/>
                </svg>
              </div>

              {/* 信纸 */}
              {letterVisible && (
                <div className="w-full bg-white rounded-3xl px-8 sm:px-12 py-10 shadow-soft border border-petal animate-fade-in-up">
                  {/* 信纸装饰线 */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-petal"/>
                    <span className="text-gold text-xl">♥</span>
                    <div className="flex-1 h-px bg-petal"/>
                  </div>

                  {lines.map((line, i) => (
                    line.trim() === '' ? (
                      <div key={i} className="h-4" />
                    ) : (
                      <p key={i} className="font-serif-sc text-ink leading-[2.2] text-base">
                        {line}
                      </p>
                    )
                  ))}

                  {/* 底部装饰 */}
                  <div className="flex items-center gap-3 mt-6">
                    <div className="flex-1 h-px bg-petal"/>
                    <span className="text-gold text-xl">♥</span>
                    <div className="flex-1 h-px bg-petal"/>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 页脚 */}
        <div className="text-center mt-20 reveal">
          <div className="text-gold text-2xl font-script mb-2">♥ ♥ ♥</div>
          <p className="text-xs text-muted font-sans tracking-widest">© 2026 只属于我们的两年</p>
        </div>
      </div>
    </section>
  )
}
