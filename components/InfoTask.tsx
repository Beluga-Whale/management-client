import CardActivity from "./CardActivity";
import StatusTotalMenu from "./StatusTotalMenu";

const InfoTask = () => {
  return (
    <section className="hidden sm:block p-4 flex-5">
      <div className="flex flex-col justify-between h-full">
        <h1>Hello, Thanathat</h1>
        <p>test888@gmail.com</p>
        <StatusTotalMenu />
        {/* NOTE - Acitvety */}
        <h1>Activity</h1>
        <CardActivity />
      </div>
    </section>
  );
};
export default InfoTask;
