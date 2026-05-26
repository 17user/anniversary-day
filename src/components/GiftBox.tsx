import { useState } from 'react'
import { config } from '../data/content'

type GiftState = 'idle' | 'flipped' | 'locked'

export default function GiftBox() {
  const [flipped, setFlipped] = useState<number | null>(null)   // 当前翻开的盒子 id
  const [chosen, setChosen] = useState<number | null>(null)     // 最终选定的盒子 id
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClick = (id: number) => {
    if (chosen !== null) return  // 已选定，不可再操作
    if (flipped === id) {
      // 已翻开 → 选定
      setChosen(id)
      setShowConfirm(true)
    } else {
      // 翻开这个盒子（同时收起其他）
      setFlipped(id)
    }
  }

  const getState = (id: number): GiftState => {
    if (chosen !== null) return chosen === id ? 'flipped' : 'locked'
    return flipped === id ? 'flipped' : 'idle'
  }

  const chosenGift = config.gifts.find(g => g.id === chosen)

  return (
    <section className="py-20 px-4 sm:px-6 bg-white relative">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-4 reveal">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">SURPRISE</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">礼物盲盒</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">🎁</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted font-sans mb-12 reveal reveal-delay-1">
          三个盒子，三份惊喜，点击翻开，再点一次确认选择 💕
        </p>

        {/* 礼物盒子 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {config.gifts.map((gift, i) => {
            const state = getState(gift.id)
            const isFlipped = state === 'flipped'
            const isLocked = state === 'locked'

            return (
              <div
                key={gift.id}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center`}
              >
                {/* 3D 翻转容器 */}
                <div
                  className={`perspective-1000 w-full cursor-pointer transition-all duration-300
                    ${isLocked ? 'opacity-40 scale-95 cursor-not-allowed' : 'hover:scale-105'}`}
                  style={{ height: '220px' }}
                  onClick={() => handleClick(gift.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleClick(gift.id)}
                  aria-label={`礼物盒 ${gift.id}`}
                >
                  <div
                    className={`transform-style-3d relative w-full h-full transition-transform duration-700`}
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* 正面 */}
                    <div
                      className="backface-hidden absolute inset-0 rounded-3xl flex flex-col items-center justify-center shadow-card"
                      style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFD6E0 100%)' }}
                    >
                      <div className="text-6xl mb-3 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                        🎁
                      </div>
                      <div className="text-4xl font-serif-sc text-deeprose font-light">?</div>
                      <div className="mt-3 text-xs text-muted font-sans tracking-wider">
                        礼物 {gift.id}
                      </div>
                      <div className="mt-2 text-xs text-gold font-sans">
                        点击翻开
                      </div>
                    </div>

                    {/* 背面 */}
                    <div
                      className="backface-hidden rotate-y-180 absolute inset-0 rounded-3xl flex flex-col items-center justify-center px-5 shadow-hover text-center"
                      style={{ background: 'linear-gradient(135deg, #C97B7B 0%, #E8A4A4 100%)' }}
                    >
                      <div className="text-3xl mb-3">✨</div>
                      <div className="text-white font-serif-sc text-lg mb-2">{gift.name}</div>
                      <div className="text-white/90 font-sans text-xs leading-relaxed whitespace-pre-line">
                        {gift.desc}
                      </div>
                      <div className="mt-3 text-white/70 font-sans text-xs italic">
                        {gift.hint}
                      </div>
                      {chosen === null && (
                        <div className="mt-4 px-4 py-1.5 bg-white/20 rounded-full text-white text-xs font-sans">
                          再次点击确认选择
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 盒子编号 */}
                <div className={`mt-3 text-xs font-sans tracking-wider transition-colors duration-300
                  ${isFlipped ? 'text-deeprose' : isLocked ? 'text-muted/40' : 'text-muted'}`}>
                  No.{gift.id}
                </div>
              </div>
            )
          })}
        </div>

        {/* 选定确认弹窗 */}
        {showConfirm && chosenGift && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(61,43,43,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowConfirm(false)}
          >
            <div
              className="bg-white rounded-3xl px-8 py-10 max-w-sm w-full text-center shadow-hover animate-fade-in-up"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-serif-sc text-ink mb-2">你选择了</h3>
              <div className="text-xl font-script text-deeprose mb-4">{chosenGift.name}</div>
              <p className="text-sm text-muted font-sans leading-relaxed mb-6">
                我会为你亲手准备好它 💕<br />等我哦~
              </p>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-3 rounded-full text-white text-sm font-sans shadow-gold hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{ background: 'linear-gradient(135deg, #E8A4A4 0%, #C97B7B 100%)' }}
              >
                好的，期待你！
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
