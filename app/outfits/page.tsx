
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

export default function OutfitsPage() {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

  const [selectedTop, setSelectedTop] = useState<Clothing | null>(null);
  const [selectedBottom, setSelectedBottom] =
    useState<Clothing | null>(null);
  const [selectedShoes, setSelectedShoes] =
    useState<Clothing | null>(null);

  const [outfitName, setOutfitName] = useState("");

  useEffect(() => {
    const clothesData = localStorage.getItem("clothes");
    const outfitsData = localStorage.getItem("outfits");

    if (clothesData) {
      setClothes(JSON.parse(clothesData));
    }

    if (outfitsData) {
      setSavedOutfits(JSON.parse(outfitsData));
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
      alert("Please select a top, bottom, and shoes.");
      return;
    }

    if (outfitName.trim() === "") {
      alert("Please give your outfit a name.");
      return;
    }

    const newOutfit: Outfit = {
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

    setSavedOutfits(updatedOutfits);

    setOutfitName("");
    setSelectedTop(null);
    setSelectedBottom(null);
    setSelectedShoes(null);

    alert("Outfit saved! 🎉");
  }

  function deleteOutfit(id: number) {
    const updatedOutfits = savedOutfits.filter(
      (outfit) => outfit.id !== id
    );

    localStorage.setItem(
      "outfits",
      JSON.stringify(updatedOutfits)
    );

    setSavedOutfits(updatedOutfits);
  }

  return (
    <main className="min-h-screen bg-[#F8F5FC] px-6 py-8 text-purple-950">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            vestia<span className="text-purple-500">.</span>
          </a>

          <a
            href="/wardrobe"
            className="rounded-full border border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50"
          >
            👗 My Wardrobe
          </a>
        </header>

        {/* Heading */}
        <div className="mt-10">
          <div className="inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            ✨ Style studio
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Outfit Builder
          </h1>

          <p className="mt-2 text-gray-500">
            Mix and match your wardrobe to create your perfect outfit.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/wardrobe"
            className="rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm"
          >
            ✨ Outfit Builder
          </a>

          <a
            href="/calendar"
            className="rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50"
          >
            📅 Calendar
          </a>
        </div>

        {/* Builder */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Choose Clothes */}
          <section className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold text-purple-950">
              Choose your pieces
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select one item from each category.
            </p>

            {/* Tops */}
            <div className="mt-7">
              <h3 className="mb-3 font-bold text-purple-900">
                👚 Tops
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {tops.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTop(item)}
                    className={`overflow-hidden rounded-2xl border-2 bg-white p-2 text-left transition hover:-translate-y-1 hover:shadow-md ${
                      selectedTop === item
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100"
                    }`}
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-xl object-cover"
                    />

                    <p className="mt-2 truncate text-sm font-semibold text-purple-950">
                      {item.name || "Unnamed item"}
                    </p>

                    {selectedTop === item && (
                      <p className="mt-1 text-xs font-semibold text-purple-600">
                        ✓ Selected
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {tops.length === 0 && (
                <div className="rounded-2xl bg-purple-50 p-4 text-sm text-gray-500">
                  No tops saved yet. Add a top to your wardrobe first.
                </div>
              )}
            </div>

            {/* Bottoms */}
            <div className="mt-7">
              <h3 className="mb-3 font-bold text-purple-900">
                👖 Bottoms
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {bottoms.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBottom(item)}
                    className={`overflow-hidden rounded-2xl border-2 bg-white p-2 text-left transition hover:-translate-y-1 hover:shadow-md ${
                      selectedBottom === item
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100"
                    }`}
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-xl object-cover"
                    />

                    <p className="mt-2 truncate text-sm font-semibold text-purple-950">
                      {item.name || "Unnamed item"}
                    </p>

                    {selectedBottom === item && (
                      <p className="mt-1 text-xs font-semibold text-purple-600">
                        ✓ Selected
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {bottoms.length === 0 && (
                <div className="rounded-2xl bg-purple-50 p-4 text-sm text-gray-500">
                  No bottoms saved yet. Add a bottom to your wardrobe first.
                </div>
              )}
            </div>

            {/* Shoes */}
            <div className="mt-7">
              <h3 className="mb-3 font-bold text-purple-900">
                👟 Shoes
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {shoes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedShoes(item)}
                    className={`overflow-hidden rounded-2xl border-2 bg-white p-2 text-left transition hover:-translate-y-1 hover:shadow-md ${
                      selectedShoes === item
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100"
                    }`}
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-xl object-cover"
                    />

                    <p className="mt-2 truncate text-sm font-semibold text-purple-950">
                      {item.name || "Unnamed item"}
                    </p>

                    {selectedShoes === item && (
                      <p className="mt-1 text-xs font-semibold text-purple-600">
                        ✓ Selected
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {shoes.length === 0 && (
                <div className="rounded-2xl bg-purple-50 p-4 text-sm text-gray-500">
                  No shoes saved yet. Add shoes to your wardrobe first.
                </div>
              )}
            </div>

          </section>

          {/* Preview */}
          <section className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-purple-950">
                  Outfit Preview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  See your look come together.
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Preview
              </span>
            </div>

            <div className="mt-6 flex min-h-[430px] flex-col items-center justify-center gap-3 rounded-3xl border border-purple-100 bg-[#F8F5FC] p-5">

              {selectedTop ? (
                <img
                  src={selectedTop.photo}
                  alt={selectedTop.name}
                  className="h-32 w-32 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-white text-center text-xs text-gray-400">
                  👚
                  <br />
                  Select top
                </div>
              )}

              {selectedBottom ? (
                <img
                  src={selectedBottom.photo}
                  alt={selectedBottom.name}
                  className="h-32 w-32 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-white text-center text-xs text-gray-400">
                  👖
                  <br />
                  Select bottom
                </div>
              )}

              {selectedShoes ? (
                <img
                  src={selectedShoes.photo}
                  alt={selectedShoes.name}
                  className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-white text-center text-xs text-gray-400">
                  👟
                  <br />
                  Shoes
                </div>
              )}

            </div>

            {/* Outfit name */}
            <label className="mt-6 block text-sm font-semibold text-purple-950">
              Outfit name
            </label>

            <input
              type="text"
              placeholder="e.g. Casual Friday"
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />

            <button
              onClick={saveOutfit}
              className="mt-4 w-full rounded-full bg-purple-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-purple-700"
            >
              Save Outfit ✨
            </button>

          </section>

        </div>

        {/* Saved Outfits */}
        <section className="mt-8 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

          <div>
            <h2 className="text-2xl font-bold text-purple-950">
              Saved Outfits ✨
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your favorite looks, ready to revisit.
            </p>
          </div>

          {savedOutfits.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-purple-50 p-8 text-center">
              <div className="text-4xl">✨</div>

              <p className="mt-3 font-semibold text-purple-900">
                No saved outfits yet
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Create your first outfit above.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {savedOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="rounded-3xl border border-purple-100 bg-[#F8F5FC] p-5"
                >

                  <h3 className="text-lg font-bold text-purple-950">
                    {outfit.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-center gap-3">

                    <img
                      src={outfit.top.photo}
                      alt={outfit.top.name}
                      className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                    />

                    <img
                      src={outfit.bottom.photo}
                      alt={outfit.bottom.name}
                      className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                    />

                    <img
                      src={outfit.shoes.photo}
                      alt={outfit.shoes.name}
                      className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                    />

                  </div>

                  <button
                    onClick={() => deleteOutfit(outfit.id)}
                    className="mt-5 w-full rounded-2xl border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete Outfit 🗑️
                  </button>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
