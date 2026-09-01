"use client";

import { useEffect, useState } from "react";

type Clothing = {
  photo: string;
  name: string;
  category: string;
  color: string;
};

export default function WardrobePage() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const topCount = clothes.filter(
    (item) => item.category.toLowerCase() === "top"
  ).length;

  const bottomCount = clothes.filter(
    (item) => item.category.toLowerCase() === "bottom"
  ).length;

  const dressCount = clothes.filter(
    (item) => item.category.toLowerCase() === "dress"
  ).length;

  const shoesCount = clothes.filter(
    (item) => item.category.toLowerCase() === "shoes"
  ).length;

  const otherCount = clothes.filter(
    (item) => item.category.toLowerCase() === "other"
  ).length;

  useEffect(() => {
    const savedClothes = JSON.parse(
      localStorage.getItem("clothes") || "[]"
    );

    setClothes(savedClothes);
  }, []);

  function deleteClothing(index: number) {
    const updatedClothes = clothes.filter((_, i) => i !== index);

    localStorage.setItem("clothes", JSON.stringify(updatedClothes));
    setClothes(updatedClothes);
    setOpenMenu(null);
  }

  const filteredClothes =
    activeCategory === "All"
      ? clothes
      : clothes.filter(
          (item) =>
            item.category.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const categories = [
    { name: "All", count: clothes.length },
    { name: "Tops", count: topCount },
    { name: "Bottoms", count: bottomCount },
    { name: "Dresses", count: dressCount },
    { name: "Shoes", count: shoesCount },
    { name: "Other", count: otherCount },
  ];

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
            href="/add-clothes"
            className="rounded-full bg-[#3A3035] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
          >
            + Add
          </a>
        </header>

        {/* TITLE */}
        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B6AA8]">
            Your closet
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                My Wardrobe
              </h1>

              <p className="mt-2 text-sm text-[#756C70] sm:text-base">
                Your pieces. Your style. Your rules.
              </p>
            </div>

            {clothes.length > 0 && (
              <p className="hidden text-sm font-semibold text-[#756C70] sm:block">
                {clothes.length}{" "}
                {clothes.length === 1 ? "piece" : "pieces"}
              </p>
            )}
          </div>
        </section>

        {/* STATS */}
        {clothes.length > 0 && (
          <section className="mt-7 flex gap-3 overflow-x-auto pb-1">
            <div className="min-w-[82px] rounded-2xl border border-[#E5DDE0] bg-white/70 px-4 py-3">
              <p className="text-lg font-black">
                {clothes.length}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#81777B]">
                Pieces
              </p>
            </div>

            <div className="min-w-[82px] rounded-2xl border border-[#E5DDE0] bg-white/70 px-4 py-3">
              <p className="text-lg font-black">
                {topCount}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#81777B]">
                Tops
              </p>
            </div>

            <div className="min-w-[82px] rounded-2xl border border-[#E5DDE0] bg-white/70 px-4 py-3">
              <p className="text-lg font-black">
                {bottomCount}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#81777B]">
                Bottoms
              </p>
            </div>

            <div className="min-w-[82px] rounded-2xl border border-[#E5DDE0] bg-white/70 px-4 py-3">
              <p className="text-lg font-black">
                {dressCount}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#81777B]">
                Dresses
              </p>
            </div>
          </section>
        )}

        {/* NAVIGATION */}
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">
          <a
            href="/wardrobe"
            className="shrink-0 rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-semibold text-white"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            ✨ Outfit Builder
          </a>

          <a
            href="/calendar"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            📅 Calendar
          </a>
        </nav>

        {/* CATEGORY FILTERS */}
        {clothes.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#81777B]">
              Browse your closet
            </p>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setOpenMenu(null);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    activeCategory === category.name
                      ? "bg-[#9B6AA8] text-white shadow-sm"
                      : "border border-[#DED5D8] bg-white/80 text-[#5C5257] hover:border-[#C9B8C4] hover:bg-white"
                  }`}
                >
                  {category.name}

                  <span
                    className={`ml-1.5 text-xs ${
                      activeCategory === category.name
                        ? "text-white/75"
                        : "text-[#9B6AA8]"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY WARDROBE */}
        {clothes.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-[#E5DDE0] bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">👗</div>

            <h2 className="mt-5 text-2xl font-bold">
              Your wardrobe is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[#756C70]">
              Add your first clothing item and start building your digital
              wardrobe.
            </p>

            <a
              href="/add-clothes"
              className="mt-6 inline-block rounded-full bg-[#3A3035] px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Add Your First Item
            </a>
          </div>
        ) : filteredClothes.length === 0 ? (
          /* NO ITEMS IN FILTER */
          <div className="mt-10 rounded-[2rem] border border-[#E5DDE0] bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">✨</div>

            <h2 className="mt-4 text-xl font-bold">
              Nothing here yet
            </h2>

            <p className="mt-2 text-sm text-[#756C70]">
              You don't have any{" "}
              {activeCategory.toLowerCase()} in your closet.
            </p>

            <button
              onClick={() => setActiveCategory("All")}
              className="mt-5 rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-semibold text-white"
            >
              View All Pieces
            </button>
          </div>
        ) : (
          <>
            {/* MOBILE COUNT */}
            <div className="mt-7 sm:hidden">
              <p className="text-sm font-semibold text-[#756C70]">
                {filteredClothes.length}{" "}
                {filteredClothes.length === 1 ? "piece" : "pieces"}

                {activeCategory !== "All" &&
                  ` · ${activeCategory}`}
              </p>
            </div>

            {/* CLOTHING GRID */}
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">

              {filteredClothes.map((item) => {
                const originalIndex = clothes.indexOf(item);

                return (
                  <div
                    key={originalIndex}
                    className="group relative"
                  >
                    {/* PHOTO */}
                    <div className="relative overflow-hidden rounded-[1.4rem] bg-white shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="aspect-[4/5] w-full object-cover"
                      />

                      {/* THREE DOT MENU */}
                      <div className="absolute right-2 top-2">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === originalIndex
                                ? null
                                : originalIndex
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-[#3A3035] shadow-sm backdrop-blur transition hover:bg-white"
                          aria-label={`Options for ${item.name}`}
                        >
                          ⋮
                        </button>

                        {openMenu === originalIndex && (
                          <div className="absolute right-0 z-10 mt-2 w-32 overflow-hidden rounded-2xl border border-[#E5DDE0] bg-white py-1 shadow-lg">
                            <button
                              className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#3A3035] hover:bg-[#F7F3F0]"
                              onClick={() => {
                                setOpenMenu(null);
                                alert("Edit feature coming soon!");
                              }}
                            >
                              ✏️ Edit
                            </button>

                            <button
                              className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                              onClick={() =>
                                deleteClothing(originalIndex)
                              }
                            >
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ITEM INFO */}
                    <div className="px-1 pt-3">
                      <h3 className="truncate text-sm font-bold text-[#241F20]">
                        {item.name || "Unnamed item"}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-[#81777B]">
                        {item.category && (
                          <span>{item.category}</span>
                        )}

                        {item.category && item.color && (
                          <span>•</span>
                        )}

                        {item.color && (
                          <span>{item.color}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ADD PIECE CARD */}
              {activeCategory === "All" && (
                <a
                  href="/add-clothes"
                  className="group flex flex-col"
                >
                  <div className="flex aspect-[4/5] items-center justify-center rounded-[1.4rem] border border-dashed border-[#CDBFC5] bg-white/50 transition duration-200 group-hover:-translate-y-1 group-hover:border-[#9B6AA8] group-hover:bg-white group-hover:shadow-sm">
                    <div className="text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F1EAED] text-2xl text-[#9B6AA8] transition group-hover:scale-105">
                        +
                      </div>

                      <p className="mt-3 text-sm font-bold text-[#3A3035]">
                        Add piece
                      </p>

                      <p className="mt-1 text-xs text-[#81777B]">
                        Grow your closet
                      </p>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}