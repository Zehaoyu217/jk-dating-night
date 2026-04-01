"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { dateIdeas } from "@/lib/date-ideas";
import { DateIdea, Filters } from "@/lib/types";
import FilterPills from "@/components/FilterPills";
import DateCard from "@/components/DateCard";
import FavoritesDrawer from "@/components/FavoritesDrawer";

function getFilteredIdeas(filters: Filters): DateIdea[] {
  return dateIdeas.filter((idea) => {
    if (filters.dateType.length > 0 && !filters.dateType.includes(idea.dateType))
      return false;
    if (filters.budget.length > 0 && !idea.budget.some((b) => filters.budget.includes(b)))
      return false;
    if (filters.vibe.length > 0 && !idea.vibe.some((v) => filters.vibe.includes(v)))
      return false;
    if (filters.setting.length > 0 && !filters.setting.includes(idea.setting))
      return false;
    if (filters.location.length > 0 && !idea.location.some((l) => filters.location.includes(l)))
      return false;
    return true;
  });
}

function fireConfetti() {
  const opts = { colors: ["#E98074", "#E5659A", "#26458B", "#FFF3E9", "#FFD700"] };
  confetti({ ...opts, particleCount: 60, spread: 55, origin: { y: 0.65, x: 0.35 } });
  confetti({ ...opts, particleCount: 60, spread: 55, origin: { y: 0.65, x: 0.65 } });
}

type Stage = "filters" | "results" | "surprise";

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    dateType: [],
    budget: [],
    vibe: [],
    setting: [],
    location: [],
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [stage, setStage] = useState<Stage>("filters");
  const [surpriseIdea, setSurpriseIdea] = useState<DateIdea | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("jk-favorites");
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jk-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filtered = useMemo(() => getFilteredIdeas(filters), [filters]);

  const handleGenerate = useCallback(() => {
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSurprise = useCallback(() => {
    const pool = filtered.length > 0 ? filtered : dateIdeas;
    let next: DateIdea;
    if (pool.length === 1) {
      next = pool[0];
    } else {
      do {
        next = pool[Math.floor(Math.random() * pool.length)];
      } while (next.id === surpriseIdea?.id);
    }
    setSurpriseIdea(next);
    setAnimKey((k) => k + 1);
    setStage("surprise");
    fireConfetti();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filtered, surpriseIdea]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const favoriteIdeas = dateIdeas.filter((i) => favorites.includes(i.id));
  const activeFilterCount =
    filters.dateType.length + filters.budget.length +
    filters.vibe.length + filters.setting.length + filters.location.length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-cream/80 border-b border-white/60">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => { setStage("filters"); setSurpriseIdea(null); }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">💑</span>
            <h1 className="text-lg font-extrabold text-navy tracking-tight">
              J & K
            </h1>
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-sm font-medium text-navy transition-all hover:shadow-sm cursor-pointer"
          >
            ❤️ <span className="hidden sm:inline">Saved</span>
            {favorites.length > 0 && (
              <span className="bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-12">

        {/* ===== FILTER STAGE ===== */}
        {stage === "filters" && (
          <>
            <div className="text-center mt-10 mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight mb-2">
                Date Night Ideas
              </h2>
              <p className="text-text-muted">
                Pick your preferences, then generate ideas with ranked venues
              </p>
              <p className="text-xs text-text-muted mt-1">
                Jersey City · Hoboken · Manhattan
              </p>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-6 backdrop-blur-md bg-white/50 border border-white/60 mb-6"
              style={{ boxShadow: "0 4px 24px rgba(0,25,69,0.06)" }}
            >
              <FilterPills filters={filters} onChange={setFilters} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleGenerate}
                className="px-8 py-3.5 bg-coral hover:bg-coral-hover text-white text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Generate Ideas ({filtered.length})
              </button>
              <button
                onClick={handleSurprise}
                className="px-8 py-3.5 bg-navy hover:bg-navy/90 text-white text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                🎲 Surprise Me!
              </button>
            </div>
          </>
        )}

        {/* ===== RESULTS STAGE ===== */}
        {stage === "results" && (
          <>
            <div className="flex items-center justify-between mt-6 mb-4">
              <button
                onClick={() => setStage("filters")}
                className="text-sm text-navy/50 hover:text-navy transition-colors cursor-pointer"
              >
                ← Back to filters
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">
                  {filtered.length} {filtered.length === 1 ? "idea" : "ideas"}
                  {activeFilterCount > 0 && ` · ${activeFilterCount} filters`}
                </span>
                <button
                  onClick={handleSurprise}
                  className="px-3 py-1.5 bg-navy text-white text-xs font-bold rounded-full hover:bg-navy/90 transition-all cursor-pointer"
                >
                  🎲 Surprise Me
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">🤷</div>
                <p className="text-text-muted mb-3">
                  No ideas match your filters.
                </p>
                <button
                  onClick={() => setStage("filters")}
                  className="text-coral hover:text-coral-hover text-sm font-medium cursor-pointer"
                >
                  Adjust filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((idea) => (
                  <DateCard
                    key={idea.id}
                    idea={idea}
                    isFavorite={favorites.includes(idea.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== SURPRISE STAGE ===== */}
        {stage === "surprise" && surpriseIdea && (
          <div className="mt-10" key={animKey}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-navy mb-1">
                Your Date Night Idea ✨
              </h2>
              <p className="text-text-muted text-sm">
                Tap the card to see venue recommendations
              </p>
            </div>

            <DateCard
              idea={surpriseIdea}
              isFavorite={favorites.includes(surpriseIdea.id)}
              onToggleFavorite={toggleFavorite}
            />

            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={handleSurprise}
                className="px-6 py-3 bg-coral hover:bg-coral-hover text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                🎲 Another One!
              </button>
              <button
                onClick={() => setStage("filters")}
                className="px-6 py-3 bg-white/70 hover:bg-white text-navy font-medium rounded-full transition-all cursor-pointer"
              >
                ← Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-text-muted border-t border-white/60">
        Made with ❤️ by J & K · Jersey City, NJ
      </footer>

      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoriteIdeas}
        onRemove={toggleFavorite}
      />
    </div>
  );
}
