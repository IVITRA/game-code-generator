import React from 'react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/80 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300 transform scale-95 group-hover:scale-100"></div>
      
      <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 text-blue-400 transition-colors duration-300 group-hover:text-blue-300 transform group-hover:scale-110">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;