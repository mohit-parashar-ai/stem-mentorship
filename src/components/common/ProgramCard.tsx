import { Link } from 'react-router-dom';

interface ProgramCardProps {
  title: string;
  description: string;
  grade: string;
  subjects: string[];
  duration: string;
  highlights: string[];
}

export default function ProgramCard({
  title,
  description,
  grade,
  subjects,
  duration,
  highlights,
}: ProgramCardProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-secondary font-semibold">{grade}</p>
      </div>

      <p className="text-gray-700 mb-4">{description}</p>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">Subjects:</p>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <span
              key={subject}
              className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">
          Key Highlights:
        </p>
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <svg
                className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Duration: {duration}</span>
        </div>
        <Link to="/assessment" className="btn btn-primary w-full text-center">
          Book Assessment
        </Link>
      </div>
    </div>
  );
}
