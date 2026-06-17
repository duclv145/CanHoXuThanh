"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart({
  data,
}: {
  data: { month: string; value: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0C0C0C" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#0C0C0C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EFEAE0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#928B7B" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#928B7B" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: "#928B7B", strokeWidth: 1, strokeDasharray: "4 4" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #EFEAE0",
              fontSize: 13,
              boxShadow: "0 12px 40px -16px rgba(12,12,12,0.18)",
            }}
            labelStyle={{ color: "#0C0C0C", fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0C0C0C"
            strokeWidth={2.5}
            fill="url(#rev)"
            dot={false}
            activeDot={{ r: 4, fill: "#0C0C0C" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
