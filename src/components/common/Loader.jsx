// File: components/Loader.jsx

import { FaSpinner } from 'react-icons/fa'; // Spinning icon ke liye

/**
 * A reusable, centered loader component.
 * @param {string} size - The size of the spinner (e.g., 'text-xl', 'text-4xl').
 * @param {string} color - The color of the spinner (e.g., 'text-rose-500', 'text-stone-400').
 * @param {boolean} fullScreen - If true, occupies the entire viewport.
 */
const Loader = ({
  size = 'text-3xl',
  color = 'text-rose-500',
  fullScreen = false,
}) => {
  // Agar fullScreen true hai, toh poori screen cover karega.
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'
    : 'flex items-center justify-center py-8';

  return (
    <div className={containerClasses} aria-live="polite" aria-busy="true">
      <FaSpinner className={`animate-spin ${size} ${color}`} />
      {/* Optional text to provide context */}
      {/* <p className="ml-2 text-base text-stone-600">Loading data...</p> */}
    </div>
  );
};

export default Loader;
