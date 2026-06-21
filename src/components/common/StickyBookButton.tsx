import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Link
      to="/assessment"
      className="fixed bottom-6 right-6 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-yellow-600 transition-all duration-300 z-50 flex items-center space-x-2 font-semibold animate-bounce"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span>Book Free Assessment</span>
    </Link>
  );
}
