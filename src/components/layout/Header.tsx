"use client";
/* =============================================================
   src/components/layout/Header.tsx
   스티키 GNB (상단 네비게이션 바)

   ✅ 'use client' 선언 이유:
      - useEffect: 스크롤 위치 감지 → 헤더 배경 변경
      - useState: 모바일 메뉴 열림/닫힘 상태 관리
      위 두 가지 브라우저 API 사용 때문에 클라이언트 컴포넌트입니다.
   ============================================================= */

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@constants/landingData";
import { BoltIcon, XIcon, MenuIcon } from "@components/ui/Icons";

export default function Header() {
  // 스크롤 50px 이상 내려가면 true → 헤더 배경 반투명으로 변경
  const [scrolled, setScrolled] = useState(false);
  // 모바일 햄버거 메뉴 열림 여부
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 스크롤 이벤트 감지 (마운트 시 등록, 언마운트 시 제거)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * 지정한 섹션 ID로 부드럽게 스크롤하는 함수
   * @param id - 스크롤 대상 섹션의 HTML id 속성값
   */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false); // 모바일 메뉴 닫기
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg" // 스크롤 후: 반투명 유리 효과
          : "bg-transparent"                             // 최상단: 투명
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">

        {/* ── 로고 영역 ──────────────────────────────────────────
            ⚠️ 이미지 교체 안내:
            /public/logo.png 파일을 실제 로고로 교체하세요.
            권장 크기: 80x80px 이상, PNG (배경 투명)
        ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/50">
            <Image
              src="/logo.png"
              alt="더빛 온네스퍼널연구소 로고"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-white font-bold text-sm hidden sm:block leading-tight">
            더빛<br />온네스퍼널연구소
          </span>
        </div>

        {/* ── 데스크톱 네비게이션 메뉴 ───────────────────────── */}
        <nav className="hidden md:flex items-center gap-6 text-slate-300 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── 우측: CTA 버튼 + 모바일 메뉴 토글 ─────────────── */}
        <div className="flex items-center gap-3">
          {/* 데스크톱 CTA 버튼 */}
          <a
            id="gnb-cta-btn"
            href="https://bookk.co.kr/bookStore/6a9714ea4e717e72b54ddea1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <BoltIcon className="w-4 h-4" />
            부크크에서 바로 구매하기 →
          </a>

          {/* 모바일 햄버거 버튼 */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="메뉴 열기/닫기"
          >
            {mobileMenuOpen
              ? <XIcon className="w-6 h-6" />
              : <MenuIcon className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* ── 모바일 드롭다운 메뉴 ────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700 px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left text-slate-300 hover:text-white py-2 text-base font-medium"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://bookk.co.kr/bookStore/6a9714ea4e717e72b54ddea1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            부크크에서 바로 구매하기 →
          </a>
        </div>
      )}
    </header>
  );
}
