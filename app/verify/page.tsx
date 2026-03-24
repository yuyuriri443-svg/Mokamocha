'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function VerifyPage() {
  const [token, setToken] = useState('') // Mã 6 số
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') // Lấy email từ trang trước truyền qua

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Hàm xác thực mã OTP
    const { error } = await supabase.auth.verifyOtp({
      email: email || '',
      token: token,
      type: 'signup' // hoặc 'signin' tùy trường hợp
    })

    if (error) alert('Mã sai rồi bạn ơi: ' + error.message)
    else {
      alert('Xác thực thành công! 🥂')
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#FDFCF0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ color: '#2C3E50' }}>Nhập mã xác nhận ✉️</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
          Mokamocha đã gửi mã 6 số đến: <br/> <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleVerify}>
          <input 
            type="text" 
            placeholder="000000" 
            value={token} 
            onChange={e => setToken(e.target.value)} 
            style={{ width: '100%', padding: '15px', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '5px', borderRadius: '8px', border: '2px solid #B08968', marginBottom: '20px' }} 
            required 
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#B08968', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Đang kiểm tra...' : 'Xác thực ngay'}
          </button>
        </form>
      </div>
    </div>
  )
}
