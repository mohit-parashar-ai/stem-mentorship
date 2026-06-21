import { Link } from 'react-router-dom';

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function CTABanner({
  title = 'Ready to Transform Your Child\'s STEM Journey?',
  description = 'Book a free assessment call and discover how IIT-style problem solving can unlock your child\'s full potential.',
  primaryButtonText = 'Book Free Assessment',
  primaryButtonLink = '/assessment',
  secondaryButtonText = 'View Programs',
  secondaryButtonLink = '/programs',
}: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-secondary to-blue-800 text-white section-padding">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={primaryButtonLink} className="btn btn-accent">
            {primaryButtonText}
          </Link>
          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink} className="btn btn-secondary">
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
