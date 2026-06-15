import { useEffect, useRef, useState } from 'react'
import { config } from '../data/content'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// 计算距纪念日还有多少天
function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

// 花瓣粒子
interface Petal {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  rotation: number
  rotationSpeed: number
  color: string
}

const PETAL_COLORS = ['#FFD6E0', '#FFB3C6', '#E8A4A4', '#FFC0CB', '#FFAEC0']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalsRef = useRef<Petal[]>([])
  const animFrameRef = useRef<number>(0)
  const [quoteVisible, setQuoteVisible] = useState(false)
  const [countVisible, setCountVisible] = useState(false)
  const days = getDaysUntil(config.anniversaryDate)

  // 初始化并运行花瓣动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 初始化花瓣
    const count = Math.min(40, Math.floor(window.innerWidth / 30))
    petalsRef.current = Array.from({ length: count }, () => createPetal(canvas))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petalsRef.current.forEach((p, i) => {
        // 绘制椭圆花瓣
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // 更新位置
        p.y += p.speedY
        p.x += Math.sin(p.y * 0.02) * 0.8 + p.speedX
        p.rotation += p.rotationSpeed

        // 飞出屏幕后重置
        if (p.y > canvas.height + 20) {
          petalsRef.current[i] = createPetal(canvas, true)
        }
      })
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    // 依次显示倒计时和情话
    const t1 = setTimeout(() => setCountVisible(true), 300)
    const t2 = setTimeout(() => setQuoteVisible(true), 1200)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fff8f9 0%, #fff0f3 60%, #ffe8ed 100%)' }}
    >
      {/* 背景图 */}
      <img
        src={`${base}/images/hero-bg.png`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Canvas 花瓣 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* 日期标签 */}
        <div
          className={`text-sm tracking-[0.3em] text-deeprose font-sans transition-all duration-1000 ${countVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          2024.06.15 — 2026.06.15
        </div>

        {/* 倒计时主体 */}
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-1000 delay-100 ${countVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {days > 0 ? (
            <>
              <div className="text-[5rem] sm:text-[8rem] font-serif-sc font-light leading-none text-gradient select-none">
                {days}
              </div>
              <div className="text-xl sm:text-2xl font-serif-sc text-deeprose tracking-widest">
                天
              </div>
              <div className="text-base sm:text-lg font-sans text-muted tracking-wide mt-1">
                距离我们的两周年纪念日
              </div>
            </>
          ) : days === 0 ? (
            <>
              <div className="text-5xl sm:text-7xl font-script text-gradient animate-pulse-soft">
                Happy Anniversary!
              </div>
              <div className="text-lg sm:text-xl font-sans text-deeprose tracking-wide mt-2">
                今天是我们在一起两周年 💕
              </div>
            </>
          ) : (
            <>
              <div className="text-[5rem] sm:text-[8rem] font-serif-sc font-light leading-none text-gradient select-none">
                {Math.abs(days)}
              </div>
              <div className="text-xl sm:text-2xl font-serif-sc text-deeprose tracking-widest">
                天
              </div>
              <div className="text-base sm:text-lg font-sans text-muted tracking-wide mt-1">
                我们已经在一起了
              </div>
            </>
          )}
        </div>

        {/* 纪念日日期 */}
        <div
          className={`text-sm sm:text-base font-sans text-muted tracking-[0.2em] transition-all duration-1000 delay-200 ${countVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          2026.06.15　我们的两周年
        </div>

        {/* 专属情话 */}
        <div
          className={`mt-4 max-w-sm transition-all duration-1200 delay-300 ${quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="text-xl sm:text-2xl font-script text-deeprose leading-relaxed">
            "{config.loveQuote}"
          </div>
          <div className="mt-3 w-16 h-px mx-auto bg-gold" />
        </div>

        {/* 向下滚动提示 */}
        <div
          className={`mt-8 flex flex-col items-center gap-2 text-muted text-xs tracking-widest transition-all duration-1000 delay-500 ${quoteVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="font-sans">向下滚动</span>
          <div className="animate-bounce-soft">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 9l5 5 5-5" stroke="#C97B7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #fff8f9)' }}
      />
    </section>
  )
}

function createPetal(canvas: HTMLCanvasElement, fromTop = false): Petal {
  return {
    x: Math.random() * canvas.width,
    y: fromTop ? -10 : Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 1.2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }
}
