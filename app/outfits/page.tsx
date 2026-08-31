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
    <main className="min-h-screen bg-purple-50 p-8">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-purple-800">
          Outfit Builder 👗
        </h1>

        <p className="mt-2 text-gray-600">
          Create an outfit from your wardrobe.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Choose Clothes */}
          <section className="rounded-2xl bg-white p-6 shadow">

            <h2 className="text-xl font-semibold text-purple-700">
              Choose Clothes
            </h2>

            {/* Tops */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold">
                👚 Tops
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {tops.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTop(item)}
                    className="rounded-xl border p-2 hover:bg-purple-50"
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-lg object-cover"
                    />

                    <p className="mt-2 text-sm font-medium">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>

              {tops.length === 0 && (
                <p className="text-sm text-gray-500">
                  No tops saved yet.
                </p>
              )}
            </div>

            {/* Bottoms */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold">
                👖 Bottoms
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {bottoms.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBottom(item)}
                    className="rounded-xl border p-2 hover:bg-purple-50"
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-lg object-cover"
                    />

                    <p className="mt-2 text-sm font-medium">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>

              {bottoms.length === 0 && (
                <p className="text-sm text-gray-500">
                  No bottoms saved yet.
                </p>
              )}
            </div>

            {/* Shoes */}
            <div className="mt-6">
              <h3 className="mb-3 font-semibold">
                👟 Shoes
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {shoes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedShoes(item)}
                    className="rounded-xl border p-2 hover:bg-purple-50"
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-32 w-full rounded-lg object-cover"
                    />

                    <p className="mt-2 text-sm font-medium">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>

              {shoes.length === 0 && (
                <p className="text-sm text-gray-500">
                  No shoes saved yet.
                </p>
              )}
            </div>

          </section>

          {/* Outfit Preview */}
          <section className="rounded-2xl bg-white p-6 shadow">

            <h2 className="text-xl font-semibold text-purple-700">
              Outfit Preview
            </h2>

            <div className="mt-6 flex min-h-72 flex-col items-center justify-center gap-3 rounded-xl bg-purple-50 p-4">

              {selectedTop ? (
                <img
                  src={selectedTop.photo}
                  alt={selectedTop.name}
                  className="h-32 w-32 rounded-xl object-cover"
                />
              ) : (
                <p className="text-gray-500">
                  👚 Select a top
                </p>
              )}

              {selectedBottom ? (
                <img
                  src={selectedBottom.photo}
                  alt={selectedBottom.name}
                  className="h-32 w-32 rounded-xl object-cover"
                />
              ) : (
                <p className="text-gray-500">
                  👖 Select a bottom
                </p>
              )}

              {selectedShoes ? (
                <img
                  src={selectedShoes.photo}
                  alt={selectedShoes.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
              ) : (
                <p className="text-gray-500">
                  👟 Select shoes
                </p>
              )}

            </div>

            <input
              type="text"
              placeholder="Give your outfit a name"
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              className="mt-5 w-full rounded-xl border p-3 outline-none focus:border-purple-500"
            />

            <button
              onClick={saveOutfit}
              className="mt-4 w-full rounded-xl bg-purple-600 p-3 font-semibold text-white hover:bg-purple-700"
            >
              Save Outfit
            </button>

          </section>

        </div>

        {/* Saved Outfits */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

          <h2 className="text-2xl font-semibold text-purple-700">
            Saved Outfits ✨
          </h2>

          {savedOutfits.length === 0 ? (
            <p className="mt-4 text-gray-500">
              No saved outfits yet.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {savedOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="rounded-xl border p-4"
                >

                  <h3 className="text-lg font-semibold text-purple-800">
                    {outfit.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-center gap-3">

                    <img
                      src={outfit.top.photo}
                      alt={outfit.top.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />

                    <img
                      src={outfit.bottom.photo}
                      alt={outfit.bottom.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />

                    <img
                      src={outfit.shoes.photo}
                      alt={outfit.shoes.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                  </div>

                  <button
                    onClick={() => deleteOutfit(outfit.id)}
                    className="mt-4 w-full rounded-xl border border-red-300 p-2 font-semibold text-red-600 hover:bg-red-50"
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