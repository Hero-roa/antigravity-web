"use client";
/* =============================================================
   src/components/admin/AdminSidebar.tsx
   관리자 대시보드 사이드바 네비게이션

   Props:
   - activeTab: 현재 활성 탭 이름
   - onTabChange: 탭 변경 함수
   ============================================================= */

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";

/** 사이드바 네비게이션 탭 목록 */
const NAV_TABS = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: LayoutDashboard,
  },
  {
    id: "orders",
    label: "주문 / 신청자",
    icon: ShoppingCart,
  },
  {
    id: "qna",
    label: "1:1 Q&A 관리",
    icon: MessageSquare,
  },
  {
    id: "settings",
    label: "설정",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col shrink-0 shadow-2xl">

      {/* ── 로고 & 브랜드 영역 ──────────────────────────────── */}
      <div className="px-5 py-6 border-b border-slate-700/60">
        <div className="flex items-center gap-3 mb-1">
          {/* ⚠️ 이미지: /public/logo.png 교체 가능 */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/40 shrink-0">
            <Image
              src="/logo.png"
              alt="로고"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">더빛 온네스퍼널</p>
            <p className="text-slate-400 text-xs">연구소</p>
          </div>
        </div>
        {/* 관리자 배지 */}
        <span className="inline-block bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2">
          관리자 모드
        </span>
      </div>

      {/* ── 네비게이션 탭 목록 ───────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 text-left
                ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" size={18} />
              {label}
              {/* 활성 탭 우측 포인터 */}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── 하단 영역: 랜딩페이지 이동 + 로그아웃 ─────────────── */}
      <div className="px-3 py-4 border-t border-slate-700/60 space-y-1">
        {/* 랜딩페이지로 이동 버튼 */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <ExternalLink size={18} />
          랜딩페이지 보기
        </Link>

        {/* 로그아웃 버튼 (추후 인증 연동 시 기능 추가) */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-900/40 hover:text-red-400 text-sm font-medium transition-all duration-200"
          onClick={() => alert("로그아웃 기능은 인증 모듈 연동 후 사용 가능합니다.")}
        >
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
