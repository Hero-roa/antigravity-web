/* =============================================================
   src/constants/landingData.ts
   랜딩페이지의 모든 정적 콘텐츠 데이터를 한 곳에서 관리합니다.

   ✅ 이 파일만 수정하면 페이지의 텍스트·구성이 모두 바뀝니다.
   ✅ 결제 URL은 아래 PAYMENT_URL 변수를 직접 수정하거나,
      .env.local 파일에 NEXT_PUBLIC_PAYMENT_URL=https://... 를 추가하세요.
   ============================================================= */

// ─────────────────────────────────────────────
// 1. 네비게이션 메뉴 항목
// ─────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "핵심 시스템", id: "benefits" },
  { label: "제품 구성", id: "bonuses" },
  { label: "강사 소개", id: "instructor" },
  { label: "FAQ", id: "faq" },
] as const;

// ─────────────────────────────────────────────
// 2. SECTION 02 — 통증 포인트 (Pain Point)
// ─────────────────────────────────────────────
export const PAIN_POINTS = [
  {
    title: "비용과 기술의 장벽",
    desc: '"AI나 코딩은 너무 어렵고, 매달 나가는 유료 툴 구독료는 부담스러워요."',
    bg: "bg-red-50 border-red-200",
    titleColor: "text-red-700",
  },
  {
    title: "극심한 시간 소모",
    desc: '"글 하나 쓰는데 반나절, 블로그·인스타·숏폼까지 챙기려니 하루가 다 가버려요."',
    bg: "bg-orange-50 border-orange-200",
    titleColor: "text-orange-700",
  },
  {
    title: "소재 고갈과 좌절",
    desc: '"의욕 넘치게 시작했다가 며칠 만에 밑천이 드러나고, 본업과 상품 개발은 뒷전으로 밀려요."',
    bg: "bg-yellow-50 border-yellow-200",
    titleColor: "text-yellow-700",
  },
  {
    title: "제자리걸음의 불안감",
    desc: '"남들은 AI로 빠르게 시장을 선점하는데, 나만 뒤처지는 것 같아 조급해요."',
    bg: "bg-rose-50 border-rose-200",
    titleColor: "text-rose-700",
  },
];

// ─────────────────────────────────────────────
// 3. SECTION 03 — 핵심 혜택 (Solution / Benefits)
//    iconName: Icons.tsx 의 renderIcon 함수로 매핑됩니다.
// ─────────────────────────────────────────────
export type BenefitIconName = "bolt" | "globe" | "shield" | "signal";

export const BENEFITS: {
  iconName: BenefitIconName;
  title: string;
  desc: string;
  color: string;
  iconBg: string;
}[] = [
  {
    iconName: "bolt",
    title: "비용 0원, 무설치 즉시 실습",
    desc: "매달 수만 원씩 빠져나가는 유료 구독료 제로(0원). 웹 브라우저에서 바로 따라 하는 100% 무료 AI 기반.",
    color: "from-blue-500/10 to-blue-600/5",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    iconName: "globe",
    title: "원소스 멀티유즈(OSMU) 파이프라인",
    desc: "단 1개의 키워드로 블로그 SEO 포스팅 + 인스타 카드뉴스 + 30초 숏폼 대본까지 한 번에 완성.",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    iconName: "shield",
    title: "알고리즘 저품질 방지 안전 필터링",
    desc: "내 진정성과 문체를 녹여내어 검색 누락을 방지하는 실전 퇴고 프레임워크 수록.",
    color: "from-violet-500/10 to-violet-600/5",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    iconName: "signal",
    title: "그린/옐로/레드 데이터 신호등 분석법",
    desc: "수많은 키워드 속에서 '진짜 돈이 되고 유입이 터지는 주제'를 1초 만에 가려내는 실무 노하우.",
    color: "from-amber-500/10 to-amber-600/5",
    iconBg: "bg-amber-100 text-amber-600",
  },
];

// ─────────────────────────────────────────────
// 4. SECTION 04 — 특별 부록 (Product Bonus)
// ─────────────────────────────────────────────
export const BONUSES = [
  {
    emoji: "💡",
    label: "부록 01",
    title: "한 줄 프롬프트 치트키",
    desc: "검색 상위 노출을 부르는 블로그 포스팅 원클릭 완성 템플릿",
  },
  {
    emoji: "🎨",
    label: "부록 02",
    title: "비주얼 치트시트",
    desc: "클릭률을 높이는 카드뉴스용 AI 이미지 프롬프트 14선 & 감성 야담·민화 스타일 5선",
  },
  {
    emoji: "🗓️",
    label: "부록 03",
    title: "30일 루틴 세팅 가이드",
    desc: "작심삼일 없이 1인 창작자·사업가의 지속 가능한 콘텐츠 파이프라인 구축법",
  },
  {
    emoji: "📖",
    label: "부록 04",
    title: "독자 전용 시크릿 실습 자료실",
    desc: "복사해서 바로 붙여넣는 프롬프트 모음 노션(Notion) 템플릿 링크 제공",
  },
  {
    emoji: "🤝",
    label: "부록 05",
    title: "구매자 전용 1:1 Q&A 창구",
    desc: "실습 중 막히는 화면을 캡처해 질문하면 실무 전문가의 직접 피드백 제공",
  },
];

// ─────────────────────────────────────────────
// 5. SECTION 05 — 추천 대상 체크리스트
// ─────────────────────────────────────────────
export const TARGETS = [
  "AI를 활용해 1인 지식 창업이나 디지털 부업을 체계적으로 시작하고 싶은 분",
  "블로그, 인스타, 숏폼 등 다채널 운영 시간이 절대적으로 부족한 1인 사업가 및 마케터",
  "프롬프트를 어떻게 넣어야 할지 막막했던 비전공자 및 초보 크리에이터",
  "AI가 쓴 티 나는 어색한 문장이 싫고, 나만의 전문적인 톤을 지키고 싶은 분",
];

// ─────────────────────────────────────────────
// 6. SECTION 06 — 저자(강사) 소개
// ─────────────────────────────────────────────
export const INSTRUCTOR = {
  name: "로아쌤 (Ro-a Ssaem)",
  title: "더빛 온네스퍼널연구소 대표 | AI 실무 전문가 & 디지털 리터러시 강사",
  quote:
    "비전공자나 초보자도 생성형 AI를 활용해 자신만의 아이디어를 실제 비즈니스 결과물로 구현할 수 있도록 돕습니다. 복잡한 기술 용어를 일상 언어로 풀어내어, 실생활과 현업에 즉시 적용 가능한 원스톱 자동화 시스템을 전해드립니다.",
  careers: [
    "1인 크리에이터 및 소상공인을 위한 AI 콘텐츠 자동화 파이프라인 연구 및 코칭",
    "생성형 AI 실무 및 프롬프트 엔지니어링 전문 강의",
    "AI SNS 마케팅 및 디지털 리터러시 1급",
  ],
  philosophy:
    "수십만 원짜리 비싼 외주나 이론 강의도 결국 '내 목소리가 담긴 진짜 글'까지 대신 만들어주진 못합니다. 제가 수개월간 겪은 시행착오를 단 1시간으로 압축해 드리겠습니다.",
  // ⚠️ 이미지 교체: /public/author-profile.png 파일을 교체하세요
  imageSrc: "/author-profile.png",
  imageAlt: "로아쌤 (권미순) - 더빛 온네스퍼널연구소 대표",
};

// ─────────────────────────────────────────────
// 7. SECTION 07 — 가격 정보
//
//  ✅ 현재: 부크크 서점 상세페이지와 연동
//  📌 결제 URL 변경 방법:
//     아래 PAYMENT_URL 문자열을 실제 URL로 교체하세요.
//     예시: export const PAYMENT_URL = "https://bookk.co.kr/bookStore/xxx";
// ─────────────────────────────────────────────
export const PAYMENT_URL = "https://bookk.co.kr/bookStore/6a9714ea4e717e72b54ddea1";


export type PricingIncludeIconName =
  | "book"
  | "bolt"
  | "calendar"
  | "notion"
  | "question";

export const PRICING = {
  originalPrice: "55,000원",
  salePrice: "14,900원",
  discountRate: "73% 특가",
  includes: [
    {
      iconName: "book" as PricingIncludeIconName,
      text: "전자책 본서(PDF) - 완벽 가이드 전권",
    },
    {
      iconName: "bolt" as PricingIncludeIconName,
      text: "실전 치트북 (프롬프트 치트키 + 비주얼 시트)",
    },
    {
      iconName: "calendar" as PricingIncludeIconName,
      text: "30일 루틴 세팅 가이드",
    },
    {
      iconName: "notion" as PricingIncludeIconName,
      text: "시크릿 노션 자료실 (즉시 복사 가능 템플릿)",
    },
    {
      iconName: "question" as PricingIncludeIconName,
      text: "1:1 Q&A 피드백 창구 (실무 전문가 직접 답변)",
    },
  ],
};

// ─────────────────────────────────────────────
// 8. SECTION 08 — FAQ (자주 묻는 질문)
// ─────────────────────────────────────────────
export const FAQS = [
  {
    q: "컴퓨터를 잘 못 다루는 완전 초보도 따라 할 수 있나요?",
    a: "물론입니다. 코딩이나 복잡한 환경 설정 없이 프롬프트만 [복사-붙여넣기]하면 5분 안에 첫 결과물이 나오는 입문자 맞춤형 구성입니다.",
  },
  {
    q: "유료 AI 툴을 매달 결제해야 하나요?",
    a: "아닙니다. 본 가이드의 모든 실습은 100% 무료 도구 기준으로 설계되어 추가 구독료가 전혀 발생하지 않습니다.",
  },
  {
    q: "AI가 쓴 글이라 검색 누락이나 저품질에 걸리지 않나요?",
    a: "걱정하지 않으셔도 됩니다. 단순 복사 붙여넣기식 기계 양산이 아니라, 검색 엔진 알고리즘 감시를 피하고 자신의 경험과 말투를 입히는 '안전 필터링 퇴고법'을 수록했습니다.",
  },
  {
    q: "시중의 흔한 프롬프트 모음집과 무엇이 다른가요?",
    a: "단순한 질문 목록이 아닙니다. 키워드 하나로 '블로그 글 + 카드뉴스 + 숏폼 대본' 3가지가 유기적으로 도출되는 원소스 멀티유즈(OSMU) 실전 파이프라인입니다.",
  },
  {
    q: "따라 하다가 막히면 어떻게 하나요?",
    a: "혼자 고민하지 마세요. 구매자 전용 1:1 질문 창구에 막히는 화면을 캡처해 남겨주시면 로아쌤이 직접 해결 방안을 피드백해 드립니다.",
  },
  {
    q: "구입 후 어디서 확인하나요?",
    a: "결제 완료 즉시 다운로드 가능한 전자책 파일 및 노션 시크릿 실습 링크가 전송됩니다.",
  },
];

// ─────────────────────────────────────────────
// 9. SECTION 09 — 사업자 정보 (Footer)
// ─────────────────────────────────────────────
export const BUSINESS_INFO = {
  name: "더빛 온네스퍼널연구소",
  representative: "권미순 (로아쌤)",
  bizNumber: "326-53-01004",
  commercialNumber: "2026-화성동탄-0025",
  address: "경기도 화성시 동탄중심상가1길 33, 9층",
  email: "kecoco11@naver.com",
  privacyManager: "권미순",
} as const;
