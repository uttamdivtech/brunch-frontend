import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoClose, IoEye, IoEyeOff } from 'react-icons/io5';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/YupValidationSchema';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const SignUp = ({
  isModalOpen,
  setIsModalOpen,
  switchToSignIn,
  switchToOwnerSignUp,
}) => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await API.post('/user/signup', values);
        sessionStorage.setItem('token', response.data.user.token);
        toast.success(response.data.message || 'User registration successful!');
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
        setLoading(false);
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
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="relative z-50 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out md:flex-row">
          {/* Left Side - Image */}
          <div
            className="relative hidden w-full flex-1 bg-cover bg-center md:block"
            style={{ backgroundImage: "url('/images/item-indian-food.jpg')" }}
          />

          {/* Right Side - Form */}
          <div className="w-full flex-1 p-8 md:p-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-(-color-primary)"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900 md:text-left">
              Sign Up
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
              </div>
              {renderInput('email', 'Email Address', 'email')}
              {renderInput('password', 'Password', 'password', true)}

              <button
                type="submit"
                className="cursor-pointer w-full rounded-md py-3 text-white font-semibold shadow-md bg-(--color-primary) hover:bg-(--color-secondary) transition"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <div className="flex flex-col gap-1 justify-between items-center mt-6 md:flex-row">
              <p className="text-center text-gray-600 text-xs md:text-left">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={switchToSignIn}
                  className="cursor-pointer font-semibold text-sm text-(--color-primary) hover:underline"
                >
                  Sign In
                </button>
              </p>
              <p className="text-center text-gray-600 text-xs md:text-left">
                Sign up as{' '}
                <button
                  type="button"
                  onClick={switchToOwnerSignUp}
                  className="cursor-pointer font-semibold text-sm text-(--color-primary) hover:underline"
                >
                  Owner
                </button>
              </p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SignUp;
