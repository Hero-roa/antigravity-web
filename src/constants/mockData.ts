/* =============================================================
   src/constants/mockData.ts
   관리자 대시보드용 목업(가짜) 데이터

   ✅ 실제 백엔드(Supabase 등) 연동 전까지 이 파일의 데이터로
      화면을 확인하고 UI를 검증합니다.
   ✅ 나중에 백엔드 연동 시 이 데이터를 API 호출로 교체하면 됩니다.
   ============================================================= */

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────

/** 결제 상태 */
export type PaymentStatus = "완료" | "대기" | "취소";

/** 주문(신청자) 데이터 타입 */
export interface Order {
  id: string;
  createdAt: string;      // "YYYY-MM-DD HH:mm" 형식
  name: string;           // 구매자 이름
  email: string;          // 구매자 이메일
  phone: string;          // 구매자 연락처
  paymentStatus: PaymentStatus;
  linkSent: boolean;      // 다운로드 링크 발송 여부
  amount: number;         // 결제 금액 (원)
}

/** Q&A 문의 데이터 타입 */
export interface QnAItem {
  id: string;
  createdAt: string;
  buyerName: string;
  buyerEmail: string;
  question: string;
  answered: boolean;
  answer?: string;        // 답변 내용 (answered=true 일 때)
}

/** 사이트 설정 데이터 타입 */
export interface SiteSettings {
  earlyBirdEnabled: boolean;    // 얼리버드 타이머 활성화 여부
  earlyBirdDeadline: string;    // 마감일 (YYYY-MM-DD)
  originalPrice: number;        // 정가 (원)
  salePrice: number;            // 할인가 (원)
  notionLink: string;           // 시크릿 노션 자료실 링크
}

// ─────────────────────────────────────────────
// 목업 주문 데이터 (10건)
// ─────────────────────────────────────────────
export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-010",
    createdAt: "2026-09-02 21:47",
    name: "정수아",
    email: "sooa.jung@naver.com",
    phone: "010-9821-3345",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-009",
    createdAt: "2026-09-02 18:23",
    name: "박도현",
    email: "dohyun.park@gmail.com",
    phone: "010-7732-5591",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-008",
    createdAt: "2026-09-02 15:41",
    name: "이하은",
    email: "haeun.lee@kakao.com",
    phone: "010-3391-2287",
    paymentStatus: "대기",
    linkSent: false,
    amount: 19000,
  },
  {
    id: "ORD-007",
    createdAt: "2026-09-02 14:09",
    name: "최민서",
    email: "minseo.choi@hanmail.net",
    phone: "010-5548-9901",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-006",
    createdAt: "2026-09-02 11:55",
    name: "김서연",
    email: "seoyeon.kim@gmail.com",
    phone: "010-2283-6614",
    paymentStatus: "완료",
    linkSent: false,
    amount: 19000,
  },
  {
    id: "ORD-005",
    createdAt: "2026-09-01 20:34",
    name: "윤재원",
    email: "jaewon.yoon@naver.com",
    phone: "010-8871-4423",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-004",
    createdAt: "2026-09-01 16:12",
    name: "강나연",
    email: "nayeon.kang@gmail.com",
    phone: "010-6612-0089",
    paymentStatus: "취소",
    linkSent: false,
    amount: 0,
  },
  {
    id: "ORD-003",
    createdAt: "2026-09-01 10:28",
    name: "임준혁",
    email: "junhyeok.lim@naver.com",
    phone: "010-4439-7726",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-002",
    createdAt: "2026-08-31 22:05",
    name: "한지수",
    email: "jisu.han@kakao.com",
    phone: "010-1198-3345",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
  {
    id: "ORD-001",
    createdAt: "2026-08-31 14:33",
    name: "오민준",
    email: "minjun.oh@gmail.com",
    phone: "010-9934-5512",
    paymentStatus: "완료",
    linkSent: true,
    amount: 19000,
  },
];

// ─────────────────────────────────────────────
// 목업 Q&A 데이터 (6건)
// ─────────────────────────────────────────────
export const MOCK_QNA: QnAItem[] = [
  {
    id: "QNA-006",
    createdAt: "2026-09-02 20:15",
    buyerName: "정수아",
    buyerEmail: "sooa.jung@naver.com",
    question: "노션 링크가 열리지 않아요. 어떻게 해야 하나요?",
    answered: false,
  },
  {
    id: "QNA-005",
    createdAt: "2026-09-02 17:44",
    buyerName: "이하은",
    buyerEmail: "haeun.lee@kakao.com",
    question: "ChatGPT 무료 버전으로도 모든 실습을 따라할 수 있나요? 유료 플랜이 꼭 필요한지 궁금합니다.",
    answered: false,
  },
  {
    id: "QNA-004",
    createdAt: "2026-09-02 13:20",
    buyerName: "김서연",
    buyerEmail: "seoyeon.kim@gmail.com",
    question: "블로그 글을 쓸 때 키워드 선정은 어떤 기준으로 해야 하나요? 가이드에 나와있나요?",
    answered: false,
  },
  {
    id: "QNA-003",
    createdAt: "2026-09-01 19:08",
    buyerName: "임준혁",
    buyerEmail: "junhyeok.lim@naver.com",
    question: "숏폼 대본 생성 프롬프트를 사용해봤는데 결과물이 너무 길어요. 길이를 조절하는 방법이 있나요?",
    answered: true,
    answer:
      "안녕하세요, 임준혁님! 프롬프트 마지막에 '30초 분량, 최대 150자 이내로 작성해줘'를 추가하시면 적절한 길이로 출력됩니다. 치트키 시트 3번 항목을 참고해 주세요 😊",
  },
  {
    id: "QNA-002",
    createdAt: "2026-09-01 11:33",
    buyerName: "한지수",
    buyerEmail: "jisu.han@kakao.com",
    question: "인스타그램 카드뉴스 이미지는 직접 만들어야 하나요? AI로 생성할 수 있는 방법도 알려주세요.",
    answered: true,
    answer:
      "네! 가이드 4장에 Canva AI와 Adobe Firefly를 활용한 카드뉴스 이미지 생성법이 상세히 수록되어 있습니다. 두 툴 모두 무료로 사용 가능합니다!",
  },
  {
    id: "QNA-001",
    createdAt: "2026-08-31 16:50",
    buyerName: "오민준",
    buyerEmail: "minjun.oh@gmail.com",
    question: "PDF 파일이 스마트폰에서 열리지 않습니다. 어떤 앱으로 열면 되나요?",
    answered: true,
    answer:
      "Adobe Acrobat Reader 앱(무료)을 설치하시거나, 네이버 MYBOX, 구글 드라이브에 업로드 후 앱에서 열어보시면 됩니다. 불편을 드려 죄송합니다!",
  },
];

// ─────────────────────────────────────────────
// 목업 사이트 설정 데이터
// ─────────────────────────────────────────────
export const MOCK_SETTINGS: SiteSettings = {
  earlyBirdEnabled: true,
  earlyBirdDeadline: "2026-09-10",
  originalPrice: 55000,
  salePrice: 19000,
  notionLink: "https://notion.so/secret-link-example-12345",
};

// ─────────────────────────────────────────────
// 대시보드 요약 데이터 계산 헬퍼
// ─────────────────────────────────────────────

/** 오늘 날짜 문자열 (YYYY-MM-DD) */
const TODAY = "2026-09-02";

/** 오늘 완료된 주문 수 */
export const todaySalesCount = MOCK_ORDERS.filter(
  (o) => o.createdAt.startsWith(TODAY) && o.paymentStatus === "완료"
).length;

/** 총 매출액 (완료된 주문만) */
export const totalRevenue = MOCK_ORDERS.filter(
  (o) => o.paymentStatus === "완료"
).reduce((sum, o) => sum + o.amount, 0);

/** 총 신청자 수 (취소 제외) */
export const totalApplicants = MOCK_ORDERS.filter(
  (o) => o.paymentStatus !== "취소"
).length;

/** 미답변 Q&A 수 */
export const unansweredQnACount = MOCK_QNA.filter((q) => !q.answered).length;
