'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Khởi tạo Supabase ngay trong file để tránh lỗi import lằng nhằng
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books').select('*').limit(6)
      if (!error && data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  return (
    <div style={{ backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px', color: '#4A3F35', fontFamily: 'serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3.5rem', margin: '0' }}>Mokamocha ☕</h1>
        <p style={{ fontStyle: 'italic', opacity: 0.8 }}>Tiệm sách cũ trực tuyến của bạn</p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ borderBottom: '1px solid #B08968', paddingBottom: '10px' }}>Kệ sách mới về</h2>
        
        {loading ? (
          <p>Đang pha cà phê và xếp sách...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px', marginTop: '30px' }}>
            {books.map((book) => (
              <div key={book.id} style={{ textAlign: 'center', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <img src={book.cover_url || 'https://via.placeholder.com/150x200'} alt={book.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '1.1rem', marginTop: '15px', marginBottom: '5px' }}>{book.title}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{book.author}</p>
                <a href={book.epub_url} style={{ display: 'inline-block', marginTop: '10px', color: '#B08968', textDecoration: 'none', fontWeight: 'bold' }}>Tải EPUB →</a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
