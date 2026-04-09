import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-8xl font-bold text-[#e50914]">404</h1>
      <p className="text-2xl font-semibold">Halaman Tidak Ditemukan</p>
      <p className="text-[#b3b3b3] text-center">
        Halaman yang kamu cari tidak ada atau telah dipindahkan
      </p>
      <Link
        href="/"
        className="bg-[#e50914] hover:bg-[#c40812] text-white px-6 py-3 rounded-[6px] mt-4 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
