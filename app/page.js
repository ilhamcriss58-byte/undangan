"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sections = [
    {
      id: "intro",
      title: "Undangan Pernikahan",
      content:
        "Pernikahan adalah awal dari kisah indah yang akan ditulis bersama, dengan setiap hari menjadi bab baru yang penuh sukacita dan kebahagiaan.",
    },
    {
      id: "mempelai",
      title: "Mempelai",
      content: `Anggun Ning Tyas

Putri dari Bapak M. Slamet Riyadi
Dan Ibu Sri Endah Puspitorini

&

Ilham Kristuaji

Putra dari Bapak Ishak Sriyono
Dan Ibu Ribkah Sutarmi`,
    },
    {
      id: "acara",
      title: "Detail Acara",
      content:
        "Senin, 25 Mei 2026. Akad dimulai pukul 07.00 WIB dan Resepsi pukul 09.00 WIB sampai selesai.",
    },
    {
      id: "lokasi",
      title: "Lokasi",
      content:
        "Bertempat di Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro, Jawa Timur.",
    },
    {
      id: "doa",
      title: "Doa & Restu",
      content:
        "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
    },
    {
      id: "gift",
      title: "Hadiah Pernikahan",
      content:
        "Doa restu keluarga, sahabat, serta rekan-rekan semua sudah sangat cukup sebagai hadiah terbaik bagi kami.",
    },
  ];

  // ===== MUSIC CONTROL =====
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Autoplay blocked:", err);
    }
  };

  // fallback agar loop benar-benar stabil
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <main className="bg-gradient-to-b from-slate-100 to-blue-50 min-h-screen text-slate-700 scroll-smooth">

      {/* ===== AUDIO (UNTIL I FOUND YOU INSTRUMENTAL LOOP) ===== */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source
          src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_d0f1b8a6c3.mp3?filename=romantic-piano-ambient-118215.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* BUTTON MUSIC */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-50 bg-white/90 shadow-lg px-5 py-3 rounded-full text-sm backdrop-blur"
      >
        {isPlaying ? "Pause Musik" : "Play Musik"}
      </button>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        <div className="relative z-10">
          <p className="tracking-[0.4em] uppercase text-sm mb-4">
            The Wedding Of
          </p>

          <h1 className="text-5xl md:text-8xl font-light mb-6">
            Anggun <span className="text-slate-400">&</span> Ilham
          </h1>

          <p className="text-lg md:text-xl max-w-2xl">
            Dengan penuh rasa syukur kami mengundang Anda untuk hadir di hari bahagia kami.
          </p>

          <div className="mt-10 border px-8 py-4 rounded-full bg-white shadow-lg">
            25 Mei 2026
          </div>
        </div>
      </section>

      {/* ===== SECTIONS ===== */}
      {sections.map((section) => (
        <section
          key={section.id}
          className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1600&auto=format&fit=crop')",
            }}
          />

          <div className="relative z-10 max-w-4xl w-full bg-white/85 backdrop-blur-md rounded-[40px] shadow-2xl p-10 md:p-16">

            <h2 className="text-3xl md:text-5xl text-center font-light mb-8">
              {section.title}
            </h2>

            <p className="text-lg md:text-xl text-center whitespace-pre-line">
              {section.content}
            </p>

            {/* DETAIL ACARA */}
            {section.id === "acara" && (
              <div className="mt-10 grid md:grid-cols-2 gap-6 text-center">
                <div className="bg-slate-100 p-6 rounded-3xl">
                  <h3 className="text-xl mb-2">Akad</h3>
                  <p>07.00 WIB</p>
                </div>
                <div className="bg-slate-100 p-6 rounded-3xl">
                  <h3 className="text-xl mb-2">Resepsi</h3>
                  <p>09.00 WIB - Selesai</p>
                </div>
              </div>
            )}

            {/* LOKASI */}
            {section.id === "lokasi" && (
              <div className="mt-10 text-center">
                <a
                  href="https://maps.google.com/?q=Desa+Panjang+RT13+RW5+Kedungadem+Bojonegoro"
                  target="_blank"
                  className="inline-block px-8 py-4 rounded-full bg-slate-800 text-white"
                >
                  Buka Lokasi
                </a>
              </div>
            )}

            {/* GIFT */}
            {section.id === "gift" && (
              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="bg-slate-100 p-6 rounded-3xl text-center">
                  <h3 className="text-xl mb-2">Transfer Bank BRI</h3>
                  <p className="font-semibold">Anggun Ning Tyas</p>
                  <p className="mt-2 tracking-widest">223301018163506</p>
                </div>

                <div className="bg-slate-100 p-6 rounded-3xl text-center">
                  <h3 className="text-xl mb-2">Alamat</h3>
                  <p>Desa Panjang, Bojonegoro</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ===== FOOTER ===== */}
      <footer className="relative py-20 text-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        <div className="relative z-10">
          <h2 className="text-4xl mb-6">Terima Kasih</h2>
          <p className="max-w-2xl mx-auto">
            Kehadiran dan doa restu Anda adalah kebahagiaan terbesar bagi kami.
          </p>

          <div className="mt-10 text-3xl">
            Anggun & Ilham
          </div>
        </div>
      </footer>
    </main>
  );
}
