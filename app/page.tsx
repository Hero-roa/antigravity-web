/* =============================================================
   app/page.tsx
   더빛 온네스퍼널연구소 공식 랜딩페이지 — 메인 조립 파일

   이 파일은 각 섹션 컴포넌트를 순서대로 불러와 조립하는
   역할만 담당합니다. 텍스트·데이터 수정은 하지 않아도 됩니다.

   📌 텍스트/데이터 수정 → src/constants/landingData.ts
   📌 스타일 수정        → app/globals.css
   📌 섹션 내용 수정     → src/components/sections/*.tsx
   📌 결제 URL 설정      → .env.local (NEXT_PUBLIC_PAYMENT_URL)
   ============================================================= */

// ── 레이아웃 컴포넌트 ───────────────────────────────────────────
import Header      from "@components/layout/Header";
import Footer      from "@components/layout/Footer";
import FloatingCTA from "@components/layout/FloatingCTA";

// ── 섹션 컴포넌트 (PRD 순서대로) ────────────────────────────────
import Hero           from "@components/sections/Hero";
import PainPoint      from "@components/sections/PainPoint";
import Solution       from "@components/sections/Solution";
import ProductBonus   from "@components/sections/ProductBonus";
import TargetAudience from "@components/sections/TargetAudience";
import Instructor     from "@components/sections/Instructor";
import Pricing        from "@components/sections/Pricing";
import FAQ            from "@components/sections/FAQ";
import ContactForm    from "@components/sections/ContactForm";

/**
 * 랜딩페이지 루트 컴포넌트 (서버 컴포넌트)
 *
 * 섹션 순서:
 *  01. Hero          - 히어로 (헤드카피 + CTA)
 *  02. PainPoint     - 문제 제기 (통증 공감)
 *  03. Solution      - 핵심 혜택 + OSMU 파이프라인
 *  04. ProductBonus  - 제품 구성 & 특별 부록
 *  05. TargetAudience - 추천 대상 체크리스트
 *  06. Instructor    - 저자 소개
 *  07. Pricing       - 가격 정책 & 구매 CTA
 *  08. FAQ           - 자주 묻는 질문 (아코디언)
 *  09. ContactForm   - 상담/문의 신청 폼
 *  10. Footer        - 환불정책 & 사업자정보
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-['Pretendard',sans-serif]">

      {/* 상단 고정 네비게이션 바 */}
      <Header />

      {/* ── 섹션 01: 히어로 ─────────────────────────────────── */}
      <Hero />

      {/* ── 섹션 02: 문제 제기 ──────────────────────────────── */}
      <PainPoint />

      {/* ── 섹션 03: 핵심 혜택 & OSMU 파이프라인 ───────────── */}
      <Solution />

      {/* ── 섹션 04: 제품 구성 & 특별 부록 ─────────────────── */}
      <ProductBonus />

      {/* ── 섹션 05: 추천 대상 체크리스트 ──────────────────── */}
      <TargetAudience />

      {/* ── 섹션 06: 저자 소개 ──────────────────────────────── */}
      <Instructor />

      {/* ── 섹션 07: 가격 정책 & 구매 CTA ──────────────────── */}
      <Pricing />

      {/* ── 섹션 08: 자주 묻는 질문 (FAQ) ──────────────────── */}
      <FAQ />

      {/* ── 섹션 09: 상담/문의 신청 폼 ──────────────────────── */}
      <ContactForm />

      {/* ── 섹션 10: 환불정책 & 사업자정보 (Footer) ─────────── */}
      <Footer />

      {/* 모바일 하단 고정 구매 버튼 (sm: 이상에서 숨김) */}
      <FloatingCTA />
    </div>
  );
}
