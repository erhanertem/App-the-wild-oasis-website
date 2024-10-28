import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      {/* Side navigation serves the sub segments @ account segment */}
      <SideNavigation />
      {/* Children is the page.js being served @ this segment */}
      <div className="py-1">{children}</div>
    </div>
  );
}
