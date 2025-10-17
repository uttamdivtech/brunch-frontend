import { useContext, useEffect, useState } from 'react';
import EditHotel from './components/EditHotel';
import CreateHotel from './components/CreateHotel';
import HotelDetails from './components/HotelDetails';
import API from '../../../utils/api';
import Loader from '../../../components/common/Loader';
import { LoadingContext } from '../../../contexts/ContextCreator';

const MyHotel = () => {
  const [hotel, setHotel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setIsLoading(true);
      try {
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
        setIsLoading(false);
      }
    };

    fetchHotelDetails();
  }, [setIsLoading]);

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

  if (isLoading) return <Loader fullScreen={true} />;

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
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyHotel;
