"use client";
/* =============================================================
   src/components/admin/OrdersTable.tsx
   주문/신청자 관리 테이블 (Supabase 연동 완료)
   ============================================================= */

import { useState } from "react";
import { Send, CheckCircle2, Clock, XCircle, Filter, Loader2 } from "lucide-react";
import type { PaymentStatus } from "@constants/mockData";
import { useOrders } from "@hooks/useAdminData";

/** 결제 상태 → 뱃지 스타일 */
function PaymentBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    완료: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    대기: "bg-amber-100 text-amber-700 border border-amber-200",
    취소: "bg-red-100 text-red-600 border border-red-200",
  };
  const icons: Record<PaymentStatus, React.ReactNode> = {
    완료: <CheckCircle2 size={12} />,
    대기: <Clock size={12} />,
    취소: <XCircle size={12} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
}

/** 링크 발송 여부 뱃지 */
function LinkSentBadge({ sent }: { sent: boolean }) {
  return sent ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
      <CheckCircle2 size={12} />
      발송 완료
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <Clock size={12} />
      미발송
    </span>
  );
}

/** 필터 버튼 */
const FILTER_OPTIONS: { label: string; value: PaymentStatus | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "완료", value: "완료" },
  { label: "대기", value: "대기" },
  { label: "취소", value: "취소" },
];

export default function OrdersTable() {
  // 결제 상태 필터 (기본: 전체)
  const [filter, setFilter] = useState<PaymentStatus | "전체">("전체");
  
  // Supabase 실시간 데이터 훅
  const { orders, loading, toggleLinkSent } = useOrders();

  /** 필터 적용된 주문 목록 */
  const filteredOrders = filter === "전체"
    ? orders
    : orders.filter((o) => o.paymentStatus === filter);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      {/* ── 테이블 헤더 영역 ────────────────────────────────── */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h2 className="text-slate-900 font-bold text-base">주문 / 신청자 목록</h2>
          <p className="text-slate-400 text-xs mt-0.5">총 {filteredOrders.length}건</p>
        </div>

        {/* 필터 버튼 그룹 */}
        <div className="sm:ml-auto flex items-center gap-2">
          <Filter size={15} className="text-slate-400 shrink-0" />
          <div className="flex gap-1.5">
            {FILTER_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 ${
                  filter === value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 테이블 ─────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide border-b border-slate-100">
              <th className="text-left px-6 py-3 font-semibold">주문번호</th>
              <th className="text-left px-4 py-3 font-semibold">신청 일시</th>
              <th className="text-left px-4 py-3 font-semibold">구매자명</th>
              <th className="text-left px-4 py-3 font-semibold">이메일</th>
              <th className="text-left px-4 py-3 font-semibold">연락처</th>
              <th className="text-left px-4 py-3 font-semibold">결제 상태</th>
              <th className="text-left px-4 py-3 font-semibold">금액</th>
              <th className="text-left px-4 py-3 font-semibold">링크 발송</th>
              <th className="text-left px-4 py-3 font-semibold">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50/70 transition-colors duration-100"
              >
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{order.id}</td>
                <td className="px-4 py-4 text-slate-600 whitespace-nowrap text-xs">{order.createdAt}</td>
                <td className="px-4 py-4 font-semibold text-slate-800">{order.name}</td>
                <td className="px-4 py-4 text-slate-500 text-xs">{order.email}</td>
                <td className="px-4 py-4 text-slate-500 text-xs whitespace-nowrap">{order.phone}</td>
                <td className="px-4 py-4">
                  <PaymentBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap">
                  {order.amount > 0 ? `${order.amount.toLocaleString()}원` : "—"}
                </td>
                <td className="px-4 py-4">
                  <LinkSentBadge sent={order.linkSent} />
                </td>
                <td className="px-4 py-4">
                  {/* 링크 발송 버튼 (완료 주문에만 활성화) */}
                  {order.paymentStatus === "완료" && (
                    <button
                      onClick={() => toggleLinkSent(order.id, order.linkSent)}
                      className={`
                        inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150
                        ${order.linkSent
                          ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          : "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
                        }
                      `}
                    >
                      <Send size={12} />
                      {order.linkSent ? "재발송" : "링크 발송"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {/* 검색 결과 없음 */}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-slate-400 text-sm">
                  해당 조건의 주문이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
