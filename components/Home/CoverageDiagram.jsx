"use client";


import Image from "next/image";

export default function FullScreenImageSection() {
  return (
    <section
      className="
        relative w-full overflow-hidden bg-black
        min-h-screen
        min-h-[100svh]
        min-h-[100dvh]
      "
    >
      {/* DESKTOP / LAPTOP IMAGE */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768142996/yo69btuf9osbmrrjbnx7.png"
          alt="Full Screen Desktop"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* MOBILE IMAGE */}
      <div className="absolute inset-0 md:hidden p-4">
        <Image
          src="https://res.cloudinary.com/dhev1s5wb/image/upload/v1768143243/m_cyh0uf.png"
          alt="Full Screen Mobile"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-contain object-center "
        />
      </div>
    </section>
  );
}
