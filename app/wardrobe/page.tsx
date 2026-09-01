"use client";

import { useEffect, useState } from "react";

type Clothing = {
  photo: string;
  name: string;
  category: string;
  color: string;
};

const categoryOrder = [
  { key: "Top", label: "Tops", emoji: "👚" },
  { key: "Bottom", label: "Bottoms", emoji: "👖" },
  { key: "Dress", label: "Dresses", emoji: "👗" },
  { key: "Shoes", label: "Shoes", emoji: "👟" },
  { key: "Other", label: "Other", emoji: "👜" },
];

export default function WardrobePage() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

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

  const getCategoryItems = (category: string) => {
    return clothes.filter(
      (item) =>
        item.category.toLowerCase() === category.toLowerCase()
    );
  };

  const filteredClothes =
    activeCategory === "All"
      ? clothes
      : clothes.filter(
          (item) =>
            item.category.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const topCount = getCategoryItems("Top").length;
  const bottomCount = getCategoryItems("Bottom").length;
  const dressCount = getCategoryItems("Dress").length;
  const shoesCount = getCategoryItems("Shoes").length;
  const otherCount = getCategoryItems("Other").length;

  const categories = [
    { name: "All", count: clothes.length },
    { name: "Tops", count: topCount },
    { name: "Bottoms", count: bottomCount },
    { name: "Dresses", count: dressCount },
    { name: "Shoes", count: shoesCount },
    { name: "Other", count: otherCount },
  ];

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
            radial-gradient(circle at 96% 7%, rgba(151,126,166,0.30) 0 1.5px, transparent 3px),

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
            radial-gradient(circle at 83% 91%, rgba(255,255,255,0.9) 0 1.5px, transparent 3px),
            radial-gradient(circle at 96% 79%, rgba(151,126,166,0.30) 0 1.5px, transparent 3px)
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
            href="/add-clothes"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-[#29272B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#38343A]"
          >
            + Add piece
          </a>
        </header>

        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <section className="mt-9 sm:mt-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8F789F]">
            Your digital closet
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.055em] text-[#29272B] sm:text-5xl">
                My Wardrobe
              </h1>

              <p className="mt-2 text-sm text-[#777278] sm:text-base">
                Browse your pieces. Build your style.
              </p>
            </div>

            {clothes.length > 0 && (
              <div className="hidden rounded-full border border-[#DEDADF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#4B474D] shadow-sm sm:block">
                {clothes.length}{" "}
                {clothes.length === 1 ? "piece" : "pieces"}
              </div>
            )}
          </div>
        </section>

        {/* ================================================== */}
        {/* CLOSET SUMMARY */}
        {/* ================================================== */}

        {clothes.length > 0 && (
          <section className="mt-7 rounded-[1.6rem] border border-[#DFDDE1] bg-white/75 p-4 shadow-[0_8px_30px_rgba(55,48,60,0.04)] backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#88828A]">
                  Closet overview
                </p>

                <p className="mt-1 text-lg font-black tracking-tight text-[#29272B]">
                  {clothes.length} pieces to style
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9E2ED] text-sm text-[#8F789F]">
                ✦
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              <SummaryCard label="Tops" count={topCount} />
              <SummaryCard label="Bottoms" count={bottomCount} />
              <SummaryCard label="Dresses" count={dressCount} />
              <SummaryCard label="Shoes" count={shoesCount} />
            </div>
          </section>
        )}

        {/* ================================================== */}
        {/* APP NAVIGATION */}
        {/* ================================================== */}

        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">
          <a
            href="/wardrobe"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full bg-[#29272B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Wardrobe
          </a>

          <a
            href="/outfits"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Outfit Builder
          </a>

          <a
            href="/calendar"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Calendar
          </a>

          <a
            href="/looks"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 rounded-full border border-[#DDD9DF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#504B52] transition hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
          >
            Saved Looks
          </a>
        </nav>

        {/* ================================================== */}
        {/* FILTER PILLS */}
        {/* ================================================== */}

        {clothes.length > 0 && (
          <section className="mt-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory(category.name);
                    setOpenMenu(null);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    activeCategory === category.name
                      ? "bg-[#9A86A8] text-white shadow-sm"
                      : "border border-[#DDD9DF] bg-white/80 text-[#625D63] hover:border-[#C7B8CE] hover:bg-[#F0EBF2]"
                  }`}
                >
                  {category.name}

                  <span className="ml-1.5 text-xs opacity-65">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ================================================== */}
        {/* EMPTY STATE */}
        {/* ================================================== */}

        {clothes.length === 0 ? (
          <div className="mt-10 rounded-[1.8rem] border border-[#DFDDE1] bg-white/80 p-10 text-center shadow-[0_8px_30px_rgba(55,48,60,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAE4ED] text-2xl">
              👗
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#29272B]">
              Your wardrobe is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[#777278]">
              Add your first clothing item and start building your digital
              wardrobe.
            </p>

            <a
              href="/add-clothes"
              onClick={(e) => e.stopPropagation()}
              className="mt-6 inline-block rounded-full bg-[#29272B] px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
            >
              Add Your First Item
            </a>
          </div>
        ) : activeCategory !== "All" ? (
          /* ================================================== */
          /* FILTERED CATEGORY VIEW */
          /* ================================================== */

          <section className="mt-9">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F789F]">
                  {filteredClothes.length} pieces
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  {activeCategory}
                </h2>
              </div>

              <button
                onClick={() => setActiveCategory("All")}
                className="text-sm font-semibold text-[#8F789F] transition hover:text-[#725C7D]"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-7">
              {filteredClothes.map((item) => {
                const originalIndex = clothes.indexOf(item);

                return (
                  <ClothingCard
                    key={originalIndex}
                    item={item}
                    originalIndex={originalIndex}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    deleteClothing={deleteClothing}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          /* ================================================== */
          /* ALL CLOSET — CATEGORY RAILS */
          /* ================================================== */

          <div className="mt-9 space-y-10">
            {categoryOrder.map((category) => {
              const items = getCategoryItems(category.key);

              if (items.length === 0) return null;

              return (
                <section key={category.key}>
                  {/* CATEGORY HEADER */}

                  <div className="mb-3 flex items-end justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9E3EC] text-sm">
                        {category.emoji}
                      </span>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8F789F]">
                          {items.length}{" "}
                          {items.length === 1 ? "piece" : "pieces"}
                        </p>

                        <h2 className="text-xl font-black tracking-tight text-[#29272B]">
                          {category.label}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setActiveCategory(category.label)
                      }
                      className="text-xs font-semibold text-[#777278] transition hover:text-[#8F789F]"
                    >
                      See all →
                    </button>
                  </div>

                  {/* ================================================== */}
                  {/* SMALL SQUARE CLOTHING RAIL */}
                  {/* ================================================== */}

                  <div className="flex gap-3 overflow-x-auto pb-3">
                    {items.map((item) => {
                      const originalIndex = clothes.indexOf(item);

                      return (
                        <div
                          key={originalIndex}
                          className="w-[92px] shrink-0 sm:w-[105px]"
                        >
                          <ClothingCard
                            item={item}
                            originalIndex={originalIndex}
                            openMenu={openMenu}
                            setOpenMenu={setOpenMenu}
                            deleteClothing={deleteClothing}
                          />
                        </div>
                      );
                    })}

                    {/* ADD PIECE CARD */}

                    <a
                      href="/add-clothes"
                      onClick={(e) => e.stopPropagation()}
                      className="w-[92px] shrink-0 sm:w-[105px]"
                    >
                      <div className="flex aspect-square items-center justify-center rounded-[1rem] border border-dashed border-[#C9C1CD] bg-white/45 transition hover:border-[#9A86A8] hover:bg-white/75">
                        <div className="text-center">
                          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#E9E2ED] text-lg font-light text-[#8F789F]">
                            +
                          </div>

                          <p className="mt-2 text-[9px] font-bold text-[#504B52]">
                            Add piece
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </section>
              );
            })}

            {/* UNKNOWN ITEMS */}

            {getCategoryItems("Top").length === 0 &&
              getCategoryItems("Bottom").length === 0 &&
              getCategoryItems("Dress").length === 0 &&
              getCategoryItems("Shoes").length === 0 &&
              getCategoryItems("Other").length === 0 && (
                <div className="rounded-[1.8rem] bg-white/80 p-10 text-center">
                  <p className="text-lg font-bold">
                    No clothing pieces found
                  </p>
                </div>
              )}
          </div>
        )}
      </div>
    </main>
  );
}

/* ================================================== */
/* SUMMARY CARD */
/* ================================================== */

function SummaryCard({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="min-w-[72px] rounded-xl border border-[#E2DFE4] bg-[#F7F5F7] px-3 py-2.5">
      <p className="text-base font-black text-[#29272B]">
        {count}
      </p>

      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#88828A]">
        {label}
      </p>
    </div>
  );
}

/* ================================================== */
/* CLOTHING CARD */
/* ================================================== */

function ClothingCard({
  item,
  originalIndex,
  openMenu,
  setOpenMenu,
  deleteClothing,
}: {
  item: Clothing;
  originalIndex: number;
  openMenu: number | null;
  setOpenMenu: (index: number | null) => void;
  deleteClothing: (index: number) => void;
}) {
  return (
    <div className="group relative">
      {/* PHOTO */}

      <div className="relative overflow-visible rounded-[1rem] bg-white">
        <div className="overflow-hidden rounded-[1rem] border border-[#E2DFE4] bg-white shadow-[0_4px_18px_rgba(55,48,60,0.045)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(55,48,60,0.08)]">
          <img
            src={item.photo}
            alt={item.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* THREE DOT MENU */}

        <div className="absolute right-1 top-1 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenu(
                openMenu === originalIndex
                  ? null
                  : originalIndex
              );
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white/90 text-sm font-bold text-[#4B474D] shadow-sm backdrop-blur transition hover:bg-white"
            aria-label={`Options for ${item.name}`}
          >
            ⋮
          </button>

          {openMenu === originalIndex && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-[#E0DCE2] bg-white py-1 shadow-[0_12px_30px_rgba(45,40,48,0.12)]"
            >
              <button
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#3F3B41] hover:bg-[#F4F1F5]"
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

      <div className="px-0.5 pt-1.5">
        <h3 className="truncate text-[10px] font-bold text-[#29272B]">
          {item.name || "Unnamed item"}
        </h3>

        <div className="mt-0.5 flex items-center gap-0.5 text-[8px] text-[#88828A]">
          {item.color && <span>{item.color}</span>}

          {item.color && item.category && (
            <span>•</span>
          )}

          {item.category && (
            <span>{item.category}</span>
          )}
        </div>
      </div>
    </div>
  );
}