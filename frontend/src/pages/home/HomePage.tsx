import { useEffect } from "react";

import Topbar from "@/components/Topbar";

import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

import FeaturedSection from "@/pages/home/components/FeaturedSection";
import SectionGrid from "@/pages/home/components/SectionGrid";

import { ScrollArea } from "@/components/ui/scroll-area";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();
  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, featuredSongs, madeForYouSongs, trendingSongs]);

  return (
    <main className="h-full overflow-hidden rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
            Good afternoon
          </h1>

          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />

            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
