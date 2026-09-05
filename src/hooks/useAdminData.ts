"use client";
/* =============================================================
   src/hooks/useAdminData.ts
   관리자 대시보드용 Supabase 데이터 패칭 커스텀 훅
   
   이 훅을 통해 Orders, QnA, Settings 데이터를 실시간(또는 마운트 시)으로
   불러오고, 업데이트 로직을 캡슐화합니다.
   ============================================================= */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@lib/supabase";
import type { Order, QnAItem, SiteSettings } from "@constants/mockData";

/** 
 * 1. 주문(신청자) 데이터 훅
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("주문 목록 불러오기 실패:", error);
    } else if (data) {
      // DB 컬럼명(snake_case)을 앱 타입(camelCase)으로 변환
      const formatted = data.map((item: any) => ({
        id: item.id,
        createdAt: new Date(item.created_at).toLocaleString('ko-KR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        }),
        name: item.name,
        email: item.email,
        phone: item.phone,
        paymentStatus: item.payment_status,
        linkSent: item.link_sent,
        amount: item.amount,
      }));
      setOrders(formatted);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /** 링크 발송 상태 토글 */
  const toggleLinkSent = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("orders")
      .update({ link_sent: !currentStatus })
      .eq("id", id);

    if (!error) {
      // 로컬 상태 즉시 업데이트 (Optimistic UI)
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, linkSent: !currentStatus } : o))
      );
    } else {
      console.error("링크 상태 업데이트 실패:", error);
      alert("데이터베이스 연결을 확인해주세요.");
    }
  };

  return { orders, loading, fetchOrders, toggleLinkSent };
}

/** 
 * 2. 1:1 QnA 데이터 훅
 */
export function useQnA() {
  const [qnaList, setQnaList] = useState<QnAItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQnA = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("qna")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("QnA 불러오기 실패:", error);
    } else if (data) {
      const formatted = data.map((item: any) => ({
        id: item.id,
        createdAt: new Date(item.created_at).toLocaleString('ko-KR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        }),
        buyerName: item.buyer_name,
        buyerEmail: item.buyer_email,
        question: item.question,
        answered: item.answered,
        answer: item.answer,
      }));
      setQnaList(formatted);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQnA();
  }, [fetchQnA]);

  /** 답변 완료 상태 토글 */
  const toggleAnswered = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("qna")
      .update({ answered: !currentStatus })
      .eq("id", id);

    if (!error) {
      setQnaList((prev) =>
        prev.map((q) => (q.id === id ? { ...q, answered: !currentStatus } : q))
      );
    } else {
      console.error("QnA 상태 업데이트 실패:", error);
      alert("데이터베이스 연결을 확인해주세요.");
    }
  };

  return { qnaList, loading, fetchQnA, toggleAnswered };
}

/**
 * 3. 사이트 설정 데이터 훅
 */
export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1) // id=1 인 단일 로우 사용
      .single();

    if (error) {
      console.error("설정 불러오기 실패:", error);
    } else if (data) {
      setSettings({
        earlyBirdEnabled: data.early_bird_enabled,
        earlyBirdDeadline: data.early_bird_deadline,
        originalPrice: data.original_price,
        salePrice: data.sale_price,
        notionLink: data.notion_link,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  /** 설정 업데이트 */
  const updateSettings = async (newSettings: SiteSettings) => {
    const { error } = await supabase
      .from("site_settings")
      .update({
        early_bird_enabled: newSettings.earlyBirdEnabled,
        early_bird_deadline: newSettings.earlyBirdDeadline,
        original_price: newSettings.originalPrice,
        sale_price: newSettings.salePrice,
        notion_link: newSettings.notionLink,
      })
      .eq("id", 1);

    if (!error) {
      setSettings(newSettings);
      return true;
    } else {
      console.error("설정 업데이트 실패:", error);
      return false;
    }
  };

  return { settings, loading, fetchSettings, updateSettings };
}


