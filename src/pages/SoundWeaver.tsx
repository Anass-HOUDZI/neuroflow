
import React, { useRef, useState } from "react";
import { Wand, AudioLines } from "lucide-react";
import TrackControls from "@/components/sound-weaver/TrackControls";
import TransportBar from "@/components/sound-weaver/TransportBar";

type Track = {
  id: number;
  name: string;
  color: string;
  volume: number;
  muted: boolean;
  // Pour MVP, chaque track sera un oscillateur sin/triangle
  type: OscillatorType;
};

function createTracks(): Track[] {
  return [
    { id: 1, name: "Synth Lead", color: "#e0f2f1", volume: 0.7, muted: false, type: "triangle" },
    { id: 2, name: "Bass", color: "#ffe082", volume: 0.8, muted: false, type: "sine" },
    { id: 3, name: "HiHat", color: "#f3e5f5", volume: 0.6, muted: false, type: "square" }
  ];
}

export default function SoundWeaver() {
  const [tracks, setTracks] = useState<Track[]>(createTracks());
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ [id: number]: { osc: OscillatorNode, gain: GainNode } }>({});

  function handleMute(i: number) {
    setTracks(trs => trs.map((t, idx) => idx === i ? { ...t, muted: !t.muted } : t));
    // si en train de jouer, mute le gain node
    const tr = tracks[i];
    if (nodesRef.current[tr.id]) {
      nodesRef.current[tr.id].gain.gain.value = tr.muted ? tracks[i].volume : 0;
    }
  }

  function handleVolume(i: number, v: number) {
    setTracks(trs => trs.map((t, idx) => idx === i ? { ...t, volume: v } : t));
    const tr = tracks[i];
    if (nodesRef.current[tr.id]) {
      nodesRef.current[tr.id].gain.gain.value = v * (tr.muted ? 0 : 1);
    }
  }

  function stopAll() {
    Object.values(nodesRef.current).forEach(({ osc }) => {
      try { osc.stop(); } catch {}
    });
    nodesRef.current = {};
    ctxRef.current?.close();
    ctxRef.current = null;
  }

  function handlePlayPause() {
    setPlaying(prev => {
      if (!prev) {
        // Play: crée AudioContext, démarre oscillateurs pour chaque track non-muted
        if (ctxRef.current == null) ctxRef.current = new window.AudioContext();
        let ctx = ctxRef.current;
        // Stop tous existants
        stopAll();

        tracks.forEach(tr => {
          if (tr.muted) return;
          let osc = ctx.createOscillator();
          let gain = ctx.createGain();
          osc.type = tr.type;
          osc.frequency.value =
            tr.type === "triangle" ? 220 : tr.type === "sine" ? 100 : 5000;
          gain.gain.value = tr.volume;
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          nodesRef.current[tr.id] = { osc, gain };
        });
      } else {
        stopAll();
      }
      return !prev;
    });
  }

  // Export simple : génère un buffer, puis download WAV
  function handleExport() {
    // Pour MVP, mixe seulement la première piste (mono) pendant 2s
    const duration = 2;
    const sampleRate = 44100;
    const nSamples = duration * sampleRate;
    const buffer = new Float32Array(nSamples);

    // use first track which is not muted
    const tr = tracks.find(t => !t.muted) || tracks[0];
    // Rectangle waveform pour la démo
    for (let i = 0; i < nSamples; ++i) {
      let t = i / sampleRate;
      let v = Math.sin(2 * Math.PI * (tr.type === "triangle" ? 220 : tr.type === "sine" ? 100 : 5000) * t);
      buffer[i] = v * tr.volume;
    }

    // Encode WAV (PCM 16bit), mono
    function encodeWav(samples: Float32Array, sampleRate: number) {
      const buffer = new ArrayBuffer(44 + samples.length * 2);
      const view = new DataView(buffer);
      function writeString(offset: number, str: string) {
        for (let i = 0; i < str.length; ++i) view.setUint8(offset + i, str.charCodeAt(i));
      }
      writeString(0, "RIFF");
      view.setUint32(4, 36 + samples.length * 2, true);
      writeString(8, "WAVEfmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeString(36, "data");
      view.setUint32(40, samples.length * 2, true);
      for (let i = 0; i < samples.length; ++i) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      return new Blob([buffer], { type: "audio/wav" });
    }
    const wav = encodeWav(buffer, sampleRate);
    const url = URL.createObjectURL(wav);
    const a = document.createElement("a");
    a.download = "soundweaver-mix.wav";
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl px-4 py-10 md:py-16 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <Wand className="h-12 w-12 text-blue-500" />
          <h1 className="text-3xl font-bold">SoundWeaver</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Studio audio minimal : multi-pistes synthétiques, volume et export.
          </p>
          <span className="text-xs text-gray-500">
            (Prototype – synchronisation & édition réelles : bientôt)
          </span>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 w-full">
            {tracks.map((track, i) => (
              <TrackControls
                key={track.id}
                name={track.name}
                color={track.color}
                volume={track.volume}
                muted={track.muted}
                onMute={() => handleMute(i)}
                onVolume={v => handleVolume(i, v)}
              />
            ))}
          </div>
          <TransportBar playing={playing} onPlayPause={handlePlayPause} onExport={handleExport} />
        </div>
        <div className="w-full flex justify-center mt-10">
          <AudioLines className="w-24 h-10 text-blue-400/60" />
        </div>
      </div>
    </main>
  );
}
