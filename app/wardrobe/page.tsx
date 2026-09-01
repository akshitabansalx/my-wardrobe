
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
            href="/add-clothes"
            className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            ➕ Add Clothes
          </a>
        </header>

        {/* Page heading */}
        <div className="mt-10">
          <div className="inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            👗 Your collection
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            My Wardrobe
          </h1>

          <p className="mt-2 text-gray-500">
            All your favorite pieces, in one place.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/wardrobe"
            className="rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-900 shadow-sm transition hover:bg-purple-50"
          >
            ✨ Outfit Builder
          </a>

          <a
            href="/calendar"
            className="rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-900 shadow-sm transition hover:bg-purple-50"
          >
            📅 Calendar
          </a>
        </div>

        {/* Empty wardrobe */}
        {clothes.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-purple-100 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">👗</div>

            <h2 className="mt-5 text-2xl font-bold text-purple-900">
              Your wardrobe is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Add your first clothing item and start building your digital
              wardrobe.
            </p>

            <a
              href="/add-clothes"
              className="mt-6 inline-block rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700"
            >
              Add Your First Item
            </a>
          </div>
        ) : (
          <>
            {/* Clothing count */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-purple-700">
                {clothes.length}{" "}
                {clothes.length === 1 ? "item" : "items"} in your wardrobe
              </p>
            </div>

            {/* Clothing cards */}
            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">

              {clothes.map((item, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="bg-purple-50">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-56 w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="truncate font-bold text-purple-950">
                      {item.name || "Unnamed item"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.category && (
                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                          {item.category}
                        </span>
                      )}

                      {item.color && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {item.color}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteClothing(index)}
                      className="mt-4 w-full rounded-2xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </main>
  );
}
