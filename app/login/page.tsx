'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/') // Đăng nhập xong về trang chủ
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Kiểm tra email của bạn hoặc đăng nhập ngay nếu đã tắt confirm!')
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'serif' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#2C3E50', marginBottom: '30px' }}>Chào mừng tới Mokamocha ☕</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email của bạn" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }} required />
          <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '8px', border: '1px solid #ddd' }} required />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#B08968', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
        <button onClick={handleSignUp} style={{ width: '100%', background: 'none', border: '1px solid #B08968', color: '#B08968', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
          Tạo tài khoản mới
        </button>
      </div>
    </div>
  )
}
