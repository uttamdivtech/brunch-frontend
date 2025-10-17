import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { forgotPasswordSchema } from '../schemas/YupValidationSchema';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { SubmittingContext } from '../contexts/ContextCreator';

const ForgotPassword = ({ isModalOpen, setIsModalOpen, switchToSignIn }) => {
  const { isSubmitting, setIsSubmitting } = useContext(SubmittingContext);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await API.post('/user/forgot-password', values);
        toast.success(
          response.data.message || 'Reset link sent to your email!'
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error(
          'Forgot password error:',
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message ||
            'Something went wrong. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity z-40" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="relative z-50 w-full max-w-xl rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out p-8 md:p-10">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-(--color-primary)"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>

          {/* Title */}
          <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900">
            Forgot Password?
          </h2>

          {/* Description */}
          <p className="mb-6 text-center text-sm text-gray-600 md:text-base">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-1.5 text-gray-900 placeholder-gray-400
                  focus:border-(--color-secondary) focus:ring-2 focus:ring-[#7e292894] focus:outline-none transition placeholder:text-xs"
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs ml-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full rounded-md py-3 text-white font-semibold shadow-md bg-(--color-primary) hover:bg-(--color-secondary) transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600 text-xs">
            Remember your password?{' '}
            <button
              type="button"
              onClick={switchToSignIn}
              className="cursor-pointer font-semibold text-sm text-(--color-primary) hover:underline"
            >
              Sign In
            </button>
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ForgotPassword;
