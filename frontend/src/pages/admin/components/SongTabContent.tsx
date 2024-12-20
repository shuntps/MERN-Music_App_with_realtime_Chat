import { Music } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SongsTable from "@/pages/admin/components/SongsTable";
import AddSongDialog from "@/pages/admin/components/AddSongDialog";

const SongTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>

            <CardDescription>Manage your music tracks</CardDescription>
          </div>

          <AddSongDialog />
        </div>
      </CardHeader>

      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongTabContent;
