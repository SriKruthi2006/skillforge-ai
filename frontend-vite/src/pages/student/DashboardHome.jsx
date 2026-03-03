import { useAuth } from "../../context/AuthContext";
import ProgressChart from "./components/ProgressChart";
import ResumeLearning from "./components/ResumeLearning";
import NewCourses from "./components/NewCourses";
import coursesData from "../../data/coursesData";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-4xl font-bold mb-10">
        Welcome back, {user?.name} 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <Card title="Courses" value={4} />
        <Card title="Completed" value={1} />
        <Card title="Pending" value={3} />
        <Card title="Avg Score" value="84%" />
      </div>

      {/* Graph + Resume */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <ProgressChart />
        <ResumeLearning />
      </div>

      {/* New Courses */}
      <NewCourses />
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[#0f172a] p-6 rounded-2xl text-center shadow-lg">
    <h4 className="mb-2 text-gray-300">{title}</h4>
    <p className="text-3xl font-bold text-purple-400">{value}</p>
  </div>
);

export default DashboardHome;