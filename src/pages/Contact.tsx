import { useState, FormEvent } from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/common/HeroSection';
import { submitLead } from '../lib/supabase';

const countries = ['USA', 'Canada', 'United Kingdom', 'Australia', 'UAE', 'Saudi Arabia', 'Qatar', 'Other'];
const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const subjects = ['Mathematics', 'Physics', 'Chemistry', 'All Subjects'];

export default function Contact() {
  const [formData, setFormData] = useState({
    parent_name: '',
    student_name: '',
    email: '',
    phone: '',
    country: '',
    grade: '',
    subject_interest: '',
    message: '',
    source: 'Contact Page',
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
      await submitLead(formData);
      setIsSuccess(true);
      setFormData({
        parent_name: '',
        student_name: '',
        email: '',
        phone: '',
        country: '',
        grade: '',
        subject_interest: '',
        message: '',
        source: 'Contact Page',
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(
        'Something went wrong. Please try again or email us directly at support@foiclasses.com'
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Manu Pande for inquiries about STEM tutoring, mentorship programs, or to schedule a consultation."
        canonicalUrl="/contact"
      />

      <HeroSection
        title="Get in Touch"
        subtitle="Have questions? Ready to start your STEM journey? Let's connect."
        primaryButtonText="Fill Form Below"
        primaryButtonLink="#contact-form"
        secondaryButtonText="Book Assessment"
        secondaryButtonLink="/assessment"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Let's Connect
              </h2>
              <p className="text-gray-700 mb-8">
                Whether you have questions about programs, pricing, scheduling, or
                just want to learn more about how IIT-style mentorship can help
                your child, I'm here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a
                      href="mailto:support@foiclasses.com"
                      className="text-gray-600 hover:text-secondary transition-colors"
                    >
                      support@foiclasses.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      Within 24 hours on business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      Serving
                    </h3>
                    <p className="text-gray-600">
                      USA, Canada, UK, Australia, UAE, Saudi Arabia, Qatar
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-primary mb-3">
                  Prefer to Book Directly?
                </h3>
                <p className="text-gray-600 mb-4">
                  Skip the form and book your free STEM assessment call right
                  away.
                </p>
                <a href="/assessment" className="btn btn-secondary">
                  Book Free Assessment
                </a>
              </div>
            </div>

            <div id="contact-form">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Send a Message
                </h3>

                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    Thank you! Your message has been sent successfully. I'll get
                    back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="parent_name" className="label">
                      Your Name *
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
                      placeholder="Student's name"
                    />
                  </div>

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
                        <option value="">Select country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="grade" className="label">
                        Grade *
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
                    <label htmlFor="subject_interest" className="label">
                      Subject Interest *
                    </label>
                    <select
                      id="subject_interest"
                      name="subject_interest"
                      required
                      value={formData.subject_interest}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tell me about your inquiry, goals, or any questions you have..."
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
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
