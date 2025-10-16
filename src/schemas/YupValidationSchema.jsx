import * as Yup from 'yup';

export const signInSchema = () => {
  const schema = {
    emailOrUsername: Yup.string()
      .required('Username or email is required')
      .test(
        'is-valid-username-or-email',
        'Invalid username or email',
        function (value) {
          if (!value) return false;

          // Email pattern
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          // Username pattern: letters/numbers + may include #, @, _, $, %, &, * (like love#lv8439)
          const usernameRegex = /^[a-zA-Z0-9._@#$%&*]+$/;

          return emailRegex.test(value) || usernameRegex.test(value);
        }
      ),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
      .required('Password is required'),
  };
  return Yup.object().shape(schema);
};

export const signUpSchema = () => {
  const schema = {
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
      .required('Password is required'),
    role: Yup.string().oneOf(['user'], 'Role must be user').required(),
  };
  return Yup.object().shape(schema);
};

export const forgotPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });
};

export const ownerSignUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
    .required('Password is required'),
  license: Yup.string()
    .trim()
    .min(5, 'License number must be at least 5 characters')
    .required('License number is required'),
  gstNo: Yup.string()
    .trim()
    .min(5, 'GST number must be at least 5 characters')
    .required('GST number is required'),
  role: Yup.string().oneOf(['owner'], 'Role must be owner').required(), // Pre-set to owner
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const menuSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Menu item name must be at least 2 characters')
    .required('Menu item name is required'),
  type: Yup.array().required('Cuisine type is required'),
  category: Yup.array()
    .of(
      Yup.string().oneOf(['veg', 'non-veg'], 'Category must be veg or non-veg')
    )
    .min(1, 'At least one category is required')
    .required('Category is required'),
  price: Yup.number()
    .min(0.01, 'Price must be greater than 0')
    .required('Price is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  offer: Yup.number()
    .min(0, 'Offer amount cannot be negative')
    .required('Offer amount is required'),
  available: Yup.boolean().required('Availability status is required'),
  images: Yup.mixed()
    .nullable() // Allow null/optional
    .test(
      'is-image-file',
      'Only image files (JPG, PNG, GIF, etc.) are allowed.',
      function (value) {
        // Skip if no file
        if (!value) return true;
        // Check if it's a File object
        if (value instanceof File) {
          const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
          ];
          if (!allowedMimeTypes.includes(value.type)) {
            return false;
          }
          // Check file size (max 10MB)
          const maxSize = 10 * 1024 * 1024; // 10MB
          if (value.size > maxSize) {
            return this.createError({
              message: `Image must be less than 10MB.`,
            });
          }
        }
        return true; // Pass
      }
    ),
});

export const hotelSchema = Yup.object({
  name: Yup.string().required('Hotel name is required'),
  openingTime: Yup.string().required('Opening time is required'),
  closingTime: Yup.string().required('Closing time is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pin: Yup.string()
    .required('PIN code is required')
    .matches(/^\d{6}(-\d{5})?$/, 'Invalid PIN format'),
  country: Yup.string().required('Country is required'),
  category: Yup.string().required('Category is required'),
  image: Yup.mixed()
    .nullable() // Allow null/optional
    .test(
      'is-image-file',
      'Only image files (JPG, PNG, GIF, etc.) are allowed. PDFs are not supported.',
      function (value) {
        // Skip if no file
        if (!value) return true;
        // Check MIME type (most reliable for client-side)
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(value.type)) {
          return false; // Fail validation
        }
        // Optional: Check file size (e.g., max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (value.size > maxSize) {
          return this.createError({ message: `Image must be less than 10MB.` });
        }
        return true; // Pass
      }
    ),
  vacancy: Yup.boolean(),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
});
