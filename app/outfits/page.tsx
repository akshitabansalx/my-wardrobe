"use client";

import { useEffect, useState } from "react";

type Clothing = {
  photo: string;
  name: string;
  category: string;
  color: string;
};

export default function OutfitsPage() {
  const [clothes, setClothes] = useState<Clothing[]>([]);

  const [selectedTop, setSelectedTop] = useState<Clothing | null>(null);
  const [selectedBottom, setSelectedBottom] =
    useState<Clothing | null>(null);
  const [selectedShoes, setSelectedShoes] =
    useState<Clothing | null>(null);

  const [outfitName, setOutfitName] = useState("");

  useEffect(() => {
    const clothesData = localStorage.getItem("clothes");

    if (clothesData) {
      setClothes(JSON.parse(clothesData));
    }
  }, []);

  const tops = clothes.filter(
    (item) => item.category.toLowerCase() === "top"
  );

  const bottoms = clothes.filter(
    (item) => item.category.toLowerCase() === "bottom"
  );

  const shoes = clothes.filter(
    (item) => item.category.toLowerCase() === "shoes"
  );

  function saveOutfit() {
    if (!selectedTop || !selectedBottom || !selectedShoes) {
      alert("Please select a top, a bottom, and shoes.");
      return;
    }

    if (outfitName.trim() === "") {
      alert("Please give your outfit a name.");
      return;
    }

    const newOutfit = {
      id: Date.now(),
      name: outfitName.trim(),
      top: selectedTop,
      bottom: selectedBottom,
      shoes: selectedShoes,
    };

    const currentOutfits = JSON.parse(
      localStorage.getItem("outfits") || "[]"
    );

    const updatedOutfits = [...currentOutfits, newOutfit];

    localStorage.setItem(
      "outfits",
      JSON.stringify(updatedOutfits)
    );

    setOutfitName("");
    setSelectedTop(null);
    setSelectedBottom(null);
    setSelectedShoes(null);

    alert("Outfit saved! 🎉");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4F4F2] px-4 py-6 text-[#242124] sm:px-6 sm:py-8">

      {/* VERY SUBTLE GLITTER BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[8%] top-[12%] h-1 w-1 rounded-full bg-[#B99BC3] opacity-25 blur-[0.5px]" />

        <div className="absolute left-[22%] top-[34%] h-1 w-1 rounded-full bg-[#A98DB5] opacity-20 blur-[0.5px]" />

        <div className="absolute right-[18%] top-[18%] h-1 w-1 rounded-full bg-[#C3A8CA] opacity-25 blur-[0.5px]" />

        <div className="absolute right-[8%] top-[46%] h-1 w-1 rounded-full bg-[#A98DB5] opacity-20 blur-[0.5px]" />

        <div className="absolute left-[14%] bottom-[24%] h-1 w-1 rounded-full bg-[#B99BC3] opacity-20 blur-[0.5px]" />

        <div className="absolute right-[28%] bottom-[12%] h-1 w-1 rounded-full bg-[#C3A8CA] opacity-20 blur-[0.5px]" />

        <div className="absolute left-[48%] top-[8%] h-1 w-1 rounded-full bg-[#A98DB5] opacity-15 blur-[0.5px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="flex items-center justify-between">

          <a
            href="/"
            className="text-2xl font-black tracking-[-0.05em] sm:text-3xl"
          >
            vestia<span className="text-[#9B6AA8]">.</span>
          </a>

          <a
            href="/looks"
            className="rounded-full bg-[#333034] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            💖 My Looks
          </a>

        </header>

        {/* TITLE */}
        <section className="mt-9 sm:mt-11">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B6AA8]">
            Style studio
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">

            <div>

              <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Build Your Look
              </h1>

              <p className="mt-2 max-w-xl text-sm text-[#777276] sm:text-base">
                Pick your pieces, mix them together, and create your look.
              </p>

            </div>

          </div>

        </section>

        {/* NAVIGATION */}
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">

          <a
            href="/wardrobe"
            className="shrink-0 rounded-full border border-[#D9D8D7] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3538] transition hover:bg-[#EEEEEC]"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="shrink-0 rounded-full bg-[#333034] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            ✨ Build Look
          </a>

          <a
            href="/looks"
            className="shrink-0 rounded-full border border-[#D9D8D7] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3538] transition hover:bg-[#EEEEEC]"
          >
            💖 My Looks
          </a>

          <a
            href="/calendar"
            className="shrink-0 rounded-full border border-[#D9D8D7] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3538] transition hover:bg-[#EEEEEC]"
          >
            📅 Calendar
          </a>

        </nav>

        {/* MAIN BUILDER */}
        <section className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">

          {/* PICK PIECES */}
          <div className="rounded-[1.8rem] border border-[#DEDEDC] bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">

            <div className="flex items-end justify-between gap-3">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9B6AA8]">
                  Create
                </p>

                <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                  Pick your pieces
                </h2>

              </div>

              <span className="hidden rounded-full bg-[#F0EAF2] px-3 py-1.5 text-[10px] font-bold text-[#765B7C] sm:block">
                MIX & MATCH ✨
              </span>

            </div>

            {/* TOP */}
            <PieceSelector
              number="01"
              title="Pick a top"
              selected={selectedTop}
              items={tops}
              emptyText="No tops yet."
              onSelect={setSelectedTop}
            />

            {/* BOTTOM */}
            <PieceSelector
              number="02"
              title="Pick a bottom"
              selected={selectedBottom}
              items={bottoms}
              emptyText="No bottoms yet."
              onSelect={setSelectedBottom}
            />

            {/* SHOES */}
            <PieceSelector
              number="03"
              title="Pick your shoes"
              selected={selectedShoes}
              items={shoes}
              emptyText="No shoes yet."
              onSelect={setSelectedShoes}
            />

          </div>

          {/* YOUR LOOK */}
          <div className="lg:sticky lg:top-6 lg:self-start">

            <section className="overflow-hidden rounded-[1.8rem] border border-[#DEDEDC] bg-white/95 shadow-sm backdrop-blur">

              {/* TITLE */}
              <div className="px-5 pt-5 sm:px-6 sm:pt-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9B6AA8]">
                      Outfit
                    </p>

                    <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                      Your Look
                    </h2>

                  </div>

                  <span className="rounded-full bg-[#F0EAF2] px-3 py-1.5 text-[10px] font-bold text-[#765B7C]">
                    PREVIEW
                  </span>

                </div>

              </div>

              {/* DRESSING ROOM */}
              <div className="mx-4 mt-5 overflow-hidden rounded-[1.4rem] bg-[#F1F1EF] sm:mx-6">

                <div className="flex items-center justify-between px-4 pt-4">

                  <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#858083]">
                    Dressing room
                  </p>

                  <span className="text-[10px] font-semibold text-[#9B6AA8]">
                    {selectedTop &&
                    selectedBottom &&
                    selectedShoes
                      ? "Look complete ✨"
                      : "Keep styling..."}
                  </span>

                </div>

                {/* COMPACT OUTFIT PREVIEW */}
                <div className="flex min-h-[330px] items-center justify-center px-4 py-6">

                  <div className="flex flex-col items-center">

                    {/* TOP */}
                    <PreviewPiece
                      item={selectedTop}
                      placeholder="👚"
                      label="TOP"
                      size="large"
                    />

                    <div className="h-2 w-px bg-[#D4D0D2]" />

                    {/* BOTTOM */}
                    <PreviewPiece
                      item={selectedBottom}
                      placeholder="👖"
                      label="BOTTOM"
                      size="medium"
                    />

                    <div className="h-2 w-px bg-[#D4D0D2]" />

                    {/* SHOES */}
                    <PreviewPiece
                      item={selectedShoes}
                      placeholder="👟"
                      label="SHOES"
                      size="small"
                    />

                  </div>

                </div>

                {/* COMPLETE MESSAGE */}
                {selectedTop &&
                  selectedBottom &&
                  selectedShoes && (
                    <div className="mx-4 mb-4 rounded-xl bg-white px-4 py-3 text-center shadow-sm">

                      <p className="text-xs font-black">
                        Your look is ready ✨
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#81777B]">
                        Give it a name and save it to My Looks.
                      </p>

                    </div>
                  )}

              </div>

              {/* NAME + SAVE */}
              <div className="p-5 sm:p-6">

                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#81777B]">
                  Name your look
                </label>

                <input
                  type="text"
                  placeholder="e.g. College day ✨"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#DCDADB] bg-[#F4F4F2] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-[#A19DA0] focus:border-[#9B6AA8] focus:bg-white focus:ring-2 focus:ring-[#E8DDEA]"
                />

                <button
                  onClick={saveOutfit}
                  className="mt-3 w-full rounded-full bg-[#333034] py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Save Look ✨
                </button>

              </div>

            </section>

          </div>

        </section>

        {/* SAVED LOOKS LINK */}
        <div className="mt-8 text-center">

          <a
            href="/looks"
            className="inline-flex items-center gap-2 rounded-full border border-[#D9D8D7] bg-white px-5 py-3 text-sm font-bold text-[#3A3538] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EEEEEC]"
          >
            View My Saved Looks
            <span className="text-[#9B6AA8]">→</span>
          </a>

        </div>

      </div>
    </main>
  );
}

/* -------------------------------------------------- */
/* PIECE SELECTOR */
/* -------------------------------------------------- */

function PieceSelector({
  number,
  title,
  selected,
  items,
  emptyText,
  onSelect,
}: {
  number: string;
  title: string;
  selected: Clothing | null;
  items: Clothing[];
  emptyText: string;
  onSelect: (item: Clothing) => void;
}) {
  return (
    <div className="mt-7">

      {/* SECTION HEADER */}
      <div className="mb-3 flex items-center gap-2.5">

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0EAF2] text-[10px] font-black text-[#9B6AA8]">
          {number}
        </span>

        <div>

          <h3 className="text-[11px] font-black uppercase tracking-[0.13em]">
            {title}
          </h3>

          {selected && (
            <p className="mt-0.5 max-w-[180px] truncate text-[10px] text-[#81777B]">
              {selected.name}
            </p>
          )}

        </div>

      </div>

      {/* COMPACT HORIZONTAL RAIL */}
      <div className="flex gap-2.5 overflow-x-auto pb-2">

        {items.map((item, index) => (

          <button
            key={index}
            onClick={() => onSelect(item)}
            className={`group relative w-[82px] shrink-0 text-left transition sm:w-[88px] ${
              selected === item
                ? "scale-[1.02]"
                : "hover:-translate-y-0.5"
            }`}
          >

            {/* SMALL ALMOST-SQUARE IMAGE */}
            <div
              className={`relative overflow-hidden rounded-xl bg-[#F1F1EF] transition ${
                selected === item
                  ? "ring-2 ring-[#9B6AA8] ring-offset-1"
                  : "border border-[#DEDEDC]"
              }`}
            >

              <img
                src={item.photo}
                alt={item.name}
                className="aspect-square w-full object-cover"
              />

              {/* SELECTED CHECK */}
              {selected === item && (
                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#9B6AA8] text-[10px] font-bold text-white shadow-sm">
                  ✓
                </div>
              )}

            </div>

            <p className="mt-1.5 truncate px-0.5 text-[10px] font-bold text-[#302C2F]">
              {item.name || "Unnamed"}
            </p>

            {item.color && (
              <p className="mt-0.5 truncate px-0.5 text-[9px] text-[#858083]">
                {item.color}
              </p>
            )}

          </button>

        ))}

        {items.length === 0 && (
          <div className="w-full rounded-xl border border-dashed border-[#C9C2C6] bg-[#F4F4F2] p-5 text-center text-xs text-[#777276]">
            {emptyText}
            <br />
            Add one from your wardrobe.
          </div>
        )}

      </div>

    </div>
  );
}

/* -------------------------------------------------- */
/* PREVIEW PIECE */
/* -------------------------------------------------- */

function PreviewPiece({
  item,
  placeholder,
  label,
  size,
}: {
  item: Clothing | null;
  placeholder: string;
  label: string;
  size: "large" | "medium" | "small";
}) {
  const sizes = {
    large: "h-24 w-24",
    medium: "h-20 w-20",
    small: "h-14 w-14",
  };

  return (
    <div className="relative">

      {item ? (
        <img
          src={item.photo}
          alt={item.name}
          className={`${sizes[size]} rounded-xl object-cover shadow-sm transition duration-200`}
        />
      ) : (
        <div
          className={`flex ${sizes[size]} items-center justify-center rounded-xl border border-dashed border-[#C9C2C6] bg-white text-center text-[9px] text-[#858083]`}
        >
          <span className="text-lg">{placeholder}</span>
        </div>
      )}

      {item && (
        <span className="absolute -right-2 -top-2 rounded-full bg-white px-1.5 py-0.5 text-[7px] font-black tracking-wide text-[#9B6AA8] shadow-sm">
          {label}
        </span>
      )}

    </div>
  );
}