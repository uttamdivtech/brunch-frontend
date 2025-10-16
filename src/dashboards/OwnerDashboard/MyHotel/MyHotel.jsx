import { useEffect, useState } from 'react';
import EditHotel from './components/EditHotel';
import CreateHotel from './components/CreateHotel';
import HotelDetails from './components/HotelDetails';

import API from '../../../utils/api';
import Loader from '../../../components/common/Loader';

const MyHotel = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const res = await API.get('/owner/hotel-description');
        if (res.data.success && res.data.data) {
          setHotel(res.data.data);
        }
      } catch (error) {
        console.error(
          'Error fetching hotel details:',
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, []);

  const handleCreate = (newHotel) => {
    setHotel(newHotel);
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedHotel) => {
    setHotel(updatedHotel);
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  if (loading) return <Loader fullScreen={true} />;

  return (
    <main className="min-h-screen bg-gray-100/80">
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {!hotel ? (
            <div className="animate-fade-in rounded-2xl bg-white shadow-sm">
              <CreateHotel
                onSubmit={handleCreate}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : isEditing ? (
            <div className="animate-fade-in rounded-2xl bg-white shadow-sm">
              <EditHotel
                hotel={hotel}
                onSubmit={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <div className="animate-fade-in rounded-2xl bg-white shadow-sm">
              <HotelDetails
                hotel={hotel}
                onEdit={handleEdit}
                loading={loading}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyHotel;
