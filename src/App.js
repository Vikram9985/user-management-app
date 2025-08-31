import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import { UsersProvider } from './context/UsersContext';

export default function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <div className="container">
          <header className="header">
            <div className="flex items-center justify-end gap-4 mr-5 mt-3">
  <div className="brand font-semibold">👤 User Management</div>
  <nav className="controls flex gap-3">
    <NavLink to="/" className="btn secondary">Home</NavLink>
    <Link to="/add-user" className="btn">+ Add User</Link>
  </nav>
</div>

          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
          </Routes>

          <footer className="footer">
            Built with React, React Router, and Axios.
          </footer>
        </div>
      </UsersProvider>
    </BrowserRouter>
  );
}
