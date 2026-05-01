/**
 * 사이트 공통 정보 (연락처, 주소, 회사 정보 등)
 *
 * 비어있는 값은 모두 추후 확정 시 채워넣을 수 있도록 비워두었습니다.
 * UI에서는 값이 비어있을 경우 "준비중" / "추후공지" 등의 안내 문구로 자동 표시됩니다.
 */
export const SITE = {
  /** 사업명 (정식) */
  projectName: "업성 푸르지오 레이크시티",
  /** 사업명 (영문) */
  projectNameEn: "Upseong Prugio Lakecity",
  /** 시공사 */
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

  /** 푸터 표기 연도 */
  copyrightYear: 2025,
} as const;

/** 전화번호가 등록되어 있는지 */
export const hasPhone = SITE.contact.phone.trim().length > 0;

/** UI 표시용 전화번호 — 미등록 시 "추후공지" */
export const displayPhone = hasPhone ? SITE.contact.phone : "추후공지";

/** tel: 링크용 전화번호 (숫자/하이픈만) — 미등록 시 빈 문자열 */
export const telHref = hasPhone ? `tel:${SITE.contact.phone.replace(/[^\d-]/g, "")}` : "";
