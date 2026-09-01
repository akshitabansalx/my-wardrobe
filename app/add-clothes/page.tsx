
"use client";

import { useState } from "react";

export default function AddClothes() {
  const [photo, setPhoto] = useState<string>("");
  const [clothingName, setClothingName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSave = () => {
    if (!photo) {
      alert("Please select a clothing photo first.");
      return;
    }

    const existingClothes = JSON.parse(
      localStorage.getItem("clothes") || "[]"
    );

    const newClothing = {
      photo: photo,
      name: clothingName,
      category: category,
      color: color,
    };

    existingClothes.push(newClothing);

    localStorage.setItem("clothes", JSON.stringify(existingClothes));

    alert("Clothing item saved!");
  };

  return (
    <main className="min-h-screen bg-[#F8F5FC] px-6 py-10 text-purple-950">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
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
            My Wardrobe
          </a>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8">
            <div className="mb-3 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              👗 New item
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-purple-950">
              Add to your wardrobe
            </h1>

            <p className="mt-2 text-gray-500">
              Add a clothing item and start building your digital closet.
            </p>
          </div>

          {/* Clothing Name */}
          <label className="block text-sm font-semibold text-purple-950">
            Clothing name
          </label>

          <input
            type="text"
            placeholder="e.g. Black T-shirt"
            value={clothingName}
            onChange={(e) => setClothingName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />

          {/* Category */}
          <label className="mt-5 block text-sm font-semibold text-purple-950">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          >
            <option value="">Select category</option>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Dress">Dress</option>
            <option value="Shoes">Shoes</option>
            <option value="Other">Other</option>
          </select>

          {/* Color */}
          <label className="mt-5 block text-sm font-semibold text-purple-950">
            Color
          </label>

          <input
            type="text"
            placeholder="e.g. Blue"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />

          {/* Photo */}
          <label className="mt-5 block text-sm font-semibold text-purple-950">
            Clothing photo
          </label>

          <input
            type="file"
            accept="image/*"
            className="mt-2 w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                const reader = new FileReader();

                reader.onloadend = () => {
                  setPhoto(reader.result as string);
                };

                reader.readAsDataURL(file);
              }
            }}
          />

          {/* Preview */}
          {photo && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-purple-100 bg-purple-50 p-3">
              <p className="mb-3 text-sm font-semibold text-purple-800">
                Preview
              </p>

              <img
                src={photo}
                alt="Selected clothing"
                className="max-h-80 w-full rounded-2xl object-contain"
              />
            </div>
          )}

          {/* Save */}
          <button
            onClick={handleSave}
            className="mt-7 w-full rounded-full bg-purple-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-purple-700"
          >
            Save Clothing Item
          </button>

          {/* Wardrobe */}
          <a
            href="/wardrobe"
            className="mt-3 block w-full rounded-full border border-purple-200 bg-white py-3.5 text-center font-semibold text-purple-800 transition hover:bg-purple-50"
          >
            View My Wardrobe 👗
          </a>
        </div>

      </div>
    </main>
  );
}
