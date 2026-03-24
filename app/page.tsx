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
      const { data } = await supabase.from('books').select('*')
      if (data) setBooks(data)
      setLoading(false)
    }
    fetchBooks()
  }, [])

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      
      {/* 1. NAVBAR (Đăng nhập / Đăng ký) */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 5%', 
        background: '#fff', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: '#2C3E50' }}>MOKAMOCHA</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #B08968', background: 'none', color: '#B08968', cursor: 'pointer', fontWeight: '600' }}>Đăng nhập</button>
          <button style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: '#B08968', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Đăng ký</button>
        </div>
      </nav>

      {/* 2. HEADER & SLOGAN */}
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#2C3E50', margin: 0, fontWeight: '800' }}>Mokamocha ☕</h1>
        <p style={{ 
          fontSize: '1.2rem', 
          fontStyle: 'italic', 
          color: '#B08968', 
          marginTop: '10px',
          fontFamily: 'serif' 
        }}>
          "Góc nhỏ của Mokamocha"
        </p>
      </header>

      {/* 3. BẢNG THÔNG BÁO (Notification Area) */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 40px auto', 
        padding: '0 20px' 
      }}>
        <div style={{ 
          background: '#FFFBEB', 
          borderLeft: '5px solid #F59E0B', 
          padding: '15px 20px', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontWeight: '700', color: '#B45309' }}>📢 Thông báo:</span>
          <span style={{ marginLeft: '10px', color: '#92400E' }}>Chào mừng bạn đến với tiệm sách! Hệ thống đang cập nhật thêm nhiều đầu sách mới mỗi ngày. Chúc bạn đọc sách vui vẻ!</span>
        </div>
      </div>

      {/* 4. DANH SÁCH SÁCH (BLOCK NỔI) */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Đang bốc sách lên kệ...</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '35px' 
          }}>
            {books.map((book) => (
              <div 
                key={book.id} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '15px', 
                  padding: '20px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.07)', 
                  transition: 'transform 0.3s ease',
                  border: '1px solid #f3f3f3'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '380px', marginBottom: '15px' }}>
                  <img src={book.cover_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px', color: '#1A1A1A' }}>{book.title}</h3>
                <p style={{ color: '#B08968', fontWeight: '600', fontSize: '0.9rem', marginBottom: '12px' }}>{book.author}</p>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#666', 
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '10px'
                }}>
                  {book.review || "Tóm tắt sách đang được cập nhật..."}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
