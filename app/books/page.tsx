'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AllBooksPage() {
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await supabase.from('books').select('*')
      if (data) setBooks(data)
    }
    fetchBooks()
  }, [])

  return (
    <div style={{ backgroundColor: '#F5EFE6', minHeight: '100vh', padding: '40px', fontFamily: "'Lora', serif" }}>
      <Link href="/" style={{ color: '#B08968', textDecoration: 'none', fontWeight: 'bold' }}>← VỀ TRANG CHỦ</Link>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginTop: '20px' }}>Kho Sách Mokamocha</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px', marginTop: '40px' }}>
        {books.map((book) => (
          <Link href={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={book.cover_url} alt={book.title} style={{ width: '100%', borderRadius: '4px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              <h3 style={{ fontSize: '1.1rem', marginTop: '10px' }}>{book.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
