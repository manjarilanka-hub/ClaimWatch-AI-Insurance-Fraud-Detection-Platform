
import React from 'react';

interface Props {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
}

const InfoCard: React.FC<Props> = ({ title, description, icon, tags }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="p-2 bg-green-50 text-green-700 rounded-lg">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
