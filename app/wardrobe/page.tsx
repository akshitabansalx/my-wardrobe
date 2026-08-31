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
  }

  return (
    <main className="min-h-screen bg-[#F8F5FC] p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-extrabold text-purple-950">
          My Wardrobe 👗
        </h1>

        <p className="mt-2 text-gray-500">
          All your clothes in one place.
        </p>

        {clothes.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-900">
              Your wardrobe is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some clothes to start building your wardrobe.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">

            {clothes.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-purple-100"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-purple-950">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.color}
                  </p>

                  <button
                    onClick={() => deleteClothing(index)}
                    className="mt-3 w-full rounded-xl border border-red-200 p-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}