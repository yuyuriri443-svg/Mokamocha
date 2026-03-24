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

  // Style chuẩn Vintage cho Tiệm sách
  const styles = {
    container: { backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'serif', color: '#4A3F35' },
    header: { textAlign: 'center' as const, marginBottom: '60px', borderBottom: '2px double #B08968', paddingBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
    card: { background: '#FFFBF5', padding: '20px', borderRadius: '4px', boxShadow: '5px 5px 15px rgba(0,0,0,0.05)', border: '1px solid #E8DFD0', textAlign: 'center' as const, transition: '0.3s' },
    img: { width: '100%', height: '320px', objectFit: 'cover' as const, borderRadius: '2px', marginBottom: '15px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' },
    title: { fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0 5px 0', color: '#2D2620' },
    author: { fontStyle: 'italic', opacity: 0.7, marginBottom: '20px' },
    button: { display: 'inline-block', backgroundColor: '#4A3F35', color: '#F5EFE6', padding: '10px 20px', textDecoration: 'none', borderRadius: '2px', fontWeight: 'bold', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }
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
