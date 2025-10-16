import { Link, useNavigate } from 'react-router-dom';
import { MdHome, MdArrowBack } from 'react-icons/md';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-gray-700">
      <h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-8xl font-extrabold text-[var(--color-primary)]"
      >
        404
      </h1>

      <h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold mt-4"
      >
        Oops! Page not found
      </h2>

      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you’re looking for doesn’t exist or might have been moved.
      </p>

      <div className="mt-6 flex gap-4">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-dark)] transition"
        >
          <MdHome className="mr-2 text-xl" />
          Back to Home
        </Link>

        {/* Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-5 py-2.5 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
        >
          <MdArrowBack className="mr-2 text-xl" />
          Go Back
        </button>
      </div>
    </div>
  );
};
