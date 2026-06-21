import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title = 'Manu Pande - Premium STEM Tutoring & Mentorship',
  description = 'IIT-style mentorship in Mathematics, Physics, and Chemistry for Grades 8-12. Transform your child into a confident STEM problem solver with 15+ years of teaching excellence.',
  keywords = 'Online Math Tutor USA, Physics Tutor USA, Chemistry Tutor Canada, AP Physics Tutor, AP Chemistry Tutor, STEM Mentor, IIT Math Tutor, IIT Physics Tutor, Online STEM tutoring',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  const siteUrl = 'https://manupande.com';
  const fullTitle = title.includes('Manu Pande')
    ? title
    : `${title} | Manu Pande STEM Mentorship`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      {canonicalUrl && (
        <meta property="og:url" content={`${siteUrl}${canonicalUrl}`} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Manu Pande STEM Mentorship',
          description: description,
          url: siteUrl,
          founder: {
            '@type': 'Person',
            name: 'Manu Pande',
            jobTitle: 'STEM Educator & Mentor',
            description:
              'Engineering professional with 15+ years of teaching experience',
          },
          areaServed: ['United States', 'Canada', 'United Kingdom', 'Australia', 'UAE', 'Saudi Arabia', 'Qatar'],
          educationalLevel: 'Secondary Education',
          courseMode: 'Online',
        })}
      </script>
    </Helmet>
  );
}
