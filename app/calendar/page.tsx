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

    localStorage.setItem(
      "calendarOutfits",
      JSON.stringify(updatedDates)
    );

    alert("Outfit added to your calendar! ✨");
  };

  return (
    <main className="min-h-screen bg-[#F7F3F0] px-4 py-6 text-[#241F20] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            vestia<span className="text-[#9B6AA8]">.</span>
          </a>

          <a
            href="/outfits"
            className="rounded-full bg-[#3A3035] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            + Create Look
          </a>
        </header>

        {/* TITLE */}
        <section className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B6AA8]">
            Style planner
          </p>

          <div className="mt-2">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Outfit Calendar
            </h1>

            <p className="mt-2 max-w-xl text-sm text-[#756C70] sm:text-base">
              Plan your outfits ahead of time and always know what you're
              wearing.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1">
          <a
            href="/wardrobe"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            👗 Wardrobe
          </a>

          <a
            href="/outfits"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            ✨ Build Look
          </a>

          <a
            href="/looks"
            className="shrink-0 rounded-full border border-[#DED5D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#3A3035] transition hover:bg-[#F1EAED]"
          >
            💖 My Looks
          </a>

          <a
            href="/calendar"
            className="shrink-0 rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            📅 Calendar
          </a>
        </nav>

        {/* CALENDAR */}
        <section className="mt-6 rounded-[2rem] border border-[#E5DDE0] bg-white p-4 shadow-sm sm:p-7">

          {/* CALENDAR HEADER */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B6AA8]">
                Your month
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                September 2026
              </h2>

              <p className="mt-1 text-xs text-[#81777B] sm:text-sm">
                Tap a date to plan your outfit.
              </p>
            </div>

            <div className="hidden rounded-full bg-[#F1EAED] px-4 py-2 text-sm font-semibold text-[#9B6AA8] sm:block">
              ✨ Plan your style
            </div>
          </div>

          {/* WEEKDAYS */}
          <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div
                  key={day}
                  className="pb-1 text-center text-[10px] font-bold uppercase tracking-wide text-[#9B6AA8] sm:text-xs"
                >
                  {day}
                </div>
              )
            )}

            {/* SEPTEMBER 2026 STARTS ON TUESDAY */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {/* DAYS */}
            {days.map((day) => {
              const isSelected = selectedDate === day;
              const hasOutfit = Boolean(savedDates[day]);

              return (
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
                  className={`relative min-h-[68px] rounded-2xl border p-2 text-left transition duration-200 sm:min-h-[92px] sm:p-3 ${
                    isSelected
                      ? "border-[#9B6AA8] bg-[#F1EAED] shadow-sm"
                      : hasOutfit
                      ? "border-[#D8C8DC] bg-[#FAF7FB] hover:-translate-y-0.5 hover:shadow-sm"
                      : "border-[#E8E0E3] bg-white hover:-translate-y-0.5 hover:bg-[#FAF7FB]"
                  }`}
                >
                  <span className="text-sm font-black text-[#3A3035] sm:text-base">
                    {day}
                  </span>

                  {hasOutfit && (
                    <span className="mt-2 block truncate rounded-full bg-[#E9DDEC] px-1.5 py-1 text-[9px] font-bold text-[#76517F] sm:text-[10px]">
                      ✨ Outfit
                    </span>
                  )}

                  {isSelected && (
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#9B6AA8]" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* SELECTED DATE */}
        {selectedDate && (
          <section className="mt-6 rounded-[2rem] border border-[#E5DDE0] bg-white p-5 shadow-sm sm:p-7">

            {/* DATE HEADER */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B6AA8]">
                Selected date
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                September {selectedDate}, 2026
              </h2>

              <p className="mt-1 text-sm text-[#81777B]">
                Choose a saved look for this day.
              </p>
            </div>

            {/* OUTFIT CHOICES */}
            {outfits.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {outfits.map((outfit, index) => {
                  const isSelected =
                    selectedOutfit?.name === outfit.name;

                  return (
                    <button
                      key={`${outfit.name}-${index}`}
                      onClick={() => setSelectedOutfit(outfit)}
                      className={`rounded-2xl border-2 p-3 text-left transition duration-200 ${
                        isSelected
                          ? "border-[#9B6AA8] bg-[#FAF7FB] shadow-sm"
                          : "border-[#E8E0E3] bg-white hover:-translate-y-0.5 hover:border-[#D8C8DC] hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">

                        {/* MINI OUTFIT */}
                        <div className="flex -space-x-2">
                          {outfit.top && (
                            <img
                              src={outfit.top.photo}
                              alt={outfit.top.name}
                              className="h-12 w-12 rounded-xl border-2 border-white object-cover shadow-sm"
                            />
                          )}

                          {outfit.bottom && (
                            <img
                              src={outfit.bottom.photo}
                              alt={outfit.bottom.name}
                              className="h-12 w-12 rounded-xl border-2 border-white object-cover shadow-sm"
                            />
                          )}

                          {outfit.shoes && (
                            <img
                              src={outfit.shoes.photo}
                              alt={outfit.shoes.name}
                              className="h-12 w-12 rounded-xl border-2 border-white object-cover shadow-sm"
                            />
                          )}
                        </div>

                        {/* NAME */}
                        <div className="min-w-0">
                          <p className="truncate font-black text-[#3A3035]">
                            {outfit.name}
                          </p>

                          {isSelected && (
                            <p className="mt-1 text-xs font-bold text-[#9B6AA8]">
                              ✓ Selected
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* NO OUTFITS */}
            {outfits.length === 0 && (
              <div className="mt-5 rounded-2xl border border-dashed border-[#D8C8DC] bg-[#FAF7FB] p-7 text-center">
                <div className="text-3xl">✨</div>

                <p className="mt-2 font-black text-[#3A3035]">
                  No saved looks yet
                </p>

                <p className="mt-1 text-sm text-[#81777B]">
                  Create an outfit in the Outfit Builder first.
                </p>

                <a
                  href="/outfits"
                  className="mt-4 inline-block rounded-full bg-[#3A3035] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Create an Outfit
                </a>
              </div>
            )}

            {/* SELECTED OUTFIT */}
            {selectedOutfit && (
              <div className="mt-6 rounded-[1.75rem] border border-[#E5DDE0] bg-[#FAF7FB] p-5">

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B6AA8]">
                      Your planned look
                    </p>

                    <h3 className="mt-1 text-xl font-black text-[#3A3035]">
                      {selectedOutfit.name} ✨
                    </h3>
                  </div>
                </div>

                {/* PREVIEW */}
                <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                  {selectedOutfit.top && (
                    <img
                      src={selectedOutfit.top.photo}
                      alt={selectedOutfit.top.name}
                      className="aspect-[3/4] w-full rounded-2xl object-cover shadow-sm"
                    />
                  )}

                  {selectedOutfit.bottom && (
                    <img
                      src={selectedOutfit.bottom.photo}
                      alt={selectedOutfit.bottom.name}
                      className="aspect-[3/4] w-full rounded-2xl object-cover shadow-sm"
                    />
                  )}

                  {selectedOutfit.shoes && (
                    <img
                      src={selectedOutfit.shoes.photo}
                      alt={selectedOutfit.shoes.name}
                      className="aspect-[3/4] w-full rounded-2xl object-cover shadow-sm"
                    />
                  )}
                </div>

                <button
                  onClick={saveOutfitToDate}
                  className="mt-5 w-full rounded-full bg-[#3A3035] px-4 py-3.5 font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
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