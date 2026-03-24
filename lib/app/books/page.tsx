'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')

      if (error) {
        console.error(error)
      } else {
        setBooks(data)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách truyện</h1>

      {books.map((book) => (
        <div key={book.id} style={{ marginBottom: 20 }}>
          <img src={book.cover_url} width={100} />
          <h2>{book.title}</h2>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  )
}
