import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import LeftSidebar from "@/layout/components/LeftSidebar";
import FriendsActivity from "@/layout/components/FriendsActivity";
import AudioPlayer from "@/layout/components/AudioPlayer";
import PlaybackControls from "@/layout/components/PlaybackControls";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-full flex-1 overflow-hidden p-2"
      >
        <AudioPlayer />

        {/* Left sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

            {/* Right sidebar */}
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* TODO: Make Mobile menu */}

      <div className="px-2">
        <PlaybackControls />
      </div>
    </div>
  );
};

export default MainLayout;
