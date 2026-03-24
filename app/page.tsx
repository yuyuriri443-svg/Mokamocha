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

  // Tìm đoạn này trong app/page.tsx
const styles = {
  container: { 
    backgroundColor: '#F5EFE6', 
    minHeight: '100vh', 
    padding: '40px 20px', 
    fontFamily: "'Lora', serif", // Sửa thành Lora cho chữ đọc dễ chịu
    color: '#4A3F35' 
  },
  header: { 
    textAlign: 'center' as const, 
    marginBottom: '60px', 
    borderBottom: '2px double #B08968', 
    paddingBottom: '20px',
    fontFamily: "'Playfair Display', serif" // Header dùng Playfair cho sang
  },
  // Các phần khác giữ nguyên...
}

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>Mokamocha ☕</h1>
        <p style={{ letterSpacing: '2px', opacity: 0.8 }}>TIỆM SÁCH CŨ TRỰC TUYẾN</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ borderLeft: '5px solid #B08968', paddingLeft: '15px', marginBottom: '30px' }}>Kệ sách mới về ({books.length})</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Đang xếp sách lên kệ...</p>
        ) : (
          <div style={styles.grid}>
            {books.map((book) => (
              <div key={book.id} style={styles.card}>
                <img src={book.cover_url || 'https://via.placeholder.com/250x350'} alt={book.title} style={styles.img} />
                <h3 style={styles.title}>{book.title}</h3>
                <p style={styles.author}>{book.author}</p>
                <Link href={`/books/${book.id}`} style={styles.button}>
                  XEM CHI TIẾT →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5, fontSize: '0.8rem' }}>
        © 2026 Mokamocha - Sách cũ, tâm hồn mới.
      </footer>
    </div>
  )
}
