'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState<any>(null)

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await supabase.from('books').select('*').eq('id', id).single()
      if (data) setBook(data)
    }
    fetchBook()
  }, [id])

  if (!book) return <div className="p-10 text-center">Đang lật giở từng trang...</div>

  return (
    <div style={{ backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px', color: '#4A3F35', fontFamily: 'serif' }}>
      <button onClick={() => window.history.back()} style={{ marginBottom: '20px', cursor: 'pointer', background: 'none', border: '1px solid #B08968', padding: '5px 15px' }}>← Quay lại</button>
      
      <div style={{ display: 'flex', gap: '40px', maxWidth: '900px', margin: '0 auto', flexWrap: 'wrap' }}>
        <img src={book.cover_url} alt={book.title} style={{ width: '300px', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
        
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{book.title}</h1>
          <p style={{ fontSize: '1.2rem', color: '#B08968', marginBottom: '20px' }}>Tác giả: {book.author}</p>
          <div style={{ lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '30px' }}>{book.description || "Chưa có mô tả cho cuốn sách này."}</div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href={book.epub_url} style={{ padding: '12px 25px', backgroundColor: '#4A3F35', color: '#F5EFE6', textDecoration: 'none', borderRadius: '5px' }}>Tải file EPUB</a>
            <button style={{ padding: '12px 25px', border: '1px solid #4A3F35', background: 'none', color: '#4A3F35', cursor: 'pointer', borderRadius: '5px' }}>Đọc Online (Sắp có)</button>
          </div>
        </div>
      </div>
    </div>
  )
}
