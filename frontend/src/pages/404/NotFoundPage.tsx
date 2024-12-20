import { useNavigate } from "react-router-dom";

import { Home, Music2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-900">
      <div className="space-y-8 px-4 text-center">
        {/* Large animated musical note */}
        <div className="flex animate-bounce justify-center">
          <Music2 className="h-24 w-24 text-emerald-500" />
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page not found</h2>
          <p className="mx-auto max-w-md text-neutral-400">
            Looks like this track got lost in the shuffle. Let's get you back to
            the music.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
