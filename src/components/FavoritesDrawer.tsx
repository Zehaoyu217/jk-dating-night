"use client";

import { DateIdea } from "@/lib/types";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: DateIdea[];
  onRemove: (id: string) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemove,
}: FavoritesDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-md z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-navy">
            Saved Ideas ({favorites.length})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg text-text-muted hover:bg-gray-200 transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
          {favorites.length === 0 ? (
            <div className="text-center text-text-muted py-12">
              <div className="text-4xl mb-3">💝</div>
              <p>No saved ideas yet!</p>
              <p className="text-sm mt-1">
                Tap the heart on any idea to save it here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favorites.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-cream/60 rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="text-2xl">{idea.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-sm">
                      {idea.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {idea.venues[0]?.priceRange}
                      {idea.venues[0] && ` · ${idea.venues[0].name}`}
                    </p>
                    {idea.venues[0]?.googleMapsUrl && (
                      <a
                        href={idea.venues[0].googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-coral hover:underline mt-1 inline-block"
                      >
                        🗺️ Open in Maps
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => onRemove(idea.id)}
                    className="text-xs text-coral hover:text-coral-hover transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
