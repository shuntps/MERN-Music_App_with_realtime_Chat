import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";

import { Album, Music } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/pages/admin/components/Header";
import DashboardStats from "@/pages/admin/components/DashboardStats";
import SongTabContent from "@/pages/admin/components/SongTabContent";
import AlbumTabContent from "@/pages/admin/components/AlbumTabContent";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black p-3 text-zinc-100 md:p-8">
      <Header />

      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="bg-zinc-800/50 p-1">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>

          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminPage;
