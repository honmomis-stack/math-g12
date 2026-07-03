import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="glass" style={{ padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h2 className="heading" style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>MathG12</h2>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} />
            <span>{user.name}</span>
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
