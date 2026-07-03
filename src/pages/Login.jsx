import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('ឈ្មោះគណនីត្រូវមានយ៉ាងហោចណាស់ ៣ តួអក្សរ។');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: theme === 'light' 
        ? 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)' 
        : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      position: 'relative'
    }}>
      
      <button 
        onClick={toggleTheme} 
        style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-main)', boxShadow: 'var(--shadow-sm)' }}
        title="ប្តូរពណ៌ (Theme)"
      >
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      <div className="glass fade-in" style={{ padding: '3.5rem 3rem', borderRadius: '1.5rem', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '1rem', marginBottom: '1rem' }}>
            <BookOpen size={48} color="var(--primary)" />
          </div>
          <h1 className="heading" style={{ fontSize: '2.2rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>MathG12</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>សៀវភៅគណិតវិទ្យាឌីជីថលជំនាន់ថ្មី</p>
        </div>
        
        {error && <div className="fade-in" style={{ color: 'var(--error)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.95rem', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>ឈ្មោះគណនី</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="បញ្ចូលឈ្មោះរបស់អ្នក..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>លេខសម្ងាត់ (អត់ក៏បាន)</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.85rem', fontSize: '1.05rem' }}>
            ចូលគណនី
          </button>
        </form>
      </div>
    </div>
  );
}
