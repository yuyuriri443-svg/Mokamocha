import Link from 'next/link'

export default function HomePage() {
  const sections = [
    {
      title: "Đọc sách",
      icon: "📖",
      description: "Đắm chìm vào những câu chữ vượt thời gian.",
      href: "/books",
      color: "hover:bg-[#E8DCC4]"
    },
    {
      title: "Tải EPUB",
      icon: "📥",
      description: "Mang theo thư viện nhỏ trong túi áo của bạn.",
      href: "/books?filter=download",
      color: "hover:bg-[#DBC1AC]"
    },
    {
      title: "Tám chuyện",
      icon: "💬",
      description: "Nơi những tâm hồn đồng điệu gặp gỡ.",
      href: "/chat",
      color: "hover:bg-[#E0C9A6]"
    }
  ]

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-10">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#4A3F35]">
          Chào mừng tới Mokamocha
        </h2>
        <p className="italic text-lg text-[#B08968] font-garamond">
          "Sách là tách cà phê cho tâm hồn giữa buổi chiều lặng lẽ."
        </p>
      </section>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((item) => (
          <Link 
            key={item.title} 
            href={item.href}
            className={`group p-8 border border-[#B08968]/30 rounded-sm transition-all duration-500 flex flex-col items-center text-center space-y-4 ${item.color}`}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <h3 className="text-2xl font-playfair font-semibold">
              {item.title}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              {item.description}
            </p>
            <span className="text-xs uppercase tracking-widest pt-2 border-b border-transparent group-hover:border-[#4A3F35]">
              Khám phá ngay
            </span>
          </Link>
        ))}
      </div>

      {/* Featured/Latest Section (Placeholder) */}
      <section className="pt-10">
        <div className="flex justify-between items-center mb-6 border-b border-[#B08968]/20 pb-2">
          <h3 className="text-xl font-playfair font-bold uppercase tracking-wider">Mới cập nhật</h3>
          <Link href="/books" className="text-sm hover:underline italic">Xem tất cả</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Đây là nơi sẽ render list sách từ Supabase sau này */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 group cursor-pointer">
              <div className="aspect-[3/4] bg-[#E8DCC4] border border-[#B08968]/20 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden">
                 {/* Placeholder cho ảnh bìa */}
                 <div className="absolute inset-0 flex items-center justify-center text-[#B08968]/40">Bìa sách</div>
              </div>
              <p className="font-playfair font-semibold text-sm truncate">Tác phẩm kinh điển {i}</p>
              <p className="text-xs italic opacity-70">Tác giả Mokamocha</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
