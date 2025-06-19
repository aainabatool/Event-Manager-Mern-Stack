import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Login from './components/Login';

function App() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const isAuthenticated = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  // 👇 Nested component to access hooks like useLocation
  const AppContent = () => {
    const location = useLocation();

    const showFilterSearch = location.pathname === '/' || location.pathname === '/past';

    return (
      <>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold fs-4" to="/">📅 Event Manager</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Upcoming</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/past">Past</Link>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">Add Event</Link>
                  </li>
                )}
                <li className="nav-item">
                  {isAuthenticated ? (
                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
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
          <div className="container mt-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label htmlFor="filter" className="form-label fw-semibold">Filter by:</label>
                <select
                  id="filter"
                  className="form-select shadow-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming Events</option>
                  <option value="past">Past Events</option>
                </select>
              </div>
              <div className="col-md-8">
                <label htmlFor="search" className="form-label fw-semibold">Search:</label>
                <input
                  type="text"
                  id="search"
                  className="form-control shadow-sm"
                  placeholder="Search events by name, date, or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<EventList filter={filter} search={search} />} />
            <Route path="/past" element={<EventList filter="past" search={search} />} />
            <Route path="/add" element={<EventForm />} />
            <Route path="/edit/:id" element={<EventForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-light text-center py-3 mt-auto">
          <small>&copy; {new Date().getFullYear()} Event Manager App</small>
        </footer>
      </>
    );
  };

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
