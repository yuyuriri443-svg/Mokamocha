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
  const [showNoti, setShowNoti] = useState(false) // Đóng/mở bảng thông báo

  // Dữ liệu mẫu cho thông báo (sau này sẽ lấy từ Supabase)
  const notifications = [
    { id: 1, text: "Admin đã trả lời bình luận của bạn", type: "reply" },
    { id: 2, text: "Bạn có 1 tin nhắn mới từ Mokamocha", type: "chat" },
    { id: 3, text: "Sách 'Đắc Nhân Tâm' vừa được cập nhật", type: "news" }
  ]

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
      
      {/* 1. NAVBAR NÂNG CẤP */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: '#2C3E50', letterSpacing: '1px' }}>MOKAMOCHA</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Icon Tin nhắn */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.4rem' }}>💬</span>
            <span style={badgeStyle}>1</span>
          </div>

          {/* Icon Chuông Thông báo */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNoti(!showNoti)}>
            <span style={{ fontSize: '1.4rem' }}>🔔</span>
            <span style={badgeStyle}>{notifications.length}</span>
            
            {/* BẢNG THÔNG BÁO DROPDOWN */}
            {showNoti && (
              <div style={notiBoxStyle}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Thông báo</h4>
                {notifications.map(n => (
                  <div key={n.id} style={notiItemStyle}>
                    {n.type === 'reply' ? '✍️ ' : n.type === 'chat' ? '📩 ' : '📢 '}
                    {n.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: '1px', height: '25px', background: '#eee', margin: '0 10px' }}></div>

          {/* Nút Đăng nhập/Đăng ký */}
          <Link href="/login">
            <button style={btnSecondStyle}>Đăng nhập</button>
          </Link>
          <Link href="/login">
            <button style={btnPrimaryStyle}>Đăng ký</button>
          </Link>
        </div>
      </nav>

      {/* 2. HEADER & SLOGAN */}
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#2C3E50', margin: 0, fontWeight: '800' }}>Mokamocha ☕</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#B08968', marginTop: '10px', fontFamily: 'serif' }}>
          "Góc nhỏ của Mokamocha"
        </p>
      </header>

      {/* 3. BẢNG TIN NHẮN CHÀO MỪNG */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <div style={{ background: '#FFFBEB', borderLeft: '5px solid #F59E0B', padding: '15px 20px', borderRadius: '8px' }}>
          <span style={{ fontWeight: '700', color: '#B45309' }}>📢 Tin mới:</span>
          <span style={{ marginLeft: '10px', color: '#92400E' }}>Chào mừng bạn! Hệ thống Chat và Thông báo đã sẵn sàng hoạt động.</span>
        </div>
      </div>

      {/* 4. KỆ SÁCH */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Đang bốc sách lên kệ...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
            {books.map((book) => (
              <div key={book.id} className="book-card" style={bookCardStyle}>
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '380px', marginBottom: '15px' }}>
                  <img src={book.cover_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{book.title}</h3>
                <p style={{ color: '#B08968', fontWeight: '600', fontSize: '0.9rem' }}>{book.author}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// CÁC STYLE PHỤ TRỢ
const badgeStyle: React.CSSProperties = {
  position: 'absolute', top: '-5px', right: '-8px', background: '#FF4D4D', color: '#fff',
  fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold'
}

const notiBoxStyle: React.CSSProperties = {
  position: 'absolute', top: '40px', right: '0', width: '300px', background: '#fff',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)', borderRadius: '10px', padding: '15px', zIndex: 1000
}

const notiItemStyle: React.CSSProperties = {
  fontSize: '0.85rem', padding: '10px 0', borderBottom: '1px solid #f9f9f9', color: '#444'
}

const btnPrimaryStyle = { padding: '10px 25px', borderRadius: '25px', border: 'none', background: '#B08968', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
const btnSecondStyle = { padding: '10px 25px', borderRadius: '25px', border: '1px solid #B08968', background: 'none', color: '#B08968', cursor: 'pointer', fontWeight: 'bold' }
const bookCardStyle = { background: '#fff', borderRadius: '15px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.07)', border: '1px solid #f3f3f3' }
