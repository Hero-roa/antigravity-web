/* =============================================================
   src/components/ui/Icons.tsx
   프로젝트에서 사용하는 모든 SVG 아이콘을 한 곳에서 관리합니다.
   서버·클라이언트 컴포넌트 어디서든 import해서 사용 가능합니다.
   ============================================================= */

import type { BenefitIconName, PricingIncludeIconName } from "@constants/landingData";

// ─────────────────────────────────────────────
// 공통 Props 타입 정의
// ─────────────────────────────────────────────
interface IconProps {
  className?: string;
}

// ─────────────────────────────────────────────
// 개별 아이콘 컴포넌트 (Named Export)
// ─────────────────────────────────────────────

/** ⚡ 번개 아이콘 - 무료/빠름/CTA 강조 */
export const BoltIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/** 🌐 지구본 아이콘 - 무설치/웹 강조 */
export const GlobeIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/** 🛡 방패 아이콘 - 안전/보안 강조 */
export const ShieldIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/** 📶 신호 아이콘 - 데이터 분석 강조 */
export const SignalIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h.01M7 20v-4M12 20V10M17 20V4M22 20h.01" />
  </svg>
);

/** ✅ 체크마크 아이콘 */
export const CheckIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

/** ✕ X(닫기) 아이콘 */
export const XIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/** ⬇ 화살표 아래 아이콘 (아코디언 토글) */
export const ChevronDownIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

/** ☰ 햄버거 메뉴 아이콘 (모바일) */
export const MenuIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

/** ⬇ 다운로드 아이콘 */
export const DownloadIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

/** ⭐ 별점 아이콘 */
export const StarIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

/** 📚 책 아이콘 (가격 섹션 포함 내역) */
export const BookIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

/** 📅 달력 아이콘 */
export const CalendarIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/** 🔲 노션 아이콘 */
export const NotionIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.447-.093-1.961-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.446-1.632z" />
  </svg>
);

/** ❓ 물음표 아이콘 */
export const QuestionIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

// ─────────────────────────────────────────────
// 헬퍼 함수: iconName 문자열 → 아이콘 컴포넌트
// Solution(핵심 혜택) 섹션에서 사용
// ─────────────────────────────────────────────
export function renderBenefitIcon(
  name: BenefitIconName,
  className = "w-7 h-7"
) {
  switch (name) {
    case "bolt":   return <BoltIcon className={className} />;
    case "globe":  return <GlobeIcon className={className} />;
    case "shield": return <ShieldIcon className={className} />;
    case "signal": return <SignalIcon className={className} />;
  }
}

// 가격(Pricing) 섹션 포함 내역 아이콘 헬퍼
export function renderPricingIcon(
  name: PricingIncludeIconName,
  className = "w-4 h-4"
) {
  switch (name) {
    case "book":     return <BookIcon className={className} />;
    case "bolt":     return <BoltIcon className={className} />;
    case "calendar": return <CalendarIcon className={className} />;
    case "notion":   return <NotionIcon className={className} />;
    case "question": return <QuestionIcon className={className} />;
  }
}
