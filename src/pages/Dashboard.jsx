import { Link } from 'react-router-dom';
import { chapters } from '../data/mockData';
import { Book, ChevronRight, Calculator, Shapes } from 'lucide-react';

export default function Dashboard() {
  const getIcon = (title) => {
    if (title.includes('ធរណីមាត្រ')) return <Shapes size={24} />;
    return <Calculator size={24} />;
  }

  return (
    <div className="container fade-in">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="heading" style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>មាតិកាសៀវភៅ</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>ជ្រើសរើសជំពូក និងមេរៀនដើម្បីចាប់ផ្តើមការសិក្សារបស់អ្នក</p>
      </div>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="glass" style={{ padding: '2rem', borderRadius: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
                {getIcon(chapter.title)}
              </div>
              <h2 className="heading" style={{ margin: 0, fontSize: '1.4rem' }}>{chapter.title}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {chapter.subchapters.map((sub) => (
                <Link 
                  key={sub.id} 
                  to={`/lesson/${sub.id}`}
                  className="btn-outline"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1rem 1.25rem', 
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontWeight: '500' }}>{sub.title}</span>
                  <ChevronRight size={20} color="var(--primary)" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
