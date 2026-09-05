/* =============================================================
   app/admin/layout.tsx
   관리자 페이지 전용 레이아웃

   ✅ 일반 사용자 랜딩페이지(/)의 Header·Footer를 완전히 분리합니다.
      관리자는 /admin 경로로 접속하면 이 레이아웃이 적용됩니다.
   ============================================================= */

import type { Metadata } from "next";

// 어드민 페이지 SEO 메타데이터 (검색 엔진 노출 차단)
export const metadata: Metadata = {
  title: "관리자 대시보드 | 더빛 온네스퍼널연구소",
  description: "관리자 전용 페이지입니다.",
  robots: {
    index: false,   // 검색 엔진 색인 차단
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 어드민은 전체 화면 높이로 꽉 채움
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  );
}
