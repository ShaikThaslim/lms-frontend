// components/LoadingSpinner.jsx
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({
  size = 40,
  color = '#3b82f6',
  message = 'Loading, please wait...',
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 space-y-4">
      <Loader
        className="animate-spin"
        size={size}
        color={color}
        strokeWidth={2.5}
      />
      <p className="text-gray-700 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
