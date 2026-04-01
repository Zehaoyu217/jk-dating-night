"use client";

import { useState } from "react";
import { DateIdea } from "@/lib/types";

interface DateCardProps {
  idea: DateIdea;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const vibeColors: Record<string, string> = {
  cozy: "bg-amber-100 text-amber-700",
  active: "bg-blue-100 text-blue-700",
  romantic: "bg-pink-100 text-pink-700",
  adventurous: "bg-emerald-100 text-emerald-700",
  creative: "bg-purple-100 text-purple-700",
};

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-px" title={`${count}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-xs ${i < count ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))}
    </span>
  );
}

export default function DateCard({ idea, isFavorite, onToggleFavorite }: DateCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="animate-float-in rounded-2xl w-full backdrop-blur-md bg-white/80 border border-white/60 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      style={{ boxShadow: "0 4px 24px rgba(0, 25, 69, 0.07)" }}
    >
      {/* Card header — always visible */}
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0">{idea.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-navy leading-tight">
                {idea.title}
              </h3>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(idea.id); }}
                className="text-xl transition-transform duration-200 hover:scale-125 cursor-pointer flex-shrink-0"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-2">
              {idea.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {idea.vibe.map((v) => (
                <span key={v} className={`px-2 py-0.5 rounded-full text-xs font-medium ${vibeColors[v]}`}>
                  {v}
                </span>
              ))}
            </div>
          </div>
          {/* Expand arrow */}
          <span className={`text-text-muted text-sm transition-transform duration-200 flex-shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </div>

      {/* Venue list — expanded */}
      {expanded && (
        <div className="border-t border-gray-100 bg-cream/30 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-3">
            📍 Places — Ranked by Recommendation
          </div>
          <div className="flex flex-col gap-2.5">
            {idea.venues.map((venue, idx) => (
              <div
                key={venue.name}
                className="flex items-start gap-3 bg-white/80 rounded-xl p-3 border border-white/60"
              >
                {/* Rank number */}
                <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-navy text-sm">{venue.name}</span>
                    <Stars count={venue.rating} />
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{venue.highlight}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    <span className="text-green-700 font-medium">{venue.priceRange}</span>
                    {venue.address !== "Home" && (
                      <span className="text-text-muted truncate">{venue.address}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {venue.googleMapsUrl && (
                      <a
                        href={venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-xs font-medium text-navy hover:shadow-sm transition-shadow border border-gray-100"
                      >
                        🗺️ Maps
                      </a>
                    )}
                    {venue.website && (
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-xs font-medium text-coral hover:shadow-sm transition-shadow border border-gray-100"
                      >
                        🌐 Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
