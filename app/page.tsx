'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      // Nhớ đảm bảo trong Supabase bạn có cột 'review' nhé
      const { data, error } = await supabase.from('books').select('*')
      if (error) console.log('Lỗi:', error)
      else setBooks(data || [])
      setLoading(false)
    }
    fetchBooks()
  }, [])

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2C3E50', marginBottom: '10px', fontWeight: '800' }}>Mokamocha ☕</h1>
        <div style={{ width: '60px', height: '4px', background: '#B08968', margin: '0 auto' }}></div>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Đang bốc sách lên kệ...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {books.map((book) => (
            <div 
              key={book.id} 
              style={{ 
                background: '#fff',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)', // Tạo khối nổi
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #f0f0f0'
              }}
              // Hiệu ứng nổi lên khi di chuột (inline style ko dùng hover trực tiếp được nhưng ta cứ để khung ở đây)
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Bìa sách */}
              <div style={{ borderRadius: '10px', overflow: 'hidden', height: '350px', marginBottom: '15px' }}>
                <img 
                  src={book.cover_url} 
                  alt={book.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Thông tin */}
              <h3 style={{ fontSize: '1.25rem', color: '#1A1A1A', margin: '0 0 5px 0', lineHeight: '1.4' }}>{book.title}</h3>
              <p style={{ color: '#B08968', fontSize: '0.9rem', marginBottom: '15px', fontWeight: '600' }}>{book.author}</p>
              
              {/* Review ngắn (Giới hạn 3 dòng) */}
              <p style={{ 
                color: '#555', 
                fontSize: '0.9rem', 
                lineHeight: '1.6',
                display: '-webkit-box',
                WebkitLineClamp: 3, // Hiện 3 dòng
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontStyle: 'italic',
                borderTop: '1px solid #eee',
                paddingTop: '10px'
              }}>
                {book.review || "Chưa có nhận xét cho cuốn sách này..."}
              </p>
            </div>
          ))}
        </div>
      )}

      {books.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: '#999' }}>Kệ sách đang trống.</p>
      )}
    </div>
  )
}
