const menuItemData = {
  name: 'Spicy Veggie',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting.',
  price: '$14.50',
  image: '/images/curry.jpg',
};
const menuItems = Array.from({ length: 6 }, () => menuItemData);

const MenuItem = ({ name, description, price, image }) => (
  <div className="flex flex-col md:grid md:grid-cols-4 md:gap-4 lg:grid lg:grid-cols-4 lg:gap-5">
    <img
      src={image}
      alt={name}
      className="w-[500px] rounded-full md:w-[200px] lg:w-[200px]"
    />
    <div className="text-center mt-1 mb-3 md:col-span-3 md:text-left lg:col-span-3 ">
      <div className="flex flex-col justify-center gap-y-2">
        <h1 className="text-xl font-semibold uppercase md:text-xl lg:text-2xl">
          {name}
        </h1>
        <p className="font-light text-sm md:text-xs">{description}</p>
        <span className="font-bold text-xl md:text-base">{price}</span>
      </div>
    </div>
  </div>
);

export const DiscoverMenu = () => {
  return (
    <div className="bg-[url('/images/menu-indian-food-frame.jpg')] bg-cover flex justify-center">
      <div className="flex items-center py-20">
        <div className="bg-gray-100/80 text-[#2A3C40] py-2 px-6 md:px-9 lg:px-9">
          <div className="flex flex-col items-center mb-9 md:mb-1">
            <h1 className="font-dancing text-4xl md:text-7xl lg:text-7xl">
              Discover
            </h1>
            <h2 className="text-[#ad6c12] text-3xl uppercase leading-10 md:text-6xl md:leading-16 md:mb-10 lg:text-6xl lg:leading-16 lg:mb-10">
              OUR NEW MENU
            </h2>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-y-9 md:gap-x-0 md:mb-9 lg:grid lg:grid-cols-2 lg:gap-y-9 lg:gap-x-0 lg:mb-9">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
