import type { Locale } from "./config";
import {
  APARTMENT_STATUS_LABEL,
  type Apartment,
  type ApartmentStatus,
} from "@/lib/types";

// Bản dịch tiếng Hàn cho nội dung động (mô tả căn hộ, tiện ích, trạng thái).
// Khi thiếu bản dịch -> fallback về tiếng Việt gốc.

const DESCRIPTION_KO: Record<string, string> = {
  a1: "더 교토 고층에 자리한 침실 2개 아파트로, 중앙 인공호수의 탁 트인 전망을 자랑합니다. 일본식 미니멀 수입 가구와 아침 햇살이 드는 넓은 발코니를 갖췄습니다.",
  a2: "양면이 트인 코너형 침실 3개로 자연광이 가득합니다. 고급스러운 네오클래식 디자인으로 가족에게 적합하며, 중앙 공원과 상가 거리에 인접해 있습니다.",
  a3: "풀옵션 모던 스튜디오로 전문직과 1인 가구에 이상적입니다. 정교한 마감과 센토사 호수 전망, 단지 상가까지 도보 3분 거리입니다.",
  a4: "더 케이파크 애비뉴 구역 최고급 아파트로, 마스터 욕실이 딸린 침실 3개를 갖췄습니다. 황동 마감 가구와 전체 스마트홈 시스템, 라이트 광장 전망을 자랑합니다.",
  a5: "일본 젠 스타일의 침실 2개 아파트로, 천연 오크 원목과 차분한 톤이 어우러집니다. 풀옵션으로 즉시 입주 가능합니다.",
  a6: "호수 위로 펼쳐지는 화려한 노을을 맞이하는 고층 아파트입니다. 모던 인도차이나 스타일과 넓은 발코니로 커플과 젊은 가족에게 적합합니다.",
};

const AMENITY_KO: Record<string, string> = {
  "View hồ trung tâm": "중앙 호수 전망",
  "Hồ bơi vô cực": "인피니티 풀",
  "Phòng gym": "피트니스장",
  "Ban công rộng": "넓은 발코니",
  "Ban công": "발코니",
  "Bãi đỗ xe": "주차장",
  "2 chỗ đỗ xe": "주차 2면",
  "An ninh 24/7": "24시간 보안",
  "Nội thất cao cấp": "고급 가구",
  "Smart home": "스마트홈",
  "Smart home toàn bộ": "전체 스마트홈",
  "Căn góc 2 view": "코너형 2면 전망",
  "Hồ bơi": "수영장",
  "Bếp đầy đủ": "풀옵션 주방",
  "View hồ Sentosa": "센토사 호수 전망",
  "Máy giặt": "세탁기",
  "Điều hoà": "에어컨",
  "View hoàng hôn": "노을 전망",
};

const STATUS_KO: Record<ApartmentStatus, string> = {
  trong: "임대 가능",
  dang_thue: "임대중",
  dang_xu_ly: "처리중",
};

export function translateDescription(apt: Apartment, locale: Locale): string {
  if (locale === "ko") return DESCRIPTION_KO[apt.id] ?? apt.description;
  return apt.description;
}

export function translateAmenity(name: string, locale: Locale): string {
  if (locale === "ko") return AMENITY_KO[name] ?? name;
  return name;
}

export function statusLabel(status: ApartmentStatus, locale: Locale): string {
  return locale === "ko" ? STATUS_KO[status] : APARTMENT_STATUS_LABEL[status];
}
