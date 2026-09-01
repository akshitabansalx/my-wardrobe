"use client";

import { useEffect, useState } from "react";

type Clothing = {
  photo: string;
  name: string;
  category: string;
  color: string;
};

type Outfit = {
  id: number;
  name: string;
  top: Clothing;
  bottom: Clothing;
  shoes: Clothing;
};

export default function LooksPage() {
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("outfits") || "[]"
    );

    setSavedOutfits(saved);
  }, []);

  function deleteOutfit(id: number) {
    const updatedOutfits = savedOutfits.filter(
      (outfit) => outfit.id !== id
    );

    localStorage.setItem(
      "outfits",
      JSON.stringify(updatedOutfits)
    );

    setSavedOutfits(updatedOutfits);
    setOpenMenu(null);
  }

  return (
    <main
      onClick={() => setOpenMenu(null)}
      className="relative min-h-screen overflow-hidden bg-[#F3F2F4] text-[#29272B]"
    >
      {/* ================================================== */}
      {/* SUBTLE GLITTER BACKGROUND */}
      {/* ================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 5% 8%, rgba(151,126,166,0.38) 0 2px, transparent 3px),
            radial-gradient(circle at 14% 19%, rgba(255,255,255,0.95) 0 1.5px, transparent 3px),
            radial-gradient(circle at 25% 7%, rgba(151,126,166,0.30) 0 1.5px, transparent 3px),
            radial-gradient(circle at 37% 17%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
            radial-gradient(circle at 49% 6%, rgba(151,126,166,0.35) 0 1.5px, transparent 3px),
            radial-gradient(circle at 61% 21%, rgba(255,255,255,0.95) 0 1.5px, transparent 3px),
            radial-gradient(circle at 73% 9%, rgba(151,126,166,0.35) 0 2px, transparent 3px),
            radial-gradient(circle at 87% 18%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px),

            radial-gradient(circle at 8% 42%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px),
            radial-gradient(circle at 21% 55%, rgba(151,126,166,0.30) 0 2px, transparent 3px),
            radial-gradient(circle at 34% 39%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px),
            radial-gradient(circle at 48% 52%, rgba(151,126,166,0.32) 0 1.5px, transparent 3px),
            radial-gradient(circle at 66% 42%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
            radial-gradient(circle at 79% 57%, rgba(151,126,166,0.32) 0 1.5px, transparent 3px),
            radial-gradient(circle at 92% 43%, rgba(255,255,255,0.95) 0 1.5px, transparent 3px),

            radial-gradient(circle at 6% 78%, rgba(151,126,166,0.32) 0 1.5px, transparent 3px),
            radial-gradient(circle at 19% 91%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
            radial-gradient(circle at 33% 76%, rgba(151,126,166,0.30) 0 1.5px, transparent 3px),
            radial-gradient(circle at 52% 89%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px),
            radial-gradient(circle at 68% 77%, rgba(151,126,166,0.34) 0 2px, transparent 3px),
            radial-gradient(circle at 83% 91%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px)
          `,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => e.stopPropagation()}
            className="text-2xl font-black tracking-[-0.06em] text-[#29272B] sm:text-3xl"
          >
            vestia<span className="text-[#9A86A8]">.</span>
          </a>

          <a
            href="/outfits"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-[#29272B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#38343A]"
          >
            + Create Look
          </a>
        </header>

        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <section className="mt-9 sm:mt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F789F]">
            Your style collection
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.055em] text-[#29272B] sm:text-5xl">
                My Looks
              </h1>

              <p className="mt-2 max-w-xl text-sm text-[#777278] sm:text-base">
                All the outfits you've created, saved in one place.
              </p>
            </div>

            {savedOutfits.length > 0 && (
              <div className="hidden rounded-full border border-[#DEDADF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#4B474D] shadow-sm sm:block">
                {savedOutfits.length}{" "}
                {savedOutfits.length === 1 ? "look" : "looks"}
              </div>
            )}
          </div>
        </section>

        {/* ================================================== */}
        {/* NAVIGATION */}
        {/* ================================================== */}

        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">
          <a
            href="/wardrobe"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Wardrobe
          </a>

          <a
            href="/outfits"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Build Look
          </a>

          <a
            href="/looks"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full bg-[#29272B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            My Looks
          </a>

          <a
            href="/calendar"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Calendar
          </a>
        </nav>

        {/* ================================================== */}
        {/* EMPTY STATE */}
        {/* ================================================== */}

        {savedOutfits.length === 0 ? (
          <section className="mt-10 rounded-[1.8rem] border border-[#DFDDE1] bg-white/80 p-10 text-center shadow-[0_8px_30px_rgba(55,48,60,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9E2ED] text-xl text-[#8F789F]">
              ✦
            </div>

            <h2 className="mt-5 text-2xl font-black">
              No looks yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#777278]">
              Build your first outfit and save it here to start your
              personal style collection.
            </p>

            <a
              href="/outfits"
              onClick={(e) => e.stopPropagation()}
              className="mt-6 inline-block rounded-full bg-[#29272B] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Create Your First Look
            </a>
          </section>
        ) : (
          <>
            {/* MOBILE COUNT */}

            <div className="mt-7 sm:hidden">
              <p className="text-xs font-semibold text-[#777278]">
                {savedOutfits.length}{" "}
                {savedOutfits.length === 1 ? "look" : "looks"}
              </p>
            </div>

            {/* ================================================== */}
            {/* SMALL LOOK GRID */}
            {/* ================================================== */}

            <section className="mt-6 grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">

              {savedOutfits.map((outfit) => (
                <article
                  key={outfit.id}
                  className="group relative"
                >
                  {/* OUTFIT PHOTO */}

                  <div className="relative overflow-visible rounded-[1rem] bg-white">

                    <div className="grid aspect-square grid-cols-3 gap-0.5 overflow-hidden rounded-[1rem] border border-[#E2DFE4] bg-[#ECEAED] shadow-[0_4px_18px_rgba(55,48,60,0.045)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(55,48,60,0.08)]">

                      <img
                        src={outfit.top.photo}
                        alt={outfit.top.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                      />

                      <img
                        src={outfit.bottom.photo}
                        alt={outfit.bottom.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                      />

                      <img
                        src={outfit.shoes.photo}
                        alt={outfit.shoes.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                      />

                    </div>

                    {/* THREE DOT MENU */}

                    <div className="absolute right-1 top-1 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenMenu(
                            openMenu === outfit.id
                              ? null
                              : outfit.id
                          );
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white/90 text-sm font-bold text-[#4B474D] shadow-sm backdrop-blur transition hover:bg-white"
                        aria-label={`Options for ${outfit.name}`}
                      >
                        ⋮
                      </button>

                      {openMenu === outfit.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-[#E0DCE2] bg-white py-1 shadow-[0_12px_30px_rgba(45,40,48,0.12)]"
                        >
                          <button
                            onClick={() => {
                              setOpenMenu(null);
                              alert("Edit feature coming soon!");
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#3F3B41] hover:bg-[#F4F1F5]"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteOutfit(outfit.id)
                            }
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================================================== */}
                  {/* LOOK INFO */}
                  {/* ================================================== */}

                  <div className="px-0.5 pt-1.5">
                    <div className="flex items-center gap-1">
                      <h2 className="truncate text-[10px] font-bold text-[#29272B]">
                        {outfit.name || "Untitled look"}
                      </h2>

                      <span className="shrink-0 text-[8px] text-[#9A86A8]">
                        ✦
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-[8px] text-[#88828A]">
                      {outfit.top.name} · {outfit.bottom.name}
                    </p>
                  </div>
                </article>
              ))}

              {/* ================================================== */}
              {/* CREATE NEW LOOK */}
              {/* ================================================== */}

              <a
                href="/outfits"
                onClick={(e) => e.stopPropagation()}
                className="group"
              >
                <div className="flex aspect-square items-center justify-center rounded-[1rem] border border-dashed border-[#C9C1CD] bg-white/45 transition duration-200 hover:-translate-y-1 hover:border-[#9A86A8] hover:bg-white/75">

                  <div className="text-center px-2">
                    <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#E9E2ED] text-lg font-light text-[#8F789F] transition duration-200 group-hover:scale-110">
                      +
                    </div>

                    <p className="mt-2 text-[9px] font-bold text-[#504B52]">
                      New look
                    </p>

                    <p className="mt-0.5 text-[7px] text-[#88828A]">
                      Mix & match
                    </p>
                  </div>

                </div>
              </a>

            </section>
          </>
        )}
      </div>
    </main>
  );
}