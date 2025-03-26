import FilterPriority from "@/components/FilterPriority";
import WidgetsIcon from "@mui/icons-material/Widgets";
const TaskPage = () => {
  return (
    <main className="flex-9 p-4 bg-slate-300 rounded-tl-xl rounded-tr-xl ">
      <section className="flex justify-between">
        <h1>All Tasks</h1>
        <FilterPriority />
      </section>
    </main>
  );
};
export default TaskPage;
