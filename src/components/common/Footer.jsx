const footerData = [
  {
    title: 'Company',
    links: ['About', 'Careers', 'Brand Center', 'Blog'],
  },
  {
    title: 'Help Center',
    links: ['Discord Server', 'Twitter', 'Facebook', 'Contact Us'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Licensing', 'Terms & Conditions'],
  },
  {
    title: 'Download',
    links: ['iOS', 'Android', 'Windows', 'MacOS'],
  },
];

export const Footer = () => (
  <footer className="bg-white shadow dark:bg-white">
    <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
      {footerData.map(({ title, links }, index) => (
        <div key={index}>
          <h2 className="mb-6 text-lg font-semibold text-gray-900 uppercase">
            {title}
          </h2>
          <ul className="space-y-4 text-base font-medium text-gray-500">
            {links.map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);
