/** Các kênh nhắn tin để liên hệ — dùng chung cho trang Giới thiệu & Footer. */
export type SocialContact = {
  name: string;
  handle: string;
  href: string;
  /** Đường dẫn logo trong /public */
  logo: string;
  /** Màu nền tile (nhạt) cho logo */
  tint: string;
  /** Màu chữ/accent đọc được trên nền sáng */
  accent: string;
};

export const SOCIAL_CONTACTS: SocialContact[] = [
  {
    name: "Zalo",
    handle: "0901 234 567",
    href: "https://zalo.me/0901234567",
    logo: "/Social_logo/Icon_of_Zalo.png",
    tint: "#E8F1FF",
    accent: "#0068FF",
  },
  {
    name: "Messenger",
    handle: "m.me/canhoxuthanh",
    href: "https://m.me/canhoxuthanh",
    logo: "/Social_logo/Messenger_logo.png",
    tint: "#E9F2FF",
    accent: "#0084FF",
  },
  {
    name: "KakaoTalk",
    handle: "ID: canhoxuthanh",
    href: "https://open.kakao.com/",
    logo: "/Social_logo/KakaoTalk_logo.png",
    tint: "#FFF8DA",
    accent: "#7A5A00",
  },
  {
    name: "LINE",
    handle: "@canhoxuthanh",
    href: "https://line.me/R/ti/p/@canhoxuthanh",
    logo: "/Social_logo/LINE_logo.png",
    tint: "#E5F8EC",
    accent: "#06A848",
  },
  {
    name: "WeChat",
    handle: "ID: canhoxuthanh",
    href: "#",
    logo: "/Social_logo/wechat-logo.svg",
    tint: "#E5F8EC",
    accent: "#069A4E",
  },
];
