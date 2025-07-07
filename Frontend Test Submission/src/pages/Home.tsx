import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to URL Shortener</h1>
      <p className="text-xl mb-8">Shorten your URLs quickly and easily</p>
      <Link
        to="/shorten"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;