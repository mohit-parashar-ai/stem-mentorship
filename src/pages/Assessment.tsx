import { useState, FormEvent } from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import { submitConsultationBooking } from '../lib/supabase';

const countries = ['USA', 'Canada', 'United Kingdom', 'Australia', 'UAE', 'Saudi Arabia', 'Qatar', 'Other'];
const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

export default function Assessment() {
  const [formData, setFormData] = useState({
    parent_name: '',
    student_name: '',
    email: '',
    phone: '',
    country: '',
    grade: '',
    preferred_time: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitConsultationBooking(formData);
      setIsSuccess(true);
      setFormData({
        parent_name: '',
        student_name: '',
        email: '',
        phone: '',
        country: '',
        grade: '',
        preferred_time: '',
        notes: '',
      });
    } catch (err) {
      setError(
        'Something went wrong. Please try again or email us directly at manu@stemmentorship.com'
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <SEO
          title="Assessment Booked"
          description="Your free STEM assessment has been booked successfully"
          canonicalUrl="/assessment"
        />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Assessment Booked!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking your free STEM assessment. I'll reach out
              within 24 hours to confirm your preferred time and discuss your
              child's goals.
            </p>
            <p className="text-gray-600 mb-6">
              In the meantime, feel free to explore our programs or reach out
              if you have any questions.
            </p>
            <div className="space-y-3">
              <a href="/" className="btn btn-primary w-full block text-center">
                Back to Home
              </a>
              <a
                href="/programs"
                className="btn btn-secondary w-full block text-center"
              >
                View Programs
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Free STEM Assessment"
        description="Book your free STEM assessment call with Manu Pande. Discover how IIT-style problem solving can transform your child's Math, Physics, and Chemistry skills."
        canonicalUrl="/assessment"
      />

      <HeroSection
        title="Book Your Free STEM Assessment"
        subtitle="Let's discuss your child's goals and create a personalized learning roadmap"
        primaryButtonText="Fill Form Below"
        primaryButtonLink="#assessment-form"
        secondaryButtonText="View Programs"
      />

      <section id="assessment-form" className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              What to Expect in Your Assessment Call
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-primary mb-2">
                  Goal Discussion
                </h3>
                <p className="text-sm text-gray-600">
                  We'll discuss your child's academic goals and challenges
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold text-primary mb-2">
                  Level Assessment
                </h3>
                <p className="text-sm text-gray-600">
                  Quick evaluation of current understanding and skill gaps
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-semibold text-primary mb-2">
                  Custom Roadmap
                </h3>
                <p className="text-sm text-gray-600">
                  Personalized learning plan with clear milestones
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parent_name" className="label">
                    Parent Name *
                  </label>
                  <input
                    type="text"
                    id="parent_name"
                    name="parent_name"
                    required
                    value={formData.parent_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="student_name" className="label">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="student_name"
                    name="student_name"
                    required
                    value={formData.student_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your child's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="label">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="grade" className="label">
                    Student's Grade *
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="preferred_time" className="label">
                  Preferred Time for Call
                </label>
                <input
                  type="text"
                  id="preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Weekdays 6-8 PM EST, or Weekend mornings"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include your time zone for easier scheduling
                </p>
              </div>

              <div>
                <label htmlFor="notes" className="label">
                  Additional Information
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={5}
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Tell me about your child's academic goals, current challenges, subjects of interest, or any specific topics you'd like to discuss during the assessment..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking...' : 'Book Free Assessment'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted regarding your
                assessment booking. We respect your privacy and will never share
                your information.
              </p>
            </form>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <svg
                className="w-6 h-6 text-secondary flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  What Happens Next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    ✓ You'll receive a confirmation email within 24 hours
                  </li>
                  <li>
                    ✓ I'll send you a calendar invite for the assessment call
                  </li>
                  <li>
                    ✓ During the call, we'll discuss goals and evaluate current
                    level
                  </li>
                  <li>
                    ✓ You'll receive a personalized learning plan and program
                    recommendation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
