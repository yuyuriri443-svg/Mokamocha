export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-[#F5EFE6] text-[#4A3F35]">
        <div className="max-w-[750px] mx-auto p-4">
          <nav className="flex justify-between mb-6">
            <h1 className="text-xl font-bold">Mokamocha ☕</h1>
            <div>🔔</div>
          </nav>

          {children}
        </div>
      </body>
    </html>
  )
}
