
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5FC] text-purple-950">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            vestia<span className="text-purple-500">.</span>
          </h1>

          <a
            href="/wardrobe"
            className="rounded-full border border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm hover:bg-purple-50"
          >
            My Wardrobe
          </a>
        </header>

        {/* Hero */}
        <section className="flex flex-1 items-center justify-center py-20">
          <div className="max-w-3xl text-center">

            <div className="mb-6 inline-block rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
              ✨ Your wardrobe, reimagined
            </div>

            <h2 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Your clothes.
              <br />
              <span className="text-purple-600">Your style.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-500">
              Organize your wardrobe, create outfits, and plan what to wear —
              all in one place.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/add-clothes"
                className="rounded-full bg-purple-600 px-7 py-3.5 font-semibold text-white shadow-md hover:bg-purple-700"
              >
                Start My Wardrobe 👗
              </a>

              <a
                href="/outfits"
                className="rounded-full border border-purple-200 bg-white px-7 py-3.5 font-semibold text-purple-900 shadow-sm hover:bg-purple-50"
              >
                Create an Outfit ✨
              </a>
            </div>

          </div>
        </section>

        {/* Feature cards */}
        <section className="grid gap-4 pb-8 sm:grid-cols-3">

          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="text-2xl">👗</div>
            <h3 className="mt-4 font-bold">Your Wardrobe</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Keep all your clothes organized in one beautiful digital closet.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="text-2xl">✨</div>
            <h3 className="mt-4 font-bold">Build Outfits</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Mix and match your clothes to create outfits you love.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="text-2xl">📅</div>
            <h3 className="mt-4 font-bold">Plan Your Style</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Plan your outfits and know exactly what you're wearing.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}

