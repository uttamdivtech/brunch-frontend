import { GoDotFill } from 'react-icons/go';

export const ItemDescription = () => {
  const highlights = [
    {
      title: 'New Tastes',
      dots: 1,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, deserunt.',
    },
    {
      title: 'New Spices',
      dots: 2,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, deserunt.',
    },
    {
      title: 'New Dishes',
      dots: 3,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, deserunt.',
    },
  ];

  return (
    <>
      {/* Item Contents */}
      <section className="bg-[#2a3c40] py-6 md:py-10 lg:py-14 shadow flex justify-center">
        <div className="container flex flex-col-reverse gap-5 md:flex-row md:mr-7">
          <div className="flex flex-col gap-y-3 justify-center items-center lg:items-start text-white">
            <h1 className="text-xl md:text-2xl font-semibold lg:ml-8">
              Indian traditional flavour
            </h1>
            <p className="text-[#e4e7e7] mx-8 text-sm font-light text-center md:text-left lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium, unde. Adipisci incidunt mollitia esse eaque obcaecati
              omnis sit a tempora deleniti aliquam, quae sed nostrum, ad odio
              provident autem maiores.
            </p>
          </div>
          <div className="md:w-90 lg:w-11/12">
            <img
              src="/images/item-indian-food.jpg"
              alt="Indian food dish"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Item Highlights */}
      <section className="py-5 lg:py-12 shadow flex justify-center">
        <div className="container flex justify-around text-[#2a3c40] font-semibold">
          {highlights.map(({ title, dots, description }, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="flex text-3xl lg:text-4xl space-x-[-12px]">
                {Array.from({ length: dots }).map((_, i) => (
                  <GoDotFill key={i} />
                ))}
              </div>
              <div className="mx-2.5">
                <h2 className="mt-0.5 mb-3 text-sm lg:text-base">{title}</h2>
                <p className="font-light text-xs lg:text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
