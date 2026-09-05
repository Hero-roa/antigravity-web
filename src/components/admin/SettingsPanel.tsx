"use client";
/* =============================================================
   src/components/admin/SettingsPanel.tsx
   콘텐츠 & 설정 관리 패널 (Supabase 연동 완료)
   ============================================================= */

import { useState, useEffect } from "react";
import {
  Timer,
  DollarSign,
  Link2,
  Save,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Lock,
  Loader2,
  KeyRound,
} from "lucide-react";
import { useSettings } from "@hooks/useAdminData";
import type { SiteSettings } from "@constants/mockData";

export default function SettingsPanel() {
  const { settings: dbSettings, loading, updateSettings } = useSettings();
  
  // 폼 상태를 관리할 로컬 state
  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newPin, setNewPin] = useState("");

  // 외부 API 키 상태 관리 (로컬 스토리지)
  const [apiKeys, setApiKeys] = useState({
    gemini: "",
    payment: "",
  });

  // DB 데이터 및 로컬 스토리지 데이터 로드
  useEffect(() => {
    if (dbSettings) {
      setLocalSettings({ ...dbSettings });
    }
    // 로컬 스토리지에서 API 키 불러오기
    setApiKeys({
      gemini: localStorage.getItem("api_key_gemini") || "",
      payment: localStorage.getItem("api_key_payment") || "",
    });
  }, [dbSettings]);

  /** 설정 저장 로직 */
  const handleSave = async () => {
    if (!localSettings) return;
    setSaving(true);
    const success = await updateSettings(localSettings);
    
    // API 키 로컬스토리지에 저장
    localStorage.setItem("api_key_gemini", apiKeys.gemini);
    localStorage.setItem("api_key_payment", apiKeys.payment);

    setSaving(false);
    
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  /** 숫자 입력 핸들러 */
  const handlePriceChange = (field: "originalPrice" | "salePrice", value: string) => {
    if (!localSettings) return;
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    setLocalSettings((prev) => prev ? { ...prev, [field]: num } : null);
  };

  if (loading || !localSettings) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const discountRate = localSettings.originalPrice > 0
    ? Math.round(((localSettings.originalPrice - localSettings.salePrice) / localSettings.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6 max-w-3xl">

      {/* 저장 성공 토스트 */}
      {saved && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 shadow-sm">
          <CheckCircle2 size={20} className="shrink-0" />
          <div>
            <p className="font-bold text-sm">설정이 저장되었습니다!</p>
            <p className="text-xs text-emerald-600 mt-0.5">
              실제 연동 후에는 랜딩페이지에 즉시 반영됩니다.
            </p>
          </div>
        </div>
      )}

      {/* ── 1. 얼리버드 타이머 설정 ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
            <Timer size={17} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">얼리버드 마감 타이머</h3>
            <p className="text-slate-400 text-xs">랜딩페이지 상단 타이머 표시 여부를 제어합니다</p>
          </div>
          <button
            onClick={() =>
              setLocalSettings((prev) => prev ? { ...prev, earlyBirdEnabled: !prev.earlyBirdEnabled } : null)
            }
            className="ml-auto flex items-center gap-2 transition-all duration-200"
            aria-label="얼리버드 타이머 토글"
          >
            {localSettings.earlyBirdEnabled ? (
              <>
                <ToggleRight size={36} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-600">ON</span>
              </>
            ) : (
              <>
                <ToggleLeft size={36} className="text-slate-300" />
                <span className="text-xs font-bold text-slate-400">OFF</span>
              </>
            )}
          </button>
        </div>

        <div className="px-6 py-5">
          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
            마감 날짜
          </label>
          <input
            type="date"
            value={localSettings.earlyBirdDeadline}
            onChange={(e) =>
              setLocalSettings((prev) => prev ? { ...prev, earlyBirdDeadline: e.target.value } : null)
            }
            disabled={!localSettings.earlyBirdEnabled}
            className="w-full sm:w-64 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400 transition"
          />
          {!localSettings.earlyBirdEnabled && (
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
              <AlertTriangle size={13} />
              타이머가 OFF 상태입니다. 랜딩페이지에서 타이머가 숨겨집니다.
            </p>
          )}
        </div>
      </div>

      {/* ── 2. 가격 수정 ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
            <DollarSign size={17} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">가격 설정</h3>
            <p className="text-slate-400 text-xs">정가 및 얼리버드 할인가를 수정합니다</p>
          </div>
          <span className="ml-auto bg-red-100 text-red-600 text-xs font-black px-2.5 py-1 rounded-full border border-red-200">
            {discountRate}% 할인
          </span>
        </div>

        <div className="px-6 py-5 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              정가 (원)
            </label>
            <div className="relative">
              <input
                type="text"
                value={localSettings.originalPrice.toLocaleString()}
                onChange={(e) => handlePriceChange("originalPrice", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">원</span>
            </div>
            <p className="text-slate-400 text-xs mt-1.5">랜딩페이지에 취소선으로 표시</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              얼리버드 할인가 (원)
            </label>
            <div className="relative">
              <input
                type="text"
                value={localSettings.salePrice.toLocaleString()}
                onChange={(e) => handlePriceChange("salePrice", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">원</span>
            </div>
            <p className="text-slate-400 text-xs mt-1.5">
              구매 버튼에 표시되는 최종 가격
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. 실습 자료실 링크 수정 (사용자 요청 피드백 반영) ──── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
            <Link2 size={17} className="text-violet-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">독자 전용 디지털 실습 자료실 링크</h3>
            <p className="text-slate-400 text-xs">구매자에게 발송되는 자료실(비밀번호 필요) 링크를 수정합니다</p>
          </div>
        </div>

        <div className="px-6 py-5">
          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
            페이지 URL
          </label>
          <input
            type="url"
            value={localSettings.notionLink}
            onChange={(e) =>
              setLocalSettings((prev) => prev ? { ...prev, notionLink: e.target.value } : null)
            }
            placeholder="https://wrose1000.com/..."
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
          />
          <p className="text-slate-400 text-xs mt-1.5">
            ⚠️ 링크 변경 시 기존 발송된 구매자에게도 공지가 필요합니다.
          </p>
        </div>
      </div>

      {/* ── 4. 관리자 비밀번호 (PIN) 변경 ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center">
            <Lock size={17} className="text-rose-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">관리자 비밀번호 변경</h3>
            <p className="text-slate-400 text-xs">대시보드 접속에 필요한 4자리 PIN 번호</p>
          </div>
        </div>

        <div className="px-6 py-5 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              새 PIN 번호
            </label>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="숫자 4자리"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
            />
          </div>
          <div className="flex items-end">
            <button
               onClick={() => {
                 if (newPin.length === 4) {
                   localStorage.setItem("adminPin", newPin);
                   alert("비밀번호가 성공적으로 변경되었습니다.");
                   setNewPin("");
                 } else {
                   alert("비밀번호는 4자리 숫자로 입력해주세요.");
                 }
               }}
               className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm shadow-sm"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. 외부 서비스 API 키 설정 ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
            <KeyRound size={17} className="text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">외부 서비스 API 키 (로컬 저장)</h3>
            <p className="text-slate-400 text-xs">Gemini, 결제 모듈 등 외부 연동에 필요한 키를 안전하게 브라우저에 보관합니다.</p>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKeys.gemini}
              onChange={(e) => setApiKeys(prev => ({ ...prev, gemini: e.target.value }))}
              placeholder="AI-xxxxxxxxxxxxxxxxxxx"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              결제 API Key (예: 포트원, 토스페이먼츠 등)
            </label>
            <input
              type="password"
              value={apiKeys.payment}
              onChange={(e) => setApiKeys(prev => ({ ...prev, payment: e.target.value }))}
              placeholder="결제사에서 발급받은 Secret Key"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
            />
          </div>
        </div>
      </div>

      {/* ── 저장 버튼 ───────────────────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Save size={16} />
          {saving ? "저장 중..." : "설정 저장"}
        </button>
      </div>
    </div>
  );
}
