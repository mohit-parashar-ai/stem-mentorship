import { Link } from 'react-router-dom';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExitIntentModal({
  isOpen,
  onClose,
}: ExitIntentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-primary mb-3">
            Wait! Before You Go...
          </h3>
          <p className="text-gray-600 mb-6">
            Get your free STEM Readiness Assessment and discover how we can help
            your child excel in Math, Physics, and Chemistry.
          </p>

          <div className="space-y-3">
            <Link
              to="/assessment"
              onClick={onClose}
              className="btn btn-primary w-full"
            >
              Book Free Assessment
            </Link>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
