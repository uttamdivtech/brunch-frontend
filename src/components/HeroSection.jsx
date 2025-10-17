import { useContext, useEffect, useState } from 'react';
import { ModalManager } from '../modals/ModalManager';
import { LoginContext } from '../contexts/ContextCreator';

const homeContent = {
  background: "url('/images/fresh-gourmet-salad-plate.jpg')",
  title: 'Brunch',
  slogan: 'Taste the Best Food in Town',
  description: 'Fresh ingredients, delicious recipes, and a cozy atmosphere.',
};

export const HeroSection = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('signup');

  useEffect(() => {
    const currentUser = sessionStorage.getItem('loggedInUser');
    if (currentUser) setLoggedInUser(true);
  }, [setLoggedInUser]);

  const switchForm = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: homeContent.background }}
      >
        <div className="bg-gray-100/80 p-8 flex flex-col items-center gap-2 rounded-lg text-center max-w-2xl">
          <h1 className="font-dancing text-5xl md:text-6xl lg:text-7xl">
            {homeContent.title}
          </h1>
          <h2 className="text-base uppercase font-medium text-[#ad6c12] md:text-3xl lg:text-4xl">
            {homeContent.slogan}
          </h2>
          <p className="text-black text-sm font-light mb-5 md:text-lg lg:text-xl">
            {homeContent.description}
          </p>

          {!loggedInUser && (
            <div className="flex gap-4">
              <button
                onClick={() => switchForm('signup')}
                className="cursor-pointer bg-(--color-primary) hover:bg-(--color-secondary) w-52 text-white font-semibold py-3 rounded transition"
              >
                Sign Up
              </button>
              <ModalManager
                formType={formType}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                switchForm={switchForm}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
