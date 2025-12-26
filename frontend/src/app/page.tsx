import Link from 'next/link'
import styles from './Home.module.css'

const features = [
  {
    title: 'Multiple Question Types',
    desc: 'Support for True/False, Text Input, and Multiple Choice questions with correct answer marking.',
    color: '#A78BFA',
    bg: 'rgba(139, 92, 246, 0.2)',
    icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>
  },
  {
    title: 'Easy Quiz Builder',
    desc: 'Intuitive drag-and-drop interface to create quizzes quickly. Add, remove, and reorder questions effortlessly.',
    color: '#2DD4BF',
    bg: 'rgba(20, 184, 166, 0.2)',
    icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>
  },
  {
    title: 'Quiz Dashboard',
    desc: 'View all your quizzes in one place. See question counts, creation dates, and manage your library easily.',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.2)',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>
  }
];

export default function Home() {
  return (
    <div className="container">
      <section className={`${styles.hero} page-header`}>
        <div className="animate-slide-up">
          <h1 className={styles.heroTitle}>Build Engaging Quizzes<br /><span className={styles.heroGradient}>In Minutes</span></h1>
          <p className={styles.heroSub}>Create custom quizzes with multiple question types, manage your library, and share knowledge with others.</p>
          <div className={styles.heroActions}>
            <Link href="/create" className={`btn btn-primary ${styles.heroBtn}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Your First Quiz
            </Link>
            <Link href="/quizzes" className={`btn btn-secondary ${styles.heroBtn}`}>Browse Quizzes</Link>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Powerful Features</h2>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className="card animate-slide-up" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
              <div className={styles.featureIconBox} style={{ background: f.bg, color: f.color }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{f.icon}</svg>
              </div>
              <h4 className={styles.featureTitle}>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 style={{ marginBottom: '16px' }}>Ready to Get Started?</h2>
        <p style={{ marginBottom: '32px', fontSize: '1.125rem' }}>Create your first quiz in just a few minutes.</p>
        <Link href="/create" className={`btn btn-accent ${styles.ctaBtn}`}>Start Building Now</Link>
      </section>
    </div>
  );
}
