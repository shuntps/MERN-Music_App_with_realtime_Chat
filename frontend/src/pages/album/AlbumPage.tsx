import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Clock, Pause, Play } from "lucide-react";

import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

import { formatTime } from "@/utils/formatTime";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id,
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    const isCurrentSongPlaying =
      currentSong?._id && currentSong._id === currentAlbum.songs[index]._id;
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs, index);
    }
  };

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10">
            <div className="flex gap-6 p-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="h-[240px] w-[240px] rounded shadow-xl"
              />

              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>

                <h1 className="my-4 text-7xl font-bold">
                  {currentAlbum?.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play button */}
            <div className="flex items-center gap-6 px-6 pb-4">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 transition-all hover:scale-105 hover:bg-green-400"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id,
                ) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
            </div>

            {/* Table Section */}
            <div className="p-2">
              <Table className="rounded-lg bg-black/20 backdrop-blur-sm">
                {/* Table header */}
                <TableHeader className="text-sm">
                  <TableRow>
                    <TableHead className="w-8 text-center">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Released Date</TableHead>
                    <TableHead className="w-8 text-center">
                      <Clock className="inline-block size-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* Table body */}
                <TableBody>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <TableRow
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="cursor-pointer"
                      >
                        <TableCell className="text-center">
                          {isCurrentSong && isPlaying ? (
                            <span className="size-4 text-green-500">♫</span>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />

                          <div>
                            <div className="font-medium text-white">
                              {song.title}
                            </div>

                            <div>{song.artist}</div>
                          </div>
                        </TableCell>

                        <TableCell>{song.createdAt.split("T")[0]}</TableCell>

                        <TableCell>{formatTime(song.duration)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default AlbumPage;
