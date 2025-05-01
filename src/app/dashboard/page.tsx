"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllBlogQuery } from "@/redux/features/blogs/blogApi";
import { useGetAllMessageQuery } from "@/redux/features/messages/messageApi";
import { useGetAllProjectQuery } from "@/redux/features/projects/projectApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Random colors for Pie Chart
const COLORS = ["#8884d8", "#82ca9d", "#FF8042"];

const DashboardHome = () => {
  const { data: blogs } = useGetAllBlogQuery(undefined);
  const { data: projects } = useGetAllProjectQuery(undefined);
  const { data: messages } = useGetAllMessageQuery(undefined);

  // Count total items
  const totalBlogs = blogs?.data?.length || 0;
  const totalProjects = projects?.data?.length || 0;
  const totalMessages = messages?.data?.length || 0;

  // Dummy timeline data (Replace this with real data when available)
  const timelineData = [
    { name: "Jan", blogs: 3, projects: 2, messages: 5 },
    { name: "Feb", blogs: 5, projects: 4, messages: 7 },
    { name: "Mar", blogs: 8, projects: 6, messages: 10 },
    { name: "Apr", blogs: 4, projects: 3, messages: 6 },
  ];

  return (
    <div className="space-y-6">
      {/* Line Chart: Blogs, Projects, Messages Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Content Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="blogs"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#FF8042"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart: Total Counts */}
      <Card>
        <CardHeader>
          <CardTitle>Total Content Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  name: "Total",
                  blogs: totalBlogs,
                  projects: totalProjects,
                  messages: totalMessages,
                },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="blogs" fill="#8884d8" />
              <Bar dataKey="projects" fill="#82ca9d" />
              <Bar dataKey="messages" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart: Content Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Blogs", value: totalBlogs },
                  { name: "Projects", value: totalProjects },
                  { name: "Messages", value: totalMessages },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
