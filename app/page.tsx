import './globals.css'
import React from 'react';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#F5EFE6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#4A3F35', fontFamily: 'serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mokamocha ☕</h1>
      <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Web đã chạy thành công!</p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #B08968' }}>📖 Đọc sách</div>
        <div style={{ padding: '20px', border: '1px solid #B08968' }}>📥 Tải EPUB</div>
        <div style={{ padding: '20px', border: '1px solid #B08968' }}>💬 Tám chuyện</div>
      </div>
    </div>
  );
}
