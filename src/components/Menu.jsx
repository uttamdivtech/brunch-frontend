const menuItems = [
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
  {
    image: '/images/curry.jpg',
    alt: 'Menu plate',
    name: 'Curry Spicy',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$16.50',
  },
  {
    image: '/images/curry.jpg',
    alt: 'Menu plate',
    name: 'Curry Spicy',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$16.50',
  },
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
  {
    image: '/images/plate.jpg',
    alt: 'Menu plate',
    name: 'Spicy Veggie',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting.',
    price: '$14.50',
  },
];
const ItemImage = ({ image, alt }) => (
  <img
    src={image}
    alt={alt}
    className="size-11/12 sm:size-[176px] md:size-[300px] lg:size-[240px] xl:size-[305px] 2xl:size-[368px]"
  />
);
const ItemText = ({ name, description, price }) => (
  <div className="flex flex-col justify-center items-center gap-y-1 md:gap-y-3 lg:gap-y-3">
    <h1 className="text-xl font-semibold uppercase md:text-xl lg:text-3xl">
      {name}
    </h1>
    <p className="text-center text-sm font-light md:text-xs">{description}</p>
    <span className="font-bold text-xl md:text-xl lg:text-2xl">{price}</span>
  </div>
);
export const Menu = () => {
  return (
    <div className="bg-[url('/images/menu-indian-food-frame.jpg')] bg-cover flex justify-center">
      <div className="container flex justify-center items-center py-24 md:px-8">
        <div className="bg-gray-100/80">
          <div className="my-2.5 flex flex-col items-center md:mb-1 lg:mb-5">
            <h1 className="font-dancing text-5xl md:text-6xl lg:text-7xl">
              india
            </h1>
            <h2 className="text-[#ad6c12] text-3xl uppercase leading-11 md:text-5xl md:leading-16 md:mb-10 lg:text-6xl lg:leading-16 lg:mb-10">
              ON YOUR PLATE
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {menuItems.map((data, index) => {
              const rowNumber = Math.floor(index / 2);
              return (
                <div className="col-span-2" key={index}>
                  <div
                    className={`flex gap-2 items-center max-md:flex-col md:mx-5 md:pb-5 lg:m-0 lg:p-0 ${
                      rowNumber % 2 === 0
                        ? 'md:flex-row'
                        : 'lg:flex-row-reverse md:flex-row sm:flex-col'
                    }`}
                  >
                    <ItemImage image={data.image} alt={data.alt} />
                    <ItemText
                      name={data.name}
                      description={data.description}
                      price={data.price}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
