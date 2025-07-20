// pages/upload.js

import { useState } from 'react';

export default function UploadPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert('Fayl seçilməyib');

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('file', file);

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      const text = await res.text();  // JSON yox, sadə mətn kimi oxuyuruq
      console.error('Server response:', text);
      return alert('Serverdə xəta baş verdi');
    }

    const data = await res.json();
    alert('Məlumat uğurla göndərildi!');
    window.location.href = '/thank-you';
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Fayl Yükləmə</h1>
      <input
        type="text"
        placeholder="Ad"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="file"
        accept=".jpg,.png,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        required
      /><br />
      <button type="submit">Göndər</button>
    </form>
  );
}
