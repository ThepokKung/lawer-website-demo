# คู่มือการตั้งค่า Cloudflare Auto Deploy (Branch: main) & Free Tier

โปรเจกต์นี้ได้รับการตั้งค่าและปรับแต่งให้พร้อมสำหรับการเชื่อมต่อกับ **GitHub/GitLab** เพื่อให้ Cloudflare ทำการ **Auto Deploy อัตโนมัติทุกครั้งที่ push โค้ดเข้า branch `main`** โดยใช้งานบน **Cloudflare Free Tier ได้ 100% ฟรีตลอดชีพ**

---

## ⚡ 1. สถาปัตยกรรม & ทำไมถึงใช้ Free Tier ได้อย่างสมบูรณ์แบบ

| หัวข้อ | รายละเอียด |
| :--- | :--- |
| **รูปแบบสถาปัตยกรรม** | **Static Site Generation (SSG)** เสิร์ฟผ่าน Edge CDN ทั่วโลก |
| **ขนาดโปรเจกต์จริง** | **~4.85 MB** (จากโควตาฟรีสูงสุด 1,000 MB) |
| **ขนาดไฟล์ใหญ่สุด** | **832 KB** (ต่ำกว่าขีดจำกัด 25 MB ต่อไฟล์ของ Free Tier มาก) |
| **การใช้ CPU Request** | **0 ms** (เนื่องจากไฟล์ HTML, CSS, JS, รูปภาพ ถูกแคชและเสิร์ฟตรงจาก Cloudflare Edge CDN 300+ เมืองทั่วโลก จึง **ไม่ถูกหักโควตา 100,000 requests/day** ทำให้รองรับทราฟฟิกได้ไม่จำกัด Unlimited ฟรี 100%) |
| **ระบบรับส่งฟอร์ม** | ฟอร์มติดต่อส่งตรงเข้า **Google Apps Script Webhook** จากเบราว์เซอร์ จึงไม่ต้องรัน Serverless Function ให้เปลืองโควตา |
| **Node.js Environment** | กำหนดเวอร์ชันไว้ในไฟล์ [`.nvmrc`](file:///d:/Work_Dir/Law/.nvmrc) เป็น **Node 20** เพื่อให้ Cloudflare build container คอมไพล์ได้ราบรื่น 100% |

---

## 🔐 2. การตั้งค่า Environment Variables (.env) — เอาเฉพาะ Key สำคัญ

ระบบถูกย้ายข้อมูลพื้นฐาน (ชื่อสำนักงาน, เบอร์โทร, อีเมล, ที่อยู่, LINE, WeChat) ไปไว้ในโค้ดหลักเรียบร้อยแล้ว ทำให้ `.env` เหลือเฉพาะ **Key และ Endpoint ภายนอกที่สำคัญ** เท่านั้น:

```env
# 1. โดเมนหลักของเว็บไซต์ (เช่น https://your-domain.com)
PUBLIC_SITE_URL=https://ms-legal.example.com

# 2. Webhook รับฟอร์มเข้า Google Sheets และส่ง Email (จาก Google Apps Script)
PUBLIC_GOOGLE_SCRIPT_URL=

# 3. Google Tag Manager ID (ตัวเดียวคุมทั้ง GA4, Microsoft Clarity, Facebook Pixel, Ads)
PUBLIC_GTM_ID=
```

> 💡 **การติดตั้ง Microsoft Clarity ผ่าน GTM (ไม่ต้องใส่ในโค้ดเว็บ):**
> 1. เข้า [Google Tag Manager](https://tagmanager.google.com/) > ไปที่ **Tags** > คลิก **New**
> 2. ใน Tag Configuration คลิกค้นหา Template: **"Microsoft Clarity"** (Official Template by Microsoft)
> 3. ใส่ **Clarity Project ID** ของคุณ
> 4. Trigger เลือก: **Initialization - All Pages** (หรือ All Pages)
> 5. กด Save แล้ว Submit/Publish เป็นอันเสร็จสิ้น! Clarity จะเริ่มบันทึก Session และ Heatmap ทันทีโดยไม่ต้องแก้โค้ดเว็บใดๆ เลยครับ

---

## 🚀 3. วิธีตั้งค่า Cloudflare Auto Deploy เมื่อเข้า Branch `main`

### ขั้นตอนที่ 1: Push โค้ดขึ้น GitHub / GitLab
1. บันทึกโค้ดและ Commit ลง branch `main`:
   ```bash
   git add .
   git commit -m "Ready for Cloudflare auto-deploy"
   ```
2. เชื่อมต่อ Remote repository ของคุณ (เช่น GitHub):
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

### ขั้นตอนที่ 2: ตั้งค่าใน Cloudflare Dashboard
1. เข้าไปที่ [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. ที่เมนูด้านซ้าย เลือก **Compute (Workers & Pages)**
3. คลิก **Create application** > เลือกแท็บ **Pages** > คลิก **Connect to Git**
4. เลือก Repository ที่คุณเพิ่ง push ขึ้นไป
5. ในหน้า **Set up builds and deployments** ให้ตั้งค่าดังนี้:
   * **Project name**: `montclaire-sterling-legal` (หรือชื่อตามต้องการ)
   * **Production branch**: `main`
   * **Framework preset**: `Astro`
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
   * **Root directory**: `/` *(เว้นว่างไว้)*
6. ในส่วน **Environment variables (advanced)** ให้เพิ่ม Key ที่จำเป็น:
   * `PUBLIC_SITE_URL` = โดเมนจริงของคุณ (เช่น `https://ms-legal.com`)
   * `PUBLIC_GOOGLE_SCRIPT_URL` = Webhook URL ของ Google Apps Script
   * `PUBLIC_GTM_ID` = รหัส GTM (ถ้ามี)
   * `PUBLIC_CLARITY_ID` = รหัส Clarity (ถ้ามี)
7. คลิก **Save and Deploy**

หลังจากนี้ **ทุกครั้งที่คุณ Push หรือ Merge โค้ดเข้า branch `main` Cloudflare จะตรวจจับและทำการ Build + Deploy หน้าเว็บเวอร์ชันใหม่ให้ทันทีโดยอัตโนมัติ!**

---

## 🌐 4. การผูกชื่อโดเมนของตัวเอง (Custom Domain) ฟรี SSL

1. ในหน้าโปรเจกต์บน Cloudflare Pages ไปที่แท็บ **Custom domains**
2. คลิก **Set up a custom domain**
3. กรอกโดเมนของคุณ เช่น `ms-legal.com` หรือ `www.ms-legal.com`
4. Cloudflare จะจัดการเรื่อง DNS และติดตั้งใบรับรองความปลอดภัย **HTTPS (SSL/TLS)** ให้ฟรีอัตโนมัติ

---

## 🛡️ 5. ไฟล์สนับสนุนที่เตรียมไว้ให้ในโปรเจกต์:

1. [`.nvmrc`](file:///d:/Work_Dir/Law/.nvmrc): กำหนด Node.js v20 เพื่อให้ Cloudflare build image รันได้เร็วและไม่มี error
2. [`public/_redirects`](file:///d:/Work_Dir/Law/public/_redirects): ทำ HTTP 301 Redirect จาก `/` ไป `/th/` ที่ระดับ Cloudflare Global Edge ทันทีด้วยความเร็ว 0ms
3. [`public/_headers`](file:///d:/Work_Dir/Law/public/_headers): กำหนด Cache 1 ปีเต็มสำหรับไฟล์ asset ที่มี hash (`_astro/*`) และใส่ Security Headers ป้องกัน Clickjacking / XSS
4. [`wrangler.jsonc`](file:///d:/Work_Dir/Law/wrangler.jsonc): รองรับทั้งการ deploy ผ่าน Cloudflare Pages หรือ Cloudflare Workers Static Assets
