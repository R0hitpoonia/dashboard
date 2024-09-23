import Sidebar from "@/components/custom/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_layout")({
  component: Main,
});

function Main() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="relative h-full overflow-hidden bg-background">
      {/* <SkipToMain /> */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        <Outlet />
      </main>
    </div>
  );
}
