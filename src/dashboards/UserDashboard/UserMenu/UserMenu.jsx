import React, { useState, useEffect, useContext } from 'react';
import API from '../../../utils/api';
import Loader from '../../../components/common/Loader';
import MenuList from '../../../dashboards/OwnerDashboard/MyMenu/components/MenuList';
import { LoadingContext } from '../../../contexts/ContextCreator';

const UserMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);
      try {
        const userMenuRes = await API.get('/menu/all-menus');
        setMenuItems(userMenuRes.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [setIsLoading]); // Empty dependency array means this runs once on mount

  if (isLoading) return <Loader fullScreen={true} />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Our Menu</h1>
        <p className="text-gray-600 mt-2">
          Explore our delicious selection of dishes and drinks.
        </p>
      </header>

      {/* Reuse the owner MenuList/MenuCard components for consistent UI. */}
      <div className="mb-6">
        <MenuList
          menuItems={menuItems}
          onEdit={() => {}}
          onDelete={() => {}}
          showActions={false}
        />
      </div>
      {menuItems.length === 0 && (
        <div className="text-center py-12 mt-8 bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-500 text-lg font-medium">
            No menu items available right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
