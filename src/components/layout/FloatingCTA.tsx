/* =============================================================
   src/components/layout/FloatingCTA.tsx
   모바일 화면 하단에 고정되는 구매 버튼 (FR-02 요구사항)

   ✅ 서버 컴포넌트로 운영 — <a href="..."> 링크로 구현하여
      브라우저 JS 없이도 동작합니다.
   ✅ 현재: 부크크 서점 상세페이지로 연결
      📌 링크 변경 시 href만 교체하면 됩니다.
   ============================================================= */

import { BoltIcon } from "@components/ui/Icons";

export default function FloatingCTA() {
  return (
    /*
      sm:hidden → 태블릿(768px) 이상에서는 숨김
      모바일 전용 하단 고정 버튼 (PRD FR-02 요구사항)
    */
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl">
      {/*
        ✅ 부크크 서점 구매 링크 (새 탭 열기)
        📌 링크 변경 시 href를 교체하세요:
           예시: href="https://bookk.co.kr/bookStore/..."
      */}
      <a
        id="mobile-floating-cta-btn"
        href="https://bookk.co.kr/bookStore/6a9714ea4e717e72b54ddea1"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full btn-shimmer text-white font-black text-base py-4 rounded-2xl flex items-center justify-center gap-2"
      >
        <BoltIcon className="w-5 h-5" />
        부크크에서 바로 구매하기 →
      </a>
    </div>
  );
}
