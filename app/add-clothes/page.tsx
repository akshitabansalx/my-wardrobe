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
    <main className="min-h-screen bg-[#F7F3F0] px-4 py-6 text-[#241F20] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            vestia<span className="text-[#9B6AA8]">.</span>
          </a>

          <a
            href="/wardrobe"
            className="rounded-full bg-[#3A3035] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            My Wardrobe
          </a>
        </header>

        {/* PAGE INTRO */}
        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#E3DADD] bg-white p-6 shadow-sm sm:p-8">

          {/* soft decoration */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#DCC8E3] opacity-50 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2D4E5] bg-[#F5EDF7] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8D609A]">
              👗 New wardrobe piece
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Add to your wardrobe
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#756C70] sm:text-base">
              Add a piece to your digital closet and start creating looks
              around it.
            </p>

          </div>
        </section>

        {/* FORM */}
        <section className="mt-5 rounded-[2rem] border border-[#E3DADD] bg-white p-6 shadow-sm sm:p-8">

          {/* NAME */}
          <div>
            <label className="text-sm font-bold text-[#3A3035]">
              Clothing name
            </label>

            <p className="mt-1 text-xs text-[#81777B]">
              Give your piece a name you'll recognize.
            </p>

            <input
              type="text"
              placeholder="e.g. Black T-shirt"
              value={clothingName}
              onChange={(e) => setClothingName(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#DED5D8] bg-[#FBF9F8] p-3.5 text-sm text-[#241F20] outline-none transition placeholder:text-[#A69B9F] focus:border-[#9B6AA8] focus:bg-white focus:ring-2 focus:ring-[#E8DDED]"
            />
          </div>

          {/* CATEGORY + COLOR */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-bold text-[#3A3035]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-[#DED5D8] bg-[#FBF9F8] p-3.5 text-sm text-[#3A3035] outline-none transition focus:border-[#9B6AA8] focus:bg-white focus:ring-2 focus:ring-[#E8DDED]"
              >
                <option value="">Select category</option>
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
                <option value="Dress">Dress</option>
                <option value="Shoes">Shoes</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-[#3A3035]">
                Color
              </label>

              <input
                type="text"
                placeholder="e.g. Blue"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-[#DED5D8] bg-[#FBF9F8] p-3.5 text-sm text-[#241F20] outline-none transition placeholder:text-[#A69B9F] focus:border-[#9B6AA8] focus:bg-white focus:ring-2 focus:ring-[#E8DDED]"
              />
            </div>

          </div>

          {/* PHOTO */}
          <div className="mt-6">

            <label className="text-sm font-bold text-[#3A3035]">
              Clothing photo
            </label>

            <p className="mt-1 text-xs text-[#81777B]">
              Choose a clear photo of your clothing piece.
            </p>

            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#CDBFC5] bg-[#FBF9F8] px-5 py-8 text-center transition hover:border-[#9B6AA8] hover:bg-[#F8F2F9]">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1EAED] text-2xl">
                📸
              </div>

              <p className="mt-3 text-sm font-bold text-[#3A3035]">
                Choose a photo
              </p>

              <p className="mt-1 text-xs text-[#81777B]">
                JPG, PNG or other image formats
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
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

            </label>
          </div>

          {/* PREVIEW */}
          {photo && (
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#E3DADD] bg-[#F7F3F0] p-4">

              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9B6AA8]">
                  Preview
                </p>

                <span className="text-xs font-semibold text-[#81777B]">
                  Looks good ✨
                </span>
              </div>

              <div className="flex justify-center rounded-[1.25rem] bg-white p-3">
                <img
                  src={photo}
                  alt="Selected clothing"
                  className="max-h-80 w-full rounded-xl object-contain"
                />
              </div>

            </div>
          )}

          {/* SAVE */}
          <button
            onClick={handleSave}
            className="mt-7 w-full rounded-full bg-[#3A3035] py-4 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Save Clothing Item ✨
          </button>

          {/* VIEW WARDROBE */}
          <a
            href="/wardrobe"
            className="mt-3 block w-full rounded-full border border-[#DED5D8] bg-white py-4 text-center text-sm font-bold text-[#3A3035] transition hover:bg-[#F7F3F0]"
          >
            View My Wardrobe 👗
          </a>

        </section>

        {/* BOTTOM TIP */}
        <div className="mt-5 rounded-[1.5rem] border border-[#E3DADD] bg-white/70 px-5 py-4 text-center">
          <p className="text-xs font-semibold text-[#81777B]">
            💡 Tip: Clear clothing photos make your digital closet look even better.
          </p>
        </div>

      </div>
    </main>
  );
}