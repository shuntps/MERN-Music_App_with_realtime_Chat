import { useEffect, useRef, useState } from "react";

import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";

import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatTime } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMutedState = !isMuted;
      audio.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume / 100;

      if (newVolume === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else if (audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <footer className="h-20 rounded-t-lg border-t border-zinc-800 bg-zinc-900 px-4 sm:h-24">
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between">
        {/* Currently playing song */}
        <div className="hidden w-[30%] min-w-[180px] items-center gap-4 sm:flex">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="h-14 w-14 rounded-md object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="cursor-pointer truncate font-medium hover:underline">
                  {currentSong.title}
                </div>

                <div className="cursor-pointer truncate text-sm text-zinc-400 hover:underline">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player controls */}
        <div className="flex max-w-full flex-1 flex-col items-center gap-2 sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden text-zinc-400 hover:text-white sm:inline-flex"
              aria-label="Shuffle"
            >
              <Shuffle className="size-4" />
            </Button>

            <Button
              onClick={playPrevious}
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              disabled={!currentSong}
              aria-label="Previous song"
            >
              <SkipBack className="size-4" />
            </Button>

            <Button
              onClick={togglePlay}
              size="icon"
              className="size-8 rounded-full bg-white text-black hover:bg-white/80"
              disabled={!currentSong}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>

            <Button
              onClick={playNext}
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              disabled={!currentSong}
              aria-label="Next song"
            >
              <SkipForward className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden text-zinc-400 hover:text-white sm:inline-flex"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden w-full items-center gap-2 sm:flex">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>

            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />

            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Volume controls */}
        <div className="hidden w-[30%] min-w-[180px] items-center justify-end gap-4 sm:flex">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
            aria-label="Microphone settings"
          >
            <Mic2 className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
            aria-label="Playlist settings"
          >
            <ListMusic className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
            aria-label="Device settings"
          >
            <Laptop2 className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume1 className="size-4" />
              )}
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
