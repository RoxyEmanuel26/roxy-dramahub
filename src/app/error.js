"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-2xl font-bold">⚠️ Terjadi Kesalahan</h2>
      <p className="text-[#b3b3b3] text-center max-w-md">
        {error?.message || "Terjadi kesalahan yang tidak terduga."}
      </p>
      <button
        onClick={reset}
        className="bg-[#e50914] hover:bg-[#c40812] text-white px-6 py-3 rounded-[6px] transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
