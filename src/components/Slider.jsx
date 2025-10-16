import { useCallback, useEffect, useState } from 'react';

export const Slider = () => {
  const slides = [
    {
      text: 'Traditional cuisine made easy',
      p: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
      color: 'bg-white',
    },
    {
      text: 'Authentic flavors, modern twist',
      p: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
      color: 'bg-white',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <div className="flex flex-col justify-center">
      <div className="container relative w-full mx-auto overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map(({ text, p, color }, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full h-72 md:h-64 lg:h-96 px-6 lg:px-12 flex items-center ${color}`}
            >
              <div className="flex flex-col items-center gap-4 text-[#2A3C40] text-center">
                <h1 className="text-base md:text-3xl lg:text-3xl font-bold tracking-wide">
                  {text}
                </h1>
                <p className="text-sm font-light mx-8">{p}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-3 lg:left-4 transform -translate-y-1/2 p-2 md:p-4 lg:p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#767676]"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              d="M15 18L9 12L15 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-3 transform -translate-y-1/2 p-2 md:p-4 lg:p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#767676]"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              d="M9 6L15 12L9 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full border transition-colors duration-300 ${
                currentSlide === index
                  ? 'bg-black border-black'
                  : 'bg-[#767676] border-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-10 flex justify-center flex-wrap gap-6 md:gap-16 text-[#2A3C40] font-light text-lg md:text-3xl lg:text-4xl py-5">
        <h2>Meals</h2>
        <h2>Spices</h2>
        <h2>Book</h2>
        <h2>Gallery</h2>
      </div>
    </div>
  );
};
