import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchParticipants } from "../store/participantsSlice";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const dispatch = useDispatch();

  // беремо всіх учасників із Redux
  const participants = useSelector((s) =>
    Object.values(s.participants.entities).filter(Boolean),
  );

  // авто завантаження даних
  useEffect(() => {
    if (!participants.length) {
      dispatch(fetchParticipants(1));
    }
  }, [dispatch, participants.length]);

  //формуємо статистику
  const stats = {};

  participants.forEach((p) => {
    // fake дата
    const date = "Day " + (p.id % 5);
    stats[date] = (stats[date] || 0) + 1;
  });

  const chartData = Object.keys(stats).map((day) => ({
    day,
    count: stats[day],
  }));

  return (
    <div className="container">
      <h1>Analytics</h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
