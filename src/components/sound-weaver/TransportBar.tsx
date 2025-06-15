
import React from "react";
import { Button } from "@/components/ui/button";
import { AudioWaveform } from "lucide-react";

type TransportBarProps = {
  playing: boolean;
  onPlayPause: () => void;
  onExport: () => void;
};

export default function TransportBar({ playing, onPlayPause, onExport }: TransportBarProps) {
  return (
    <div className="flex items-center gap-4">
      <Button size="lg" onClick={onPlayPause} variant="default">
        {playing ? "⏸ Pause" : "▶️ Lecture"}
      </Button>
      <Button size="lg" onClick={onExport} variant="outline" className="flex gap-2">
        <AudioWaveform className="w-5 h-5" />
        Export .wav
      </Button>
    </div>
  );
}
