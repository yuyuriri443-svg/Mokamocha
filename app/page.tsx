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
      try {
        const { data, error } = await supabase.from('books').select('*').order('id', { ascending: false })
        if (data) setBooks(data)
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const styles = {
    container: { backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Lora', serif", color: '#4A3F35' },
    header: { textAlign: 'center' as const, marginBottom: '60px', borderBottom: '2px double #B08968', paddingBottom: '20px' },
    slogan: { letterSpacing: '4px', opacity: 0.9, fontWeight: 'bold', color: '#B08968', marginTop: '10px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto' },
    card: { 
      background: '#FFFBF5', 
      padding: '15px', 
      borderRadius: '8px', 
      border: '1px solid #E8DFD0', 
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      position: 'relative' as const,
      textDecoration: 'none',
      display: 'block'
    },
    img: { width: '100%', height: '350px', objectFit: 'cover' as const, borderRadius: '4px', marginBottom: '15px' },
    title: { fontSize: '1.3rem', fontWeight: 'bold', margin: '15px 0 5px 0', color: '#2D2620', fontFamily: "'Playfair Display', serif" },
    author: { fontStyle: 'italic', opacity: 0.6, marginBottom: '20px', fontSize: '0.9rem' },
    button: { 
      display: 'inline-block', 
      backgroundColor: '#4A3F35', 
      color: '#F5EFE6', 
      padding: '12px 25px', 
      borderRadius: '4px', 
      fontWeight: 'bold', 
      fontSize: '0.85rem', 
      boxShadow: '0 4px 0 #2D2620'
    }
  }

  return (
    <div style={styles.container}>
      {/* Nhúng font trực tiếp để tránh lỗi font chữ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700&display=swap');
      `}} />

      <header style={styles.header}>
        <h1 style={{ fontSize: '4.5rem', margin: 0, fontFamily: "'Playfair Display', serif" }}>Mokamocha ☕</h1>
        <p style={styles.slogan}>YOUR OWN LIBRARY</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ borderLeft: '6px solid #B08968', paddingLeft: '20px', marginBottom: '40px', fontSize: '1.8rem' }}>Kệ sách của bạn</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Đang mở cửa tiệm...</p>
        ) : (
          <div style={styles.grid}>
            {books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
                <div 
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) rotateX(2deg)';
                    e.currentTarget.style.boxShadow = '20px 20px 60px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
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

      <footer style={{ textAlign: 'center', marginTop: '120px', opacity: 0.4, fontSize: '0.8rem' }}>
        © 2026 MOKAMOCHA - READ WITH SOUL.
      </footer>
    </div>
  )
}
