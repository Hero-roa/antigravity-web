-- =================================================================================
-- supabase/migrations/002_create_inquiries_table.sql
-- 상담/문의 신청 폼 데이터를 저장하는 inquiries 테이블 생성
-- 실행 방법: Supabase 대시보드 → SQL Editor에 이 내용 전체를 붙여넣고 실행하세요.
-- =================================================================================

-- 문의/상담 신청 테이블 (inquiries)
CREATE TABLE IF NOT EXISTS public.inquiries (
    -- 기본 식별자: 자동 증가 정수 (간단하고 안전한 기본키)
    id          BIGSERIAL PRIMARY KEY,

    -- 신청 일시: 자동으로 현재 시각(한국 표준시 기준) 저장
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 성함: 필수 입력
    name        TEXT NOT NULL,

    -- 연락처(전화번호): 필수 입력
    phone       TEXT NOT NULL,

    -- 문의 유형: 아래 4가지 중 하나만 선택 가능 (CHECK 제약)
    inquiry_type TEXT NOT NULL CHECK (
        inquiry_type IN ('전자책 문의', '1:1 상담', '강의/협업 문의', '기타 문의')
    ),

    -- 문의 내용: 필수 입력 (자유 텍스트)
    content     TEXT NOT NULL,

    -- 처리 상태: 관리자가 확인/처리 여부를 추적하는 용도
    is_read     BOOLEAN DEFAULT FALSE,

    -- 관리자 메모: 내부 처리용 메모 (필요 시 관리자가 입력)
    admin_memo  TEXT
);

-- ── RLS (Row Level Security) 보안 정책 설정 ─────────────────────────────────────
-- ⚠️ 보안 원칙: 공개 삽입(INSERT)은 허용하되, 조회/수정은 관리자(인증된 사용자)만 가능

-- RLS 활성화 (보안 필수)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ✅ 누구나 문의를 삽입(INSERT)할 수 있도록 허용 (랜딩페이지 폼 제출용)
CREATE POLICY "Allow public insert on inquiries"
    ON public.inquiries
    FOR INSERT
    WITH CHECK (true);

-- ✅ 관리자(로그인한 사용자)만 문의 목록을 조회할 수 있도록 허용
CREATE POLICY "Allow authenticated read on inquiries"
    ON public.inquiries
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- ✅ 관리자(로그인한 사용자)만 문의를 수정(is_read, admin_memo 등)할 수 있도록 허용
CREATE POLICY "Allow authenticated update on inquiries"
    ON public.inquiries
    FOR UPDATE
    USING (auth.role() = 'authenticated');
