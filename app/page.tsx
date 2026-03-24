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

  // Style nâng cấp: Thêm hiệu ứng 3D và Slogan mới
  const styles = {
    container: { backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Lora', serif", color: '#4A3F35' },
    header: { textAlign: 'center' as const, marginBottom: '60px', borderBottom: '2px double #B08968', paddingBottom: '20px' },
    slogan: { letterSpacing: '4px', opacity: 0.9, fontWeight: 'bold', color: '#B08968', marginTop: '10px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto' },
    
    // Hiệu ứng 3D cho Card
    card: { 
      background: '#FFFBF5', 
      padding: '15px', 
      borderRadius: '8px', 
      border: '1px solid #E8DFD0', 
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Hiệu ứng nảy 3D
      boxShadow: '0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.1)', // Đổ bóng sâu
      position: 'relative' as const
    },
    
    img: { 
      width: '100%', 
      height: '350px', 
      objectFit: 'cover' as const, 
      borderRadius: '4px', 
      marginBottom: '15px',
      transition: 'transform 0.4s'
    },
    
    title: { fontSize: '1.3rem', fontWeight: 'bold', margin: '15px 0 5px 0', color: '#2D2620', fontFamily: "'Playfair Display', serif" },
    author: { fontStyle: 'italic', opacity: 0.6, marginBottom: '20px', fontSize: '0.9rem' },
    
    button: { 
      display: 'inline-block', 
      backgroundColor: '#4A3F35', 
      color: '#F5EFE6', 
      padding: '12px 25px', 
      textDecoration: 'none', 
      borderRadius: '4px', 
      fontWeight: 'bold', 
      fontSize: '0.85rem', 
      boxShadow: '0 4px 0 #2D2620', // Tạo đế nút 3D
      transition: 'all 0.1s'
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '4.5rem', margin: 0, fontFamily: "'Playfair Display', serif" }}>Mokamocha ☕</h1>
        <p style={styles.slogan}>YOUR OWN LIBRARY</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ borderLeft: '6px solid #B08968', paddingLeft: '20px', marginBottom: '40px', fontSize: '1.8rem' }}>Kệ sách của bạn</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Đang sắp xếp thư viện riêng của bạn...</p>
        ) : (
          <div style={styles.grid}>
            {books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div 
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg)';
                    e.currentTarget.style.boxShadow = '20px 20px 60px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) scale(1)';
                  }}
                >
                  <img src={book.cover_url || 'https://via.placeholder.com/250x350'} alt={book.title} style={styles.img} />
                  <h3 style={styles.title}>{book.title}</h3>
                  <p style={styles.author}>{book.author}</p>
                  <div style={styles.button}>MỞ SÁCH →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '120px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '1px' }}>
        © 2026 MOKAMOCHA - READ WITH SOUL.
      </footer>
    </div>
  )
}
