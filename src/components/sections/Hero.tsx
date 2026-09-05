/* =============================================================
   src/components/sections/Hero.tsx
   SECTION 01: 메인 히어로 섹션 (서버 컴포넌트)

   ✅ 서버 컴포넌트 이유:
      CTA 버튼은 <a href="#pricing"> 앵커 링크로 구현하여
      자바스크립트 없이도 동작합니다.
   ============================================================= */

import Image from "next/image";
import { BoltIcon, GlobeIcon, DownloadIcon, CheckIcon, StarIcon } from "@components/ui/Icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-gradient min-h-screen flex items-center justify-center pt-16 md:pt-20 pb-12 relative overflow-hidden"
    >
      {/* ── 배경 장식 글로우 (동적 느낌 연출) ──────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── 왼쪽: 카피 텍스트 영역 ─────────────────────────── */}
        <div className="text-white space-y-6">

          {/* 상단 뱃지 */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
            <BoltIcon className="w-4 h-4" />
            100% 무료 툴 활용 · 비전공자 맞춤 파이프라인
          </div>

          {/* 메인 헤드카피 (PRD: h1 태그는 페이지 당 하나만) */}
          <h1
            className="font-black leading-tight break-keep"
            style={{ fontSize: "clamp(1.875rem, 4.5vw, 3.25rem)" }}
          >
            글 하나에 반나절?<br />
            <span className="gradient-text">이제 키워드 1개</span>로<br />
            3채널을{" "}
            <span className="text-yellow-400">30분에 끝냅니다.</span>
          </h1>

          {/* 서브카피 */}
          <p className="text-slate-300 text-lg leading-relaxed">
            복잡한 코딩·비싼 유료 구독료 없이 무료 AI로 완성하는<br />
            <strong className="text-white">
              초보자 맞춤형 원소스 멀티유즈(OSMU) 콘텐츠 파이프라인
            </strong>
          </p>

          {/* 책 제목 박스 */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <p className="text-slate-400 text-xs mb-1">📚 도서명</p>
            <p className="text-white font-bold text-base leading-snug">
              《초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템》 완벽 가이드
            </p>
          </div>

          {/* 별점 신뢰 지표 */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-slate-300 text-sm">얼리버드 독자들의 뜨거운 반응</span>
          </div>

          {/* ── 메인 CTA 버튼 ─────────────────────────────────
              앵커 링크로 구현 → 클릭 시 #pricing 섹션으로 스크롤
              ⚠️ 실제 결제 페이지 연결 시 href를 결제 URL로 교체하세요
          ─────────────────────────────────────────────────── */}
          <div>
            <a
              id="hero-cta-btn"
              href="https://bookk.co.kr/bookStore/6a9714ea4e717e72b54ddea1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer pulse-glow inline-flex items-center justify-center gap-3 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-200"
            >
              <BoltIcon className="w-5 h-5" />
              부크크에서 바로 구매하기 →
            </a>
          </div>

          {/* 신뢰 안내 문구 */}
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-emerald-400" />
            부크크 결제 즉시 전자책(PDF) 다운로드 및 시크릿 실습 노션 링크 제공
          </p>

          {/* USP 뱃지 3개 (PRD FR-05 요구사항) */}
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: BoltIcon,    text: "100% 무료 AI" },
              { Icon: GlobeIcon,   text: "설치 없음" },
              { Icon: DownloadIcon, text: "즉시 다운로드" },
            ].map(({ Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <Icon className="w-4 h-4" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ── 오른쪽: 전자책 3D 목업 이미지 ────────────────────
            ⚠️ 이미지 교체 안내:
            /public/book-mockup.png 파일을 교체하면 됩니다.
            권장 크기: 500x600px 이상 (PNG, 배경 투명)
        ─────────────────────────────────────────────────── */}
        <div className="flex justify-center lg:justify-end">
          <div className="float-animation relative">
            <Image
              src="/book-mockup.png"
              alt="초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템 전자책 3D 목업"
              width={420}
              height={520}
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* 할인 뱃지 오버레이 */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white font-black text-sm px-3 py-2 rounded-2xl shadow-lg rotate-12">
              73% 특가!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
