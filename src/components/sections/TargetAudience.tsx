/* =============================================================
   src/components/sections/TargetAudience.tsx
   SECTION 05: 이런 분들께 추천합니다 (체크리스트) — 서버 컴포넌트
   ============================================================= */

import { TARGETS } from "@constants/landingData";
import { CheckIcon, BoltIcon } from "@components/ui/Icons";

export default function TargetAudience() {
  return (
    <section id="target" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-slate-900 font-black text-3xl md:text-4xl">
            이런 분들께{" "}
            <span className="gradient-text">강력히 추천합니다</span>
          </h2>
        </div>

        {/* ── 체크리스트 카드 ────────────────────────────────── */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="space-y-5">
            {TARGETS.map((target, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* 체크 아이콘 */}
                <div className="shrink-0 w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
                  {target}
                </p>
              </div>
            ))}
          </div>

          {/* ── 하단 CTA ─────────────────────────────────────── */}
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm mb-4">해당되신다면 지금 바로 시작하세요!</p>
            {/*
              앵커 링크로 구현 → 클릭 시 #pricing 섹션으로 스크롤
              ⚠️ 실제 결제 페이지 연결 시 href를 결제 URL로 교체하세요
            */}
            <a
              id="target-cta-btn"
              href="#pricing"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              <BoltIcon className="w-5 h-5" />
              얼리버드 특가로 시작하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
