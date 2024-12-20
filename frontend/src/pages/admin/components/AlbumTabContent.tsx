import { Library } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AlbumsTable from "@/pages/admin/components/AlbumsTable";
import AddAlbumDialog from "@/pages/admin/components/AddAlbumDialog";

const AlbumsTabContent = () => {
  return (
    <Card className="border-zinc-700/50 bg-zinc-800/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-violet-500" />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collection</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};
export default AlbumsTabContent;
