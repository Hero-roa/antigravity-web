/* =============================================================
   src/components/sections/Instructor.tsx
   SECTION 06: 저자(강사) 소개 — 서버 컴포넌트

   ⚠️ 저자 프로필 이미지 교체 안내:
   /public/author-profile.png 파일을 실제 프로필 사진으로 교체하세요.
   권장 크기: 400x400px 이상 (정사각형 PNG)
   ============================================================= */

import Image from "next/image";
import { INSTRUCTOR } from "@constants/landingData";

export default function Instructor() {
  return (
    <section id="instructor" className="py-20 md:py-28 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-white font-black text-3xl md:text-4xl">
            저자를 소개합니다
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── 저자 프로필 이미지 ──────────────────────────────
              ⚠️ 이미지 교체 안내:
              INSTRUCTOR.imageSrc = "/author-profile.png" (landingData.ts에서 수정)
              또는 아래 src 값을 직접 교체하세요.
          ─────────────────────────────────────────────────── */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <Image
                  src={INSTRUCTOR.imageSrc}
                  alt={INSTRUCTOR.imageAlt}
                  width={320}
                  height={320}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              {/* 이름 뱃지 */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-black px-6 py-3 rounded-full shadow-lg whitespace-nowrap">
                {INSTRUCTOR.name}
              </div>
            </div>
          </div>

          {/* ── 저자 소개 텍스트 ────────────────────────────── */}
          <div className="text-white space-y-6">

            {/* 이름 + 직함 */}
            <div>
              <h3 className="font-black text-xl text-white mb-1">{INSTRUCTOR.name}</h3>
              <p className="text-blue-400 text-sm font-semibold">{INSTRUCTOR.title}</p>
            </div>

            {/* 핵심 인용 블록 */}
            <blockquote className="bg-white/5 border-l-4 border-blue-500 rounded-r-2xl pl-5 pr-4 py-4">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">
                &ldquo;{INSTRUCTOR.quote}&rdquo;
              </p>
            </blockquote>

            {/* 주요 이력 목록 */}
            <div className="space-y-3">
              {INSTRUCTOR.careers.map((career, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5" />
                  <p className="text-slate-300 text-sm">{career}</p>
                </div>
              ))}
            </div>

            {/* 교육 철학 */}
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-2xl p-4">
              <p className="text-yellow-300 text-sm leading-relaxed">
                💬 <em>&ldquo;{INSTRUCTOR.philosophy}&rdquo;</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
