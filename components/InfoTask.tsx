"use client";
import { useGetProfile } from "@/services/userServices";
import CardActivity from "./CardActivity";
import DialogProfile from "./DialogProfile";
import StatusTotalMenu from "./StatusTotalMenu";

const InfoTask = () => {
  const { data: userData, isLoading, isError } = useGetProfile();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching profile</p>;
  return (
    <section className="hidden sm:block p-4 flex--">
      <div className="flex flex-col justify-between h-full">
        <DialogProfile />
        <p>{userData?.user?.Email}</p>
        <StatusTotalMenu />
        {/* NOTE - Acitvety */}
        <h1>Activity</h1>
        <CardActivity />
      </div>
    </section>
  );
};
export default InfoTask;
