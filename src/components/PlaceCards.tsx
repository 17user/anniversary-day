import { config } from '../data/content'

export default function PlaceCards() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(160deg, #fff8f9 0%, #fff0f3 100%)' }}>
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-14 reveal">
          <div className="text-xs tracking-[0.4em] text-gold font-sans mb-3">OUR PLACES</div>
          <h2 className="text-3xl sm:text-4xl font-serif-sc text-ink">我们去过的地方</h2>
          <div className="section-divider mt-4">
            <span className="text-gold text-lg">✈</span>
          </div>
          <p className="mt-4 text-sm text-muted font-sans max-w-sm mx-auto leading-relaxed">
            每一个地方，都有我们共同的回忆
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.places.map((place, i) => (
            <div
              key={place.name}
              className={`reveal reveal-delay-${(i % 4) + 1} group rounded-3xl p-6 shadow-card hover:shadow-hover transition-all duration-400 hover:-translate-y-1 cursor-default`}
              style={{ backgroundColor: place.color }}
            >
              <div className="text-4xl mb-3">{place.emoji}</div>
              <h3 className="text-lg font-serif-sc text-ink mb-2 group-hover:text-deeprose transition-colors duration-300">
                {place.name}
              </h3>
              <p className="text-sm text-muted font-sans leading-relaxed">{place.story}</p>
              {/* 装饰线 */}
              <div className="mt-4 w-8 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
