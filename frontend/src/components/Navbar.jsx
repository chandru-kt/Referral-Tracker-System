import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  const isAuthenticated = !!token;

  const handleLogout = () => {
    if (user?.username) {
      console.log(`Logging out: ${user.username}`);
    }
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MyApp</div>
      <div style={styles.links}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/refer" style={styles.link}>Refer</Link>
            <a href="">Welcome, {user?.username ? `${user.username}` : ''}</a>
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: 'white',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  logout: {
    background: 'transparent',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
  }
};

export default Navbar;
