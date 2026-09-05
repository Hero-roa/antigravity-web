/* ============================================================
   layout.tsx - 루트 레이아웃
   SEO 메타태그 및 OpenGraph 태그 완벽 설정 (PRD FR-06 요구사항)
   ============================================================ */
import type { Metadata } from "next";
import "./globals.css";

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: "초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템 | 더빛 온네스퍼널연구소",
  description:
    "키워드 1개로 블로그, 인스타, 숏폼 대본까지 30분 컷! 무료 AI 툴로 구축하는 나만의 1인 콘텐츠 자동화 파이프라인. 로아쌤의 실전 올인원 가이드 얼리버드 19,000원 특가.",
  keywords: [
    "AI 콘텐츠",
    "워크플로우",
    "원소스 멀티유즈",
    "1인 창업",
    "디지털 부업",
    "블로그 자동화",
    "AI 글쓰기",
    "프롬프트",
    "전자책",
    "로아쌤",
  ],
  authors: [{ name: "로아쌤 (권미순)" }],
  creator: "더빛 온네스퍼널연구소",
  publisher: "더빛 온네스퍼널연구소",

  /* OpenGraph 태그 - SNS/카카오톡 공유 시 썸네일·제목·설명 최적화 */
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://더빛온네스퍼널.kr",
    siteName: "더빛 온네스퍼널연구소",
    title: "초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템",
    description:
      "키워드 1개로 블로그·인스타·숏폼 대본까지 30분 컷! 100% 무료 AI로 나만의 콘텐츠 자동화 파이프라인 구축. 얼리버드 65% 할인 19,000원.",
    images: [
      {
        url: "/hero-image.png", // 실제 OG 이미지로 교체 권장 (1200x630px)
        width: 1200,
        height: 630,
        alt: "AI 콘텐츠 워크플로우 시스템 전자책",
      },
    ],
  },

  /* 트위터 카드 메타태그 */
  twitter: {
    card: "summary_large_image",
    title: "초보자도 1시간 만에 끝내는 AI 콘텐츠 워크플로우 시스템",
    description:
      "키워드 1개로 블로그·인스타·숏폼 대본까지 30분 컷! 얼리버드 19,000원 특가",
    images: ["/hero-image.png"],
  },

  /* 검색 로봇 설정 */
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 카카오 오픈그래프를 위한 추가 메타태그 */}
        <meta property="og:locale" content="ko_KR" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
