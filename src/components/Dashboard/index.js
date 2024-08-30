import React from "react";
import "./index.css";
import { RxDotFilled } from "react-icons/rx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

const Dashboard = () => {
  // Data for Line Chart
  const lineChartData = [
    {
      week: "6/30/2024 - 7/6/2024",
      orders: 4,
      sales: 1404,
    },
    {
      week: "7/7/2024 - 7/13/2024",
      orders: 2,
      sales: 800,
    },
    {
      week: "7/21/2024 -7/27/2024",
      orders: 2,
      sales: 450,
    },
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="desc">{label}</p>
          <p className="desc">
            <RxDotFilled color="#f1953b" size={20} />
            {`Orders - ${payload[0].value}`}
          </p>
          <p className="desc">
            <RxDotFilled color="#4ba6a9" size={20} />
            {`Sales - ${payload[1].value}`}
          </p>
          <p className="desc">
            <RxDotFilled color="#000000" size={20} />
            {`Avg Order Value - ${(payload[1].value / payload[0].value).toFixed(
              2
            )}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const getFormattedValue = (value) => {
    if (value > 1000) {
      return (value / 1000).toString() + "K";
    } else {
      return value.toString();
    }
  };

  // Data for Pie Chart

  const pieLegend = [
    {
      name: "WooCommerce Store",
      color: "#fa7e7e",
    },
    {
      name: "Shopify Store",
      color: "#2cded5",
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (!percent) return null;
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight={600}
      >{`${(percent * 100).toFixed(1)}%`}</text>
    );
  };
  const CustomLabel = ({ viewBox }) => {
    const { cx, cy } = viewBox;
    return (
      <>
        <text x={cx - 15} y={cy - 5}>
          <tspan
            style={{
              fontSize: "14px",
              fill: "#2b2a2a",
              fontFamily: "Roboto",
            }}
          >
            Total
          </tspan>
        </text>
        <text x={cx - 18} y={cy + 22}>
          <tspan
            style={{
              fontWeight: 700,
              fontSize: "20px",
              fill: "#000000",
              fontFamily: "Roboto",
            }}
          >
            2659
          </tspan>
        </text>
      </>
    );
  };

  const pieChartData = [
    {
      name: "Shopify Store",
      value: 1175.278,
      color: "#2cded5",
    },
    {
      name: "WooCommerce Store",
      value: 1483.722,
      color: "#fa7e7e",
    },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-container">
        <div className="chart-wrapper">
          <h3>
            Sales vs Orders <i className="bi bi-exclamation-circle"></i>
          </h3>
          <ResponsiveContainer aspect={2}>
            <LineChart
              width={700}
              height={350}
              data={lineChartData}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="left-axis"
                tickFormatter={getFormattedValue}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                yAxisId="right-axis"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={46} />
              <Line
                yAxisId="right-axis"
                type="monotone"
                dataKey="orders"
                stroke="#f1953b"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="left-axis"
                type="monotone"
                dataKey="sales"
                stroke="#4ba6a9"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper1">
          <h3>
            Portion of Sales <i className="bi bi-exclamation-circle"></i>
          </h3>
          <ResponsiveContainer aspect={1}>
            <PieChart width={550} height={350}>
              <Legend
                verticalAlign="bottom"
                height={10}
                iconType="circle"
                iconSize={15}
                wrapperStyle={{ fontSize: "14px" }}
                payload={pieLegend.map((item) => ({
                  id: item.name,
                  value: `${item.name}`,
                  color: `${item.color}`,
                }))}
              />
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                startAngle={-270}
                endAngle={90}
                stroke="none"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                <Label content={<CustomLabel />} position="center" />
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieChartData[index].color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;