"use client";
/* =============================================================
   src/components/sections/ContactForm.tsx
   SECTION 09: 상담/문의 신청 섹션 — 클라이언트 컴포넌트

   ✅ 'use client' 선언 이유:
      - useState: 폼 입력값, 제출 상태, 성공/에러 메시지 상태 관리
      - onSubmit: 브라우저 이벤트 핸들러 필요
      - Supabase insert: 클라이언트 측에서 직접 호출
   ============================================================= */

import { useState } from "react";
import { supabase } from "@lib/supabase";

// ── 문의 유형 선택 옵션 목록 ────────────────────────────────────────
// 여기서 문의 유형을 추가하거나 수정할 수 있습니다.
// ⚠️ 주의: DB의 CHECK 제약과 동일하게 맞춰야 합니다 (002_create_inquiries_table.sql)
const INQUIRY_TYPES = [
  "전자책 문의",
  "1:1 상담",
  "강의/협업 문의",
  "기타 문의",
] as const;

// TypeScript 타입: INQUIRY_TYPES 배열의 값 중 하나만 허용
type InquiryType = (typeof INQUIRY_TYPES)[number];

// ── 폼 입력값 타입 정의 ───────────────────────────────────────────────
interface FormData {
  name: string;         // 성함
  phone: string;        // 연락처
  inquiryType: InquiryType; // 문의 유형
  content: string;      // 문의 내용
}

export default function ContactForm() {
  // ── 상태 관리 ────────────────────────────────────────────────────────

  /**
   * 폼 입력값 상태
   * 초기값: 이름/연락처/내용은 빈 문자열, 문의 유형은 첫 번째 항목으로 설정
   */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    inquiryType: INQUIRY_TYPES[0], // 기본 선택: "전자책 문의"
    content: "",
  });

  /** 제출 중 여부 (로딩 스피너 표시용) */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 성공 메시지 표시 여부 (폼 제출 성공 후 true로 변경) */
  const [isSuccess, setIsSuccess] = useState(false);

  /** 에러 메시지 (제출 실패 시 문자열 저장, 없으면 null) */
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ── 이벤트 핸들러 ─────────────────────────────────────────────────────

  /**
   * 텍스트 입력(input, textarea) 값 변경 핸들러
   * e.target.name을 키로, e.target.value를 값으로 업데이트합니다.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 라디오 버튼 문의 유형 선택 핸들러
   * 선택된 InquiryType 값으로 상태를 업데이트합니다.
   */
  const handleInquiryTypeChange = (type: InquiryType) => {
    setFormData((prev) => ({ ...prev, inquiryType: type }));
  };

  /**
   * 폼 제출 핸들러
   * 1) 기본 submit 동작(페이지 새로고침) 막기
   * 2) 로딩 상태 활성화
   * 3) Supabase inquiries 테이블에 데이터 INSERT
   * 4) 성공/실패에 따라 상태 업데이트
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 브라우저 기본 폼 제출 동작 차단

    setIsSubmitting(true); // 로딩 시작
    setErrorMsg(null);     // 이전 에러 초기화

    try {
      // Supabase inquiries 테이블에 데이터 삽입
      const { error } = await supabase.from("inquiries").insert({
        name: formData.name,
        phone: formData.phone,
        inquiry_type: formData.inquiryType,
        content: formData.content,
      });

      // DB 삽입 에러 발생 시 throw로 catch 블록으로 전달
      if (error) throw error;

      // 성공! 완료 화면으로 전환하고 폼 초기화
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        inquiryType: INQUIRY_TYPES[0],
        content: "",
      });
    } catch (err) {
      // 에러 처리: 사용자에게 안내 메시지 표시
      console.error("문의 제출 오류:", err);
      setErrorMsg(
        "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsSubmitting(false); // 로딩 종료 (성공/실패 무관)
    }
  };

  // ── 렌더링 ────────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        /* 기존 디자인의 hero-gradient와 어울리는 딥 네이비 → 슬레이트 그라디언트 */
        background: "linear-gradient(160deg, #0F172A 0%, #1e3a5f 50%, #0F172A 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* ── 섹션 타이틀 ─────────────────────────────────────────── */}
        <div className="text-center mb-12">
          {/* 구분선: globals.css .section-divider 사용 */}
          <div className="section-divider" />

          {/* 뱃지 */}
          <span className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            📩 1:1 문의 · 상담 신청
          </span>

          <h2 className="text-white font-black text-3xl md:text-4xl leading-snug">
            궁금하신 점이 있으신가요?<br />
            <span className="gradient-text">직접 문의해 주세요!</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base">
            최대한 빠르게, 성실하게 답변드리겠습니다.
          </p>
        </div>

        {/* ── 폼 카드 ─────────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            /* 반투명 글래스모피즘 효과 */
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          }}
        >

          {/* ── 성공 완료 화면 ──────────────────────────────────── */}
          {isSuccess ? (
            <div className="text-center py-8">
              {/* 성공 아이콘 */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
                }}
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl mb-3">
                문의가 접수되었습니다! 🎉
              </h3>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                소중한 문의 감사드립니다.<br />
                빠른 시일 내에 연락처로 답변드리겠습니다.
              </p>
              {/* 다시 문의하기 버튼 */}
              <button
                onClick={() => setIsSuccess(false)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
              >
                ← 다시 문의하기
              </button>
            </div>
          ) : (
            /* ── 문의 폼 ──────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* 1) 성함 입력 */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-slate-300 font-bold text-sm mb-2"
                >
                  성함 <span className="text-blue-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onFocus={(e) => {
                    /* 포커스 시 테두리 강조 */
                    e.currentTarget.style.border = "1px solid rgba(37,99,235,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* 2) 연락처(전화번호) 입력 */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-slate-300 font-bold text-sm mb-2"
                >
                  연락처 <span className="text-blue-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(37,99,235,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* 3) 문의 유형 선택 (라디오 버튼) */}
              <div>
                <p className="block text-slate-300 font-bold text-sm mb-3">
                  문의 유형 <span className="text-blue-400">*</span>
                </p>
                {/* 라디오 버튼 그룹: 2열 그리드로 배치 */}
                <div className="grid grid-cols-2 gap-3">
                  {INQUIRY_TYPES.map((type) => {
                    const isSelected = formData.inquiryType === type;
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200"
                        style={{
                          /* 선택된 항목: 파란색 강조 / 미선택: 반투명 배경 */
                          background: isSelected
                            ? "rgba(37,99,235,0.25)"
                            : "rgba(255,255,255,0.06)",
                          border: isSelected
                            ? "1px solid rgba(37,99,235,0.7)"
                            : "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        {/* 실제 라디오 input (시각적으로 숨기고 커스텀 디자인 사용) */}
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type}
                          checked={isSelected}
                          onChange={() => handleInquiryTypeChange(type)}
                          className="sr-only" // 접근성을 위해 DOM에는 유지하되 화면에서 숨김
                        />
                        {/* 커스텀 라디오 원형 아이콘 */}
                        <span
                          className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                          style={{
                            border: isSelected ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.3)",
                            background: isSelected ? "#3b82f6" : "transparent",
                          }}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                          )}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: isSelected ? "#93c5fd" : "#94a3b8" }}
                        >
                          {type}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 4) 문의 내용 텍스트에어리어 */}
              <div>
                <label
                  htmlFor="contact-content"
                  className="block text-slate-300 font-bold text-sm mb-2"
                >
                  문의 내용 <span className="text-blue-400">*</span>
                </label>
                <textarea
                  id="contact-content"
                  name="content"
                  required
                  rows={5}
                  placeholder="궁금하신 내용을 자유롭게 작성해 주세요. 최대한 빠르게 답변드리겠습니다!"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(37,99,235,0.8)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* ── 에러 메시지 표시 ──────────────────────────── */}
              {errorMsg && (
                <div className="flex items-center gap-2 rounded-xl px-4 py-3 bg-red-500/20 border border-red-400/40">
                  <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-300 text-sm">{errorMsg}</p>
                </div>
              )}

              {/* 5) 제출 버튼 */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting} // 제출 중에는 버튼 비활성화 (중복 제출 방지)
                className="w-full font-black text-lg py-5 rounded-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  /* 기존 btn-shimmer와 동일한 파란색 그라디언트 */
                  background: isSubmitting
                    ? "#334155"
                    : "linear-gradient(90deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 50%, #2563eb 60%, #1d4ed8 100%)",
                  color: "white",
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 0 30px rgba(37,99,235,0.5)",
                  backgroundSize: "200% auto",
                }}
              >
                {/* 제출 중일 때 로딩 스피너 표시, 아닐 때는 일반 텍스트 */}
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    접수 중...
                  </span>
                ) : (
                  "✉️ 문의/상담 신청하기 →"
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── 카카오톡 1:1 상담 버튼 ─────────────────────────────────── */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            궁금한 점이나 구매 문의는 로아쌤과 1:1로 편안하게 상담하세요.
          </p>

          {/*
            ⚠️ 카카오톡 1:1 상담 링크 변경 방법:
            아래 href 부분을 로아쌤의 실제 1:1 오픈채팅 또는 카카오 채널 URL로 교체하세요.
            예시: href="https://open.kakao.com/o/s실제링크"
          */}
          <a
            id="contact-kakao-btn"
            href="https://open.kakao.com/o/sCysOhMi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              /* 카카오 공식 노란색 */
              background: "linear-gradient(135deg, #FEE500, #F9D800)",
              color: "#191919",
              boxShadow: "0 8px 30px rgba(254,229,0,0.3)",
            }}
          >
            {/* 카카오톡 아이콘 (SVG) */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.925 2 11.75c0 3.069 1.8 5.766 4.52 7.415L5.5 22l4.18-2.097A11.6 11.6 0 0 0 12 20.5c5.523 0 10-3.925 10-8.75S17.523 3 12 3z" />
            </svg>
            로아쌤과 1:1 카카오톡 상담하기
          </a>

          {/* 안내 메시지 */}
          <p className="text-slate-600 text-xs mt-4">
            📌 1:1 상담 외 시간에는 폼으로 남겨주시면 순차적으로 답변드립니다.
          </p>
        </div>

      </div>
    </section>
  );
}
