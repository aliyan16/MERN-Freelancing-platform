import React, { useState } from "react";

interface BuyerFiltersProps {
  onFilter: (category: string) => void;
  categories: string[];
}

const BuyerFilters: React.FC<BuyerFiltersProps> = ({ onFilter, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex items-center gap-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">🔍 Filter Gigs:</h3>
      <select
        className="p-2 border border-gray-300 rounded-lg focus:ring-emerald-400 focus:border-emerald-400"
        value={selectedCategory}
        onChange={handleFilterChange}
      >
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default BuyerFilters;
