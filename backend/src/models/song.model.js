import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      artist: {
         type: String,
         required: true,
      },
      imagePath: {
         type: String,
         required: false,
      },
      imageUrl: {
         type: String,
         required: true,
      },
      audioPath: {
         type: String,
         required: false,
      },
      audioUrl: {
         type: String,
         required: true,
      },
      duration: {
         type: Number,
         required: true,
      },
      albumId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Album",
         required: false,
      },
   },
   { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
