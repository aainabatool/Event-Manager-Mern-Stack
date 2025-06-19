import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Login from './components/Login';
import { AuthContext } from './contexts/AuthContext';
import './App.css'; // Custom styles

function App() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { isAuthenticated, logout } = useContext(AuthContext); // 👈 Use context

  const AppContent = () => {
    const location = useLocation();
    const showFilterSearch = location.pathname === '/' || location.pathname === '/past';

    return (
      <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark modern-navbar shadow-lg py-3">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3 fw-bold" to="/">🎯 Evently</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-2 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Upcoming</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/past">Past</Link>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">Add</Link>
                  </li>
                )}
                <li className="nav-item">
                  {isAuthenticated ? (
                    <button
                      className="btn btn-outline-light ms-2 scale-hover"
                      onClick={() => {
                        logout(); // 👈 Calls context logout
                        window.location.href = '/login';
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link className="nav-link" to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Filter/Search Bar */}
        {showFilterSearch && (
          <div className="container mt-4 fade-in">
            <div className="row g-3 align-items-center glass-panel p-3 rounded-4 shadow">
              <div className="col-md-4">
                <label htmlFor="filter" className="form-label fw-semibold text-white">Filter by:</label>
                <select
                  id="filter"
                  className="form-select shadow-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
              <div className="col-md-8">
                <label htmlFor="search" className="form-label fw-semibold text-white">Search:</label>
                <input
                  type="text"
                  id="search"
                  className="form-control shadow-sm"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container my-5 fade-in">
          <Routes>
            <Route path="/" element={<EventList filter={filter} search={search} />} />
            <Route path="/past" element={<EventList filter="past" search={search} />} />
            <Route path="/add" element={<EventForm />} />
            <Route path="/edit/:id" element={<EventForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="text-center py-3 modern-footer mt-auto">
          <small>&copy; {new Date().getFullYear()} Evently</small>
        </footer>
      </>
    );
  };

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-gradient-custom text-light">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
