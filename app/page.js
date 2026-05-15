<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Undangan Pernikahan Anggun & Ilham</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        :root {
            --gold: #d4af37;
            --dark-blue: #0a192f;
            --soft-white: #f8f9fa;
        }

        body, html {
            margin: 0; padding: 0;
            font-family: 'Montserrat', sans-serif;
            scroll-behavior: smooth;
            overflow-x: hidden;
            background-color: var(--soft-white);
        }

        /* Logic Background */
        .page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 60px 20px;
            position: relative;
            box-sizing: border-box;
        }

        /* Halaman Pertama & Terakhir: Background Pernikahan */
        .bg-wedding {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                        url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920'); 
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
        }

        /* Halaman Tengah: Background Nuansa Awan */
        .bg-clouds {
            background: linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), 
                        url('https://www.transparenttextures.com/patterns/clouds.png');
            background-color: #f0f7ff;
            color: var(--dark-blue);
        }

        /* Cover Overlay */
        #cover {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 9999;
            display: flex;
            transition: transform 1.2s cubic-bezier(0.7, 0, 0.3, 1);
        }

        /* Typography */
        h1 { font-family: 'Great Vibes', cursive; font-size: 4.5rem; margin: 15px 0; color: var(--gold); }
        h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 10px; }
        .quote { font-style: italic; max-width: 700px; line-height: 1.8; margin: 20px auto; }

        /* Music Control Premium */
        #music-control {
            position: fixed;
            bottom: 25px; right: 25px;
            z-index: 1000;
            background: var(--gold);
            width: 55px; height: 55px;
            border-radius: 50%;
            display: none; /* Muncul setelah buka undangan */
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            border: 2px solid white;
        }

        .music-spin { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Ikon Gmaps & BRI */
        .bri-logo { width: 130px; margin-top: 15px; display: block; margin-left: auto; margin-right: auto; }
        .gmaps-icon { font-size: 3.5rem; color: #ea4335; margin-bottom: 15px; cursor: pointer; }

        /* Countdown Proposional */
        #countdown { display: flex; gap: 10px; margin-top: 30px; justify-content: center; }
        .cd-item { 
            background: rgba(255,255,255,0.2); 
            padding: 10px; border-radius: 8px; min-width: 70px;
            border: 1px solid var(--gold);
        }
        .cd-num { display: block; font-size: 1.8rem; font-weight: bold; color: var(--gold); }
        .cd-lab { font-size: 0.7rem; text-transform: uppercase; }

        .btn-open {
            padding: 15px 35px;
            background: var(--gold);
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        /* Sembunyikan scroll saat cover aktif */
        body.no-scroll { overflow: hidden; }
    </style>
</head>
<body class="no-scroll">

    <audio id="weddingAudio" loop>
        <source src="ssstik.io_1778816090503.mp3" type="audio/mpeg">
    </audio>

    <div id="music-control" onclick="toggleMusic()">
        <i id="music-icon" class="fas fa-compact-disc fa-2x text-white"></i>
    </div>

    <section id="cover" class="page bg-wedding">
        <div data-aos="fade-up">
            <p style="letter-spacing: 5px;">UNDANGAN PERNIKAHAN</p>
            <h1>Anggun & Ilham</h1>
            <p>Kepada Yth: <br> <strong>Bapak/Ibu/Saudara/i</strong></p>
            <button class="btn-open" onclick="startInvitation()">
                <i class="fas fa-envelope-open"></i> Buka Undangan
            </button>
        </div>
    </section>

    <section class="page bg-clouds">
        <div data-aos="fade-up">
            <p>بسم الله الرحمن الرحيم</p>
            <p class="quote">"Pernikahan Adalah Awal Dari Kisah Indah Yang Akan Ditulis Bersama, Dengan Setiap Hari Menjadi Bab Baru Yang Penuh Sukacita Dan Kebahagiaan"</p>
            <p>Dengan Memohon Rahmat dan Ridho Allah SWT. Kami Mengundang Bapak/Ibu/Saudara/i Untuk Menghadiri Pernikahan Kami:</p>
        </div>
    </section>

    <section class="page bg-clouds">
        <div data-aos="fade-right">
            <h2>Anggun Ning Tyas S.T.</h2>
            <p>Putri dari Bapak M. Slamet Riyadi dan Ibu Sri Endah Puspitorini</p>
        </div>
        <h1 data-aos="zoom-in">&</h1>
        <div data-aos="fade-left">
            <h2>Ilham Kristuaji A.Md.P.</h2>
            <p>Putra dari Bapak Ishak Sriyono dan Ibu Ribkah Sutarmi</p>
        </div>
    </section>

    <section class="page bg-clouds">
        <div data-aos="flip-left">
            <h2 style="color: var(--gold);">Waktu & Tempat</h2>
            <p>Senin, 25 Mei 2026</p>
            <p><strong>Akad:</strong> 07.00 WIB</p>
            <p><strong>Resepsi:</strong> 09.00 - Selesai</p>
            
            <div style="margin-top: 30px;">
                <a href="https://maps.google.com/?q=Desa+Panjang+Bojonegoro" target="_blank" style="text-decoration: none; color: inherit;">
                    <i class="fas fa-map-location-dot gmaps-icon"></i>
                    <p>Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro</p>
                    <p><strong>(Klik Ikon untuk Navigasi)</strong></p>
                </a>
            </div>
        </div>
    </section>

    <section class="page bg-clouds">
        <div data-aos="fade-up">
            <h2>Tanda Kasih</h2>
            <p class="quote">Jika memberi merupakan tanda kasih, kami dengan senang hati menerimanya.</p>
            <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <p>Transfer ke Rekening:</p>
                <h3>2233 0101 8163 506</h3>
                <p>a.n. Anggun Ning Tyas</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png" alt="BRI" class="bri-logo">
            </div>
            <p style="margin-top: 20px;"><strong>Kirim Hadiah:</strong><br> Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro</p>
        </div>
    </section>

    <section class="page bg-wedding">
        <div data-aos="zoom-out">
            <p class="quote">Merupakan Suatu Kehormatan Bagi Kami Apabila Bapak/Saudara Berkenan Hadir Memberikan Doa Restu.</p>
            <h1>Anggun & Ilham</h1>
            <p>Atas Kehadiran Dan Doa Restunya Kami Ucapkan Terima Kasih.</p>

            <div id="countdown">
                <div class="cd-item"><span id="days" class="cd-num">00</span><span class="cd-lab">Hari</span></div>
                <div class="cd-item"><span id="hours" class="cd-num">00</span><span class="cd-lab">Jam</span></div>
                <div class="cd-item"><span id="mins" class="cd-num">00</span><span class="cd-lab">Menit</span></div>
                <div class="cd-item"><span id="secs" class="cd-num">00</span><span class="cd-lab">Detik</span>
