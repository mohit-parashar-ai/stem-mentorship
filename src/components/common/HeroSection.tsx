import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  primaryButtonText = 'Book Free Assessment',
  primaryButtonLink = '/assessment',
  secondaryButtonText = 'View Programs',
  secondaryButtonLink = '/programs',
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className={`relative ${
        backgroundImage ? 'bg-cover bg-center' : 'bg-gradient-to-br from-primary via-primary to-blue-900'
      } text-white`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
      )}
      <div className="relative section-container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 text-balance">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryButtonLink} className="btn btn-accent text-lg">
              {primaryButtonText}
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link to={secondaryButtonLink} className="btn btn-secondary text-lg">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
