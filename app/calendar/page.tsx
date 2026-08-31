"use client";

import { useEffect, useState } from "react";

type Outfit = {
  name: string;
  top: {
    photo: string;
    name: string;
  } | null;
  bottom: {
    photo: string;
    name: string;
  } | null;
  shoes: {
    photo: string;
    name: string;
  } | null;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [savedDates, setSavedDates] = useState<Record<number, string>>({});

  useEffect(() => {
    const savedOutfits = localStorage.getItem("outfits");
    const savedCalendar = localStorage.getItem("calendarOutfits");

    if (savedOutfits) {
      setOutfits(JSON.parse(savedOutfits));
    }

    if (savedCalendar) {
      setSavedDates(JSON.parse(savedCalendar));
    }
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const saveOutfitToDate = () => {
    if (!selectedDate || !selectedOutfit) return;

    const updatedDates = {
      ...savedDates,
      [selectedDate]: selectedOutfit.name,
    };

    setSavedDates(updatedDates);
    localStorage.setItem("calendarOutfits", JSON.stringify(updatedDates));

    alert("Outfit added to your calendar! ✨");
  };

  return (
    <main className="min-h-screen bg-purple-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-900">
          Outfit Calendar 📅
        </h1>

        <p className="mt-2 text-gray-600">
          Plan what you want to wear each day.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-purple-800">
            September 2026
          </h2>

          <div className="grid grid-cols-7 gap-3">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDate(day);

                  const outfitName = savedDates[day];

                  if (outfitName) {
                    const existingOutfit = outfits.find(
                      (outfit) => outfit.name === outfitName
                    );

                    setSelectedOutfit(existingOutfit || null);
                  } else {
                    setSelectedOutfit(null);
                  }
                }}
                className={`rounded-xl border p-4 text-center transition ${
                  selectedDate === day
                    ? "border-purple-600 bg-purple-200"
                    : "border-gray-200 bg-gray-50 hover:bg-purple-100"
                }`}
              >
                <span className="font-semibold">{day}</span>

                {savedDates[day] && (
                  <span className="mt-1 block text-xs text-purple-600">
                    👗 Outfit
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-purple-800">
              September {selectedDate}, 2026
            </h2>

            <p className="mt-2 text-gray-600">
              Choose an outfit for this day:
            </p>

            <div className="mt-4 space-y-3">
              {outfits.map((outfit, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOutfit(outfit)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    selectedOutfit?.name === outfit.name
                      ? "border-purple-600 bg-purple-100"
                      : "border-gray-200 hover:bg-purple-50"
                  }`}
                >
                  <p className="font-semibold text-purple-900">
                    {outfit.name}
                  </p>
                </button>
              ))}
            </div>

            {outfits.length === 0 && (
              <p className="mt-4 text-gray-500">
                No saved outfits yet.
              </p>
            )}

            {selectedOutfit && (
              <div className="mt-6 rounded-xl bg-purple-50 p-4">
                <p className="font-semibold text-purple-900">
                  Selected: {selectedOutfit.name} ✨
                </p>

                <div className="mt-4 flex gap-4">
                  {selectedOutfit.top && (
                    <img
                      src={selectedOutfit.top.photo}
                      alt={selectedOutfit.top.name}
                      className="h-24 w-20 rounded-lg object-cover"
                    />
                  )}

                  {selectedOutfit.bottom && (
                    <img
                      src={selectedOutfit.bottom.photo}
                      alt={selectedOutfit.bottom.name}
                      className="h-24 w-20 rounded-lg object-cover"
                    />
                  )}

                  {selectedOutfit.shoes && (
                    <img
                      src={selectedOutfit.shoes.photo}
                      alt={selectedOutfit.shoes.name}
                      className="h-24 w-20 rounded-lg object-cover"
                    />
                  )}
                </div>

                <button
                  onClick={saveOutfitToDate}
                  className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
                >
                  Add Outfit to Calendar 📅
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}