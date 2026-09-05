"use client";
/* =============================================================
   src/components/admin/QnAList.tsx
   1:1 실습 Q&A 문의 목록 + 답변 상태 관리 (Supabase 연동 완료)
   ============================================================= */

import { useState } from "react";
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter,
  BadgeCheck,
  Loader2
} from "lucide-react";
import { useQnA } from "@hooks/useAdminData";

type QnaFilter = "전체" | "미답변" | "답변완료";

export default function QnAList() {
  const { qnaList, loading, toggleAnswered } = useQnA();
  
  // 펼쳐진 Q&A 항목 ID
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // 필터
  const [filter, setFilter] = useState<QnaFilter>("전체");

  /** 아코디언 토글 */
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  /** 필터 적용 */
  const filteredQnA = qnaList.filter((q) => {
    if (filter === "미답변") return !q.answered;
    if (filter === "답변완료") return q.answered;
    return true;
  });

  const unansweredCount = qnaList.filter((q) => !q.answered).length;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* ── 헤더 + 필터 ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h2 className="text-slate-900 font-bold text-base flex items-center gap-2">
              1:1 Q&amp;A 관리
              {unansweredCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {unansweredCount}
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              구매자가 남긴 실습 질문을 확인하고 답변하세요
            </p>
          </div>

          {/* 필터 버튼 */}
          <div className="sm:ml-auto flex items-center gap-2">
            <Filter size={15} className="text-slate-400 shrink-0" />
            {(["전체", "미답변", "답변완료"] as QnaFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Q&A 카드 목록 ────────────────────────────────────── */}
      <div className="space-y-3">
        {filteredQnA.map((item) => {
          const isAnswered = item.answered;
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
                isAnswered ? "border-slate-200" : "border-orange-200"
              }`}
            >
              {/* 카드 상단: 질문 요약 */}
              <div className="px-6 py-4">
                <div className="flex items-start gap-4">

                  {/* 아이콘 */}
                  <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                    isAnswered ? "bg-emerald-100" : "bg-orange-100"
                  }`}>
                    <MessageSquare
                      size={17}
                      className={isAnswered ? "text-emerald-600" : "text-orange-500"}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* 구매자 정보 + 상태 뱃지 */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-bold text-slate-800 text-sm">{item.buyerName}</span>
                      <span className="text-slate-400 text-xs">{item.buyerEmail}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-slate-400 text-xs">{item.createdAt}</span>

                      {/* 답변 상태 뱃지 */}
                      {isAnswered ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} /> 답변 완료
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                          <Clock size={11} /> 미답변
                        </span>
                      )}
                    </div>

                    {/* 질문 내용 */}
                    <p className="text-slate-700 text-sm leading-relaxed line-clamp-2">
                      {item.question}
                    </p>
                  </div>

                  {/* 우측 버튼 영역 */}
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    {/* 답변 펼치기 버튼 (답변이 있을 때만) */}
                    {item.answer && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        답변 {isExpanded ? "접기" : "보기"}
                      </button>
                    )}

                    {/* 답변 완료 토글 버튼 */}
                    <button
                      onClick={() => toggleAnswered(item.id, item.answered)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 ${
                        isAnswered
                          ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
                      }`}
                    >
                      <BadgeCheck size={13} />
                      {isAnswered ? "답변 취소" : "완료 처리"}
                    </button>
                  </div>
                </div>
              </div>

              {/* 답변 내용 펼치기 (아코디언) */}
              {isExpanded && item.answer && (
                <div className="px-6 pb-5 pt-0 border-t border-slate-100">
                  <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs text-emerald-600 font-bold mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      로아쌤의 답변
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 결과 없음 */}
        {filteredQnA.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-12 text-center">
            <p className="text-slate-400 text-sm">해당 조건의 Q&amp;A가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
