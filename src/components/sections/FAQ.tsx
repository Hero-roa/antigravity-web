"use client";
/* =============================================================
   src/components/sections/FAQ.tsx
   SECTION 08: 자주 묻는 질문 (아코디언 UI) — 클라이언트 컴포넌트

   ✅ 'use client' 선언 이유:
      - useState: 열려있는 FAQ 항목 번호(인덱스) 상태 관리
      - 사용자가 클릭할 때마다 열림/닫힘이 바뀌어야 함
      위 브라우저 인터랙션 때문에 클라이언트 컴포넌트입니다.
   ============================================================= */

import { useState } from "react";
import { FAQS } from "@constants/landingData";
import { ChevronDownIcon } from "@components/ui/Icons";

export default function FAQ() {
  /**
   * 현재 열려있는 FAQ 항목의 인덱스
   * null이면 모든 항목이 닫힌 상태
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** FAQ 항목 클릭 시 토글 — 같은 항목 클릭 시 닫힘 */
  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="section-divider" />
          <h2 className="text-slate-900 font-black text-3xl md:text-4xl">
            자주 묻는 질문
          </h2>
          <p className="text-slate-500 mt-4">구매 전 궁금한 점을 확인하세요</p>
        </div>

        {/* ── 아코디언 FAQ 목록 (PRD FR-04 요구사항) ─────────── */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              {/* 질문 버튼 — 클릭 시 toggle(idx) 호출 */}
              <button
                id={`faq-btn-${idx}`}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left bg-white hover:bg-slate-50 transition-colors duration-200"
                aria-expanded={openIndex === idx}  // 접근성: 스크린리더 지원
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-blue-500 font-black text-sm mt-0.5">Q.</span>
                  <span className="font-bold text-slate-800 text-base leading-snug">
                    {faq.q}
                  </span>
                </div>
                {/* 화살표 아이콘: 열리면 180도 회전 */}
                <div
                  className={`shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                </div>
              </button>

              {/* 답변 패널: max-height 트랜지션으로 부드럽게 펼침/접힘 */}
              <div
                className={`accordion-content ${
                  openIndex === idx
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 md:px-6 pb-5 pt-0 border-t border-slate-100">
                  <div className="flex gap-3 pt-4">
                    <span className="shrink-0 text-emerald-500 font-black text-sm mt-0.5">A.</span>
                    <p className="text-slate-600 text-base leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FAQ 하단 추가 CTA ────────────────────────────── */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">
            더 궁금한 점이 있으신가요? 구매 후 1:1 Q&amp;A로 직접 질문하세요!
          </p>
          {/* 앵커 링크로 가격 섹션으로 이동 */}
          <a
            id="faq-cta-btn"
            href="#pricing"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            지금 시작하기 →
          </a>
        </div>
      </div>
    </section>
  );
}
