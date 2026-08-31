export default function Home() {
  return (
    <main className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-900">
          MyWardrobe
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Your digital wardrobe.
        </p><a
  href="/wardrobe"
  className="mt-6 inline-block rounded-full bg-purple-600 px-6 py-3 text-white"
>
  Open My Wardrobe
</a>
      </div>
    </main>
  );
}