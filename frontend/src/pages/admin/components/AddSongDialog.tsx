import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { Plus, Upload } from "lucide-react";

import { useMusicStore } from "@/stores/useMusicStore";

import { axiosInstance } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddSongDialog = () => {
  const { albums } = useMusicStore();

  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audio || !files.image) {
        return toast.error("Please upload both audio and image files");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);

      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      await axiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFiles({
        audio: null,
        image: null,
      });

      toast.success("Song added successfully");
    } catch (error: any) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-black hover:bg-emerald-600">
          <Plus className="mr-2 size-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-auto border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music Library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* Image upload area */}
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 p-6"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 inline-block rounded-full bg-zinc-800 p-3">
                    <Upload className="size-6 text-zinc-400" />
                  </div>

                  <div className="mb-2 text-sm text-zinc-400">
                    Upload artwork
                  </div>

                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Audio upload area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* Title field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>

            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          {/* Artist field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>

            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          {/* Duration field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({ ...newSong, duration: e.target.value || "0" })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          {/* Album field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="border-zync-700 bg-zinc-800">
                <SelectValue placeholder="Select an album" />
              </SelectTrigger>

              <SelectContent className="border-zinc-700 bg-zinc-800">
                <SelectItem value="none" className="bg-zinc-900/20 font-bold">
                  No Album (Single)
                </SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-3 md:gap-0">
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
