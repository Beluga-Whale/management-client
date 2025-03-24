# ใช้ Node.js เวอร์ชันล่าสุดที่เป็น LTS
FROM node:18-alpine AS builder

# ตั้ง working directory เป็น /app
WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install

# คัดลอกไฟล์ทั้งหมด (ยกเว้นที่ถูก ignore)
COPY . .

# สร้าง build ของ Next.js
RUN npm run build

# ใช้ Node.js ที่เบากว่าเพื่อลดขนาด Container
FROM node:18-alpine

WORKDIR /app

# คัดลอกไฟล์จาก Builder Stage มาใช้งาน
COPY --from=builder /app ./

# ตั้งค่าให้เริ่มรัน Next.js App
CMD ["npm", "run", "start"]
