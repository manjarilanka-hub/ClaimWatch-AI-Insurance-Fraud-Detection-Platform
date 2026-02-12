
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 border-l-4 border-green-700 pl-4">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600 max-w-3xl leading-relaxed">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
