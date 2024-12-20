import { useMusicStore } from "@/stores/useMusicStore";

import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "@/pages/home/components/PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  if (isLoading) return <FeaturedGridSkeleton />;
  if (error) return <p className="mb-4 text-lg text-red-500">{error}</p>;

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="group relative flex cursor-pointer items-center overflow-hidden rounded-md bg-zinc-800/50 transition-colors hover:bg-zinc-700/50"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="size-16 flex-shrink-0 object-cover sm:size-20"
          />

          <div className="flex-1 p-4">
            <h3 className="truncate font-medium">{song.title}</h3>

            <p className="truncate text-sm text-zinc-400">{song.artist}</p>
          </div>

          <PlayButton song={song} />
        </div>
      ))}
    </section>
  );
};

export default FeaturedSection;
