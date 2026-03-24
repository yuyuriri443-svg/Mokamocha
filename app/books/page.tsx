'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([])

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data, error } = await supabase
      .from('books')
      .select('*')

    if (!error) setBooks(data || [])
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách truyện</h2>

      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="border p-3 rounded-xl"
          >
            <img
              src={book.cover_url}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{book.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
