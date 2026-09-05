import { createClient } from "@supabase/supabase-js";

/* =============================================================
   src/lib/supabase.ts
   Supabase 클라이언트 초기화 파일
   
   이 파일은 환경변수에서 Supabase 프로젝트 URL과 API 키를 읽어와
   앱 전체에서 사용할 수 있는 싱글톤 클라이언트를 생성합니다.
   ============================================================= */

// 환경 변수 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 환경 변수가 없는 경우 콘솔에 경고 표시 (개발 환경 지원 및 빌드 시 에러 방지)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요."
  );
}

// 클라이언트 생성 및 export (빌드 타임 에러 방지를 위해 임시 더미 URL 제공)
export const supabase = createClient(
  supabaseUrl || "https://dummy.supabase.co", 
  supabaseAnonKey || "dummy-key"
);
