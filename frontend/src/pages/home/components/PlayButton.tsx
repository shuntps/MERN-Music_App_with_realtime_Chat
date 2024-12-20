import { Pause, Play } from "lucide-react";

import { usePlayerStore } from "@/stores/usePlayerStore";

import { Song } from "@/types";

import { Button } from "@/components/ui/button";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      onClick={handlePlay}
      size={"icon"}
      className={`absolute bottom-3 right-2 translate-y-2 bg-green-500 opacity-0 transition-all hover:scale-105 hover:bg-green-400 group-hover:translate-y-0 ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
