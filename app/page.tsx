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
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNoti, setShowNoti] = useState(false)

  // Dữ liệu mẫu cho thông báo
  const notifications = [
    { id: 1, text: "Admin đã trả lời bình luận của bạn", type: "reply" },
    { id: 2, text: "Bạn có tin nhắn mới trong chat", type: "chat" }
  ]

  useEffect(() => {
    async function fetchData() {
      // 1. Lấy thông tin user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // 2. Lấy danh sách sách
      const { data } = await supabase.from('books').select('*')
      if (data) setBooks(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      
      {/* 1. NAVBAR */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: '#2C3E50' }}>MOKAMOCHA</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Icon Chat */}
          <div style={{ position: 'relative', cursor: 'pointer', fontSize: '1.4rem' }}>💬</div>

          {/* Icon Chuông */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNoti(!showNoti)}>
            <span style={{ fontSize: '1.4rem' }}>🔔</span>
            <span style={badgeStyle}>{notifications.length}</span>
            {showNoti && (
              <div style={notiBoxStyle}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee' }}>Thông báo</h4>
                {notifications.map(n => (
                  <div key={n.id} style={{ fontSize: '0.85rem', padding: '10px 0', color: '#444' }}>{n.text}</div>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: '1px', height: '25px', background: '#eee', margin: '0 10px' }}></div>

          {/* USER PROFILE HOẶC LOGIN */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={avatarStyle}
              >
                {user.email?.charAt(0).toUpperCase()}
              </div>
              {showUserMenu && (
                <div style={userMenuStyle}>
                  <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '10px' }}>{user.email}</p>
                  <div style={menuItemStyle}>⚙️ Edit Profile</div>
                  <div style={{ ...menuItemStyle, color: 'red' }} onClick={handleLogout}>🚪 Đăng xuất</div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button style={btnPrimaryStyle}>Đăng nhập</button>
            </Link>
          )}
        </div>
      </nav>

      {/* 2. HEADER */}
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#2C3E50', margin: 0, fontWeight: '800' }}>Mokamocha ☕</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#B08968', marginTop: '10px', fontFamily: 'serif' }}>
          "Góc nhỏ của Mokamocha"
        </p>
      </header>

      {/* 3. THÔNG BÁO CHUNG */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', padding: '0 20px' }}>
        <div style={{ background: '#FFFBEB', borderLeft: '5px solid #F59E0B', padding: '15px 20px', borderRadius: '8px' }}>
          <span style={{ fontWeight: '700', color: '#B45309' }}>📢 Chú ý:</span>
          <span style={{ marginLeft: '10px', color: '#92400E' }}>Đã bật tính năng Đăng nhập & Nhập mã xác nhận qua Email!</span>
        </div>
      </div>

      {/* 4. KỆ SÁCH */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Đang bốc sách lên kệ...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px' }}>
            {books.map((book) => (
              <div key={book.id} style={bookCardStyle}>
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '380px', marginBottom: '15px' }}>
                  <img src={book.cover_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{book.title}</h3>
                <p style={{ color: '#B08968', fontWeight: '600', fontSize: '0.9rem' }}>{book.author}</p>
                <p style={reviewStyle}>{book.review || "Chưa có review..."}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// CSS OBJECTS
const badgeStyle: React.CSSProperties = { position: 'absolute', top: '-5px', right: '-8px', background: '#FF4D4D', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }
const notiBoxStyle: React.CSSProperties = { position: 'absolute', top: '40px', right: '0', width: '250px', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '10px', padding: '15px', zIndex: 1000 }
const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%', background: '#B08968', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }
const userMenuStyle: React.CSSProperties = { position: 'absolute', top: '50px', right: '0', width: '180px', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.1)', borderRadius: '10px', padding: '15px', zIndex: 1000 }
const menuItemStyle = { padding: '10px 0', cursor: 'pointer', fontSize: '0.9rem', borderTop: '1px solid #f5f5f5' }
const btnPrimaryStyle = { padding: '10px 25px', borderRadius: '25px', border: 'none', background: '#B08968', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
const bookCardStyle = { background: '#fff', borderRadius: '15px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.07)', border: '1px solid #f3f3f3' }
const reviewStyle = { fontSize: '0.85rem', color: '#666', marginTop: '10px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
