import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Week 1", score: 60 },
  { name: "Week 2", score: 65 },
  { name: "Week 3", score: 72 },
  { name: "Week 4", score: 80 },
  { name: "Week 5", score: 84 },
];

const ProgressChart = () => {
  return (
  <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg w-full">
    <h3 className="text-lg mb-4">Performance Progress</h3>

    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
};

export default ProgressChart;