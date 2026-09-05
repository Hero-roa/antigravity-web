"use client";
/* =============================================================
   src/components/sections/Pricing.tsx
   SECTION 07: 가격 정책 & 구매 CTA 섹션

   ✅ 'use client' 선언 이유:
      - 결제 버튼 클릭 시 window.open()으로 외부 결제 페이지 오픈
      - 브라우저 API(window) 사용 → 클라이언트 컴포넌트 필요
   ============================================================= */

import { PRICING, PAYMENT_URL } from "@constants/landingData";
import { renderPricingIcon } from "@components/ui/Icons";

export default function Pricing() {
  /**
   * 구글폼 선판매 신청 페이지로 이동하는 함수
   * ✅ 현재: 스마트스토어 심사 대기 중 → 구글폼으로 임시 연결
   * 📌 스마트스토어 오픈 후 PAYMENT_URL을 교체하면 자동으로 반영됩니다.
   */
  const handlePayment = () => {
    // 새 탭으로 구글폼(또는 설정된 결제 URL) 열기
    window.open(PAYMENT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-blue-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* ── 섹션 타이틀 ────────────────────────────────────── */}
        <div className="section-divider" />
        <span className="inline-block bg-red-500/10 border border-red-400/30 text-red-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
          ⏰ 얼리버드 선판매 특별 프로모션
        </span>
        <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-4">
          지금 이 순간이<br />
          <span className="text-red-500">가장 저렴한 가격</span>입니다
        </h2>
        <p className="text-slate-500 mb-10 text-base">
          얼리버드 한정 수량 마감 시 별도 예고 없이 정가로 환원됩니다.
        </p>

        {/* ── 가격 카드 ───────────────────────────────────────── */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

          {/* 상단 배너 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
            <p className="font-bold text-sm">
              《초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템》 완벽 가이드
            </p>
          </div>

          <div className="p-8 md:p-12">

            {/* 가격 표시 */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                {/* 정가 취소선 */}
                <span className="text-slate-400 text-xl line-through font-medium">
                  {PRICING.originalPrice}
                </span>
                <span className="bg-red-500 text-white text-sm font-black px-3 py-1 rounded-full">
                  {PRICING.discountRate}
                </span>
              </div>
              {/* 특가 */}
              <div className="text-6xl md:text-7xl font-black text-slate-900">
                <span className="text-blue-600">
                  {PRICING.salePrice.replace("원", "")}
                </span>
                <span className="text-3xl text-slate-600">원</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">얼리버드 특가 (VAT 포함)</p>
            </div>

            {/* ── 포함 내역 ─────────────────────────────────── */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
              <p className="font-bold text-slate-700 text-sm mb-4 uppercase tracking-wide">
                ✅ 이 가격에 모두 포함
              </p>
              <div className="space-y-3">
                {PRICING.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 text-sm">
                    <div className="text-emerald-500 shrink-0">
                      {/* iconName → 실제 아이콘 변환 */}
                      {renderPricingIcon(item.iconName)}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 메인 구매 CTA 버튼 ───────────────────────────
                onClick → handlePayment 함수 실행
                결제 URL 연동 시 handlePayment 내부를 수정하세요
            ─────────────────────────────────────────────────── */}
            <button
              id="pricing-main-cta-btn"
              onClick={handlePayment}
              className="w-full btn-shimmer pulse-glow text-white font-black text-xl py-6 rounded-2xl mb-4 hover:scale-[1.02] transition-transform duration-200 shadow-2xl"
            >
              🎉 얼리버드 선판매 신청하기 →
            </button>

            {/* 안심 구매 문구 */}
            <div className="flex flex-wrap justify-center gap-4 text-slate-500 text-xs">
              {[
                "✓ 결제 즉시 PDF 발송",
                "✓ 노션 링크 즉시 제공",
                "✓ 1:1 Q&A 포함",
                "✓ 100% 무료 AI 기반",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
