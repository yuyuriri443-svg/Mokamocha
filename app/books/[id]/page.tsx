'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<any>(null)

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await supabase.from('books').select('*').eq('id', id).single()
      if (data) setBook(data)
    }
    if (id) fetchBook()
  }, [id])

  if (!book) return <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center italic text-[#4A3F35]">Đang chuẩn bị trà và sách...</div>

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#4A3F35] font-serif p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-10 text-[#B08968] hover:translate-x-[-5px] transition-transform flex items-center gap-2 font-bold"
        >
          ← Quay lại kệ sách
        </button>
        
        <div className="grid md:grid-cols-[350px_1fr] gap-12 items-start bg-white/50 p-8 rounded-lg shadow-inner border border-[#E8DFD0]">
          <div className="shadow-2xl">
            <img 
              src={book.cover_url} 
              alt={book.title} 
              className="w-full h-auto rounded-sm border-4 border-white" 
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl italic text-[#B08968]">Tác giả: {book.author}</p>
            </div>
            
            <div className="h-px bg-[#B08968]/20 w-full"></div>
            
            <div className="text-lg leading-relaxed text-justify opacity-90">
              {book.description || "Cuốn sách này hiện chưa có lời tựa, nhưng chắc chắn là một hành trình thú vị đang chờ bạn khám phá."}
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <a 
                href={book.epub_url} 
                className="bg-[#4A3F35] text-[#F5EFE6] px-8 py-3 rounded-sm hover:bg-[#2D2620] transition-colors shadow-lg font-bold"
              >
                Tải file EPUB
              </a>
              <button className="border border-[#4A3F35] px-8 py-3 rounded-sm hover:bg-[#4A3F35] hover:text-white transition-all font-bold opacity-50 cursor-not-allowed">
                Đọc Online (Sắp ra mắt)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
