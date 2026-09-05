/* =============================================================
   src/components/layout/Footer.tsx
   환불 정책 + 사업자 정보 푸터 (서버 컴포넌트)

   ✅ 서버 컴포넌트로 운영 — 정적 텍스트만 렌더링하므로
      브라우저 API가 필요 없어 'use client' 없이 사용합니다.
   ============================================================= */

import Image from "next/image";
import { BUSINESS_INFO } from "@constants/landingData";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── 로고 + 슬로건 ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-10">
          {/* ⚠️ 이미지 교체: /public/logo.png 파일을 실제 로고로 교체하세요 */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700">
            <Image
              src="/logo.png"
              alt="더빛 온네스퍼널연구소 로고"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="font-bold text-white text-base">{BUSINESS_INFO.name}</p>
            <p className="text-slate-500 text-sm">AI로 더 밝은 내일을 만드는 곳</p>
          </div>
        </div>

        {/* ── 환불 정책 박스 ────────────────────────────────── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10">
          <h3 className="text-white font-bold text-base mb-3">안심 구매 &amp; 환불 안내</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            본 상품은 전자책 및 노션 템플릿 형태로 제공되는 디지털 콘텐츠로, 발송 및 열람 권한 부여 시
            복제 가능한 특성상 「전자상거래 등에서의 소비자보호에 관한 법률」에 의거하여 링크 전달 및
            열람 권한 부여 후 단순 변심에 의한 취소/환불이 제한됩니다.{" "}
            <strong className="text-white">
              (단, 디지털 자료 전달 전 취소 요청 시에는 100% 전액 환불 가능합니다.)
            </strong>
          </p>
        </div>

        {/* ── 사업자 정보 그리드 ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mb-10 border-t border-slate-800 pt-8">
          {[
            { label: "상호명",              value: BUSINESS_INFO.name },
            { label: "대표자",              value: BUSINESS_INFO.representative },
            { label: "사업자등록번호",       value: BUSINESS_INFO.bizNumber },
            { label: "통신판매업 신고번호",  value: BUSINESS_INFO.commercialNumber },
            { label: "사업장 소재지",        value: BUSINESS_INFO.address },
            { label: "문의 이메일",          value: BUSINESS_INFO.email },
            { label: "개인정보관리책임자",   value: BUSINESS_INFO.privacyManager },
          ].map((item) => (
            <div key={item.label} className="flex gap-2">
              <span className="text-slate-500 shrink-0">{item.label}:</span>
              <span className="text-slate-300">{item.value}</span>
            </div>
          ))}
        </div>

        {/* ── 저작권 ───────────────────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 더빛 온네스퍼널연구소. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Designed &amp; Built with ❤️ by 더빛 온네스퍼널연구소
          </p>
        </div>
      </div>
    </footer>
  );
}
