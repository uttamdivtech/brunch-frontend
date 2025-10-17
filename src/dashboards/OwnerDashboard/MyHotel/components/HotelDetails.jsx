import { MdStar, MdBed } from 'react-icons/md';
import Loader from '../../../../components/common/Loader';

const HotelDetails = ({ hotel, onEdit, isLoading }) => {
  const fullAddress = `
  ${hotel.address || ''},
  ${hotel.street || ''},
  ${hotel.city || ''},
  ${hotel.state || ''},
  ${hotel.pin || ''},
  ${hotel.country || ''}`
    .replace(/, /g, ' ')
    .trim();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-amber-400" size={20} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <MdStar
            key={i}
            className="text-amber-400"
            size={20}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        );
      } else {
        stars.push(<MdStar key={i} className="text-stone-300" size={20} />);
      }
    }
    return stars;
  };

  const vacancyClass = hotel.vacancy
    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
  const vacancyText = hotel.vacancy ? 'Available' : 'Occupied';

  const imageUrl = hotel.images?.[0]?.url;
  const defaultImageUrl =
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  if (isLoading) return <Loader fullScreen={true} />;

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      {/* Hero */}
      {hotel ? (
        <div className="relative h-52 w-full">
          <img
            src={imageUrl || defaultImageUrl}
            alt={hotel?.name || 'Hotel Image'}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = imageUrl ? 'none' : 'block';
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-balance text-2xl font-semibold text-white drop-shadow">
                {hotel?.name}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-800 shadow-sm">
                  {renderStars(hotel?.rating)}
                  <span className="ml-1 text-stone-600">
                    ({hotel?.rating}/5)
                  </span>
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${vacancyClass}`}
                >
                  <MdBed className="mr-1" size={14} />
                  {vacancyText}
                </span>
              </div>
            </div>
            <span className="inline-flex rounded-full bg-amber-100/90 px-3 py-1 text-xs font-medium text-amber-800 shadow">
              {hotel.category}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-stone-100 bg-stone-50/60 px-6 py-4">
          <h2 className="text-xl font-semibold text-stone-900">
            {hotel?.name || 'Loading Hotel Details...'}
          </h2>
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            {hotel?.category || 'N/A'}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="space-y-6 px-6 py-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Hours
            </p>
            <p className="mt-1 text-stone-800">
              <span className="font-semibold">{hotel.openingTime}</span> –{' '}
              <span className="font-semibold">{hotel.closingTime}</span>
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Address
            </p>
            <p className="mt-1 text-pretty text-stone-800">{fullAddress}</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Status
            </p>
            <p className="mt-1">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${vacancyClass}`}
              >
                <MdBed className="mr-1" size={14} />
                {vacancyText}
              </span>
            </p>
          </div>
        </div>

        {/* Description */}
        <section>
          <h3 className="mb-2 border-b border-stone-200 pb-2 text-sm font-semibold tracking-wide text-stone-700">
            Description
          </h3>
          <p className="leading-relaxed text-stone-700">{hotel.description}</p>
        </section>

        {/* Actions */}
        <div className="pt-2">
          <button
            onClick={onEdit}
            className="inline-flex w-full items-center justify-center rounded-xl bg-(--color-primary) hover:bg-(--color-secondary) px-4 py-2 font-medium text-white shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          >
            Edit Hotel Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default HotelDetails;
