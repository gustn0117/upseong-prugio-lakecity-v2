/**
 * 사이트 공통 정보 — 비어있는 항목은 UI에서 자동으로 "추후공지"로 표시됩니다.
 */
export const SITE = {
  projectName: "업성 푸르지오 레이크시티",
  projectNameEn: "Upseong Prugio Lakecity",
  builder: "대우건설",

  contact: {
    /** 분양문의 대표번호 — placeholder, 실제 번호로 교체 필요 */
    phone: "1234-5678",
    /** 모델하우스 주소 — placeholder */
    showroomAddress: "충청남도 천안시 서북구 업성동 일원 (모델하우스 운영 예정)",
    /** 운영시간 — placeholder */
    hours: "오전 10시 ~ 오후 6시",
    /** 이메일 — placeholder */
    email: "info@prugio-lakecity.example",
  },

  company: {
    /** 사업주체 / 시행사 */
    developer: "교보자산신탁(주)",
    /** 분양대행 / 온라인대행 */
    salesAgency: "㈜아이엠플러스",
    /** 신탁사 */
    trust: "교보자산신탁(주)",
  },

  /** 사업 위치 (정식 표기) */
  siteAddress: "충청남도 천안시 서북구 업성동 업성3도시개발구역 A1BL",

  /** 입주 예정 시기 */
  moveInDate: "2029년 9월 예정",

  /** 주택관리번호 */
  housingMgmtNo: "2026000086",

  copyrightYear: 2026,

  /** 사이트 마지막 업데이트 */
  lastUpdated: "2026.05.04",

  /** 공식 안내 단계 — 현재 사업 진행 상태 */
  currentPhase: "정당계약 진행",

  /**
   * 공지사항 — 최신 순으로 정렬
   */
  notices: [
    {
      date: "2026.05.04",
      tag: "안내",
      title: "정당계약 체결 안내 (5/4 ~ 5/7)",
      body: "당첨자 정당계약이 5월 4일(월)부터 5월 7일(목)까지 모델하우스에서 진행됩니다. 일정 및 구비서류를 반드시 확인하신 후 방문해 주시기 바랍니다.",
    },
    {
      date: "2026.04.24",
      tag: "공지",
      title: "당첨자 서류접수 안내 (4/24 ~ 5/1)",
      body: "1·2순위 및 특별공급 당첨자 서류접수가 4월 24일(금)부터 5월 1일(금)까지 진행됩니다.",
    },
    {
      date: "2026.04.22",
      tag: "공지",
      title: "당첨자 발표",
      body: "4월 22일(수) 청약Home을 통해 당첨자가 발표되었습니다.",
    },
    {
      date: "2026.04.13",
      tag: "공지",
      title: "청약 접수 (특별공급 4/13, 1순위 4/14, 2순위 4/15)",
      body: "특별공급 654세대(기관추천·다자녀·신혼부부·노부모부양·생애최초)와 일반공급 806세대 청약 접수가 청약Home을 통해 진행되었습니다.",
    },
    {
      date: "2026.04.10",
      tag: "이벤트",
      title: "모델하우스 GRAND OPEN",
      body: "4월 10일(금) 견본주택이 개관되었습니다. '성성지구 대장주' 기대감 속에 개관 첫날부터 인산인해를 이루었습니다.",
    },
  ] as const,

  /**
   * 분양 일정 단계
   * status: 'done' | 'current' | 'upcoming'
   */
  salesSchedule: [
    { step: "01", label: "모델하우스 OPEN", date: "2026.04.10", status: "done" as const },
    { step: "02", label: "입주자 모집공고", date: "2026.04.07", status: "done" as const },
    { step: "03", label: "특별공급 청약", date: "2026.04.13", status: "done" as const },
    { step: "04", label: "1·2순위 청약", date: "2026.04.14~15", status: "done" as const },
    { step: "05", label: "당첨자 발표", date: "2026.04.22", status: "done" as const },
    { step: "06", label: "정당계약 체결", date: "2026.05.04~07", status: "current" as const },
    { step: "07", label: "입주", date: "2029.09 예정", status: "upcoming" as const },
  ],

  /**
   * 자주 묻는 질문
   */
  faq: [
    {
      q: "분양 일정은 어떻게 진행되었나요?",
      a: "4월 10일(금) 모델하우스가 개관된 뒤, 4월 13일 특별공급, 4월 14일 1순위, 4월 15일 2순위 청약이 진행되었습니다. 4월 22일 당첨자 발표 후 4월 24일 ~ 5월 1일 서류접수, 5월 4일 ~ 5월 7일 정당계약이 체결됩니다.",
    },
    {
      q: "총 세대수와 평형 구성이 어떻게 되나요?",
      a: "총 1,908세대 규모로, 금회 1블록에서 1,460세대가 공급됩니다. 전용면적 72㎡ (A·B·C·D), 84㎡ (A·B·C·D), 95㎡ (A·B) 의 3개 평형, 10개 타입으로 구성되며 지하 2층 ~ 지상 39층, 11개동 규모입니다.",
    },
    {
      q: "특별공급 / 일반공급 세대수는 어떻게 나뉘나요?",
      a: "총 1,460세대 중 특별공급 654세대(기관추천 111 / 다자녀가구 140 / 신혼부부 262 / 노부모부양 40 / 생애최초 101), 일반공급 806세대로 구성되며 최하층 우선배정 39세대를 포함합니다.",
    },
    {
      q: "입주 예정 시기는 언제인가요?",
      a: "2029년 9월 입주 예정입니다. 정확한 입주 일자는 공정 진행 상황에 따라 추후 통보됩니다.",
    },
    {
      q: "모델하우스는 어디에 위치하나요?",
      a: "모델하우스는 충청남도 천안시 서북구 업성동 일원에 위치합니다. 운영 시간 등 자세한 안내는 분양문의 1668-3535로 연락 주시기 바랍니다.",
    },
    {
      q: "관심고객 등록 후 개인정보는 어떻게 활용되나요?",
      a: "수집된 개인정보는 분양 정보 안내, 고객 상담, 마케팅 목적으로만 활용되며, 분양 종료 시까지 보유됩니다. 동의 철회 요청 시 즉시 파기됩니다.",
    },
    {
      q: "본 홈페이지는 공식 분양 홈페이지인가요?",
      a: "본 사이트는 분양 정보 안내를 위한 비공식 홍보 페이지입니다. 정식 분양 정보 및 청약 안내는 청약Home, 입주자 모집공고 등 공식 채널을 통해 확인해 주시기 바랍니다.",
    },
  ] as const,

  /**
   * 공식 채널 / 외부 링크
   */
  links: {
    cheongyakHome: "https://www.applyhome.co.kr",
    daewooEnc: "https://www.daewooenc.com",
    prugioOfficial: "https://www.prugio.com",
    officialSite: "https://prugio-lakecity.com",
  },

  /**
   * 마케팅 슬로건 / 카피
   */
  copy: {
    mainTagline: "푸르지오가 완성하는 성성호수 앞 프리미엄 도시",
    subTagline: "전망 좋은 레이크뷰, 선망 받는 푸르지오",
    brandSlogan: "The Natural Nobility",
    brandSubSlogan: "푸르지오에서만 누릴 수 있는 특별한 프리미엄과 내츄럴한 삶",
    visionLine1: "성성호수 새도시가 기다린 업성의 새중심",
    visionLine2: "천안의 모든 바람이 될 주거명작을 누리다",
  },
} as const;

/** 전화번호가 등록되어 있는지 */
export const hasPhone = SITE.contact.phone.trim().length > 0;

/** UI 표시용 전화번호 — 미등록 시 "추후공지" */
export const displayPhone = hasPhone ? SITE.contact.phone : "추후공지";

/** tel: 링크용 전화번호 (숫자/하이픈만) — 미등록 시 빈 문자열 */
export const telHref = hasPhone ? `tel:${SITE.contact.phone.replace(/[^\d-]/g, "")}` : "";

/**
 * 언론보도 (공식 홈페이지 News 섹션 기반)
 */
export const PRESS = [
  {
    outlet: "이코노미스트",
    title: "\"개관 첫날부터 인산인해\" 업성 푸르지오 레이크시티, 성성지구 대장주 기대감↑",
    excerpt: "대우건설이 충남 천안시 서북구 성성호수공원 일대에 선보이는 '업성 푸르지오 레이크시티'가 견본주택 개관과 동시에 높은 관심을 받으며 본격적인 분양 일정에 돌입했다.",
  },
  {
    outlet: "경상일보",
    title: "'업성 푸르지오 레이크시티' 견본주택 성황, 13일 특별공급",
    excerpt: "천안의 새로운 주거 중심지로 주목받는 성성호수공원 인근에 대규모 브랜드 단지가 들어선다. 지하 2층에서 지상 최고 39층 규모로 건립되는 총 1,908세대의 대단지다.",
  },
  {
    outlet: "뉴시스",
    title: "'20억 로또' 오티에르반포 등 6151가구 분양",
    excerpt: "4월 셋째 주 전국 9개 단지 총 6,151가구가 분양을 시작한다. 이중 충남 천안시 업성동 '업성푸르지오레이크시티' 등이 분양에 나선다.",
  },
  {
    outlet: "서울경제",
    title: "9개 단지서 6151가구 분양…'오티에르 반포' 등 주목",
    excerpt: "4월 셋째 주 전국 9개 단지에서 총 6,151가구가 공급된다. 일반분양이 3,844가구로, 서울 핵심 입지 물량을 중심으로 수요자 관심이 집중될 전망이다.",
  },
  {
    outlet: "신아일보",
    title: "[주간분양] 이주 '풍무역세권 수자인 그라센트 2차' 등 13곳 청약",
    excerpt: "이번 주 13곳의 단지가 청약을 진행한다. 강원과 전북, 충남에서도 1개 단지씩이 풀린다.",
  },
  {
    outlet: "스마트비즈",
    title: "서울 '반포·노량진' 분양 본격화…4월 셋째 주 전국 3,944가구 청약",
    excerpt: "4월 셋째 주 전국 분양 시장에서 서울 주요 입지 단지를 포함한 청약 일정이 이어진다. 전국 12개 단지에서 총 3,944가구가 청약 접수를 진행한다.",
  },
] as const;

/**
 * "4 UP" 핵심 가치 메시지 (공식 홈페이지 메인 카피)
 */
export const FOUR_UP = [
  {
    label: "Class UP",
    title: "멋진 호수뷰로 클래스 UP",
    desc: "성성호수공원을 품은 새도시, 남향으로 펼쳐지는 힐링 라이프와 명품 레이크 뷰(일부세대 제외)",
  },
  {
    label: "Smart UP",
    title: "가까운 학교로 스마트 UP",
    desc: "1블록 옆 고교(예정), 2블록 앞 초·중교(예정), 성성지구 학원가 등 한 번에 누리는 원스톱 교육환경",
  },
  {
    label: "Life UP",
    title: "편리한 생활로 라이프 UP",
    desc: "이마트, 코스트코, 성성지구 내 중심상권 등 멀티 인프라와 삼성SDI 등 직주근접 생활권",
  },
  {
    label: "Speed UP",
    title: "빠른 교통으로 스피드 UP",
    desc: "1호선 부성역(예정)을 비롯한 번영로, 삼성대로, 천안대로, 경부고속도로 천안IC 등 쾌속교통",
  },
] as const;

/**
 * 공급 세대 상세 (공급안내)
 */
export const SUPPLY_DETAIL = {
  location: "충청남도 천안시 서북구 업성동 업성3도시개발구역 A1BL",
  scale: "지하 2층, 지상 37~39층 11개동, 총 1,460세대 및 부대복리시설",
  total: 1460,
  specialTotal: 654,
  generalTotal: 806,
  reservedBottom: 39,
  specialBreakdown: {
    institution: 111,
    multiChild: 140,
    newlywed: 262,
    elderlyCare: 40,
    firstTime: 101,
  },
  units: [
    { code: "72A", area: 72.7578, areaPub: 28.2713, areaSum: 101.0291, areaOther: 57.4260, areaContract: 158.4551, landShare: 40.9104, total: 484, special: 264, general: 220, bottom: 13 },
    { code: "72B", area: 72.8526, areaPub: 28.3071, areaSum: 101.1597, areaOther: 57.5008, areaContract: 158.6605, landShare: 40.9637, total: 189, special: 101, general: 88, bottom: 5 },
    { code: "72C", area: 72.8920, areaPub: 29.3488, areaSum: 102.2408, areaOther: 57.5319, areaContract: 159.7727, landShare: 40.9858, total: 38, special: 18, general: 20, bottom: 1 },
    { code: "72D", area: 72.8938, areaPub: 29.0345, areaSum: 101.9283, areaOther: 57.5332, areaContract: 159.4615, landShare: 40.9869, total: 38, special: 18, general: 20, bottom: 1 },
    { code: "84A", area: 84.9631, areaPub: 32.5454, areaSum: 117.5085, areaOther: 67.0594, areaContract: 184.5679, landShare: 47.7732, total: 184, special: 99, general: 85, bottom: 5 },
    { code: "84B", area: 84.9637, areaPub: 32.4165, areaSum: 117.3802, areaOther: 67.0598, areaContract: 184.4400, landShare: 47.7735, total: 75, special: 39, general: 36, bottom: 2 },
    { code: "84C", area: 84.9789, areaPub: 33.3965, areaSum: 118.3754, areaOther: 67.0718, areaContract: 185.4472, landShare: 47.7821, total: 113, special: 60, general: 53, bottom: 3 },
    { code: "84D", area: 84.9924, areaPub: 32.9547, areaSum: 117.9471, areaOther: 67.0825, areaContract: 185.0296, landShare: 47.7897, total: 37, special: 19, general: 19, bottom: 1 },
    { code: "95A", area: 95.7927, areaPub: 36.2979, areaSum: 132.0906, areaOther: 75.6069, areaContract: 207.6975, landShare: 53.8625, total: 227, special: 28, general: 199, bottom: 6 },
    { code: "95B", area: 95.7890, areaPub: 36.1597, areaSum: 131.9487, areaOther: 75.6040, areaContract: 207.5527, landShare: 53.8604, total: 75, special: 9, general: 66, bottom: 2 },
  ],
} as const;
