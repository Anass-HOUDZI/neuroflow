
import React from "react";
import { Button } from "@/components/ui/button";

type TrackControlsProps = {
  name: string;
  volume: number;
  muted: boolean;
  color: string;
  onMute: () => void;
  onVolume: (v: number) => void;
};

export default function TrackControls({
  name,
  volume,
  muted,
  color,
  onMute,
  onVolume,
}: TrackControlsProps) {
  return (
    <div className={`flex items-center gap-2 w-full rounded-lg px-2 py-1`} style={{ background: muted ? "#f3f3fa" : color, opacity: muted ? 0.5 : 1 }}>
      <Button size="icon" variant="ghost" onClick={onMute} aria-label="mute">
        {muted ? "🔇" : "🔊"}
      </Button>
      <span className="font-semibold flex-1">{name}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={e => onVolume(Number(e.target.value))}
        className="w-32 accent-blue-600"
        aria-label="volume"
      />
      <span className="w-10 text-xs">{Math.round(volume * 100)}%</span>
    </div>
  );
}
