export type Budget = "free" | "under25" | "under75" | "splurge";
export type Vibe = "cozy" | "active" | "romantic" | "adventurous" | "creative";
export type Setting = "home" | "indoor" | "outdoor";
export type Location = "jersey-city" | "manhattan" | "hoboken" | "home";
export type DateType =
  | "dining"
  | "drinks"
  | "arts-crafts"
  | "adventure"
  | "entertainment"
  | "outdoors"
  | "relaxation"
  | "food-experience";

export interface Venue {
  name: string;
  address: string;
  rating: number; // 1-5
  priceRange: string;
  googleMapsUrl: string;
  website?: string;
  highlight: string; // one-line reason it's great
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  emoji: string;
  budget: Budget[];
  vibe: Vibe[];
  setting: Setting;
  location: Location[];
  dateType: DateType;
  venues: Venue[];
}

export interface Filters {
  dateType: DateType[];
  vibe: Vibe[];
  setting: Setting[];
  location: Location[];
  budget: Budget[];
}
