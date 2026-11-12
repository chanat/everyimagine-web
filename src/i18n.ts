export const languages = { en: 'English', th: 'ไทย' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** A string available in every site language. */
export type L = Record<Lang, string>;

/** Build a URL for `lang` from a language-neutral path such as "/" or "/privacy". */
export function href(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

export const SUPPORT_EMAIL = 'dev@everyimagine.com';
export const SITE_NAME = 'EveryImagine';
export const SITE_URL = 'https://everyimagine.com';

export const ui = {
  en: {
    'nav.apps': 'Apps & games',
    'nav.studio': 'Studio',
    'nav.support': 'Support',
    'nav.menu': 'Menu',
    'skip': 'Skip to content',
    'footer.tagline': 'A studio in Bangkok, making apps and casual games.',
    'footer.studio': 'Studio',
    'footer.legal': 'Legal',
    'footer.help': 'Help',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact support',
    'footer.made': 'Made in Bangkok',
    'footer.rights': 'All rights reserved.',
    'lang.switch': 'Language',
    'kind.app': 'App',
    'kind.game': 'Game',
    'status.coming': 'Coming soon',
    'status.released': 'Available now',
    'app.view': 'View details',
    'app.getOn': 'Get it on',
    'app.soonOn': 'Coming soon to',
    'app.features': 'What it does',
    'app.screens': 'Screenshots',
    'app.details': 'Details',
    'app.platforms': 'Platforms',
    'app.languages': 'Languages',
    'app.price': 'Price',
    'app.category': 'Category',
    'app.privacyTitle': 'Privacy at a glance',
    'app.privacyLink': 'Privacy details for this app',
    'app.helpTitle': 'Need a hand?',
    'app.helpBody': 'Questions, bugs or ideas — we read every message.',
    'app.helpCta': 'Contact support',
    'app.back': 'All apps & games',
    'legal.updated': 'Last updated',
    'legal.contents': 'On this page',
    '404.title': 'This page wandered off',
    '404.body': 'We couldn’t find what you were looking for. It may have moved, or never existed outside someone’s imagination.',
    '404.home': 'Back to home',
  },
  th: {
    'nav.apps': 'แอพและเกม',
    'nav.studio': 'สตูดิโอ',
    'nav.support': 'ช่วยเหลือ',
    'nav.menu': 'เมนู',
    'skip': 'ข้ามไปยังเนื้อหา',
    'footer.tagline': 'สตูดิโอในกรุงเทพฯ สร้างแอพและเกมแคชชวล',
    'footer.studio': 'สตูดิโอ',
    'footer.legal': 'ข้อกำหนด',
    'footer.help': 'ช่วยเหลือ',
    'footer.privacy': 'นโยบายความเป็นส่วนตัว',
    'footer.terms': 'ข้อกำหนดการใช้งาน',
    'footer.contact': 'ติดต่อฝ่ายช่วยเหลือ',
    'footer.made': 'สร้างในกรุงเทพฯ',
    'footer.rights': 'สงวนลิขสิทธิ์',
    'lang.switch': 'ภาษา',
    'kind.app': 'แอพ',
    'kind.game': 'เกม',
    'status.coming': 'เร็วๆ นี้',
    'status.released': 'พร้อมให้ดาวน์โหลด',
    'app.view': 'ดูรายละเอียด',
    'app.getOn': 'ดาวน์โหลดบน',
    'app.soonOn': 'เร็วๆ นี้บน',
    'app.features': 'ทำอะไรได้บ้าง',
    'app.screens': 'ภาพหน้าจอ',
    'app.details': 'ข้อมูลแอพ',
    'app.platforms': 'แพลตฟอร์ม',
    'app.languages': 'ภาษา',
    'app.price': 'ราคา',
    'app.category': 'หมวดหมู่',
    'app.privacyTitle': 'ความเป็นส่วนตัวโดยสรุป',
    'app.privacyLink': 'รายละเอียดความเป็นส่วนตัวของแอพนี้',
    'app.helpTitle': 'ต้องการความช่วยเหลือ?',
    'app.helpBody': 'มีคำถาม เจอปัญหา หรือมีไอเดีย เราอ่านทุกข้อความ',
    'app.helpCta': 'ติดต่อฝ่ายช่วยเหลือ',
    'app.back': 'แอพและเกมทั้งหมด',
    'legal.updated': 'ปรับปรุงล่าสุด',
    'legal.contents': 'ในหน้านี้',
    '404.title': 'หน้านี้หายไปไหนแล้ว',
    '404.body': 'เราหาหน้าที่คุณต้องการไม่พบ อาจถูกย้าย หรืออาจมีอยู่แค่ในจินตนาการ',
    '404.home': 'กลับหน้าแรก',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}
