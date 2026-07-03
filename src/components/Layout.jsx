import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { LogOut, User, Sun, Moon } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="glass" style={{ padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h2 className="heading" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>MathG12</h2>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          <button onClick={toggleTheme} className="btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }} title={theme === 'light' ? 'ប្តូរទៅ Dark Mode' : 'ប្តូរទៅ Light Mode'}>
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} />
            <span style={{ fontWeight: '500' }}>{user.name}</span>
          </div>
          <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={16} /> ចាកចេញ
          </button>
        </div>
      </header>
      
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
