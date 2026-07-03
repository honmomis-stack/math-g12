import { Link } from 'react-router-dom';
import { chapters } from '../data/mockData';
import { Book, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container fade-in">
      <h1 className="heading" style={{ fontSize: '2rem', marginBottom: '2rem' }}>មាតិកាសៀវភៅ</h1>
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(79, 70, 229, 0.2)', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                <Book size={24} />
              </div>
              <h2 className="heading" style={{ margin: 0, fontSize: '1.25rem' }}>{chapter.title}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {chapter.subchapters.map((sub) => (
                <Link 
                  key={sub.id} 
                  to={`/lesson/${sub.id}`}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '0.75rem 1rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                >
                  <span>{sub.title}</span>
                  <ChevronRight size={18} color="var(--primary)" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
