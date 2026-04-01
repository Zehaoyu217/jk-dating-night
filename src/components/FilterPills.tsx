"use client";

import { Budget, Vibe, Setting, Location, DateType, Filters } from "@/lib/types";

const dateTypeOptions: { value: DateType; label: string; emoji: string }[] = [
  { value: "dining", label: "Dining", emoji: "🍽️" },
  { value: "drinks", label: "Drinks", emoji: "🍸" },
  { value: "arts-crafts", label: "Arts & Crafts", emoji: "🎨" },
  { value: "adventure", label: "Adventure", emoji: "🎯" },
  { value: "entertainment", label: "Entertainment", emoji: "🎭" },
  { value: "outdoors", label: "Outdoors", emoji: "☀️" },
  { value: "relaxation", label: "Relaxation", emoji: "🧘" },
  { value: "food-experience", label: "Food Experiences", emoji: "👨‍🍳" },
];

const budgetOptions: { value: Budget; label: string; emoji: string }[] = [
  { value: "free", label: "Free", emoji: "🆓" },
  { value: "under25", label: "Under $25", emoji: "💵" },
  { value: "under75", label: "$25-75", emoji: "💰" },
  { value: "splurge", label: "Splurge", emoji: "✨" },
];

const vibeOptions: { value: Vibe; label: string; emoji: string }[] = [
  { value: "cozy", label: "Cozy", emoji: "🛋️" },
  { value: "active", label: "Active", emoji: "⚡" },
  { value: "romantic", label: "Romantic", emoji: "💕" },
  { value: "adventurous", label: "Adventurous", emoji: "🗺️" },
  { value: "creative", label: "Creative", emoji: "🎨" },
];

const settingOptions: { value: Setting; label: string; emoji: string }[] = [
  { value: "home", label: "At Home", emoji: "🏠" },
  { value: "indoor", label: "Indoor", emoji: "🏢" },
  { value: "outdoor", label: "Outdoor", emoji: "🌿" },
];

const locationOptions: { value: Location; label: string; emoji: string }[] = [
  { value: "jersey-city", label: "Jersey City", emoji: "🏙️" },
  { value: "hoboken", label: "Hoboken", emoji: "🌊" },
  { value: "manhattan", label: "Manhattan", emoji: "🗽" },
  { value: "home", label: "At Home", emoji: "🏠" },
];

interface FilterPillsProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

function PillGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: T; label: string; emoji: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-navy/50">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isActive = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border
                ${
                  isActive
                    ? "bg-coral text-white border-coral shadow-md scale-[1.03]"
                    : "bg-white/80 text-text-dark border-white/80 hover:bg-white hover:border-coral/30 hover:shadow-sm"
                }`}
            >
              {opt.emoji} {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPills({ filters, onChange }: FilterPillsProps) {
  function toggle<T extends string>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  const activeCount =
    filters.dateType.length +
    filters.budget.length +
    filters.vibe.length +
    filters.setting.length +
    filters.location.length;

  return (
    <div className="flex flex-col gap-5 w-full">
      <PillGroup
        label="What type of date?"
        options={dateTypeOptions}
        selected={filters.dateType}
        onToggle={(v) => onChange({ ...filters, dateType: toggle(filters.dateType, v) })}
      />
      <PillGroup
        label="Where?"
        options={locationOptions}
        selected={filters.location}
        onToggle={(v) => onChange({ ...filters, location: toggle(filters.location, v) })}
      />
      <PillGroup
        label="Vibe"
        options={vibeOptions}
        selected={filters.vibe}
        onToggle={(v) => onChange({ ...filters, vibe: toggle(filters.vibe, v) })}
      />
      <PillGroup
        label="Indoor / Outdoor"
        options={settingOptions}
        selected={filters.setting}
        onToggle={(v) => onChange({ ...filters, setting: toggle(filters.setting, v) })}
      />
      <PillGroup
        label="Budget"
        options={budgetOptions}
        selected={filters.budget}
        onToggle={(v) => onChange({ ...filters, budget: toggle(filters.budget, v) })}
      />
      {activeCount > 0 && (
        <button
          onClick={() =>
            onChange({ dateType: [], budget: [], vibe: [], setting: [], location: [] })
          }
          className="self-start text-xs text-coral hover:text-coral-hover transition-colors cursor-pointer"
        >
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );
}
