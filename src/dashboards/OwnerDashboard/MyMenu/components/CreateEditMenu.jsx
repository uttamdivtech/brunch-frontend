import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { menuSchema } from '../../../../schemas/YupValidationSchema';
import API from '../../../../utils/api';
import { toast } from 'react-toastify';

// Allowed cuisine types from backend
const allowedTypes = [
  'afghani',
  'american',
  'andhra',
  'bbq',
  'bengali',
  'beverages',
  'chinese',
  'continental',
  'dessert',
  'desserts',
  'drink',
  'fast food',
  'french',
  'goan',
  'greek',
  'gujarati',
  'hyderabadi',
  'italian',
  'japanese',
  'korean',
  'lebanese',
  'main course',
  'maharashtrian',
  'mexican',
  'mughlai',
  'north-indian',
  'punjabi',
  'rajasthani',
  'seafood',
  'south-indian',
  'spanish',
  'starter',
  'thai',
  'tibetan',
];

const allowedCategories = ['veg', 'non-veg'];

const CreateEditMenu = ({ isOpen, onClose, mode, item, onSubmit }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: ['starter'],
      category: ['veg'],
      price: 0,
      description: '',
      rating: 0,
      offer: 0,
      available: true,
      images: null,
    },
    validationSchema: menuSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (mode === 'create') {
        const { images, ...payload } = values;
        try {
          // 1️⃣ Upload image first
          let uploadedImage = null;
          if (images) {
            const imgForm = new FormData();
            imgForm.append('image', images);
            const imgRes = await API.post(
              `/image/image-upload?type=menu`,
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
              ? [{ imageId: uploadedImage.imageId, url: uploadedImage.url }]
              : [],
            // images: [uploadedImage.url, uploadedImage.imageId],
          };
          console.log('Final Payload:', finalPayload);

          // 3️⃣ Then create menu with uploaded image
          const menuRes = await API.post('/menu/menu-creation', finalPayload);
          console.log('Menu Created:', menuRes.data);

          // 4️⃣ Trigger callback & reset
          onSubmit(menuRes.data?.data);
          toast.success('Menu created successfully!');
          resetForm();
          setPreviewUrl(null);
        } catch (error) {
          console.error(
            'Error creating menu:',
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
          setSubmitting(false);
        }
      } else if (mode === 'edit') {
        try {
          const { images, ...payload } = values;

          // 1️⃣ Upload image first
          let updateUploadedImage = null;
          if (images && item.images?.[0]?.imageId) {
            const updateImgForm = new FormData();
            updateImgForm.append('image', images);
            const updateImgRes = await API.put(
              `/image/image-update/${item.images[0].imageId}?type=menu`,
              updateImgForm,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            );
            console.log('Image Upload Response:', updateImgRes.data);
            updateUploadedImage = updateImgRes.data?.data;
          }

          // 2️⃣ Normalize payload for backend
          const updatedPayload = {
            ...payload,
            images: updateUploadedImage
              ? [
                  {
                    url: updateUploadedImage.url,
                    imageId: updateUploadedImage.imageId,
                  },
                ]
              : [],
          };
          console.log('Updated Payload:', updatedPayload);

          // 3️⃣ Then update menu with uploaded image
          const updateMenuRes = await API.put(
            `/menu/menu-update/${item._id}`,
            updatedPayload
          );
          console.log('Menu Updated Response:', updateMenuRes.data);

          // 4️⃣ Trigger callback & reset
          onSubmit(updateMenuRes.data?.data);
          toast.success('Menu updated successfully!');
        } catch (error) {
          console.error(
            'Error updating menu:',
            error.response?.data || error.message
          );
          toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
          setSubmitting(false);
        }
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
    setFieldValue,
    setFieldError,
    setValues,
    setFieldTouched,
    isSubmitting,
    resetForm,
  } = formik;

  const initializeForm = useCallback(() => {
    if (isOpen && mode === 'edit' && item) {
      setValues({
        name: item.name || '',
        type: Array.isArray(item.type)
          ? item.type
          : item.type
          ? [item.type]
          : ['starter'],
        category: Array.isArray(item.category)
          ? item.category
          : item.category
          ? [item.category]
          : ['veg'],
        price: item.price || 0,
        description: item.description || '',
        rating: item.rating || 0,
        offer: item.offer || 0,
        available: item.available !== undefined ? item.available : true,
        images: item.images || null,
      });
      // preview: supports array of images or single url
      const previewFromItem = Array.isArray(item.images)
        ? item.images[0]?.url || item.images[0]
        : item.images;
      setPreviewUrl(previewFromItem || null);
    } else if (isOpen && mode === 'create') {
      resetForm();
      setPreviewUrl(null);
    }
  }, [isOpen, item, mode, setValues, resetForm]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFieldError('images', 'Only image files allowed');
      setFieldValue('images', null);
      setFieldTouched('images', true);
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setFieldError('images', 'Image must be <10MB');
      setFieldValue('images', null);
      setFieldTouched('images', true);
      return;
    }

    setFieldValue('images', file); // ✅ only once
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFieldValue('images', null);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity z-40" />
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogPanel className="relative z-50 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out md:flex-row">
          <div className="w-full flex-1 p-6 md:p-8">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-(--color-primary)"
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </button>

            <div className="mb-4 flex items-center gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  {mode === 'create'
                    ? 'Create New Menu Item'
                    : 'Edit Menu Item'}
                </h2>
                <p className="text-sm text-gray-500">
                  Add or update a menu item that customers will see.
                </p>
              </div>
            </div>

            {/* Removed unused status block */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100"
                />
                {previewUrl && (
                  <div className="relative mt-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-36 w-full object-contain rounded-md shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0.5 right-2 inline-flex items-center justify-center rounded-full text-xl text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {errors.images && touched.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., Classic Burger"
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white ${
                    errors.name && touched.name
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <select
                    name="type"
                    value={values.type[0] || ''}
                    onChange={(e) => setFieldValue('type', [e.target.value])}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.type && touched.type
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {allowedTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                  {errors.type && touched.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    step="0.01"
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.price && touched.price
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex gap-4">
                  {allowedCategories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={values.category[0] === cat}
                        onChange={() => setFieldValue('category', [cat])}
                        onBlur={() => setFieldTouched('category', true)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {cat.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>

                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="0.0 - 5.0"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.rating && touched.rating
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.rating && touched.rating && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer (₹)
                  </label>
                  <input
                    type="number"
                    name="offer"
                    value={values.offer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    step="0.01"
                    min="0"
                    placeholder="Discount amount"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.offer && touched.offer
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.offer && touched.offer && (
                    <p className="text-red-500 text-sm mt-1">{errors.offer}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available
                  </label>
                  <select
                    name="available"
                    value={values.available ? 'true' : 'false'}
                    onChange={(e) =>
                      setFieldValue('available', e.target.value === 'true')
                    }
                    onBlur={() => setFieldTouched('available', true)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.available && touched.available
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                  {errors.available && touched.available && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.available}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Short description customers will see"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white ${
                    errors.description && touched.description
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }`}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-md font-semibold text-white shadow-md bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition disabled:opacity-50"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : mode === 'create'
                    ? 'Create'
                    : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateEditMenu;
