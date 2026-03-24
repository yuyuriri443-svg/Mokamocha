'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
      else alert('Đăng ký thành công! Hãy đăng nhập.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
      else router.push('/')
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#2C3E50', marginBottom: '30px' }}>
          {isRegister ? 'Tạo tài khoản Mokamocha' : 'Mokamocha xin chào! ☕'}
        </h2>
        <form onSubmit={handleAuth}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required />
          <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} required />
          <button type="submit" disabled={loading} style={btnMainStyle}>
            {loading ? 'Đang xử lý...' : (isRegister ? 'Đăng ký' : 'Đăng nhập')}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'} 
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: '#B08968', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}>
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký tại đây'}
          </span>
        </p>
      </div>
    </div>
  )
}

const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' as const }
const btnMainStyle = { width: '100%', padding: '12px', background: '#B08968', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' as const }
