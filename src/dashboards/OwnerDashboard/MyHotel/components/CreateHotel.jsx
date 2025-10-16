import { useFormik } from 'formik';
import { MdStar } from 'react-icons/md';
import { hotelSchema } from '../../../../schemas/YupValidationSchema';
import API from '../../../../utils/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

// isModal: when true, component renders inside a Headless UI Dialog
const CreateHotel = ({ onCancel, onSubmit }) => {
  const [preview, setPreview] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      openingTime: '',
      closingTime: '',
      address: '',
      street: '',
      city: '',
      state: '',
      pin: '',
      country: '',
      category: 'Luxury',
      images: null,
      vacancy: true,
      description: '',
      rating: 0,
    },
    validationSchema: hotelSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const { images, ...payload } = values;
      try {
        // 1️⃣ Upload image first
        let uploadedImage = null;
        if (images) {
          const imgForm = new FormData();
          imgForm.append('image', images);
          const imgRes = await API.post(
            '/image/image-upload?type=hotel',
            imgForm,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
          console.log('Image Upload Response:', imgRes.data);
          uploadedImage = imgRes.data?.data;
        }

        // 2️⃣ Normalize payload for backend
        const finalPayload = {
          ...payload,
          images: uploadedImage
            ? [{ url: uploadedImage.url, imageId: uploadedImage.imageId }]
            : [],
        };
        console.log('Final Payload:', finalPayload);

        // 3️⃣ Then create menu with uploaded image
        const hotelRes = await API.post('/owner/hotel-creation', finalPayload);
        console.log('Hotel Created:', hotelRes.data);

        // 4️⃣ Trigger callback & reset

        onSubmit(hotelRes.data?.hotel);
        toast.success('Hotel created successfully!');
        resetForm();
        setPreview(null);
      } catch (error) {
        console.error(
          'Error creating hotel:',
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || 'Something went wrong');
      } finally {
        setSubmitting(false);
        onCancel();
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = formik;

  const inputBase =
    'w-full rounded-xl border border-stone-300 bg-white/90 px-3 py-2 shadow-sm placeholder:text-stone-400 focus:border-rose-500 focus:ring-rose-500 outline-none transition';

  const labelBase = 'block text-sm font-medium text-stone-800 mb-1';
  const errorText = 'mt-1 text-sm text-rose-600';

  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFieldError('images', 'Only image files allowed');
      setFieldTouched('images', true);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFieldError('images', 'Image must be <10MB');
      setFieldTouched('images', true);
      return;
    }

    setFieldValue('images', file); // ✅ Important
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Create Your Hotel
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Provide details so guests can discover your property.
          </p>
        </div>
        <span className="hidden sm:inline-flex rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">
          New Listing
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section>
          <h3 className="mb-4 border-b border-stone-200 pb-2 text-sm font-semibold tracking-wide text-stone-700">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelBase}>Hotel Name</label>
              <input
                type="text"
                name="name"
                placeholder="The Grand Horizon Hotel"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.name && touched.name
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
                aria-invalid={Boolean(errors.name && touched.name)}
                aria-describedby={
                  errors.name && touched.name ? 'name-error' : undefined
                }
              />
              {errors.name && touched.name && (
                <p id="name-error" className={errorText}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}>Opening Time</label>
                <input
                  type="time"
                  name="openingTime"
                  value={values.openingTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputBase} ${
                    errors.openingTime && touched.openingTime
                      ? 'border-(--color-primary) bg-rose-50'
                      : ''
                  }`}
                />
                {errors.openingTime && touched.openingTime && (
                  <p className={errorText}>{errors.openingTime}</p>
                )}
              </div>
              <div>
                <label className={labelBase}>Closing Time</label>
                <input
                  type="time"
                  name="closingTime"
                  value={values.closingTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputBase} ${
                    errors.closingTime && touched.closingTime
                      ? 'border-(--color-primary) bg-rose-50'
                      : ''
                  }`}
                />
                {errors.closingTime && touched.closingTime && (
                  <p className={errorText}>{errors.closingTime}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}>Category</label>
                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputBase}`}
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Budget">Budget</option>
                  <option value="Mid-Range">Mid-Range</option>
                  <option value="Boutique">Boutique</option>
                </select>
                {errors.category && touched.category && (
                  <p className={errorText}>{errors.category}</p>
                )}
              </div>

              <div>
                <label className={labelBase}>Rating (0–5)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputBase} flex-1 ${
                      errors.rating && touched.rating
                        ? 'border-(--color-primary) bg-rose-50'
                        : ''
                    }`}
                  />
                  <MdStar className="ml-2 text-amber-400" size={20} />
                </div>
                {errors.rating && touched.rating && (
                  <p className={errorText}>{errors.rating}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Address Details */}
        <section>
          <h3 className="mb-4 border-b border-stone-200 pb-2 text-sm font-semibold tracking-wide text-stone-700">
            Address Details
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelBase}>Address</label>
              <input
                type="text"
                name="address"
                placeholder="01, Skyline Avenue"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.address && touched.address
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.address && touched.address && (
                <p className={errorText}>{errors.address}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className={labelBase}>Street</label>
              <input
                type="text"
                name="street"
                placeholder="near City Light"
                value={values.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.street && touched.street
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.street && touched.street && (
                <p className={errorText}>{errors.street}</p>
              )}
            </div>
            <div>
              <label className={labelBase}>City</label>
              <input
                type="text"
                name="city"
                placeholder="Denver"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.city && touched.city
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.city && touched.city && (
                <p className={errorText}>{errors.city}</p>
              )}
            </div>
            <div>
              <label className={labelBase}>State</label>
              <input
                type="text"
                name="state"
                placeholder="Colorado"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.state && touched.state
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.state && touched.state && (
                <p className={errorText}>{errors.state}</p>
              )}
            </div>
            <div>
              <label className={labelBase}>PIN Code</label>
              <input
                type="text"
                name="pin"
                placeholder="802002"
                value={values.pin}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.pin && touched.pin
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.pin && touched.pin && (
                <p className={errorText}>{errors.pin}</p>
              )}
            </div>
            <div>
              <label className={labelBase}>Country</label>
              <input
                type="text"
                name="country"
                placeholder="USA"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.country && touched.country
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.country && touched.country && (
                <p className={errorText}>{errors.country}</p>
              )}
            </div>
          </div>
        </section>

        {/* Additional Details */}
        <section>
          <h3 className="mb-4 border-b border-stone-200 pb-2 text-sm font-semibold tracking-wide text-stone-700">
            Additional Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelBase}>Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="A premium luxury hotel with skyline views and warm hospitality..."
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors.description && touched.description
                    ? 'border-(--color-primary) bg-rose-50'
                    : ''
                }`}
              />
              {errors.description && touched.description && (
                <p className={errorText}>{errors.description}</p>
              )}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-stone-800">
              <input
                type="checkbox"
                name="vacancy"
                checked={values.vacancy}
                onChange={handleChange}
                className="h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-rose-500"
              />
              Currently Vacant (Available)
            </label>
            <div>
              <label className={labelBase}>Hotel Image (Optional)</label>
              <div
                className={`flex items-center justify-center h-40 rounded-xl border-2 border-dashed p-4 cursor-pointer transition relative ${
                  errors.images && touched.images
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-stone-300'
                }`}
                onClick={() => document.getElementById('fileInput').click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  handleImageUpload(file);
                }}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering parent click
                        setPreview(null);
                        setFieldValue('images', null);
                        setFieldTouched('images', false);
                        setFieldError('images', undefined);
                      }}
                      className="absolute top-1 right-1 rounded-full bg-white/80 p-1 text-gray-700 hover:bg-gray-200 transition"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <p className="text-gray-400 text-center">
                    Drag & drop or click to upload
                  </p>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleImageUpload(e.currentTarget.files[0]);
                }}
              />
              {errors.images && touched.images && (
                <p className={errorText}>{errors.images}</p>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-stone-300 bg-white px-4 py-2 text-stone-700 shadow-sm transition hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-(--color-primary) hover:bg-(--color-secondary) px-4 py-2 font-medium text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Create Hotel
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateHotel;
