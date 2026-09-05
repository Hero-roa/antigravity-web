-- =================================================================================
-- supabase/migrations/001_create_tables.sql
-- 랜딩페이지 및 관리자 대시보드용 기본 테이블 생성 스크립트
-- =================================================================================

-- 1. 주문(신청자) 테이블 (orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    payment_status TEXT NOT NULL CHECK (payment_status IN ('완료', '대기', '취소')),
    link_sent BOOLEAN DEFAULT FALSE,
    amount INTEGER DEFAULT 0
);

-- RLS (Row Level Security) 설정 (보안)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- 공개 읽기 (대시보드 표시용 - 실 서비스에서는 인증된 사용자만 접근하도록 수정 필요)
CREATE POLICY "Allow public read access on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public update access on orders" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Allow public insert access on orders" ON public.orders FOR INSERT WITH CHECK (true);


-- 2. Q&A (문의) 테이블 (qna)
CREATE TABLE IF NOT EXISTS public.qna (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    buyer_name TEXT NOT NULL,
    buyer_email TEXT NOT NULL,
    question TEXT NOT NULL,
    answered BOOLEAN DEFAULT FALSE,
    answer TEXT
);

-- RLS 설정
ALTER TABLE public.qna ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on qna" ON public.qna FOR SELECT USING (true);
CREATE POLICY "Allow public update access on qna" ON public.qna FOR UPDATE USING (true);
CREATE POLICY "Allow public insert access on qna" ON public.qna FOR INSERT WITH CHECK (true);


-- 3. 사이트 설정 테이블 (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    early_bird_enabled BOOLEAN DEFAULT true,
    early_bird_deadline TEXT NOT NULL,
    original_price INTEGER DEFAULT 55000,
    sale_price INTEGER DEFAULT 19000,
    notion_link TEXT NOT NULL
);

-- RLS 설정
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public update access on site_settings" ON public.site_settings FOR UPDATE USING (true);


-- =================================================================================
-- 초기 목업 데이터 삽입 (선택 사항: 테스트용)
-- =================================================================================

-- 설정 데이터 삽입 (기본값 설정됨, 충돌 무시)
INSERT INTO public.site_settings (id, early_bird_enabled, early_bird_deadline, original_price, sale_price, notion_link)
VALUES (1, true, '2026-09-10', 55000, 19000, 'https://wrose1000.com/%eb%8f%85%ec%9e%90-%ec%a0%84%ec%9a%a9-%eb%94%94%ec%a7%80%ed%84%b8-%ec%8b%a4%ec%8a%b5-%ec%9e%90%eb%a3%8c%ec%8b%a4/')
ON CONFLICT (id) DO NOTHING;

-- 목업 주문 데이터 삽입
INSERT INTO public.orders (id, created_at, name, email, phone, payment_status, link_sent, amount) VALUES
('ORD-010', '2026-09-02 21:47:00+09', '정수아', 'sooa.jung@naver.com', '010-9821-3345', '완료', true, 19000),
('ORD-009', '2026-09-02 18:23:00+09', '박도현', 'dohyun.park@gmail.com', '010-7732-5591', '완료', true, 19000),
('ORD-008', '2026-09-02 15:41:00+09', '이하은', 'haeun.lee@kakao.com', '010-3391-2287', '대기', false, 19000),
('ORD-007', '2026-09-02 14:09:00+09', '최민서', 'minseo.choi@hanmail.net', '010-5548-9901', '완료', true, 19000),
('ORD-006', '2026-09-02 11:55:00+09', '김서연', 'seoyeon.kim@gmail.com', '010-2283-6614', '완료', false, 19000),
('ORD-005', '2026-09-01 20:34:00+09', '윤재원', 'jaewon.yoon@naver.com', '010-8871-4423', '완료', true, 19000),
('ORD-004', '2026-09-01 16:12:00+09', '강나연', 'nayeon.kang@gmail.com', '010-6612-0089', '취소', false, 0),
('ORD-003', '2026-09-01 10:28:00+09', '임준혁', 'junhyeok.lim@naver.com', '010-4439-7726', '완료', true, 19000),
('ORD-002', '2026-08-31 22:05:00+09', '한지수', 'jisu.han@kakao.com', '010-1198-3345', '완료', true, 19000),
('ORD-001', '2026-08-31 14:33:00+09', '오민준', 'minjun.oh@gmail.com', '010-9934-5512', '완료', true, 19000)
ON CONFLICT (id) DO NOTHING;

-- 목업 Q&A 데이터 삽입
INSERT INTO public.qna (id, created_at, buyer_name, buyer_email, question, answered, answer) VALUES
('QNA-006', '2026-09-02 20:15:00+09', '정수아', 'sooa.jung@naver.com', '노션 링크가 열리지 않아요. 어떻게 해야 하나요?', false, NULL),
('QNA-005', '2026-09-02 17:44:00+09', '이하은', 'haeun.lee@kakao.com', 'ChatGPT 무료 버전으로도 모든 실습을 따라할 수 있나요? 유료 플랜이 꼭 필요한지 궁금합니다.', false, NULL),
('QNA-004', '2026-09-02 13:20:00+09', '김서연', 'seoyeon.kim@gmail.com', '블로그 글을 쓸 때 키워드 선정은 어떤 기준으로 해야 하나요? 가이드에 나와있나요?', false, NULL),
('QNA-003', '2026-09-01 19:08:00+09', '임준혁', 'junhyeok.lim@naver.com', '숏폼 대본 생성 프롬프트를 사용해봤는데 결과물이 너무 길어요. 길이를 조절하는 방법이 있나요?', true, '안녕하세요, 임준혁님! 프롬프트 마지막에 ''30초 분량, 최대 150자 이내로 작성해줘''를 추가하시면 적절한 길이로 출력됩니다. 치트키 시트 3번 항목을 참고해 주세요 😊'),
('QNA-002', '2026-09-01 11:33:00+09', '한지수', 'jisu.han@kakao.com', '인스타그램 카드뉴스 이미지는 직접 만들어야 하나요? AI로 생성할 수 있는 방법도 알려주세요.', true, '네! 가이드 4장에 Canva AI와 Adobe Firefly를 활용한 카드뉴스 이미지 생성법이 상세히 수록되어 있습니다. 두 툴 모두 무료로 사용 가능합니다!'),
('QNA-001', '2026-08-31 16:50:00+09', '오민준', 'minjun.oh@gmail.com', 'PDF 파일이 스마트폰에서 열리지 않습니다. 어떤 앱으로 열면 되나요?', true, 'Adobe Acrobat Reader 앱(무료)을 설치하시거나, 네이버 MYBOX, 구글 드라이브에 업로드 후 앱에서 열어보시면 됩니다. 불편을 드려 죄송합니다!')
ON CONFLICT (id) DO NOTHING;


