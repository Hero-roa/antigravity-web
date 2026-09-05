/* =============================================================
   src/components/sections/PainPoint.tsx
   SECTION 02: 문제 제기 (Pain Point) 섹션 — 서버 컴포넌트

   타깃 독자가 겪는 4가지 핵심 고통을 공감 카드로 시각화합니다.
   ============================================================= */

import { PAIN_POINTS } from "@constants/landingData";
import { XIcon } from "@components/ui/Icons";

export default function PainPoint() {
  return (
    <section id="pain" className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-white font-black text-3xl md:text-4xl leading-tight">
            혹시 오늘도{" "}
            <span className="text-slate-400">깜빡이는 커서만</span>{" "}
            바라보고 계셨나요?
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            콘텐츠 제작에 지치는 이유는 노력 부족이 아니라,{" "}
            <strong className="text-white">시스템</strong>이 없었기 때문입니다.
          </p>
        </div>

        {/* ── 통증 포인트 4개 카드 그리드 ──────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5">
          {PAIN_POINTS.map((point, idx) => (
            <div
              key={idx}
              className={`${point.bg} border rounded-2xl p-6 card-hover`}
            >
              <div className="flex items-start gap-4">
                {/* X 아이콘 — 문제/고통 상징 */}
                <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <XIcon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className={`font-bold text-base mb-2 ${point.titleColor}`}>
                    {point.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 공감 메시지 박스 ──────────────────────────────── */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/30 rounded-3xl p-8 text-center backdrop-blur-sm">
          <p className="text-white font-black text-xl md:text-2xl mb-4">
            ❝ 당신이 게을러서가 결코 아닙니다. ❞
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            이제 더 이상 무작정 밤새우지 마세요.<br />
            <strong className="text-white">일하는 방식을 바꾸면 여유가 생깁니다.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
