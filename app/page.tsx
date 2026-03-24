import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-semibold">Chào mừng tới Mokamocha 📖</h2>

      <div className="grid grid-cols-1 gap-4">
        <Link href="/books" className="p-4 border rounded-xl">
          📖 Đọc sách
        </Link>

        <div className="p-4 border rounded-xl">
          📥 Tải EPUB
        </div>

        <div className="p-4 border rounded-xl">
          💬 Tám chuyện
        </div>
      </div>
    </div>
  )
}
