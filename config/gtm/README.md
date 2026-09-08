# คู่มือการนำเข้าคอนฟิก Google Tag Manager (GTM)

ไฟล์ gtm-container-export.json นี้เป็นไฟล์ Container Export มาตรฐานของ Google Tag Manager ที่รวบรวม Tags, Triggers, และ Variables สำหรับเว็บไซต์สำนักงานกฎหมายไว้อย่างครบวงจร

---

## 1. วิธี Import เข้า Google Tag Manager (ทำเพียง 1 นาที)

1. เข้าไปที่ [Google Tag Manager](https://tagmanager.google.com/)
2. เลือก Container บัญชีของคุณ (หรือกดสร้าง Container ใหม่ประเภท **Web**)
3. ไปที่แท็บ **Admin (ผู้ดูแลระบบ)** ด้านบน
4. ในคอลัมน์ขวา (Container) คลิกเมนู **Import Container (นำเข้าคอนเทนเนอร์)**
5. ทำการเลือกค่าดังนี้:
   - **Select file to import:** เลือกไฟล์ config/gtm/gtm-container-export.json
   - **Choose workspace:** เลือก **Existing** > เลือก **Default Workspace**
   - **Choose an import option:** เลือก **Merge (ผสาน)** > เลือก **Overwrite conflicting tags, triggers and variables**
6. กดปุ่ม **Confirm (ยืนยัน)**

---

## 2. ตั้งค่าตัวแปรหลัก (Variables) หลังนำเข้าเสร็จ

ใน GTM ไปที่เมนู **Variables (ตัวแปร)** ด้านซ้าย จะพบ Constant 2 ตัว ให้แก้ไขค่าให้ตรงกับของคุณ:

1. **Constant - GA4 Measurement ID**:
   - เปลี่ยนจาก G-XXXXXXXXXX เป็น Measurement ID ของ Google Analytics 4 ของคุณ
2. **Constant - Clarity Project ID**:
   - เปลี่ยนจาก XXXXXXXXXX เป็น Project ID ของ Microsoft Clarity ของคุณ

---

## 3. รายการ Tags และ Events ที่ติดตั้งมาพร้อมใช้

| Tag Name | Trigger | Event Name / หน้าที่ |
| :--- | :--- | :--- |
| **Google Tag (GA4 Configuration)** | All Pages | ติดตั้ง GA4 ลงทุกหน้าเว็บอัตโนมัติ |
| **Microsoft Clarity Analytics Tracking** | All Pages | บันทึก Heatmap และ Session Recordings |
| **GA4 Event - Generate Lead** | orm_submit_lead | บันทึก Conversion เวลามีคนส่งแบบฟอร์มปรึกษา |
| **GA4 Event - Click Phone Call** | click_call | บันทึก Event เวลากดโทรศัพท์ติดต่อสำนักงาน |
| **GA4 Event - Click Email** | click_email | บันทึก Event เวลากดส่งอีเมลหาสำนักงาน |
| **GA4 Event - Click LINE** | click_line | บันทึก Event เวลากดแอดไลน์ @mslegal |
| **GA4 Event - Click WhatsApp** | click_whatsapp | บันทึก Event เวลากดติดต่อผ่าน WhatsApp |
| **GA4 Event - Click WeChat** | click_wechat | บันทึก Event เวลากดติดต่อผ่าน WeChat |
| **GA4 Event - Switch Language** | switch_language | บันทึก Event เมื่อผู้ใช้สลับภาษา (TH/EN/ZH) |

---

## 4. กด Submit และ Publish

เมื่อตรวจทานเรียบร้อยแล้ว กดปุ่ม **Submit** สีน้ำเงินมุมขวาบนของ GTM แล้วกด **Publish** ระบบการวัดผลทั้งหมดจะทำงานอัตโนมัติทันที
