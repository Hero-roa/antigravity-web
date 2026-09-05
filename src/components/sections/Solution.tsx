/* =============================================================
   src/components/sections/Solution.tsx
   SECTION 03: 핵심 혜택 + OSMU 파이프라인 시각화 — 서버 컴포넌트
   ============================================================= */

import { BENEFITS } from "@constants/landingData";
import { renderBenefitIcon } from "@components/ui/Icons";

export default function Solution() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-slate-900 font-black text-3xl md:text-4xl leading-tight">
            내 말투와 개성은 100% 유지하면서<br />
            <span className="gradient-text">제작 시간만 10분으로 줄이는</span> 워크플로우
          </h2>
        </div>

        {/* ── 핵심 혜택 카드 4개 ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-b ${benefit.color} border border-slate-200 rounded-3xl p-6 card-hover bg-white shadow-sm`}
            >
              {/* 아이콘: iconName → renderBenefitIcon 헬퍼로 변환 */}
              <div className={`w-14 h-14 ${benefit.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                {renderBenefitIcon(benefit.iconName)}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* ── OSMU 파이프라인 시각화 다이어그램 ──────────────── */}
        <div className="mt-14 bg-slate-900 rounded-3xl p-8 md:p-12 text-center">
          <p className="text-slate-400 text-sm mb-4 uppercase tracking-widest font-semibold">
            OSMU 파이프라인
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white flex-wrap">

            {/* 입력: 키워드 1개 */}
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl mb-2">🔑</div>
              <div className="font-black text-lg">키워드 1개</div>
            </div>

            {/* 화살표 (데스크톱: →, 모바일: ↓) */}
            <div className="text-slate-500 text-2xl font-black hidden sm:block">→</div>
            <div className="text-slate-500 text-2xl font-black sm:hidden">↓</div>

            {/* 출력: 3채널 콘텐츠 */}
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { emoji: "📝", label: "블로그 SEO 포스팅" },
                { emoji: "📸", label: "인스타 카드뉴스" },
                { emoji: "🎬", label: "숏폼 대본 30초" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-emerald-600/20 border border-emerald-500/30 rounded-2xl px-5 py-4 text-center"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-emerald-300 text-sm font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-400 text-sm mt-6">
            ⚡ 한 번의 호흡으로 3채널 콘텐츠 완성!
          </p>
        </div>
      </div>
    </section>
  );
}
