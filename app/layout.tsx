import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Cấu hình Font chữ
const playfair = Playfair_Display({ 
  subsets: ["vietnamese"], 
  variable: "--font-playfair" 
});
const cormorant = Cormorant_Garamond({ 
  subsets: ["vietnamese"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "Mokamocha - Đọc sách & Tám chuyện",
  description: "Nền tảng đọc sách vintage trực tuyến",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="bg-[#F5EFE6] text-[#4A3F35] font-garamond antialiased">
        {/* Container chính khống chế độ rộng 750px như yêu cầu */}
        <div className="max-w-[750px] mx-auto min-h-screen flex flex-col">
          
          <Navbar />

          {/* Phần nội dung thay đổi theo từng trang */}
          <main className="flex-grow p-4 md:p-6">
            {children}
          </main>

          <footer className="p-8 text-center text-sm opacity-60 border-t border-[#B08968]/20">
            © 2024 Mokamocha - Nơi những tâm hồn yêu sách gặp nhau
          </footer>
        </div>
      </body>
    </html>
  );
}
