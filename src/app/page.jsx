"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create");
  };

  return (
    <section className="flex flex-col justify-between">
      <header
        className="text-white text-center py-10 grayscale"
        style={{
          backgroundImage: "url('https://picsum.photos/id/301/1200/768')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="text-4xl font-bold">DearMom</h1>
        <p className="text-sm mt-2">
          Kirimkan surat digital spesial untuk Hari Ibu
        </p>
      </header>

      <main className="flex flex-col justify-center items-center flex-1 px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Buat Momen Berkesan untuk Ibu
          </h2>
          <p className="text-gray-600 mb-6">
            Hari Ibu adalah saat istimewa untuk menghargai peran ibu dalam hidup
            kita. Kirimkan surat digital berisi pesan cinta, harapan, dan
            apresiasi untuk beliau.
          </p>
          <Button onClick={handleClick} className="w-full">
            Create Now
          </Button>
        </div>
      </main>

      <footer className="text-center py-4">
        <p className="text-xs mb-2">
          DearMom &copy; {new Date().getFullYear()} - Created by{" "}
          <a
            className="hover:underline"
            href="https://instagram.com/oortsky"
            target="_blank"
          >
            @bayuaprio
          </a>
          .
        </p>
        <p className="text-xs">Powered by Gemini AI</p>
      </footer>
    </section>
  );
}
