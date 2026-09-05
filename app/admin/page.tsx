"use client";
/* =============================================================
   app/admin/page.tsx
   관리자 대시보드 메인 페이지

   - PIN 번호(4자리) 잠금 화면 구현
   - 인증 성공 시 사이드바와 탭 콘텐츠(요약, 주문, QnA, 설정) 표시
   ============================================================= */

import { useState, useEffect } from "react";
import AdminSidebar from "@components/admin/AdminSidebar";
import DashboardCards from "@components/admin/DashboardCards";
import OrdersTable from "@components/admin/OrdersTable";
import QnAList from "@components/admin/QnAList";
import SettingsPanel from "@components/admin/SettingsPanel";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isClient, setIsClient] = useState(false);

  // 컴포넌트 마운트 시 (클라이언트 사이드에서만 실행)
  useEffect(() => {
    setIsClient(true);
    // 1. 초기 임시 비밀번호 5156 설정 (저장된 PIN이 없을 경우)
    if (!localStorage.getItem("adminPin")) {
      localStorage.setItem("adminPin", "5156");
    }
    
    // 2. 현재 브라우저 세션에 로그인 상태가 있는지 확인 (새로고침 유지용)
    if (sessionStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  /** 로그인 시도 핸들러 */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = localStorage.getItem("adminPin") || "5156";
    
    if (pinInput === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setErrorMsg("");
    } else {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      setPinInput("");
    }
  };

  // Hydration 불일치 에러 방지용
  if (!isClient) return null;

  // ── 1. 로그인(PIN 잠금) 화면 ─────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-sm shadow-2xl relative overflow-hidden">
          {/* 상단 파란색 장식 */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600"></div>

          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-blue-100">
            <Lock className="w-7 h-7 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-black text-slate-900 text-center mb-2">
            관리자 로그인
          </h1>
          <p className="text-slate-500 text-sm text-center mb-8">
            대시보드 접속을 위해 PIN 번호를 입력하세요.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  setErrorMsg("");
                  setPinInput(e.target.value.replace(/[^0-9]/g, ''));
                }}
                className="w-full text-center text-4xl tracking-[0.5em] font-mono border-b-2 border-slate-200 focus:border-blue-500 outline-none py-3 text-slate-800 transition-colors bg-transparent placeholder:text-slate-200"
                placeholder="••••"
                autoFocus
              />
            </div>
            
            {/* 에러 메시지 */}
            {errorMsg && (
              <p className="flex items-center justify-center gap-1.5 text-red-500 text-sm font-semibold animate-pulse">
                <AlertCircle size={16} />
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={pinInput.length !== 4}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-4"
            >
              접속하기
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-1">
              <span>💡 초기 임시 비밀번호:</span>
              <span className="font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">5156</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. 관리자 대시보드 메인 화면 ────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-['Pretendard',sans-serif]">
      {/* 왼쪽 사이드바 네비게이션 */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 오른쪽 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 상단 헤더 */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 shrink-0 flex items-center justify-between z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">
            {activeTab === "dashboard" && "대시보드 요약"}
            {activeTab === "orders" && "주문 / 신청자 관리"}
            {activeTab === "qna" && "1:1 Q&A 관리"}
            {activeTab === "settings" && "콘텐츠 및 설정"}
          </h1>
          <div className="text-sm font-medium text-slate-500">
            환영합니다, 로아쌤님 👋
          </div>
        </header>

        {/* 탭별 콘텐츠 */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto pb-12">
            {activeTab === "dashboard" && <DashboardCards />}
            {activeTab === "orders" && <OrdersTable />}
            {activeTab === "qna" && <QnAList />}
            {activeTab === "settings" && <SettingsPanel />}
          </div>
        </div>
      </main>
    </div>
  );
}
