import React from "react";

interface DashboardHeaderProps {
  name?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name }) => (
  <div>
    <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
    <p className="mt-2 text-lg text-gray-600">
      Welcome back, <span className="font-semibold text-emerald-600">{name}</span> 👋
    </p>
  </div>
);

export default DashboardHeader;
