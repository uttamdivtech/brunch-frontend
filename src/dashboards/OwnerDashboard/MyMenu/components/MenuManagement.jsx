import { useContext, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import MenuList from './MenuList';
import CreateEditMenu from './CreateEditMenu';
import DeleteConfirm from './DeleteConfirm';
import API from '../../../../utils/api';
import Loader from '../../../../components/common/Loader';
import { toast } from 'react-toastify';
import {
  LoadingContext,
  SubmittingContext,
} from '../../../../contexts/ContextCreator';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formType, setFormType] = useState('create');
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { isSubmitting, setIsSubmitting } = useContext(SubmittingContext);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setIsLoading(true);
      try {
        const menuRes = await API.get('/menu/all-menus');
        if (menuRes.data.success && menuRes.data.data) {
          setMenuItems(menuRes.data.data);
        }
      } catch (error) {
        console.error(
          'Error fetching hotel details:',
          error.response?.data || error.message
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelDetails();
  }, [setIsLoading]);

  const filteredMenuItems = menuItems.filter((item) => {
    const name = item?.name || '';
    const description = item?.description || '';
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    // Support Type being an array or a string
    const matchesType =
      filterType === 'All' ||
      (Array.isArray(item?.type)
        ? item.type.includes(filterType)
        : item?.type === filterType);

    return matchesSearch && matchesType;
  });

  const switchForm = (type) => {
    setFormType(type);
    setIsCreateEditModalOpen(true);
  };

  const openCreateModal = () => {
    switchForm('create');
    setSelectedItem(null);
    setIsCreateEditModalOpen(true);
  };

  const openEditModal = (item) => {
    switchForm('edit');
    setSelectedItem(item);
    setIsCreateEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // formData is expected to be the created/updated menu item
      if (formType === 'create') {
        setMenuItems((prev) => [formData, ...prev]);
      } else {
        // replace the edited item by _id
        setMenuItems((prev) =>
          prev.map((it) => (it._id === formData._id ? formData : it))
        );
      }
      setIsCreateEditModalOpen(false);
      setSelectedItem(null);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      const deleteImageRes = await API.delete(
        `/image/image-delete/${selectedItem.images[0].imageId}?type=menu`
      );
      const deleteMenuRes = await API.delete(
        `/menu/menus-delete/${selectedItem._id}`
      );

      console.log(deleteMenuRes, deleteImageRes, 'deleteMenuRes');

      setMenuItems((prev) =>
        prev.filter((item) => {
          return item._id !== selectedItem._id;
        })
      );
      toast.success(
        deleteMenuRes.data.message || 'Menu item deleted successfully!'
      );
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error(
        'Error deleting menu item:',
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCreateEditModal = () => {
    setIsCreateEditModalOpen(false);
    setSelectedItem(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) return <Loader fullScreen={true} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center md:justify-start gap-3">
            Menu Management
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Manage your restaurant's menu items efficiently. Create, edit and
            organize your offerings.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-auto flex-1">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition bg-white"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          >
            <option value="All">All Categories</option>
            <option value="starter">Starter</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white shadow-md bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition"
          >
            <PlusIcon className="h-5 w-5" /> Create Menu Item
          </button>
        </div>

        {/* Menu List */}
        <MenuList
          menuItems={filteredMenuItems}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        {/* Modals */}
        <CreateEditMenu
          isOpen={isCreateEditModalOpen}
          onClose={closeCreateEditModal}
          mode={formType}
          item={selectedItem}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <DeleteConfirm
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          itemName={selectedItem?.name}
          onConfirm={handleDelete}
          isSubmitting={isSubmitting}
        />

        {/* Empty State */}
        {filteredMenuItems.length === 0 && (
          <div className="text-center py-12 mt-8 bg-white shadow-lg rounded-lg p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p className="text-gray-500 text-lg font-medium">
              No menu items found. Create one to get started!
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 px-6 py-3 rounded-md font-semibold text-white shadow-md bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition"
            >
              Create Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
