'use client'
import React, { useState, useEffect } from 'react'
import { ReactReader } from 'react-reader'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ReaderPage() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<any>(null)
  const [location, setLocation] = useState<string | number>(0)

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await supabase.from('books').select('*').eq('id', id).single()
      if (data) setBook(data)
    }
    if (id) fetchBook()
  }, [id])

  if (!book) return <div className="h-screen flex items-center justify-center bg-[#F5EFE6]">Đang mở trang sách...</div>

  return (
    <div style={{ height: '100vh', backgroundColor: '#F5EFE6', display: 'flex', flexDirection: 'column' }}>
      {/* Thanh công cụ phía trên */}
      <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#4A3F35', color: '#F5EFE6' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>← TRỞ VỀ</button>
        <div style={{ fontFamily: 'serif', fontStyle: 'italic' }}>{book.title}</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>MOKAMOCHA READER</div>
      </div>

      {/* Trình đọc EPUB */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactReader
          url={book.epub_url}
          location={location}
          locationChanged={(epubcifi) => setLocation(epubcifi)}
          epubOptions={{
            flow: 'paginated', // Kiểu lật trang
            manager: 'default'
          }}
          swipeable={true}
        />
      </div>
    </div>
  )
}
