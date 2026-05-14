export default function Home() {
  const sections = [
    {
      title: "Undangan Pernikahan",
      content:
        "Pernikahan adalah awal dari kisah indah yang akan ditulis bersama, dengan setiap hari menjadi bab baru yang penuh sukacita dan kebahagiaan.",
    },
    {
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
      title: "Detail Acara",
      content:
        "Senin, 25 Mei 2026. Akad dimulai pukul 07.00 WIB dan Syukuran pukul 09.00 WIB sampai selesai.",
    },
    {
      title: "Lokasi",
      content:
        "Bertempat di Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro, Jawa Timur.",
    },
    {
      title: "Doa & Restu",
      content:
        "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
    },
    {
      title: "Hadiah Pernikahan",
      content:
        "Doa restu keluarga, sahabat, serta rekan-rekan semua di pernikahan kami sudah sangat cukup sebagai hadiah.",
    },
  ];

  return (
    <main className="bg-gradient-to-b from-slate-100 to-blue-50 min-h-screen text-slate-700">
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="tracking-[0.4em] uppercase text-sm mb-4">
          The Wedding Of
        </p>

        <h1 className="text-6xl md:text-8xl font-light mb-6 text-slate-800">
          Anggun <span className="text-slate-400">&</span> Ilham
        </h1>

        <p className="text-lg md:text-xl max-w-2xl leading-relaxed">
          Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
          Bapak/Ibu/Saudara/i untuk hadir dalam hari istimewa kami.
        </p>

        <div className="mt-10 border border-slate-300 px-8 py-4 rounded-full bg-white shadow-lg">
          <p className="text-sm tracking-widest uppercase">
            25 Mei 2026
          </p>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={index}
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl p-10 md:p-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800">
                {section.title}
              </h2>
            </div>

            <p className="text-lg md:text-2xl leading-relaxed text-center whitespace-pre-line">
              {section.content}
            </p>

            {index === 2 && (
              <div className="mt-12 grid md:grid-cols-2 gap-6 text-center">
                <div className="bg-slate-100 rounded-3xl p-6">
                  <h3 className="text-2xl mb-2">Akad Nikah</h3>
                  <p>07.00 WIB</p>
                </div>

                <div className="bg-slate-100 rounded-3xl p-6">
                  <h3 className="text-2xl mb-2">Syukuran</h3>
                  <p>09.00 WIB - Selesai</p>
                </div>
              </div>
            )}

            {index === 3 && (
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

            {index === 5 && (
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="bg-slate-100 rounded-3xl p-6 text-center">
                  <h3 className="text-2xl mb-2">Transfer Bank BRI</h3>
                  <p className="font-semibold">a.n. Anggun Ning Tyas</p>

                  <p className="mt-2 text-xl tracking-widest">
                    2233 0101 8163 506
                  </p>

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg"
                    alt="Logo BRI"
                    className="h-8 mx-auto mt-4"
                  />
                </div>

                <div className="bg-slate-100 rounded-3xl p-6 text-center">
                  <h3 className="text-2xl mb-4">Kirim Hadiah</h3>

                  <p>
                    Desa Panjang RT.13/RW.5,
                    Kedungadem, Bojonegoro
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
