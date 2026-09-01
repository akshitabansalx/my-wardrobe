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
    <main className="min-h-screen bg-[#F7F3F0] px-4 py-6 text-[#241F20] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            vestia<span className="text-[#9B6AA8]">.</span>
          </a>

          <a
            href="/outfits"
            className="rounded-full bg-[#3A3035] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
          >
            + Create Look
          </a>
        </header>

        {/* TITLE */}
        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B6AA8]">
            Your style collection
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                My Looks
              </h1>

              <p className="mt-2 max-w-xl text-sm text-[#756C70] sm:text-base">
                All the outfits you've created, saved in one place.
              </p>
            </div>

            {savedOutfits.length > 0 && (
              <p className="hidden text-sm font-semibold text-[#756C70] sm:block">
                {savedOutfits.length}{" "}
                {savedOutfits.length === 1 ? "look" : "looks"}
              </p>
            )}
          </div>
        </section>

        {/* NAVIGATION */}
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">
          <a
            href="/wardrobe"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            ✨ Build Look
          </a>

          <a
            href="/looks"
            className="shrink-0 rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-semibold text-white"
          >
            💖 My Looks
          </a>

          <a
            href="/calendar"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            📅 Calendar
          </a>
        </nav>

        {/* EMPTY STATE */}
        {savedOutfits.length === 0 ? (
          <section className="mt-10 rounded-[2rem] border border-[#E5DDE0] bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">✨</div>

            <h2 className="mt-5 text-2xl font-black">
              No looks yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#756C70]">
              Build your first outfit and save it here to start your
              personal style collection.
            </p>

            <a
              href="/outfits"
              className="mt-6 inline-block rounded-full bg-[#3A3035] px-6 py-3 text-sm font-bold text-white"
            >
              Create Your First Look ✨
            </a>
          </section>
        ) : (
          <>
            {/* MOBILE COUNT */}
            <div className="mt-7 sm:hidden">
              <p className="text-sm font-semibold text-[#756C70]">
                {savedOutfits.length}{" "}
                {savedOutfits.length === 1 ? "look" : "looks"}
              </p>
            </div>

            {/* LOOK GRID */}
            <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">

              {savedOutfits.map((outfit) => (
                <article
                  key={outfit.id}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#E5DDE0] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >

                  {/* OUTFIT IMAGES */}
                  <div className="grid grid-cols-3 gap-0.5 bg-[#F7F3F0]">

                    <img
                      src={outfit.top.photo}
                      alt={outfit.top.name}
                      className="aspect-[3/4] w-full object-cover"
                    />

                    <img
                      src={outfit.bottom.photo}
                      alt={outfit.bottom.name}
                      className="aspect-[3/4] w-full object-cover"
                    />

                    <img
                      src={outfit.shoes.photo}
                      alt={outfit.shoes.name}
                      className="aspect-[3/4] w-full object-cover"
                    />

                  </div>

                  {/* MENU */}
                  <div className="absolute right-2 top-2">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === outfit.id
                            ? null
                            : outfit.id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-[#3A3035] shadow-sm backdrop-blur"
                      aria-label={`Options for ${outfit.name}`}
                    >
                      ⋮
                    </button>

                    {openMenu === outfit.id && (
                      <div className="absolute right-0 z-10 mt-2 w-32 overflow-hidden rounded-2xl border border-[#E5DDE0] bg-white py-1 shadow-lg">

                        <button
                          onClick={() => {
                            setOpenMenu(null);
                            alert("Edit feature coming soon!");
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-[#F7F3F0]"
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

                  {/* INFO */}
                  <div className="p-4">

                    <div className="flex items-center justify-between gap-2">
                      <h2 className="truncate text-sm font-black sm:text-base">
                        {outfit.name}
                      </h2>

                      <span className="shrink-0 text-xs text-[#9B6AA8]">
                        ✨
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-[#81777B]">
                      {outfit.top.name} · {outfit.bottom.name}
                    </p>

                  </div>

                </article>
              ))}

              {/* CREATE NEW LOOK CARD */}
              <a
                href="/outfits"
                className="group flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#CDBFC5] bg-white/50 transition duration-200 hover:-translate-y-1 hover:border-[#9B6AA8] hover:bg-white hover:shadow-sm"
              >
                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EAED] text-2xl text-[#9B6AA8] transition group-hover:scale-105">
                    +
                  </div>

                  <p className="mt-3 text-sm font-black">
                    Create a new look
                  </p>

                  <p className="mt-1 text-xs text-[#81777B]">
                    Mix & match your closet
                  </p>

                </div>
              </a>

            </section>
          </>
        )}

      </div>
    </main>
  );
}