import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates } from '../features/candidates/candidateSlice';
import CandidateCard from '../components/CandidateCard';
import axios from 'axios';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: candidates, status } = useSelector((state) => state.candidates);
  const [metrics, setMetrics] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      await axios.delete(`http://localhost:5000/candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(fetchCandidates());
      fetchMetrics();
    }
  };

  useEffect(() => {
    dispatch(fetchCandidates());
    fetchMetrics();
  }, [dispatch]);

  const fetchMetrics = async () => {
    const res = await axios.get('http://localhost:5000/candidates/metrics/stats', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setMetrics(res.data);
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`http://localhost:5000/candidates/${id}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(fetchCandidates());
    fetchMetrics();
  };

  const chartData = metrics
    ? Object.entries(metrics).map(([key, value]) => ({ name: key, value }))
    : [];

  return (
    <div className="flex p-4 space-x-4">
      <div className="w-1/4">
        <h1 className="text-xl font-bold mb-2">Referred Candidates</h1>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          candidates.map((c) => (
            <CandidateCard
              key={c._id}
              candidate={c}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <div className="w-3/4 bg-gray-50 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Metrics Overview</h2>
          <select
            className="border rounded px-2 py-1"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>

        {metrics ? (
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="80%" height="100%">
              {chartType === 'bar' && (
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              )}

              {chartType === 'line' && (
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              )}

              {chartType === 'pie' && (
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        ) : (
          <p>Loading metrics...</p>
        )}

      </div>
    </div>
  );
}
