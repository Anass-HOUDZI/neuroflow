
import React from "react";
import {
  Sparkles, Star, Heart, Flame, Camera, Image as ImageIcon, 
  Umbrella, Cloud, Moon, Sun, Leaf, Dice5, Infinity, Aperture, 
  Globe2, Bookmark, Eye, Brain, Triangle, Square, Hexagon, 
  Rocket, Lightbulb, Flash, Feather, Waves, Smile, Apple, Github, 
  Palette, Pen, Zap, AtSign, Check 
} from "lucide-react";

type SymbolGalleryProps = {
  value: string;
  onSelect: (name: string) => void;
};

const icons: { name: string; Icon: React.FC<{className?: string}> }[] = [
  { name: "Sparkles", Icon: Sparkles },
  { name: "Star", Icon: Star },
  { name: "Flame", Icon: Flame },
  { name: "Rocket", Icon: Rocket },
  { name: "Leaf", Icon: Leaf },
  { name: "Moon", Icon: Moon },
  { name: "Sun", Icon: Sun },
  { name: "Cloud", Icon: Cloud },
  { name: "Heart", Icon: Heart },
  { name: "Palette", Icon: Palette },
  { name: "Lightbulb", Icon: Lightbulb },
  { name: "Flash", Icon: Flash },
  { name: "Waves", Icon: Waves },
  { name: "Feather", Icon: Feather },
  { name: "Smile", Icon: Smile },
  { name: "Apple", Icon: Apple },
  { name: "Hexagon", Icon: Hexagon },
  { name: "Square", Icon: Square },
  { name: "Triangle", Icon: Triangle },
  { name: "Aperture", Icon: Aperture },
  { name: "Camera", Icon: Camera },
  { name: "Image", Icon: ImageIcon },
  { name: "Dice5", Icon: Dice5 },
  { name: "Pen", Icon: Pen },
  { name: "Zap", Icon: Zap },
  { name: "Infinity", Icon: Infinity },
  { name: "Globe2", Icon: Globe2 },
  { name: "Eye", Icon: Eye },
  { name: "Brain", Icon: Brain },
  { name: "Bookmark", Icon: Bookmark },
  { name: "AtSign", Icon: AtSign },
  { name: "Github", Icon: Github },
  { name: "Check", Icon: Check },
];

export default function SymbolGallery({ value, onSelect }: SymbolGalleryProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {icons.map(({ name, Icon }) => (
        <button
          key={name}
          className={`rounded-md border border-gray-200 p-2 bg-white hover:bg-fuchsia-50 dark:bg-gray-900 dark:border-gray-600
            ${value === name ? "ring-2 ring-fuchsia-400 border-fuchsia-300" : ""}`}
          title={name}
          type="button"
          tabIndex={0}
          onClick={() => onSelect(name)}
        >
          <Icon className="w-6 h-6 text-fuchsia-500" />
        </button>
      ))}
    </div>
  );
}
