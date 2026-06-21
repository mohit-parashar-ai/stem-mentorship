import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl font-bold text-secondary mb-4">404</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-3">
            <Link to="/" className="btn btn-primary w-full block text-center">
              Go to Homepage
            </Link>
            <Link
              to="/programs"
              className="btn btn-secondary w-full block text-center"
            >
              View Programs
            </Link>
            <Link
              to="/contact"
              className="text-secondary hover:text-blue-700 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
