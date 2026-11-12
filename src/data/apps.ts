import type { L, Lang } from '../i18n';

/**
 * Every app or game the studio has published (or is about to).
 *
 * To add a new one:
 *   1. put its images in  public/apps/<slug>/
 *   2. add an entry to the `apps` array below
 * The home page card, the /<slug> page, the app's own privacy page at
 * /<slug>/privacy (all in EN + TH), the footer link and the sitemap are all
 * generated from this file.
 *
 * Privacy: pick the `privacy.profile` that matches what the app really does
 * (see `privacyProfiles` below), then add only what is specific to this app:
 * extra `points`, the `permissions` it requests and its `thirdParties`.
 */

export type IconName =
  | 'image'
  | 'type'
  | 'shuffle'
  | 'mic'
  | 'palette'
  | 'frame'
  | 'share'
  | 'tablet'
  | 'globe'
  | 'heart';

export interface Shot {
  src: string;
  alt: L;
}

export interface StoreLink {
  /** Minimum OS, e.g. "iOS 17" */
  requires: L;
  /** Store page. Leave undefined until the app is live: the button shows "Coming soon". */
  url?: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  kind: 'app' | 'game';
  status: 'coming-soon' | 'released';
  /** Brand colour of the app, used for accents on its page. */
  accent: string;
  accentSoft: string;
  icon: string;
  category: L;
  tagline: L;
  /** One or two sentences, used on cards and as the meta description. */
  summary: L;
  /** Longer intro paragraphs on the app page. */
  about: L[];
  /** Wide banner image per language (optional). */
  banner?: Record<Lang, Shot>;
  /** 1200×630 JPG/PNG shown when the app page is shared (optional; falls back to the studio image). */
  ogImage?: string;
  highlights: { value: string; label: L }[];
  steps?: { title: L; body: L }[];
  features: { icon: IconName; title: L; body: L }[];
  /** Phone screenshots, per site language. The first two are used on the home page card. */
  screenshots: Record<Lang, Shot[]>;
  /** Things made with the app (optional). */
  gallery?: { title: L; items: Record<Lang, Shot[]> };
  stores: { ios?: StoreLink; android?: StoreLink };
  languages: L;
  price: L;
  /** Facts shown on the app page and on /<slug>/privacy. Keep them true to the shipped app. */
  privacy: {
    /** The ready-made set of statements this app starts from. */
    profile: PrivacyProfileName;
    /** "Last updated" for this app's privacy page. Change it whenever the facts below change. */
    updated: L;
    /** Statements specific to this app, shown after the profile's own. */
    points?: L[];
    permissions: { name: L; why: L }[];
    /** Third-party services this app uses, in addition to any the profile lists. */
    thirdParties?: ThirdParty[];
  };
}

export interface ThirdParty {
  name: string;
  purpose: L;
}

/**
 * Ready-made privacy statements for the common kinds of app.
 * An app's privacy page shows its profile's points first, then the app's own.
 *
 * Only `on-device` is in use today. Read the other two again, and adjust them,
 * before the first app that uses them ships: they must describe that app truthfully.
 */
export const privacyProfiles = {
  /** No account, no server, no analytics, no ads. */
  'on-device': {
    label: { en: 'Works on your device', th: 'ทำงานในอุปกรณ์ของคุณ' },
    points: [
      {
        en: 'No account and no sign-in. The app has no server of its own.',
        th: 'ไม่มีบัญชีผู้ใช้ ไม่ต้องล็อกอิน และแอพไม่มีเซิร์ฟเวอร์ของตัวเอง',
      },
      {
        en: 'No analytics, no advertising and no tracking software.',
        th: 'ไม่มีระบบเก็บสถิติการใช้งาน ไม่มีโฆษณา และไม่มีซอฟต์แวร์ติดตาม',
      },
    ],
  },
  /** Shows ads and/or measures usage through third-party SDKs. List each SDK in `thirdParties`. */
  'ads-analytics': {
    label: { en: 'Uses advertising and analytics', th: 'มีโฆษณาและการวิเคราะห์การใช้งาน' },
    points: [
      {
        en: 'This app shows advertising and measures how it is used, through the third-party services listed below.',
        th: 'แอพนี้แสดงโฆษณาและวัดการใช้งาน ผ่านบริการของบุคคลที่สามที่ระบุไว้ด้านล่าง',
      },
      {
        en: 'Those services may collect device identifiers (such as the advertising ID), your approximate location based on your IP address, and usage and diagnostic data, and may use them to show and measure ads. Each service handles this data under its own privacy policy.',
        th: 'บริการเหล่านั้นอาจเก็บตัวระบุอุปกรณ์ (เช่น รหัสโฆษณา) ตำแหน่งโดยประมาณจากที่อยู่ IP และข้อมูลการใช้งานและการวินิจฉัย และอาจใช้ข้อมูลดังกล่าวเพื่อแสดงและวัดผลโฆษณา โดยแต่ละบริการจัดการข้อมูลตามนโยบายความเป็นส่วนตัวของตนเอง',
      },
      {
        en: 'Where the law requires it, the app asks for your consent first. You can also limit ad personalisation in your device’s privacy settings.',
        th: 'ในกรณีที่กฎหมายกำหนด แอพจะขอความยินยอมจากคุณก่อน และคุณจำกัดการปรับโฆษณาตามความสนใจได้ในการตั้งค่าความเป็นส่วนตัวของอุปกรณ์',
      },
    ],
  },
  /** Has user accounts and stores data on our servers. */
  account: {
    label: { en: 'Uses an account', th: 'มีบัญชีผู้ใช้' },
    points: [
      {
        en: 'This app lets you create an account. We store your sign-in details (such as your email address) and the data you choose to save to your account on our servers, so that it is available on your devices.',
        th: 'แอพนี้ให้คุณสร้างบัญชีได้ เราเก็บข้อมูลการเข้าสู่ระบบ (เช่น อีเมล) และข้อมูลที่คุณเลือกบันทึกไว้ในบัญชีบนเซิร์ฟเวอร์ของเรา เพื่อให้ใช้ได้บนอุปกรณ์ของคุณ',
      },
      {
        en: 'You can delete your account and the data in it from inside the app, or by contacting us.',
        th: 'คุณลบบัญชีและข้อมูลในบัญชีได้จากในแอพ หรือติดต่อเรา',
      },
    ],
  },
} satisfies Record<string, { label: L; points: L[] }>;

export type PrivacyProfileName = keyof typeof privacyProfiles;

/** The full privacy facts for an app: its profile's statements followed by its own. */
export function privacyOf(app: AppEntry) {
  const profile = privacyProfiles[app.privacy.profile];
  return {
    label: profile.label,
    updated: app.privacy.updated,
    points: [...profile.points, ...(app.privacy.points ?? [])],
    permissions: app.privacy.permissions,
    thirdParties: app.privacy.thirdParties ?? [],
  };
}

const mc = '/apps/morningcam';

export const apps: AppEntry[] = [
  {
    slug: 'morningcam',
    name: 'MorningCam',
    kind: 'app',
    status: 'coming-soon',
    accent: '#1E63D4',
    accentSoft: '#E3EDFC',
    icon: `${mc}/icon.webp`,
    category: { en: 'Photo & greetings', th: 'ภาพและคำอวยพร' },
    tagline: {
      en: 'Photos with beautiful wishes',
      th: 'แต่งภาพทักทาย พร้อมคำอวยพรสวยๆ',
    },
    summary: {
      en: 'Send a good-morning picture to the people you love in three steps: tap a style, tap to shuffle a message, and send it to LINE or social media.',
      th: 'ส่งภาพสวัสดีตอนเช้าให้คนที่คุณรัก เสร็จใน 3 ขั้นตอน แตะเลือกแบบ แตะสุ่มข้อความ แล้วส่งเข้า LINE ได้เลย',
    },
    about: [
      {
        en: 'MorningCam is made for people who love sending morning greetings to family and friends every day. No design skills needed: a beautiful picture takes less than a minute.',
        th: 'MorningCam ทำมาสำหรับคนที่ชอบส่งภาพทักทายยามเช้าให้ครอบครัวและเพื่อนๆ ทุกวัน ไม่ต้องเป็นมืออาชีพ ก็ทำภาพสวยได้ในหนึ่งนาที',
      },
      {
        en: 'Version 2.0 has been rebuilt from the ground up. It is faster, prettier and easier to use, on iPhone, iPad and Android.',
        th: 'เวอร์ชัน 2.0 สร้างใหม่ทั้งหมด เร็วขึ้น สวยขึ้น และใช้ง่ายกว่าเดิม ทั้งบน iPhone, iPad และ Android',
      },
    ],
    banner: {
      en: {
        src: `${mc}/header-en.webp`,
        alt: {
          en: 'Three greeting pictures made with MorningCam: Happy Birthday, Good Morning and Peaceful Mind',
          th: 'ภาพทักทายสามภาพที่ทำด้วย MorningCam',
        },
      },
      th: {
        src: `${mc}/header-th.webp`,
        alt: {
          en: 'Three greeting pictures made with MorningCam',
          th: 'ภาพทักทายสามภาพที่ทำด้วย MorningCam: สุขสันต์วันเกิด สวัสดีตอนเช้า และอนุโมทนาบุญ',
        },
      },
    },
    ogImage: `${mc}/og.jpg`,
    highlights: [
      { value: '220+', label: { en: 'backgrounds', th: 'ภาพพื้นหลัง' } },
      { value: '360+', label: { en: 'greetings & wishes', th: 'คำทักทายและคำอวยพร' } },
      { value: '5', label: { en: 'text languages', th: 'ภาษาของข้อความ' } },
      { value: '6', label: { en: 'categories', th: 'หมวดให้เลือก' } },
    ],
    steps: [
      {
        title: { en: 'Pick a picture', th: 'เลือกภาพ' },
        body: {
          en: 'Choose from the app’s gallery, take a new photo, or use one of your own.',
          th: 'จากคลังภาพของแอพ ถ่ายใหม่ หรือเลือกจากอัลบั้มของคุณ',
        },
      },
      {
        title: { en: 'Add your words', th: 'ใส่ข้อความ' },
        body: {
          en: 'Tap shuffle until you like it, or write your own, then drag it anywhere on the picture.',
          th: 'แตะสุ่มจนกว่าจะถูกใจ หรือพิมพ์เองก็ได้ แล้วลากไปวางตรงไหนก็ได้บนภาพ',
        },
      },
      {
        title: { en: 'Send it', th: 'ส่ง' },
        body: {
          en: 'Send it to LINE, save it to your phone, or share it to another app.',
          th: 'เข้า LINE บันทึกลงเครื่อง หรือแชร์ไปแอพอื่น',
        },
      },
    ],
    features: [
      {
        icon: 'image',
        title: { en: '220+ backgrounds', th: 'ภาพพื้นหลังกว่า 220 ภาพ' },
        body: {
          en: 'From lifelike photos to cute illustrations, with free pictures in every category: Good Morning, Hello, Blessings, Happy Birthday, Celebrate and Inspiration.',
          th: 'ทั้งภาพสวยสมจริงและภาพวาดน่ารัก มีภาพฟรีให้ทุกหมวด: ทักทายยามเช้า สวัสดี อวยพร สุขสันต์วันเกิด เฉลิมฉลอง และธรรมะ ข้อคิด',
        },
      },
      {
        icon: 'shuffle',
        title: { en: 'Greetings that never repeat', th: 'คำอวยพรสุ่มได้ไม่ซ้ำ' },
        body: {
          en: '360+ greetings and wishes, with the day filled in for you, like “Happy Monday”. One tap shuffles the message, the picture or the whole style.',
          th: 'คำอวยพรกว่า 360 แบบ ใส่ชื่อวันให้อัตโนมัติ เช่น “สวัสดีวันจันทร์” แตะเดียวสุ่มข้อความ สุ่มภาพ หรือสุ่มสไตล์ทั้งหมดได้',
        },
      },
      {
        icon: 'globe',
        title: { en: 'Text in 5 languages', th: 'ข้อความ 5 ภาษา' },
        body: {
          en: 'Thai, English, Chinese, Japanese and Hindi, switched with one tap, each with its own set of beautiful fonts.',
          th: 'ไทย อังกฤษ จีน ญี่ปุ่น และฮินดี สลับได้ในแตะเดียว พร้อมฟอนต์สวยๆ ของแต่ละภาษา',
        },
      },
      {
        icon: 'mic',
        title: { en: 'Speak instead of typing', th: 'พูดแทนการพิมพ์' },
        body: {
          en: 'Say your message out loud and the app writes it for you.',
          th: 'พูดใส่ไมค์ แล้วแอพพิมพ์ข้อความให้',
        },
      },
      {
        icon: 'palette',
        title: { en: 'Make it yours', th: 'แต่งได้ตามใจ' },
        body: {
          en: 'Text colour, size and position, plus shadow, outline and text background, so words are easy to read on any picture.',
          th: 'ปรับสี ขนาด และตำแหน่งข้อความ พร้อมเงา ขอบ และพื้นหลังข้อความ ให้ตัวหนังสืออ่านง่ายบนทุกภาพ',
        },
      },
      {
        icon: 'frame',
        title: { en: 'Frames, filters and stickers', th: 'กรอบ ฟิลเตอร์ และสติกเกอร์' },
        body: {
          en: 'Finishing touches that make a picture prettier in one tap. Add your name as the sender, too.',
          th: 'ของตกแต่งที่ทำให้ภาพสวยขึ้นในแตะเดียว และใส่ชื่อผู้ส่งบนภาพได้ด้วย',
        },
      },
      {
        icon: 'share',
        title: { en: 'Sized for where you send it', th: 'ขนาดพอดีกับที่ที่จะส่ง' },
        body: {
          en: 'Sizes that fit LINE, Facebook, IG Story, phone wallpaper, tablet and PC. Pictures you made before are ready to send again.',
          th: 'เลือกขนาดให้พอดี LINE, Facebook, IG Story, วอลเปเปอร์มือถือ, แท็บเล็ต และ PC ภาพที่เคยทำไว้เปิดส่งซ้ำได้ทันที',
        },
      },
      {
        icon: 'tablet',
        title: { en: 'iPhone, iPad and Android', th: 'iPhone, iPad และ Android' },
        body: {
          en: 'A fully native app on every platform, with full-screen iPad support.',
          th: 'แอพ native เต็มรูปแบบทุกแพลตฟอร์ม รองรับ iPad เต็มจอ',
        },
      },
    ],
    screenshots: {
      en: [
        { src: `${mc}/screen-en-03-editor.webp`, alt: { en: 'Adding text to a picture, with editing tools', th: 'หน้าใส่ข้อความพร้อมเครื่องมือแต่งภาพ' } },
        { src: `${mc}/screen-en-01-home.webp`, alt: { en: 'Home screen with six greeting categories', th: 'หน้าแรก เลือกหมวดคำทักทาย 6 หมวด' } },
        { src: `${mc}/screen-en-02-pick.webp`, alt: { en: 'Choosing a background picture', th: 'หน้าเลือกภาพพื้นหลัง' } },
        { src: `${mc}/screen-en-04-export.webp`, alt: { en: 'Choosing a size, then sending or saving', th: 'หน้าเลือกขนาด แล้วส่งหรือบันทึก' } },
      ],
      th: [
        { src: `${mc}/screen-th-03-editor.webp`, alt: { en: 'Adding text to a picture, with editing tools', th: 'หน้าใส่ข้อความพร้อมเครื่องมือแต่งภาพ' } },
        { src: `${mc}/screen-th-01-home.webp`, alt: { en: 'Home screen with six greeting categories', th: 'หน้าแรก เลือกหมวดคำทักทาย 6 หมวด' } },
        { src: `${mc}/screen-th-02-pick.webp`, alt: { en: 'Choosing a background picture', th: 'หน้าเลือกภาพพื้นหลัง' } },
        { src: `${mc}/screen-th-04-export.webp`, alt: { en: 'Choosing a size, then sending or saving', th: 'หน้าเลือกขนาด แล้วส่งหรือบันทึก' } },
      ],
    },
    gallery: {
      title: { en: 'Made with MorningCam', th: 'ภาพที่ทำด้วย MorningCam' },
      items: {
        en: [
          { src: `${mc}/card-en-sunrise.webp`, alt: { en: 'Good Morning greeting over a sunrise', th: 'ภาพ Good Morning บนพระอาทิตย์ขึ้น' } },
          { src: `${mc}/card-en-cake.webp`, alt: { en: 'Happy Birthday greeting with a cake', th: 'ภาพ Happy Birthday กับเค้ก' } },
          { src: `${mc}/card-en-lotus.webp`, alt: { en: 'Peaceful Mind message with a lotus', th: 'ภาพ Peaceful Mind กับดอกบัว' } },
        ],
        th: [
          { src: `${mc}/card-th-sunrise.webp`, alt: { en: 'Thai good-morning greeting over a sunrise', th: 'ภาพสวัสดีตอนเช้าบนพระอาทิตย์ขึ้น' } },
          { src: `${mc}/card-th-cake.webp`, alt: { en: 'Thai birthday greeting with a cake', th: 'ภาพสุขสันต์วันเกิดกับเค้ก' } },
          { src: `${mc}/card-th-lotus.webp`, alt: { en: 'Thai blessing with a lotus', th: 'ภาพอนุโมทนาบุญกับดอกบัว' } },
        ],
      },
    },
    stores: {
      // Set `url` when version 2.0 is live on each store, and change `status` above to 'released'.
      //   App Store:   https://apps.apple.com/app/id1128294572
      //   Google Play: https://play.google.com/store/apps/details?id=com.devsta.morningcam.th
      ios: { requires: { en: 'iOS 17 or later · iPhone and iPad', th: 'iOS 17 ขึ้นไป · iPhone และ iPad' } },
      android: { requires: { en: 'Android 8.0 or later', th: 'Android 8.0 ขึ้นไป' } },
    },
    languages: {
      en: 'Thai, English, Simplified Chinese, Japanese, Hindi',
      th: 'ไทย, อังกฤษ, จีนตัวย่อ, ญี่ปุ่น, ฮินดี',
    },
    price: {
      en: 'Free to use, with a small watermark. Optional one-time purchases. No subscription, no ads.',
      th: 'ใช้ฟรี มีลายน้ำเล็กๆ ที่มุมภาพ ของเสริมเป็นการซื้อครั้งเดียว ไม่มีสมัครสมาชิก ไม่มีโฆษณา',
    },
    privacy: {
      profile: 'on-device',
      updated: { en: '12 November 2026', th: '12 พฤศจิกายน 2569' },
      points: [
        {
          en: 'Your photos are never uploaded. Pictures you pick, take or make stay on your device, and leave it only when you choose to send, save or share them.',
          th: 'รูปของคุณไม่ถูกอัปโหลด ภาพที่คุณเลือก ถ่าย หรือทำขึ้นจะอยู่ในอุปกรณ์ และออกจากอุปกรณ์เฉพาะเมื่อคุณเลือกส่ง บันทึก หรือแชร์เอง',
        },
        {
          en: 'The app keeps your most recent finished pictures (up to 30), your chosen language and a record of what you have purchased on your device. Uninstalling the app removes them.',
          th: 'แอพเก็บภาพที่ทำเสร็จล่าสุด (สูงสุด 30 ภาพ) ภาษาที่เลือก และรายการที่ซื้อแล้วไว้ในอุปกรณ์ เมื่อถอนการติดตั้งแอพ ข้อมูลเหล่านี้จะถูกลบ',
        },
        {
          en: 'Speak instead of typing: only while you use the microphone button, your speech is turned into text by your device’s speech recognition service (Apple on iOS; on Android the system provider, usually Google), which may process the audio on its servers. MorningCam receives only the resulting text and does not record or keep audio.',
          th: 'พูดแทนการพิมพ์: เฉพาะขณะที่คุณใช้ปุ่มไมโครโฟน เสียงของคุณจะถูกแปลงเป็นข้อความโดยบริการรู้จำเสียงของอุปกรณ์ (Apple บน iOS ส่วนบน Android เป็นผู้ให้บริการของระบบ ซึ่งโดยทั่วไปคือ Google) ซึ่งอาจประมวลผลเสียงบนเซิร์ฟเวอร์ของผู้ให้บริการนั้น MorningCam ได้รับเฉพาะข้อความที่แปลงแล้ว และไม่บันทึกหรือเก็บเสียง',
        },
      ],
      permissions: [
        {
          name: { en: 'Camera (iOS)', th: 'กล้อง (iOS)' },
          why: { en: 'To take a photo to use as your background.', th: 'เพื่อถ่ายภาพมาใช้เป็นพื้นหลัง' },
        },
        {
          name: { en: 'Microphone and Speech Recognition (iOS)', th: 'ไมโครโฟนและการรู้จำเสียง (iOS)' },
          why: { en: 'To let you speak your message instead of typing it.', th: 'เพื่อให้คุณพูดข้อความแทนการพิมพ์' },
        },
        {
          name: { en: 'Photos, add only (iOS)', th: 'รูปภาพ แบบเพิ่มอย่างเดียว (iOS)' },
          why: {
            en: 'To save finished pictures to your library. Picking a photo uses the system picker, so the app sees only the photos you select.',
            th: 'เพื่อบันทึกภาพที่ทำเสร็จลงคลังรูป การเลือกรูปใช้ตัวเลือกรูปของระบบ แอพจึงเห็นเฉพาะรูปที่คุณเลือก',
          },
        },
        {
          name: { en: 'Storage (Android 9 and earlier)', th: 'พื้นที่จัดเก็บ (Android 9 ลงไป)' },
          why: {
            en: 'To save finished pictures. On Android the camera, photo picker and voice input are provided by the system, so the app requests no camera or microphone permission.',
            th: 'เพื่อบันทึกภาพที่ทำเสร็จ บน Android กล้อง ตัวเลือกรูป และการรับเสียงเป็นของระบบ แอพจึงไม่ขอสิทธิ์กล้องหรือไมโครโฟน',
          },
        },
      ],
      thirdParties: [
        {
          name: 'Apple App Store (StoreKit)',
          purpose: { en: 'In-app purchases on iOS', th: 'การซื้อภายในแอพบน iOS' },
        },
        {
          name: 'Google Play Billing',
          purpose: { en: 'In-app purchases on Android', th: 'การซื้อภายในแอพบน Android' },
        },
        {
          name: 'Apple Speech / Android system speech recognition',
          purpose: { en: 'Speak-instead-of-typing, only when you use it', th: 'ฟีเจอร์พูดแทนการพิมพ์ เฉพาะเมื่อคุณใช้งาน' },
        },
      ],
    },
  },
];

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((a) => a.slug === slug);
}
