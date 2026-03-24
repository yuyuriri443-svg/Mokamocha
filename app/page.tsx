'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books').select('*').order('id', { ascending: false })
      if (!error && data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#4A3F35] font-serif p-8">
      {/* Header phong cách Vintage */}
      <header className="text-center py-12 border-b border-[#B08968]/30 mb-12">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-2">Mokamocha ☕</h1>
        <p className="text-xl italic opacity-70">Nơi những trang sách cũ tìm thấy tri kỷ mới</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold border-l-4 border-[#B08968] pl-4">Kệ sách mới về</h2>
          <div className="text-sm opacity-60">Tổng cộng: {books.length} cuốn</div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64 italic">Đang pha cà phê và lật giở từng trang...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id} className="group">
                <div className="bg-white p-4 rounded-sm shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border border-[#E8DFD0]">
                  <div className="overflow-hidden mb-4 relative aspect-[3/4]">
                    <img 
                      src={book.cover_url || 'https://via.placeholder.com/300x400'} 
                      alt={book.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold leading-tight mb-1 group-hover:underline decoration-[#B08968]">{book.title}</h3>
                  <p className="text-sm opacity-60 italic mb-3">{book.author}</p>
                  <div className="text-xs uppercase tracking-widest text-[#B08968] font-bold">Xem chi tiết →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center mt-20 py-8 text-sm opacity-40 border-t border-[#B08968]/10">
        © 2026 Mokamocha - Chúc bạn một ngày đọc sách an yên.
      </footer>
    </div>
  )
}
