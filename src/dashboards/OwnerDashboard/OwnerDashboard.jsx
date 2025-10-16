import { useContext } from 'react';
import {
  MdShoppingCart,
  MdRestaurantMenu,
  MdInventory,
  MdLocalDining,
  MdAnalytics,
} from 'react-icons/md';
import { Line } from 'react-chartjs-2'; // For charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { LoginContext } from '../../contexts/LoginProvider/LoginContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const OwnerDashboard = () => {
  const { loggedInUser } = useContext(LoginContext);

  // Sample restaurant data
  const stats = [
    {
      title: "Today's Revenue",
      value: '$2,450',
      change: '+12%',
      icon: MdLocalDining,
      color: 'bg-red-500',
    },
    {
      title: 'Pending Orders',
      value: '23',
      change: '-5%',
      icon: MdShoppingCart,
      color: 'bg-yellow-500',
    },
    {
      title: 'Top Dish Sold',
      value: 'Chicken Biryani (45)',
      change: '+20%',
      icon: MdRestaurantMenu,
      color: 'bg-green-500',
    },
    {
      title: 'Low Stock Items',
      value: '5',
      change: '+2%',
      icon: MdInventory,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      items: 'Chicken Biryani x2',
      total: '45.00',
      status: 'Delivered',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      items: 'Veg Pizza x1',
      total: '28.50',
      // status: 'Preparing',
      status: 'Delivered',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      items: 'Burger Combo x3',
      total: '62.00',
      status: 'Delivered',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      items: 'Salad Bowl x1',
      total: '15.00',
      status: 'Cancelled',
    },
  ];

  // Chart data for daily sales
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [1200, 1900, 3000, 2500, 2800, 3500, 3200],
        borderColor: '#a04341',
        backgroundColor: 'rgba(160, 67, 65, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weekly Sales Trend' },
    },
    scales: { y: { beginAtZero: true } },
  };

  if (!loggedInUser)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-100/80">
      {/* Main Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Quick Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-1 ${
                      stat.change.startsWith('+')
                        ? 'text-green-600'
                        : 'text-[#ff5447ec]'
                    }`}
                  >
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full text-white`}>
                  <stat.icon className="text-xl" />
                </div>
              </div>
              {/* Progress Bar Example */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#ff5447ec] h-2 rounded-full"
                  style={{ width: '55%' }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        {/* Sales Chart & Menu Performance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MdAnalytics className="mr-2" /> Weekly Sales Trend
            </h3>
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Menu Items
            </h3>
            <ul className="space-y-3">
              {[
                'Chicken Biryani',
                'Veg Pizza',
                'Burger Combo',
                'Salad Bowl',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-[#a042410f] rounded-lg"
                >
                  <span className="text-gray-700">{item}</span>
                  <span className="text-[#ff5447ec] font-semibold">
                    {45 - index * 10} orders
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Recent Orders & Inventory Alerts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MdShoppingCart className="mr-2" /> Recent Orders
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
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
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.items}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Preparing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-[#ff5447ec]'
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
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Inventory Alerts
            </h3>
            <ul className="space-y-3">
              {['Onions', 'Chicken', 'Cheese', 'Flour', 'Tomatoes'].map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-[#a042410f] border-l-4 border-(--color-primary) rounded-r-lg"
                  >
                    <span className="text-gray-700">{item}</span>
                    <span className="text-[#ff5447ec] font-semibold">
                      Low Stock (12% left)
                    </span>
                  </li>
                )
              )}
            </ul>
            <button className="mt-4 w-full bg-(--color-primary) text-white py-2 rounded-lg hover:bg-(--color-secondary) transition">
              View Full Inventory
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
