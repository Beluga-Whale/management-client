import Header from "@/components/Header";
import InfoTask from "@/components/InfoTask";
import QueryProvider from "@/components/QueryProvider";
import SideMenu from "@/components/SideMenu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Header />
      <main className="flex justify-between min-h-screen">
        <SideMenu />
        {children}
        <InfoTask />
      </main>
    </main>
  );
}
