# everyimagine.com

เว็บไซต์ของสตูดิโอ EveryImagine: หน้าหลัก, หน้าโปรไฟล์ของแต่ละแอพ/เกม, Privacy Policy, Terms of Service และหน้า Support
ทุกหน้ามี 2 ภาษา: อังกฤษ (`/…`) และไทย (`/th/…`)

- สร้างด้วย [Astro](https://astro.build) แบบ static ทั้งเว็บ
- โฮสต์บน Cloudflare Workers แบบ static assets ไม่มีโค้ดฝั่งเซิร์ฟเวอร์
- หน้า Support แสดงอีเมล `dev@everyimagine.com` ให้ผู้ใช้เขียนมาเอง ไม่มีฟอร์ม

## วิธีรันเพื่อดูเว็บในเครื่อง

ต้องมี Node.js 22.23.4 ขึ้นไป (ตามที่ Astro 7 กำหนด ตรวจด้วย `node -v`) เปิด Terminal ในโฟลเดอร์โปรเจ็คนี้ แล้วทำตามนี้

**1. ติดตั้ง dependencies** (ครั้งแรก หรือเมื่อ `package.json` เปลี่ยน)

```bash
npm install
```

**2. เลือกวิธีรัน**

แบบเหมือนของจริง ใช้ตรวจเว็บก่อน deploy:

```bash
npm run preview
```

- เปิดที่ <http://localhost:8787> (ฉบับไทยอยู่ที่ <http://localhost:8787/th>)
- build เว็บก่อนแล้วรันผ่าน wrangler เหมือนบน Cloudflare ทุกประการ รวมถึง URL แบบไม่มี `.html` และหน้า 404
- แก้โค้ดแล้วต้องหยุด (Ctrl+C) และรันคำสั่งนี้ใหม่จึงจะเห็นผล

แบบแก้ไปดูไป ใช้ตอนแก้ข้อความหรือดีไซน์:

```bash
npm run dev
```

- เปิดที่ <http://localhost:4321>
- บันทึกไฟล์แล้วหน้าเว็บอัปเดตเองทันที

**3. หยุดรัน** กด Ctrl+C ใน Terminal

ถ้าขึ้นว่าพอร์ตถูกใช้อยู่ (`Address already in use`) แปลว่ามีตัวที่รันค้างอยู่แล้ว ให้ใช้ตัวนั้น หรือปิดตัวเดิมก่อน

## คำสั่งทั้งหมด

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รันแบบ hot reload ที่ `localhost:4321` |
| `npm run build` | build เว็บลงโฟลเดอร์ `dist/` |
| `npm run preview` | build แล้วรันเหมือนของจริงที่ `localhost:8787` |
| `npm run deploy` | build แล้ว deploy ขึ้น Cloudflare |

## URL ของแต่ละหน้า

| หน้า | อังกฤษ | ไทย |
|---|---|---|
| หน้าหลัก | `/` | `/th` |
| แอพ MorningCam | `/morningcam` | `/th/morningcam` |
| Support | `/support` | `/th/support` |
| Privacy Policy (ฉบับกลาง) | `/privacy` | `/th/privacy` |
| Privacy เฉพาะแอพ | `/morningcam/privacy` | `/th/morningcam/privacy` |
| Terms of Service | `/terms` | `/th/terms` |

## เพิ่มแอพหรือเกมใหม่

1. วางภาพไว้ที่ `public/apps/<slug>/` (ไอคอน, ภาพหน้าจอ, ภาพ og 1200×630)
2. เพิ่มรายการใน `src/data/apps.ts` (คัดลอกของ MorningCam แล้วแก้)

เท่านี้จะได้การ์ดบนหน้าหลัก, หน้า `/<slug>`, หน้า privacy ของแอพที่ `/<slug>/privacy` (ทุกหน้ามีสองภาษา),
ลิงก์ใน footer และ sitemap โดยอัตโนมัติ

เมื่อแอพขึ้น store แล้ว: ใส่ `url` ใน `stores.ios` / `stores.android` และเปลี่ยน `status` เป็น `'released'`

## Privacy: ฉบับกลาง + หน้าเฉพาะแอพ

- `/privacy` คือนโยบายฉบับกลาง ใช้กับทุกแอพ ไม่ต้องแก้เมื่อเพิ่มแอพใหม่ (ข้อความอยู่ใน `src/legal/`)
- `/<slug>/privacy` คือหน้าสั้นๆ ของแต่ละแอพ สร้างจากช่อง `privacy` ของแอพนั้นใน `src/data/apps.ts`
  **URL นี้คือ Privacy Policy URL ที่ใส่ใน App Store Connect / Play Console และในตัวแอพ**
  เช่น `https://everyimagine.com/morningcam/privacy`

ช่อง `privacy` ของแต่ละแอพ:

| ช่อง | ใส่อะไร |
|---|---|
| `profile` | ชุดสำเร็จที่ตรงกับแอพ (ดู `privacyProfiles` ใน `apps.ts`): `on-device` = ไม่มีบัญชี ไม่มีเซิร์ฟเวอร์ ไม่มีโฆษณา/สถิติ, `ads-analytics` = มีโฆษณาหรือ SDK วัดการใช้งาน, `account` = มีบัญชีผู้ใช้และเก็บข้อมูลบนเซิร์ฟเวอร์ |
| `updated` | วันที่ปรับปรุงล่าสุดของหน้านี้ แก้ทุกครั้งที่ข้อมูลเปลี่ยน |
| `points` | ข้อความเฉพาะของแอพนี้ (ถ้ามี) แสดงต่อจากข้อความของชุดสำเร็จ |
| `permissions` | สิทธิ์ที่แอพขอ พร้อมเหตุผล |
| `thirdParties` | บริการหรือ SDK ภายนอกที่แอพใช้ |

ข้อมูลในช่องนี้ต้องตรงกับแอพที่ปล่อยจริงเสมอ ถ้าแอพเพิ่ม SDK หรือขอสิทธิ์ใหม่ ต้องแก้ที่นี่ด้วย
ตอนนี้มีแค่ชุด `on-device` ที่ใช้งานจริง อีกสองชุดเป็นร่าง ให้อ่านทวนก่อนใช้กับแอพแรก

## โครงสร้าง

```
src/data/apps.ts        ข้อมูลแอพทั้งหมด (แก้ที่นี่ที่เดียว)
src/i18n.ts             ข้อความ UI สองภาษา, อีเมล support
src/views/              เนื้อหาของแต่ละหน้า (ใช้ร่วมกันทั้ง EN/TH)
src/legal/              ข้อความ Privacy Policy ฉบับกลางและ Terms (EN/TH) + วันที่ปรับปรุงล่าสุดใน meta.ts
src/pages/              ไฟล์ route บางๆ ที่เรียก view
wrangler.jsonc          ค่าตั้ง Cloudflare (ให้เสิร์ฟไฟล์ใน dist/)
```

## Deploy บน Cloudflare (ทำครั้งแรก)

เว็บนี้ deploy เป็น Worker แบบ static assets (เลือก Workers ในหน้า Create ไม่ต้องกด "Continue to Pages")

1. **เชื่อม GitHub repo**: Cloudflare dashboard → Workers & Pages → Create → Import a repository → เลือก `everyimagine-web`
   แล้วตั้งค่าในหน้า "Create and deploy" ตามนี้

   | ช่อง | ค่า |
   |---|---|
   | Project name | `everyimagine-web` (ต้องตรงกับ `name` ใน `wrangler.jsonc`) |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | `/` (ค่าเริ่มต้น) |

   ไม่ต้องกำหนดเวอร์ชัน Node: ค่าเริ่มต้นของ Cloudflare (24.22.1 ณ พ.ย. 2026) ใหม่พอสำหรับ Astro 7
   ซึ่งต้องการ 22.23.4 ขึ้นไป อย่าใส่ไฟล์ `.node-version` ที่ระบุรุ่นซึ่งเพิ่งออกใหม่
   เพราะเครื่อง build ติดตั้งรุ่นที่ไม่มีมาให้ล่วงหน้าไม่สำเร็จ (เคยล้มเหลวกับ 24.22.3)
   ถ้าวันหนึ่งต้องกำหนดเอง ให้ใช้ตัวแปร `NODE_VERSION` ใน Settings → Build → Variables
   หลังจากนี้ทุกครั้งที่ push ขึ้น `main` Cloudflare จะ build และ deploy ให้เอง

   (อีกทางคือ deploy จากเครื่องด้วย `npm run deploy` ซึ่ง wrangler จะให้ล็อกอินครั้งแรก)
2. **ย้าย DNS ของโดเมนมาที่ Cloudflare** (โดเมนจดกับ GoDaddy และยังจดอยู่ที่ GoDaddy ต่อไปได้ ไม่ต้องโอนโดเมน)
   - Cloudflare dashboard → Add a domain → ใส่ `everyimagine.com` → เลือกแผน Free
   - Cloudflare จะดึงระเบียน DNS เดิมมาให้ ตอนนี้มีแค่ระเบียน A สองตัวของหน้าพักโดเมน GoDaddy
     (`15.197.148.33`, `3.33.130.190`) และ `www` ให้ลบทิ้งทั้งหมด เพราะ Worker จะสร้างระเบียนของตัวเอง
   - Cloudflare จะให้ชื่อ nameserver มา 2 ตัว นำไปใส่ที่ GoDaddy: My Products → Domains → `everyimagine.com`
     → DNS → Nameservers → Change Nameservers → "I'll use my own nameservers" แล้ววางทั้งสองตัว
     (ถ้าเปิด DNSSEC ไว้ที่ GoDaddy ให้ปิดก่อน)
   - รอจนสถานะโดเมนใน Cloudflare เป็น Active (ปกติไม่กี่นาทีถึงไม่กี่ชั่วโมง)
3. **ผูกโดเมนกับ Worker**: ที่ Worker → Settings → Domains & Routes → Add → Custom domain
   เพิ่ม `everyimagine.com` และ `www.everyimagine.com`
   (ใน App Store Connect ของ MorningCam ตั้ง URL เป็น `www.everyimagine.com/support` และ `/morningcam` ไว้ จึงต้องเปิด `www` ได้ด้วย)
4. **เปิดรับอีเมล `dev@everyimagine.com`** ตอนนี้โดเมนยังไม่มีระเบียน MX แปลว่าอีเมลนี้ยังรับจดหมายไม่ได้
   ต้องทำก่อนเปิดเว็บจริง เพราะหน้า Support, Privacy และ Terms บอกให้ผู้ใช้เขียนมาที่อีเมลนี้
   - โดเมน → Email → Email Routing → เปิดใช้งาน (Cloudflare จะเพิ่มระเบียน MX ให้เอง)
   - สร้าง address `dev@everyimagine.com` ให้ส่งต่อไปกล่องจดหมายจริงของคุณ
   - กดยืนยันในอีเมลที่ Cloudflare ส่งไปที่กล่องนั้น
   - ทดสอบ: ส่งอีเมลจากบัญชีอื่นมาที่ `dev@everyimagine.com` แล้วดูว่าเข้ากล่องจริง

   Email Routing รับและส่งต่อเท่านั้น เวลาตอบกลับผู้ใช้ อีเมลจะออกจากกล่องจดหมายจริงของคุณ
   ถ้าอยากตอบในชื่อ `dev@everyimagine.com` ต้องใช้บริการกล่องจดหมายของโดเมน เช่น Google Workspace
5. ทดสอบหลัง deploy: เปิดทุกหน้าตามตาราง URL ด้านบน ทั้ง `everyimagine.com` และ `www.everyimagine.com`

## หมายเหตุ

- Privacy Policy และ Terms เป็นฉบับร่าง ควรให้ผู้มีความรู้ด้านกฎหมายตรวจก่อนใช้จริง
- ปุ่ม App Store / Google Play เป็นปุ่มข้อความธรรมดา ยังไม่ได้ใช้ป้าย (badge) ทางการของ Apple/Google
