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
            href="/looks"
            className="rounded-full bg-[#3A3035] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
          >
            💖 My Looks
          </a>
        </header>

        {/* TITLE */}
        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B6AA8]">
            Style studio
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Build Your Look
          </h1>

          <p className="mt-2 max-w-xl text-sm text-[#756C70] sm:text-base">
            Pick your pieces, mix them together, and create a look
            that's completely yours.
          </p>
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
            className="shrink-0 rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-semibold text-white"
          >
            ✨ Build Look
          </a>

          <a
            href="/looks"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
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

        {/* BUILDER */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

          {/* PICK PIECES */}
          <div className="rounded-[2rem] border border-[#E5DDE0] bg-white p-5 shadow-sm sm:p-7">

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B6AA8]">
                  Create
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  Pick your pieces
                </h2>
              </div>

              <span className="hidden rounded-full bg-[#F1EAED] px-3 py-1.5 text-xs font-semibold text-[#6E5969] sm:block">
                Mix & match ✨
              </span>
            </div>

            {/* TOP */}
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1EAED] text-xs font-black text-[#9B6AA8]">
                  01
                </span>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.12em]">
                    Pick a top
                  </h3>

                  {selectedTop && (
                    <p className="text-xs text-[#81777B]">
                      {selectedTop.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {tops.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTop(item)}
                    className={`group relative w-[115px] shrink-0 text-left transition ${
                      selectedTop === item
                        ? "scale-[1.02]"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-[#F7F3F0] p-1 transition ${
                        selectedTop === item
                          ? "ring-2 ring-[#9B6AA8] ring-offset-2"
                          : "border border-[#E5DDE0]"
                      }`}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
                      />

                      {selectedTop === item && (
                        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#9B6AA8] text-sm text-white shadow-sm">
                          ✓
                        </div>
                      )}
                    </div>

                    <p className="mt-2 truncate px-1 text-xs font-bold">
                      {item.name || "Unnamed item"}
                    </p>

                    {item.color && (
                      <p className="mt-0.5 truncate px-1 text-[10px] text-[#81777B]">
                        {item.color}
                      </p>
                    )}
                  </button>
                ))}

                {tops.length === 0 && (
                  <div className="w-full rounded-2xl border border-dashed border-[#CDBFC5] bg-[#F7F3F0] p-6 text-center text-sm text-[#756C70]">
                    No tops yet.
                    <br />
                    Add one from your wardrobe.
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1EAED] text-xs font-black text-[#9B6AA8]">
                  02
                </span>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.12em]">
                    Pick a bottom
                  </h3>

                  {selectedBottom && (
                    <p className="text-xs text-[#81777B]">
                      {selectedBottom.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {bottoms.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBottom(item)}
                    className={`group relative w-[115px] shrink-0 text-left transition ${
                      selectedBottom === item
                        ? "scale-[1.02]"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-[#F7F3F0] p-1 transition ${
                        selectedBottom === item
                          ? "ring-2 ring-[#9B6AA8] ring-offset-2"
                          : "border border-[#E5DDE0]"
                      }`}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
                      />

                      {selectedBottom === item && (
                        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#9B6AA8] text-sm text-white shadow-sm">
                          ✓
                        </div>
                      )}
                    </div>

                    <p className="mt-2 truncate px-1 text-xs font-bold">
                      {item.name || "Unnamed item"}
                    </p>

                    {item.color && (
                      <p className="mt-0.5 truncate px-1 text-[10px] text-[#81777B]">
                        {item.color}
                      </p>
                    )}
                  </button>
                ))}

                {bottoms.length === 0 && (
                  <div className="w-full rounded-2xl border border-dashed border-[#CDBFC5] bg-[#F7F3F0] p-6 text-center text-sm text-[#756C70]">
                    No bottoms yet.
                    <br />
                    Add one from your wardrobe.
                  </div>
                )}
              </div>
            </div>

            {/* SHOES */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1EAED] text-xs font-black text-[#9B6AA8]">
                  03
                </span>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.12em]">
                    Pick your shoes
                  </h3>

                  {selectedShoes && (
                    <p className="text-xs text-[#81777B]">
                      {selectedShoes.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {shoes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedShoes(item)}
                    className={`group relative w-[115px] shrink-0 text-left transition ${
                      selectedShoes === item
                        ? "scale-[1.02]"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-[#F7F3F0] p-1 transition ${
                        selectedShoes === item
                          ? "ring-2 ring-[#9B6AA8] ring-offset-2"
                          : "border border-[#E5DDE0]"
                      }`}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="aspect-[4/5] w-full rounded-[0.85rem] object-cover"
                      />

                      {selectedShoes === item && (
                        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#9B6AA8] text-sm text-white shadow-sm">
                          ✓
                        </div>
                      )}
                    </div>

                    <p className="mt-2 truncate px-1 text-xs font-bold">
                      {item.name || "Unnamed item"}
                    </p>

                    {item.color && (
                      <p className="mt-0.5 truncate px-1 text-[10px] text-[#81777B]">
                        {item.color}
                      </p>
                    )}
                  </button>
                ))}

                {shoes.length === 0 && (
                  <div className="w-full rounded-2xl border border-dashed border-[#CDBFC5] bg-[#F7F3F0] p-6 text-center text-sm text-[#756C70]">
                    No shoes yet.
                    <br />
                    Add some from your wardrobe.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* YOUR LOOK */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <section className="overflow-hidden rounded-[2rem] border border-[#E5DDE0] bg-white shadow-sm">

              <div className="px-5 pt-6 sm:px-7 sm:pt-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B6AA8]">
                      Outfit
                    </p>

                    <h2 className="mt-1 text-2xl font-black tracking-tight">
                      Your Look
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#F1EAED] px-3 py-1.5 text-xs font-semibold text-[#6E5969]">
                    Preview
                  </span>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="mx-5 mt-5 flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-[#F7F3F0] p-5 sm:mx-7 sm:mt-6">

                {selectedTop ? (
                  <img
                    src={selectedTop.photo}
                    alt={selectedTop.name}
                    className="h-28 w-28 rounded-2xl object-cover shadow-sm transition duration-300"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-[#CDBFC5] bg-white text-center text-xs text-[#81777B]">
                    👚
                    <br />
                    Pick a top
                  </div>
                )}

                {selectedBottom ? (
                  <img
                    src={selectedBottom.photo}
                    alt={selectedBottom.name}
                    className="h-28 w-28 rounded-2xl object-cover shadow-sm transition duration-300"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-[#CDBFC5] bg-white text-center text-xs text-[#81777B]">
                    👖
                    <br />
                    Pick a bottom
                  </div>
                )}

                {selectedShoes ? (
                  <img
                    src={selectedShoes.photo}
                    alt={selectedShoes.name}
                    className="h-20 w-20 rounded-2xl object-cover shadow-sm transition duration-300"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-[#CDBFC5] bg-white text-center text-xs text-[#81777B]">
                    👟
                    <br />
                    Shoes
                  </div>
                )}

              </div>

              {/* NAME + SAVE */}
              <div className="p-5 sm:p-7">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#81777B]">
                  Name your look
                </label>

                <input
                  type="text"
                  placeholder="e.g. College day ✨"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#DED5D8] bg-[#F7F3F0] px-4 py-3.5 text-sm font-medium outline-none transition placeholder:text-[#A1989C] focus:border-[#9B6AA8] focus:bg-white focus:ring-2 focus:ring-[#E8DDEA]"
                />

                <button
                  onClick={saveOutfit}
                  className="mt-3 w-full rounded-full bg-[#3A3035] py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Save Look ✨
                </button>
              </div>

            </section>
          </div>

        </section>

        {/* LINK TO SAVED LOOKS */}
        <div className="mt-8 text-center">
          <a
            href="/looks"
            className="inline-flex items-center gap-2 rounded-full border border-[#DED5D8] bg-white px-5 py-3 text-sm font-bold text-[#3A3035] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F1EAED]"
          >
            View My Saved Looks
            <span className="text-[#9B6AA8]">→</span>
          </a>
        </div>

      </div>
    </main>
  );
}