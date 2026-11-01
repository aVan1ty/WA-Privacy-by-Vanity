# Vanity 🛡️ — WhatsApp Web Privacy Extension

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-success?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Pure CSS & JS](https://img.shields.io/badge/Dependencies-Zero-blue?style=for-the-badge)](manifest.json)
[![Dark Mode](https://img.shields.io/badge/Theme-WhatsApp%20Dark-202c33?style=for-the-badge)](popup/popup.css)
[![120 FPS Compositor](https://img.shields.io/badge/Performance-120%20FPS-orange?style=for-the-badge)](styles/blur.css)

Ekstensi browser Chrome / Chromium modern untuk menyamarkan (*blur*) elemen sensitif pada **WhatsApp Web** secara instan demi menjaga privasi obrolan kamu saat berada di tempat umum, kantor, kafe, atau saat sedang *screen sharing*.

Dibuat dengan arsitektur **Zero-Lag GPU Compositor** — tetap lancar dan mulus (120 FPS) saat di-scroll tanpa penurunan performa browser.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Last messages preview** | Menyamarkan cuplikan pesan terakhir di daftar chat sebelah kiri. |
| **All messages in chat** | Menyamarkan seluruh balon obrolan dalam riwayat percakapan. |
| **Users/Group names** | Menyamarkan nama kontak dan judul grup di daftar obrolan & header. |
| **Profile pictures** | Menyamarkan avatar/foto profil teman obrolan dan grup. |
| **Media preview** | Menyamarkan foto, video, voice note, dan stiker. |
| **Text input** | Menyamarkan teks yang sedang diketik pada kolom chat agar tidak terbaca dari samping. |
| **Hover to Reveal** | Arahkan kursor (*mouse hover*) ke elemen yang disamarkan untuk mengintip isinya sementara. |
| **Lock Screen (Kunci Layar)** | Kunci antarmuka WhatsApp Web secara manual (`Alt+X`) atau otomatis saat tidak ada aktivitas, dengan perlindungan PIN/Password opsional. |
| **WhatsApp Dark Theme** | Antarmuka popup modern dengan palet warna resmi WhatsApp Web Dark Mode (`#111b21`, `#202c33`, `#00a884`). |

---

## ⌨️ Pintasan Keyboard (Shortcuts)

| Shortcut | Aksi |
|---|---|
| <kbd>Alt</kbd> + <kbd>Z</kbd> | **Master Toggle**: Nyalakan / Matikan seluruh proteksi privasi secara instan |
| <kbd>Alt</kbd> + <kbd>X</kbd> | **Lock Screen**: Langsung kunci layar WhatsApp Web |

---

## 🚀 Panduan Pemasangan (Installation Tutorial)

Ekstensi ini berbasis **Manifest V3** dan dapat dipasang di semua browser berbasis Chromium (Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi).

### Langkah 1: Siapkan Folder Ekstensi
1. Unduh atau clone repository ini ke komputer kamu:
   ```bash
   git clone https://github.com/ernstamb25-commits/WA-Privacy-by-Vanity.git
   ```
   *(Atau unduh file ZIP dari halaman Releases/Code lalu ekstrak foldernya)*

### Langkah 2: Buka Halaman Ekstensi di Browser
- **Google Chrome**: Ketik `chrome://extensions` di address bar lalu tekan <kbd>Enter</kbd>.
- **Microsoft Edge**: Ketik `edge://extensions` di address bar.
- **Brave**: Ketik `brave://extensions` di address bar.

### Langkah 3: Aktifkan Developer Mode
- Di pojok kanan atas halaman ekstensi, aktifkan saklar **Developer mode** (Mode Pengembang).

### Langkah 4: Muat Ekstensi
1. Klik tombol **Load unpacked** (Muat yang belum dibongkar) di pojok kiri atas.
2. Pilih folder project **Vanity** (folder yang berisi file `manifest.json`).
3. Ekstensi **Vanity** akan langsung muncul di daftar ekstensi aktif!

### Langkah 5: Buka WhatsApp Web
1. Buka [web.whatsapp.com](https://web.whatsapp.com).
2. Jika tab WhatsApp Web sudah terbuka sebelumnya, lakukan **Refresh** (<kbd>F5</kbd> atau <kbd>Ctrl</kbd> + <kbd>R</kbd>).
3. Klik ikon puzzle di toolbar browser dan sematkan (*pin*) **Vanity** untuk akses cepat.

---

## 🛠️ Cara Memperbarui (Update Extension)

Jika kamu melakukan modifikasi atau mengunduh pembaruan versi baru:
1. Buka kembali `chrome://extensions`.
2. Cari kartu **Vanity**.
3. Klik tombol **Reload** (ikon panah melingkar 🔄) pada kartu ekstensi.
4. Refresh tab WhatsApp Web.

---

## ⚙️ Pengaturan Lanjutan (Advanced Settings)

Klik ikon gerigi ⚙️ di pojok kanan atas popup Vanity untuk membuka panel pengaturan:
- **Intensitas Blur**: Geser slider untuk mengatur ketebalan blur (3px s.d. 15px).
- **Delay Buka Blur**: Atur jeda waktu (detik) sebelum elemen terbuka saat kursor diarahkan ke atasnya (*hover delay*).
- **Password Kunci Layar**: Tetapkan kata sandi agar layar tidak bisa dibuka sembarangan saat terkunci.

---

## 🔒 Privasi & Keamanan (Zero Data Collection)

- **100% Offline & Lokal**: Ekstensi berjalan sepenuhnya di sisi browser kamu.
- **Zero Tracking**: Tidak ada analitik, tidak ada pelacakan, dan tidak ada koneksi server pihak ketiga.
- **Keamanan WhatsApp**: Ekstensi tidak membaca, merekam, atau memodifikasi data chat kamu ke server manapun.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT. Silakan gunakan, modifikasi, dan bagikan secara bebas.
