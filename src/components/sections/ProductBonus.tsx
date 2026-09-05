/* =============================================================
   src/components/sections/ProductBonus.tsx
   SECTION 04: 제품 구성 & 특별 부록 안내 — 서버 컴포넌트
   ============================================================= */

import Image from "next/image";
import { BONUSES } from "@constants/landingData";

export default function ProductBonus() {
  return (
    <section id="bonuses" className="py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <span className="inline-block bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            BONUS PACKAGE
          </span>
          <h2 className="text-white font-black text-3xl md:text-4xl break-keep">
            《바로 써먹는 실전 올인원 치트북 &amp; 시크릿 패키지》
          </h2>
          <p className="text-slate-400 mt-4">구매 즉시 받으시는 5가지 특별 부록</p>
        </div>

        {/* ── 태블릿 목업 + 부록 목록 ───────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* 태블릿 목업 이미지
              ⚠️ 이미지 교체 안내:
              /public/tablet-mockup.png 파일을 교체하거나
              다른 이미지를 사용하려면 아래 src 값을 변경하세요.
              권장 크기: 400x500px (PNG, 배경 투명)
          */}
          <div className="flex justify-center">
            <div className="relative float-animation">
              <Image
                src="/tablet-mockup.png"
                alt="태블릿에서 보이는 AI 콘텐츠 워크플로우 가이드"
                width={380}
                height={450}
                className="object-contain drop-shadow-2xl"
              />
              {/* 즉시 발송 뱃지 */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                ✓ 결제 즉시 발송
              </div>
            </div>
          </div>

          {/* 부록 목록 */}
          <div className="space-y-4">
            {BONUSES.map((bonus, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-blue-400/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:bg-white/10 card-hover"
              >
                <div className="text-3xl shrink-0">{bonus.emoji}</div>
                <div>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {bonus.label}
                  </span>
                  <h3 className="text-white font-bold text-base mt-0.5 mb-1">
                    {bonus.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
