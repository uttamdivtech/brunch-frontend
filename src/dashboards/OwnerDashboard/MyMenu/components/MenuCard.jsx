const MenuCard = ({ item, onEdit, onDelete, showActions = true }) => {
  // Destructure fields from API response. Assumptions:
  // - `images` is an array of objects where the first item's `url` is the main image
  // - `offer` is a percentage (e.g. 10 means 10% off). If that's not the case, adjust accordingly.
  const {
    name,
    description,
    price = 0,
    offer = 0,
    images,
    category,
    type,
    available = true,
    rating,
    reviewCount,
  } = item || {};

  const imageUrl = images?.[0]?.url || item.images?.[0]?.url || '';
  const categoriesArray = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];
  const types = Array.isArray(type) ? type.join(', ') : type;

  const getCategoryBadgeClass = (cat) => {
    const key = (cat || '')
      .toString()
      .toLowerCase()
      .replace(/[-_]/g, ' ')
      .trim();

    // Vegetarian (green) — matches 'veg', 'vegetarian' but not 'non veg'
    if (
      (key.includes('veg') || key.includes('vegetarian')) &&
      !key.includes('non')
    ) {
      return 'bg-green-100 text-green-800';
    }

    // Non-vegetarian (red) — matches 'non veg', 'non-veg', 'non vegetarian', etc.
    if (
      key.includes('non') &&
      (key.includes('veg') || key.includes('vegetarian'))
    ) {
      return 'bg-red-100 text-red-800';
    }

    // Fallback neutral badge
    return 'bg-gray-100 text-gray-700';
  };

  const hasOffer = typeof offer === 'number' && offer > 0;
  const discountedPrice = hasOffer
    ? +(price - price * (offer / 100)).toFixed(2)
    : null;

  const formatPrice = (val) => {
    if (typeof val !== 'number') return '-';
    return `₹${val.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name || 'menu item'}
          onError={(e) => (e.target.src = imageUrl)}
          className="h-full w-full object-cover"
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {available ? (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Unavailable
            </span>
          )}

          {hasOffer && (
            <span className="bg-yellow-400 text-[#5b3b00] text-xs px-2 py-1 rounded-full">
              {offer}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
              {name}
            </h3>

            <div className="flex items-center gap-2 text-sm mb-2">
              {categoriesArray.length > 0 &&
                categoriesArray.map((cat, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded ${getCategoryBadgeClass(
                      cat
                    )}`}
                  >
                    {cat}
                  </span>
                ))}

              {types && (
                <span className="px-2 py-1 bg-gray-100 rounded text-gray-500">
                  {types}
                </span>
              )}
            </div>

            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="text-right">
            {hasOffer ? (
              <div>
                <div className="text-blue-600 font-semibold text-lg">
                  {formatPrice(discountedPrice)}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(price)}
                </div>
              </div>
            ) : (
              <div className="text-blue-600 font-medium text-lg">
                {formatPrice(price)}
              </div>
            )}

            {/* Rating */}
            <div className="mt-3 text-sm text-gray-600 flex items-center justify-end gap-2">
              <span className="font-medium text-yellow-500">
                {rating ? '★' : '☆'}
              </span>
              <span>{rating ? rating.toFixed(1) : 'N/A'}</span>
              <span className="text-gray-400">({reviewCount ?? 0})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={() => onEdit && onEdit(item)}
            className="flex-1 px-4 py-2 text-[#662222] bg-[#F5DAA7] hover:bg-[#e0c28a] rounded-lg transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete && onDelete(item)}
            className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
