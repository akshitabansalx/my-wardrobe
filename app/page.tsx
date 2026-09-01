"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [clothesCount, setClothesCount] = useState(0);
  const [looksCount, setLooksCount] = useState(0);

  useEffect(() => {
    const clothes = JSON.parse(
      localStorage.getItem("clothes") || "[]"
    );

    const outfits = JSON.parse(
      localStorage.getItem("outfits") || "[]"
    );

    setClothesCount(clothes.length);
    setLooksCount(outfits.length);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4F3F2] text-[#272326]">

      {/* ================================================= */}
      {/* SUBTLE GLITTER BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <span className="absolute left-[8%] top-[16%] text-[8px] text-[#B9A4C0] opacity-40">
          ✦
        </span>

        <span className="absolute left-[22%] top-[42%] text-[6px] text-[#C3B2C8] opacity-35">
          ✧
        </span>

        <span className="absolute right-[14%] top-[19%] text-[7px] text-[#B8A0BF] opacity-35">
          ✦
        </span>

        <span className="absolute right-[28%] top-[48%] text-[5px] text-[#C7B7CC] opacity-40">
          ✧
        </span>

        <span className="absolute left-[48%] top-[12%] text-[5px] text-[#BDAAC3] opacity-30">
          ✦
        </span>

        <span className="absolute right-[7%] top-[67%] text-[7px] text-[#BBA7C1] opacity-30">
          ✧
        </span>

        <span className="absolute left-[12%] top-[72%] text-[5px] text-[#C4B2C9] opacity-35">
          ✦
        </span>

        <span className="absolute left-[72%] top-[82%] text-[6px] text-[#BBA6C2] opacity-30">
          ✧
        </span>

        {/* soft lilac glow */}
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#DCCDE2] opacity-35 blur-[90px]" />

        <div className="absolute -left-32 top-[55%] h-72 w-72 rounded-full bg-[#E3D9DE] opacity-45 blur-[100px]" />

      </div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-7 sm:py-6">

        <a
          href="/"
          className="text-[22px] font-black tracking-[-0.06em] sm:text-2xl"
        >
          vestia
          <span className="text-[#9B6AA8]">.</span>
        </a>

        <a
          href="/wardrobe"
          className="rounded-full bg-[#332E31] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:px-5 sm:py-2.5 sm:text-sm"
        >
          My Wardrobe
        </a>

      </header>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-7 sm:pb-16 sm:pt-14">

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">

          {/* HERO TEXT */}

          <div className="max-w-xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DDD5DF] bg-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C6595] shadow-sm backdrop-blur">
              <span className="text-[#A784B0]">✦</span>
              Your digital closet
            </div>

            <h1 className="text-[48px] font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[70px]">

              Your wardrobe,
              <br />

              <span className="text-[#9B6AA8]">
                reimagined.
              </span>

            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-[#746D70] sm:text-base sm:leading-7">
              Organize your clothes, create effortless looks,
              and turn your everyday wardrobe into your own
              little style space.
            </p>

            {/* BUTTONS */}

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">

              <a
                href="/add-clothes"
                className="rounded-full bg-[#332E31] px-6 py-3 text-center text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:text-sm"
              >
                Add your first piece
              </a>

              <a
                href="/outfits"
                className="rounded-full border border-[#D9D1D5] bg-white/80 px-6 py-3 text-center text-xs font-bold text-[#393236] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white sm:text-sm"
              >
                Build a look
              </a>

            </div>

            {/* STATS */}

            <div className="mt-7 flex gap-2.5">

              <div className="min-w-[76px] rounded-2xl border border-[#DED7DA] bg-white/65 px-3.5 py-2.5 backdrop-blur">
                <p className="text-base font-black">
                  {clothesCount}
                </p>

                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8286]">
                  Pieces
                </p>
              </div>

              <div className="min-w-[76px] rounded-2xl border border-[#DED7DA] bg-white/65 px-3.5 py-2.5 backdrop-blur">
                <p className="text-base font-black">
                  {looksCount}
                </p>

                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8286]">
                  Looks
                </p>
              </div>

              <div className="min-w-[76px] rounded-2xl border border-[#DED7DA] bg-white/65 px-3.5 py-2.5 backdrop-blur">
                <p className="text-base font-black text-[#9B6AA8]">
                  ✦
                </p>

                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A8286]">
                  Style
                </p>
              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* SMALL FASHION COLLAGE */}
          {/* ================================================= */}

          <div className="relative mx-auto w-full max-w-[390px]">

            <div className="relative rounded-[2rem] border border-white/80 bg-[#E8E0EA]/70 p-3 shadow-lg backdrop-blur">

              {/* tiny heading */}

              <div className="flex items-center justify-between px-2 pb-3 pt-1">

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#73577A]">
                  VESTIA
                </p>

                <span className="text-[9px] font-semibold tracking-widest text-[#8B758F]">
                  YOUR STYLE ✦
                </span>

              </div>

              {/* SMALL SQUARE GRID */}

              <div className="grid grid-cols-2 gap-2">

                <div className="flex aspect-square items-center justify-center rounded-[1.3rem] bg-white/80 shadow-sm">

                  <div className="text-center">

                    <div className="text-4xl sm:text-5xl">
                      👗
                    </div>

                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#81777B]">
                      Wardrobe
                    </p>

                  </div>

                </div>

                <div className="flex aspect-square items-center justify-center rounded-[1.3rem] bg-[#3A3438] shadow-sm">

                  <div className="text-center">

                    <div className="text-4xl text-[#D9C2DF] sm:text-5xl">
                      ✦
                    </div>

                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white/60">
                      Create
                    </p>

                  </div>

                </div>

                <div className="col-span-2 flex items-center justify-between rounded-[1.2rem] bg-white/80 px-4 py-3 shadow-sm">

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#9B6AA8]">
                      Today's mood
                    </p>

                    <p className="mt-1 text-sm font-black">
                      Main character
                    </p>

                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEE5F0] text-base">
                    ♡
                  </div>

                </div>

              </div>

              <p className="pb-1 pt-3 text-center text-[9px] font-semibold tracking-wide text-[#806487]">
                Mix · Match · Create
              </p>

            </div>

            {/* FLOATING MINI LABEL */}

            <div className="absolute -bottom-4 -left-3 rounded-xl border border-[#E4DDE2] bg-white px-3 py-2 shadow-md">

              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9B6AA8]">
                Your closet
              </p>

              <p className="mt-0.5 text-xs font-black">
                Your rules ♡
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* EXPLORE */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-10 sm:px-7">

        <div className="mb-5">

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9B6AA8]">
            Explore Vestia
          </p>

          <h2 className="mt-1.5 text-2xl font-black tracking-[-0.035em] sm:text-3xl">
            Everything in one closet.
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">

          {/* CARD */}

          <a
            href="/wardrobe"
            className="group rounded-[1.3rem] border border-[#DED8DA] bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-md sm:p-5"
          >

            <div className="flex items-center justify-between">

              <span className="text-xl">
                👗
              </span>

              <span className="text-sm text-[#9B6AA8] transition group-hover:translate-x-1">
                →
              </span>

            </div>

            <h3 className="mt-4 text-sm font-black">
              Wardrobe
            </h3>

            <p className="mt-1.5 text-[11px] leading-5 text-[#81777B]">
              Organize every piece you own.
            </p>

          </a>

          {/* CARD */}

          <a
            href="/outfits"
            className="group rounded-[1.3rem] border border-[#DED8DA] bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-md sm:p-5"
          >

            <div className="flex items-center justify-between">

              <span className="text-xl">
                ✦
              </span>

              <span className="text-sm text-[#9B6AA8] transition group-hover:translate-x-1">
                →
              </span>

            </div>

            <h3 className="mt-4 text-sm font-black">
              Build Look
            </h3>

            <p className="mt-1.5 text-[11px] leading-5 text-[#81777B]">
              Mix pieces and create outfits.
            </p>

          </a>

          {/* CARD */}

          <a
            href="/looks"
            className="group rounded-[1.3rem] border border-[#DED8DA] bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-md sm:p-5"
          >

            <div className="flex items-center justify-between">

              <span className="text-xl">
                ♡
              </span>

              <span className="text-sm text-[#9B6AA8] transition group-hover:translate-x-1">
                →
              </span>

            </div>

            <h3 className="mt-4 text-sm font-black">
              My Looks
            </h3>

            <p className="mt-1.5 text-[11px] leading-5 text-[#81777B]">
              Keep your favorite outfits.
            </p>

          </a>

          {/* CARD */}

          <a
            href="/calendar"
            className="group rounded-[1.3rem] border border-[#DED8DA] bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:shadow-md sm:p-5"
          >

            <div className="flex items-center justify-between">

              <span className="text-xl">
                ◫
              </span>

              <span className="text-sm text-[#9B6AA8] transition group-hover:translate-x-1">
                →
              </span>

            </div>

            <h3 className="mt-4 text-sm font-black">
              Calendar
            </h3>

            <p className="mt-1.5 text-[11px] leading-5 text-[#81777B]">
              Plan what you're wearing.
            </p>

          </a>

        </div>

      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-7 pt-3 sm:px-7 sm:pb-10">

        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#373135] px-6 py-9 text-center text-white sm:px-10 sm:py-11">

          {/* subtle purple glow */}

          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#A477B0] opacity-20 blur-[70px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#C7A9CF] opacity-10 blur-[70px]" />

          {/* subtle glitter */}

          <span className="absolute left-[18%] top-[24%] text-[6px] text-[#D8C3DE] opacity-40">
            ✦
          </span>

          <span className="absolute right-[20%] bottom-[25%] text-[5px] text-[#D8C3DE] opacity-35">
            ✧
          </span>

          <div className="relative">

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#CDB4D3]">
              Your style starts here
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
              Make your closet yours.
            </h2>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/55">
              Add your pieces, create your looks, and make getting
              dressed a little more fun.
            </p>

            <a
              href="/add-clothes"
              className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-xs font-black text-[#373135] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Enter Vestia ✦
            </a>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-7 text-center sm:px-7">

        <p className="text-[9px] font-medium tracking-wide text-[#9A9295]">
          vestia
          <span className="text-[#9B6AA8]">.</span>
          {" "}· Your closet, your creativity.
        </p>

      </footer>

    </main>
  );
}