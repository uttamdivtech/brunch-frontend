import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import { resetPasswordSchema } from '../schemas/YupValidationSchema';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export const ResetPassword = () => {
  const { token } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await API.post(
          `/user/reset-password/${token}`,
          values
        );
        toast.success(response.data.message || 'Password reset successful!');
        navigate('/');
        setIsModalOpen(false);
      } catch (error) {
        console.error(
          'Reset password error:',
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message || 'Something went wrong. Try again.'
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(true)}
      className="fixed inset-0 z-50 overflow-y-auto w-full bg-cover"
      style={{
        backgroundImage: "url('/images/fresh-gourmet-salad-plate.jpg')",
      }}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity z-40" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="relative z-50 w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 md:p-10">
          {/* Title */}
          <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mb-6 text-center text-sm text-gray-600 md:text-base">
            Enter your new password below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter new password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-(--color-secondary) focus:ring-2 focus:ring-[#7e292894] focus:outline-none placeholder:text-xs"
              />

              {errors.password && touched.password && (
                <p className="text-red-700 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm new password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-(--color-secondary) focus:ring-2 focus:ring-[#7e292894] focus:outline-none placeholder:text-xs"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="cursor-pointer absolute right-2 top-11 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
              >
                {isPasswordVisible ? (
                  <IoEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </button>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-(--color-primary) hover:bg-(--color-secondary) text-white font-semibold rounded-md transition"
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-(--color-primary) hover:underline font-semibold transition-colors flex items-center justify-center"
            >
              ← Back to Sign In
            </Link>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
