import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass fade-in" style={{ padding: '3rem', borderRadius: '1rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <BookOpen size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 className="heading" style={{ fontSize: '1.8rem', margin: 0 }}>MathG12</h1>
          <p style={{ color: 'var(--text-muted)' }}>សៀវភៅគណិតវិទ្យាឌីជីថល</p>
        </div>
        
        {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>ឈ្មោះគណនី</label>
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
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>លេខសម្ងាត់ (Mock)</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            ចូលគណនី
          </button>
        </form>
      </div>
    </div>
  );
}
