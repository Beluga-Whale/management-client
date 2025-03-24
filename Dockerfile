# ใช้ Node.js เวอร์ชัน LTS
FROM node:18-alpine

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิดพอร์ต 3000
EXPOSE 3000

# ใช้โหมด dev
CMD ["npm", "run", "dev"]
