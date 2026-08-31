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
    <main className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold text-purple-900">
          Add Clothes
        </h1>
        <input
  type="text"
  placeholder="Clothing name (e.g. Black T-shirt)"
  value={clothingName}
  onChange={(e) => setClothingName(e.target.value)}
  className="w-full border rounded-lg p-3 mt-4"
/>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border rounded-lg p-3 mt-4"
>
  <option value="">Select category</option>
  <option value="Top">Top</option>
  <option value="Bottom">Bottom</option>
  <option value="Dress">Dress</option>
  <option value="Shoes">Shoes</option>
  <option value="Other">Other</option>
</select>

<input
  type="text"
  placeholder="Color (e.g. Blue)"
  value={color}
  onChange={(e) => setColor(e.target.value)}
  className="w-full border rounded-lg p-3 mt-4"
/>

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-3 mt-4"
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

        {photo && (
          <img
            src={photo}
            alt="Selected clothing"
            className="w-full mt-4 rounded-lg"
          />
        )}

        <button
          onClick={handleSave}
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Save Clothing Item
        </button>
      </div>
    </main>
  );
}