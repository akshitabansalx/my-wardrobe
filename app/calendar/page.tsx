
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
            className="rounded-full border border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm transition hover:bg-purple-50"
          >
            👗 My Wardrobe
          </a>
        </header>

        {/* Heading */}
        <div className="mt-10">
          <div className="inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            📅 Style planner
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Outfit Calendar
          </h1>

          <p className="mt-2 text-gray-500">
            Plan your outfits ahead of time and never wonder what to wear.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/wardrobe"
            className="rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-semibold text-purple-900 shadow-sm transition hover:bg-purple-50"
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
            className="rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm"
          >
            📅 Calendar
          </a>
        </div>

        {/* Calendar */}
        <section className="mt-8 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-950">
                September 2026
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tap a date to plan your outfit.
              </p>
            </div>

            <div className="hidden rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 sm:block">
              ✨ Plan your style
            </div>
          </div>

          <div className="mt-7 grid grid-cols-7 gap-2 sm:gap-3">

            {/* Weekday labels */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div
                  key={day}
                  className="pb-2 text-center text-xs font-bold text-purple-400 sm:text-sm"
                >
                  {day}
                </div>
              )
            )}

            {/* Empty spaces before September 1 */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

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
                className={`min-h-20 rounded-2xl border p-2 text-center transition sm:min-h-24 sm:p-3 ${
                  selectedDate === day
                    ? "border-purple-600 bg-purple-100 shadow-sm"
                    : savedDates[day]
                    ? "border-purple-200 bg-purple-50 hover:bg-purple-100"
                    : "border-purple-100 bg-white hover:bg-purple-50"
                }`}
              >
                <span className="font-bold text-purple-950">
                  {day}
                </span>

                {savedDates[day] && (
                  <span className="mt-2 block rounded-full bg-purple-200 px-1 py-1 text-[10px] font-semibold text-purple-700 sm:text-xs">
                    ✨ Outfit
                  </span>
                )}
              </button>
            ))}

          </div>
        </section>

        {/* Selected Date */}
        {selectedDate && (
          <section className="mt-6 rounded-3xl border border-purple-100 bg-white p-6 shadow-sm sm:p-8">

            <div>
              <span className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700">
                Selected date
              </span>

              <h2 className="mt-4 text-2xl font-bold text-purple-950">
                September {selectedDate}, 2026
              </h2>

              <p className="mt-1 text-gray-500">
                Choose an outfit for this day.
              </p>
            </div>

            {/* Outfit choices */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {outfits.map((outfit, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOutfit(outfit)}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    selectedOutfit?.name === outfit.name
                      ? "border-purple-600 bg-purple-50"
                      : "border-purple-100 bg-white hover:bg-purple-50"
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div className="flex -space-x-2">
                      {outfit.top && (
                        <img
                          src={outfit.top.photo}
                          alt={outfit.top.name}
                          className="h-12 w-12 rounded-xl border-2 border-white object-cover"
                        />
                      )}

                      {outfit.bottom && (
                        <img
                          src={outfit.bottom.photo}
                          alt={outfit.bottom.name}
                          className="h-12 w-12 rounded-xl border-2 border-white object-cover"
                        />
                      )}

                      {outfit.shoes && (
                        <img
                          src={outfit.shoes.photo}
                          alt={outfit.shoes.name}
                          className="h-12 w-12 rounded-xl border-2 border-white object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-purple-950">
                        {outfit.name}
                      </p>

                      {selectedOutfit?.name === outfit.name && (
                        <p className="mt-1 text-xs font-semibold text-purple-600">
                          ✓ Selected
                        </p>
                      )}
                    </div>

                  </div>
                </button>
              ))}

            </div>

            {outfits.length === 0 && (
              <div className="mt-5 rounded-2xl bg-purple-50 p-6 text-center">
                <div className="text-3xl">✨</div>

                <p className="mt-2 font-semibold text-purple-900">
                  No saved outfits yet
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Create an outfit in the Outfit Builder first.
                </p>

                <a
                  href="/outfits"
                  className="mt-4 inline-block rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  Create an Outfit
                </a>
              </div>
            )}

            {/* Selected Outfit Preview */}
            {selectedOutfit && (
              <div className="mt-6 rounded-3xl border border-purple-100 bg-[#F8F5FC] p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-purple-600">
                      Selected outfit
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-purple-950">
                      {selectedOutfit.name} ✨
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

                  {selectedOutfit.top && (
                    <img
                      src={selectedOutfit.top.photo}
                      alt={selectedOutfit.top.name}
                      className="h-28 w-24 rounded-2xl object-cover shadow-sm"
                    />
                  )}

                  {selectedOutfit.bottom && (
                    <img
                      src={selectedOutfit.bottom.photo}
                      alt={selectedOutfit.bottom.name}
                      className="h-28 w-24 rounded-2xl object-cover shadow-sm"
                    />
                  )}

                  {selectedOutfit.shoes && (
                    <img
                      src={selectedOutfit.shoes.photo}
                      alt={selectedOutfit.shoes.name}
                      className="h-28 w-24 rounded-2xl object-cover shadow-sm"
                    />
                  )}

                </div>

                <button
                  onClick={saveOutfitToDate}
                  className="mt-5 w-full rounded-full bg-purple-600 px-4 py-3.5 font-semibold text-white shadow-sm transition hover:bg-purple-700"
                >
                  Add Outfit to Calendar 📅
                </button>

              </div>
            )}

          </section>
        )}

      </div>
    </main>
  );
}
