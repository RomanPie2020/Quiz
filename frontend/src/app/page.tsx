import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="page-header" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="animate-slide-up">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
            Build Engaging Quizzes<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #14B8A6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              In Minutes
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Create custom quizzes with multiple question types, manage your quiz library, and share your knowledge with others.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/create" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Your First Quiz
            </Link>
            <Link href="/quizzes" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
              Browse Quizzes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>
          Powerful Features
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {/* Feature 1 */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#A78BFA'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <h4 style={{ marginBottom: '12px' }}>Multiple Question Types</h4>
            <p>Support for True/False, Text Input, and Multiple Choice questions with correct answer marking.</p>
          </div>

          {/* Feature 2 */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#2DD4BF'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h4 style={{ marginBottom: '12px' }}>Easy Quiz Builder</h4>
            <p>Intuitive drag-and-drop interface to create quizzes quickly. Add, remove, and reorder questions effortlessly.</p>
          </div>

          {/* Feature 3 */}
          <div className="card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: '#60A5FA'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <h4 style={{ marginBottom: '12px' }}>Quiz Dashboard</h4>
            <p>View all your quizzes in one place. See question counts, creation dates, and manage your library easily.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '60px', 
        marginTop: '40px',
        marginBottom: '60px',
        borderRadius: '24px',
        background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ marginBottom: '32px', fontSize: '1.125rem' }}>
          Create your first quiz in just a few minutes.
        </p>
        <Link href="/create" className="btn btn-accent" style={{ padding: '16px 40px', fontSize: '1.125rem' }}>
          Start Building Now
        </Link>
      </section>
    </div>
  );
}
