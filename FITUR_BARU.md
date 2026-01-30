# DPO Website - Update Fitur Baru

## 🎉 Fitur Baru yang Ditambahkan

### 1. **Counter Pengunjung Website** 👁️
- Menampilkan jumlah total pengunjung di pojok kanan atas
- Counter akan bertambah otomatis saat ada pengunjung baru
- Menggunakan localStorage untuk mencegah double counting (cooldown 1 jam)
- Format angka dengan separator titik (1.000, 10.000, dst)
- Animasi bounce saat counter bertambah

**Lokasi:** Pojok kanan atas halaman

### 2. **Voting System** 👍👎
- Pengunjung bisa vote apakah informasi DPO valid atau tidak
- Dua tombol: **VALID** (hijau) dan **TIDAK VALID** (merah)
- Menampilkan total votes dan persentase untuk masing-masing
- Progress bar visual untuk melihat perbandingan votes
- Satu pengunjung hanya bisa vote 1x (menggunakan localStorage)
- Tombol otomatis disabled setelah voting

**Lokasi:** Di bawah Hero Section, sebelum Physical Traits

### 3. **Sound Effects System** 🔊
- Background music yang looping (epic/tech house theme)
- Sound effects untuk berbagai interaksi:
  - Click sounds untuk button clicks
  - Vote sounds saat submit vote
  - Success sound saat vote berhasil
  - Error sound jika ada masalah
- Tombol Mute/Unmute di pojok kanan bawah
- Preferensi sound tersimpan di localStorage
- Auto-play dimulai saat first user interaction

**Lokasi:** Button mute/unmute di pojok kanan bawah (di atas WhatsApp button)

## 🎵 Sound Effects yang Digunakan

Semua sound effects menggunakan free audio dari Mixkit:
- **Background Music:** Tech House Vibes - Loop yang smooth dan modern
- **Click Sound:** Select click - UI interaction sound
- **Vote Sound:** Arcade coin jump - Fun gaming sound
- **Success Sound:** Achievement bell - Notification success
- **Error Sound:** Wrong answer - Fail notification

## 🔧 Backend API Endpoints

### Visitor Counter
```
GET  /api/visitor-count    - Ambil jumlah pengunjung
POST /api/visitor-count    - Tambah pengunjung baru
```

### Voting System
```
GET  /api/votes                    - Ambil data voting
POST /api/vote?vote_type=valid     - Vote VALID
POST /api/vote?vote_type=invalid   - Vote TIDAK VALID
```

## 📦 Struktur Database (MongoDB)

### Collection: visitors
```json
{
  "type": "counter",
  "count": 123
}
```

### Collection: votes
```json
{
  "type": "dpo_votes",
  "valid_votes": 45,
  "invalid_votes": 12,
  "total_votes": 57
}
```

## 🚀 Cara Menjalankan

### Development
```bash
# Backend
cd backend
pip install -r requirements.txt
python server.py

# Frontend
cd frontend
yarn install
yarn start
```

### Production Build
```bash
cd frontend
yarn build
```

## 📝 Catatan

1. **Sound Auto-play:** Browser modern memblokir auto-play audio. Sound akan aktif setelah user melakukan interaksi pertama (click/touch)

2. **Visitor Counter:** Menggunakan cooldown 1 jam untuk mencegah spam counting. Satu pengunjung hanya dihitung 1x per jam.

3. **Voting:** Satu device hanya bisa vote 1x (menggunakan localStorage). Jika ingin reset, bisa clear localStorage browser.

4. **MongoDB:** Pastikan MongoDB berjalan di localhost:27017 atau sesuaikan MONGO_URL di .env

## 🎨 Customization

### Ganti Background Music
Edit file `SoundManager.jsx`, ganti URL di:
```jsx
<audio ref={bgMusicRef} loop>
  <source src="YOUR_MUSIC_URL.mp3" type="audio/mpeg" />
</audio>
```

### Ganti Sound Effects
Edit URL sound effects di `SoundManager.jsx` sesuai kebutuhan.

### Styling
Semua styling menggunakan Tailwind CSS. Edit di file component masing-masing untuk custom tampilan.

## 🐛 Troubleshooting

**Sound tidak keluar:**
- Pastikan browser tidak dalam mode silent/mute
- Coba click di halaman terlebih dahulu (browser policy)
- Check console browser untuk error

**Counter tidak bertambah:**
- Check apakah backend running di port 8001
- Check MongoDB connection
- Lihat network tab di browser developer tools

**Vote tidak tersimpan:**
- Check backend logs
- Pastikan MongoDB running
- Check API response di network tab

## 📱 Deployment ke Netlify

Karena ini fullstack app (React + FastAPI), untuk deployment ke Netlify:

1. **Frontend ke Netlify:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

2. **Backend:** Deploy terpisah ke:
   - Railway.app (recommended)
   - Render.com
   - Heroku

3. **Update URL:** Ganti `REACT_APP_BACKEND_URL` di `frontend/.env` dengan URL backend production

---

✅ **Fitur sudah siap digunakan!**
🎮 **Selamat mencoba!**
