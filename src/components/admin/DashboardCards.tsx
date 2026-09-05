"use client";
/* =============================================================
   src/components/admin/DashboardCards.tsx
   대시보드 요약 카드 4개 (Supabase 연동 완료)
   ============================================================= */

import {
  TrendingUp,
  DollarSign,
  Users,
  MessageCircleQuestion,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { useOrders, useQnA } from "@hooks/useAdminData";

export default function DashboardCards() {
  const { orders, loading: loadingOrders } = useOrders();
  const { qnaList, loading: loadingQnA } = useQnA();

  if (loadingOrders || loadingQnA) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 h-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // 오늘 날짜 가져오기 (YYYY-MM-DD)
  const todayStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).replace(/\. /g, '-').replace('.', '');

  // 1. 오늘 판매량 (오늘 날짜로 시작하고 결제 상태가 완료인 건수)
  const todaySalesCount = orders.filter(
    (o) => o.createdAt.includes(todayStr) && o.paymentStatus === "완료"
  ).length;

  // 2. 총 매출액
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "완료")
    .reduce((sum, o) => sum + o.amount, 0);

  // 3. 누적 신청자 수
  const totalApplicants = orders.filter((o) => o.paymentStatus !== "취소").length;

  // 4. 미답변 Q&A 수
  const unansweredQnACount = qnaList.filter((q) => !q.answered).length;

  /** 요약 카드 데이터 */
  const SUMMARY_CARDS = [
    {
      id: "today-sales",
      label: "오늘 판매량",
      value: `${todaySalesCount}건`,
      subLabel: "오늘 완료된 결제",
      icon: TrendingUp,
      iconBg: "bg-blue-500",
      cardBorder: "border-blue-100",
      trend: "오늘",
      trendColor: "text-blue-600",
    },
    {
      id: "total-revenue",
      label: "총 매출액",
      value: `${totalRevenue.toLocaleString()}원`,
      subLabel: "누적 완료 결제 기준",
      icon: DollarSign,
      iconBg: "bg-emerald-500",
      cardBorder: "border-emerald-100",
      trend: "전체",
      trendColor: "text-emerald-600",
    },
    {
      id: "total-applicants",
      label: "누적 신청자 수",
      value: `${totalApplicants}명`,
      subLabel: "취소 제외 전체 구매자",
      icon: Users,
      iconBg: "bg-violet-500",
      cardBorder: "border-violet-100",
      trend: "전체",
      trendColor: "text-violet-600",
    },
    {
      id: "unanswered-qna",
      label: "미답변 Q&A",
      value: `${unansweredQnACount}건`,
      subLabel: "빠른 답변이 필요합니다",
      icon: MessageCircleQuestion,
      iconBg: unansweredQnACount > 0 ? "bg-orange-500" : "bg-slate-400",
      cardBorder: unansweredQnACount > 0 ? "border-orange-100" : "border-slate-100",
      trend: unansweredQnACount > 0 ? "답변 필요!" : "모두 답변됨",
      trendColor: unansweredQnACount > 0 ? "text-orange-600" : "text-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {SUMMARY_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl border ${card.cardBorder} p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            {/* 아이콘 + 트렌드 */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {/* 트렌드 배지 */}
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${card.trendColor}`}>
                <ArrowUpRight className="w-3.5 h-3.5" />
                {card.trend}
              </span>
            </div>

            {/* 수치 */}
            <div>
              <p className="text-2xl font-black text-slate-900 mb-1">{card.value}</p>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-0.5">
                {card.label}
              </p>
              <p className="text-xs text-slate-400">{card.subLabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
