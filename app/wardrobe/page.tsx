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
  const [selectedBottom, setSelectedBottom] = useState<Clothing | null>(null);
  const [selectedShoes, setSelectedShoes] = useState<Clothing | null>(null);

  useEffect(() => {
    const savedClothes = JSON.parse(
      localStorage.getItem("clothes") || "[]"
    );

    setClothes(savedClothes);
  }, []);

  const tops = clothes.filter((item) => item.category === "Top");
  const bottoms = clothes.filter((item) => item.category === "Bottom");
  const shoes = clothes.filter((item) => item.category === "Shoes");

  return (
    <main className="min-h-screen bg-[#F8F5FC] p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-extrabold text-purple-950">
          Outfit Builder 👗
        </h1>

        <p className="text-gray-500 mt-2">
          Mix and match clothes from your wardrobe.
        </p>

        {/* TOPS */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-purple-900">
            Select Top 👚
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {tops.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedTop(item)}
                className="bg-white rounded-2xl p-3 shadow-sm border border-purple-100 hover:shadow-lg transition"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <p className="font-semibold mt-2 text-purple-950">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* BOTTOMS */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-purple-900">
            Select Bottom 👖
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {bottoms.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedBottom(item)}
                className="bg-white rounded-2xl p-3 shadow-sm border border-purple-100 hover:shadow-lg transition"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <p className="font-semibold mt-2 text-purple-950">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* SHOES */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-purple-900">
            Select Shoes 👟
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {shoes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedShoes(item)}
                className="bg-white rounded-2xl p-3 shadow-sm border border-purple-100 hover:shadow-lg transition"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <p className="font-semibold mt-2 text-purple-950">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* PREVIEW */}
        <section className="mt-10 bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900">
            Outfit Preview ✨
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-6">

            {selectedTop ? (
              <img
                src={selectedTop.photo}
                alt={selectedTop.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
            ) : (
              <div className="h-64 bg-purple-50 rounded-2xl flex items-center justify-center text-gray-400">
                Top
              </div>
            )}

            {selectedBottom ? (
              <img
                src={selectedBottom.photo}
                alt={selectedBottom.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
            ) : (
              <div className="h-64 bg-purple-50 rounded-2xl flex items-center justify-center text-gray-400">
                Bottom
              </div>
            )}

            {selectedShoes ? (
              <img
                src={selectedShoes.photo}
                alt={selectedShoes.name}
                className="w-full h-64 object-cover rounded-2xl"
              />
            ) : (
              <div className="h-64 bg-purple-50 rounded-2xl flex items-center justify-center text-gray-400">
                Shoes
              </div>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}