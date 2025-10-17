import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useFormik } from 'formik';
import { IoClose, IoEye, IoEyeOff } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { ownerSignUpSchema } from '../schemas/YupValidationSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../utils/api';
import { SubmittingContext } from '../contexts/ContextCreator';

export const OwnerSignUp = ({
  isModalOpen,
  setIsModalOpen,
  switchToSignIn,
  switchToSignUp,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isSubmitting, setIsSubmitting } = useContext(SubmittingContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      license: '',
      gstNo: '',
      role: 'owner', // Pre-set for owners
    },
    validationSchema: ownerSignUpSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await API.post('/user/signup', values);
        toast.success(
          response.data.message || 'Owner registration successful!'
        );

        if (response.data.user.role === 'user') {
          navigate('/user/dashboard');
        } else if (response.data.user.role === 'owner') {
          navigate('/owner/dashboard');
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error('Signup error:', error.response?.data || error.message);
        toast.error(
          error.response?.data?.error ||
            'Something went wrong. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  const renderInput = (id, label, type = 'text', isPassword = false) => (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
        id={id}
        name={id}
        value={values[id]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={isPassword ? '********' : `Enter your ${id}`}
        className="w-full rounded-md border border-gray-300 px-4 py-1.5 text-gray-900 placeholder-gray-400
          focus:border-(--color-secondary) focus:ring-2 focus:ring-[#7e292894] focus:outline-none transition placeholder:text-xs"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="cursor-pointer absolute right-2 top-11 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
        </button>
      )}
      {errors[id] && touched[id] && (
        <p className="text-red-700 text-xs ml-1">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity z-40" />

      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="relative z-50 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out md:flex-row">
          {/* Left Side - Image */}
          <div
            className="relative hidden w-full flex-1 bg-cover bg-center md:block"
            style={{
              backgroundImage: "url('/images/owner.png')",
            }}
          />

          {/* Right Side - Form */}
          <div className="w-full flex-1 p-8 md:p-10">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-(--color-primary) transition-colors"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900 md:text-left">
              Owner Sign Up
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
              </div>
              {renderInput('email', 'Email Address', 'email')}
              {renderInput('password', 'Password', 'password', true)}
              {renderInput('license', 'License Number')}
              {renderInput('gstNo', 'GST Number')}

              {/* Hidden Role Field (pre-set to owner) */}
              <input type="hidden" name="role" value={values.role} />

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full rounded-md py-3 text-white font-semibold shadow-md bg-(--color-primary) hover:bg-(--color-secondary) focus:outline-none focus:ring-4 focus:ring-[#7e292894] transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up as Owner'}
              </button>
            </form>

            {/* Footer */}
            <p className="flex flex-col items-center mt-6 text-center text-gray-600 text-xs md:flex-row md:gap-1 md:text-left">
              Signing up as a user instead?{' '}
              <span>
                <button
                  type="button"
                  onClick={switchToSignUp}
                  className="font-semibold text-(--color-primary) text-sm hover:underline cursor-pointer"
                >
                  Sign Up
                </button>{' '}
                |{' '}
                <button
                  type="button"
                  onClick={switchToSignIn}
                  className="font-semibold text-(--color-primary) text-sm hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            </p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
