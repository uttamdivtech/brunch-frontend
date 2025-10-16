import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdShoppingCart,
  MdHistory,
  MdFavorite,
  MdPerson,
} from 'react-icons/md';

import { LoginContext } from '../../contexts/LoginProvider/LoginContext';

export const UserDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const { loggedInUser } = useContext(LoginContext);
  const navigate = useNavigate();

  // Simulate fetching user data on mount (replace with real API)
  useEffect(() => {
    if (!loggedInUser) {
      navigate('/'); // redirect to homepage if not logged in
      return;
    }

    // Fetch recent orders
    setRecentOrders([
      {
        id: '#ORD-001',
        date: '2024-01-15',
        items: 'Chicken Biryani x2',
        total: '45.00',
        status: 'Delivered',
      },
      {
        id: '#ORD-002',
        date: '2024-01-14',
        items: 'Veg Pizza x1',
        total: '28.50',
        status: 'Delivered',
      },
      {
        id: '#ORD-003',
        date: '2024-01-13',
        items: 'Burger Combo x3',
        total: '62.00',
        status: 'Pending',
      },
    ]);

    // Fetch recommendations (based on user history)
    setRecommendedItems([
      {
        name: 'Chicken Biryani',
        price: '₹12.99',
        image:
          'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpY2tlbiUyMEJpcnlhbml8ZW58MHx8MHx8fDA%3D',
      },
      {
        name: 'Veg Pizza',
        price: '₹10.99',
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
      },
    ]);

    if (loggedInUser.role === 'owner') {
      navigate('/owner/dashboard');
    }
  }, [loggedInUser, navigate]);

  if (!loggedInUser)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-(--color-secondary) to-(--color-primary) text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome Back, {loggedInUser.firstName}!
          </h1>
          <p className="text-xl opacity-90">
            Continue enjoying your favorite meals with us. Here's what's new for
            you.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <Link
            to="/order"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4"
          >
            <MdShoppingCart className="text-3xl text-[#ff5447ec]" />
            <div>
              <h3 className="font-semibold text-gray-900">Order Now</h3>
              <p className="text-gray-600">Quickly place your next order</p>
            </div>
          </Link>
          <Link
            to="/orders"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4"
          >
            <MdHistory className="text-3xl text-[#ff5447ec]" />
            <div>
              <h3 className="font-semibold text-gray-900">Order History</h3>
              <p className="text-gray-600">View your past orders</p>
            </div>
          </Link>
          <Link
            to="/favorites"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4"
          >
            <MdFavorite className="text-3xl text-[#ff5447ec]" />
            <div>
              <h3 className="font-semibold text-gray-900">Favorites</h3>
              <p className="text-gray-600">Your saved dishes</p>
            </div>
          </Link>
        </section>

        {/* Recent Orders */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <h2 className="px-6 py-4 bg-gray-50 border-b border-gray-200 text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#ff5447ec]">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <Link
              to="/orders"
              className="text-(--color-primary) hover:underline font-semibold"
            >
              View All Orders →
            </Link>
          </div>
        </section>

        {/* Recommended Items */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recommended for You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-[#ff584d] mb-4">
                    {item.price}
                  </p>
                  <button className="w-full py-2 bg-(--color-primary) text-white rounded hover:bg-(--color-secondary) transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Summary */}
        <section className="bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MdPerson className="mr-2 text-[#ff5447ec]" /> Profile
            </h3>
            <p>
              <strong>Email:</strong> {loggedInUser.email}
            </p>
            <p>
              <strong>Role:</strong> {loggedInUser.role}
            </p>
            <p>
              <strong>Loyalty Points:</strong> 150
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Saved Addresses
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Surat, Gujarat,India</li>
              <li>Una,Gujarat,India</li>
            </ul>
            <Link
              to="/profile"
              className="text-(--color-primary) hover:underline mt-4 inline-block"
            >
              Edit Profile →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
