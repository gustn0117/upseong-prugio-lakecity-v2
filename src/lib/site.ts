/**
 * 사이트 공통 정보 — 비어있는 항목은 UI에서 자동으로 "추후공지"로 표시됩니다.
 */
export const SITE = {
  projectName: "업성 푸르지오 레이크시티",
  projectNameEn: "Upseong Prugio Lakecity",
  builder: "대우건설",

  contact: {
    /** 분양문의 대표번호 (예: "1844-0981") — 미정 시 빈 문자열 */
    phone: "",
    /** 모델하우스 주소 — 미정 시 빈 문자열 */
    showroomAddress: "",
    /** 운영시간 — 미정 시 빈 문자열 */
    hours: "",
    /** 이메일 — 미정 시 빈 문자열 */
    email: "",
  },

  company: {
    /** 사업주체 / 시행사 */
    developer: "",
    /** 분양대행 */
    salesAgency: "",
    /** 신탁사 */
    trust: "",
  },

  /** 사업 위치 (정식 표기) */
  siteAddress: "충청남도 천안시 서북구 업성동 일원",

  copyrightYear: 2026,

  /** 사이트 마지막 업데이트 */
  lastUpdated: "2026.05.01",

  /** 공식 안내 단계 — 현재 사업 진행 상태 */
  currentPhase: "사전 정보 안내",

  /**
   * 공지사항 — 최신 순으로 정렬
   * 빈 배열로 두면 NoticeBoard 섹션이 placeholder 상태로 표시됨
   */
  notices: [
    {
      date: "2026.05.01",
      tag: "공지",
      title: "공식 홈페이지 오픈 안내",
      body: "업성 푸르지오 레이크시티 공식 홈페이지가 오픈되었습니다. 분양 일정 및 정보는 본 사이트에서 확인하실 수 있습니다.",
    },
    {
      date: "2026.04.20",
      tag: "안내",
      title: "관심고객 사전등록 접수 시작",
      body: "관심고객 사전등록 접수를 시작합니다. 등록하신 고객님께 분양 일정 및 정보를 가장 먼저 안내드립니다.",
    },
    {
      date: "2026.04.10",
      tag: "공지",
      title: "사업 일정 안내",
      body: "정확한 분양 일정 및 입주자 모집공고 일정은 인허가 진행 상황에 따라 추후 공지될 예정입니다.",
    },
  ] as const,

  /**
   * 분양 일정 단계
   * status: 'done' | 'current' | 'upcoming'
   */
  salesSchedule: [
    { step: "01", label: "관심고객 사전등록", date: "진행중", status: "current" as const },
    { step: "02", label: "모델하우스 OPEN", date: "추후공지", status: "upcoming" as const },
    { step: "03", label: "입주자 모집공고", date: "추후공지", status: "upcoming" as const },
    { step: "04", label: "청약 접수", date: "추후공지", status: "upcoming" as const },
    { step: "05", label: "당첨자 발표", date: "추후공지", status: "upcoming" as const },
    { step: "06", label: "계약 체결", date: "추후공지", status: "upcoming" as const },
    { step: "07", label: "입주", date: "추후공지", status: "upcoming" as const },
  ],

  /**
   * 자주 묻는 질문
   */
  faq: [
    {
      q: "분양 일정은 언제 발표되나요?",
      a: "정확한 분양 일정 및 입주자 모집공고 일정은 인허가 진행 상황에 따라 결정됩니다. 사전 등록하신 고객님께 분양 일정이 확정되는 즉시 가장 먼저 안내드립니다.",
    },
    {
      q: "분양가와 청약 자격은 어떻게 되나요?",
      a: "분양가 및 청약 자격 조건은 정식 입주자 모집공고를 통해 안내됩니다. 모집공고 발표 전까지는 미정 상태이며, 본 사이트는 모집공고가 정식 발표되는 즉시 안내드릴 예정입니다.",
    },
    {
      q: "총 세대수와 평형 구성이 어떻게 되나요?",
      a: "총 1,908세대 규모로, 금회 1블록에서 1,460세대가 공급됩니다. 전용면적 72㎡ (A·B·C·D), 84㎡ (A·B·C·D), 95㎡ (A·B) 의 3개 평형, 10개 타입으로 구성됩니다. (인허가 과정에서 변경될 수 있음)",
    },
    {
      q: "모델하우스는 어디에 위치하나요?",
      a: "모델하우스 위치 및 운영 일정은 추후 공지됩니다. 사전 등록 시 모델하우스 OPEN 일정 및 위치를 안내드립니다.",
    },
    {
      q: "관심고객 등록 후 개인정보는 어떻게 활용되나요?",
      a: "수집된 개인정보는 분양 정보 안내, 고객 상담, 사전 마케팅 목적으로만 활용되며, 분양 종료 시까지 보유됩니다. 동의 철회 요청 시 즉시 파기됩니다.",
    },
    {
      q: "본 홈페이지는 공식 분양 홈페이지인가요?",
      a: "본 사이트는 분양 정보 안내를 위한 비공식 홍보 페이지입니다. 정식 분양 정보 및 청약 안내는 입주자 모집공고와 청약Home 등 공식 채널을 통해 확인해 주시기 바랍니다.",
    },
  ] as const,

  /**
   * 공식 채널 / 외부 링크
   */
  links: {
    cheongyakHome: "https://www.applyhome.co.kr",
    daewooEnc: "https://www.daewooenc.com",
    prugioOfficial: "https://www.prugio.com",
  },
} as const;

/** 전화번호가 등록되어 있는지 */
export const hasPhone = SITE.contact.phone.trim().length > 0;

/** UI 표시용 전화번호 — 미등록 시 "추후공지" */
export const displayPhone = hasPhone ? SITE.contact.phone : "추후공지";

/** tel: 링크용 전화번호 (숫자/하이픈만) — 미등록 시 빈 문자열 */
export const telHref = hasPhone ? `tel:${SITE.contact.phone.replace(/[^\d-]/g, "")}` : "";
