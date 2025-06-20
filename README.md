 📄 Project Report: Evently – Event Management App

 📌 Overview:
Evently is a full-stack web application developed using React.js (frontend) and Django (backend) that allows users to manage events by:
 Logging in securely
 Viewing Upcoming and Past Events
 Adding new events
 Filtering and searching events

---

 🏗️ Architecture & Technology Stack:

| Layer         | Tech Used                         | Description                                                |
| ------------- | --------------------------------- | ---------------------------------------------------------- |
| Frontend      | React.js                          | For building a responsive and dynamic user interface       |
| Backend       | Django (REST API)                 | To handle server-side logic, API endpoints, authentication |
| Styling       | Tailwind CSS / CSS Modules        | For modern UI design                                       |
| Database      | SQLite (Dev) or PostgreSQL (Prod) | For storing user info and event details                    |
| Communication | Axios / Fetch API                 | For frontend-backend interaction                           |

---

 🔐 User Authentication System:
![Login Page](attachment)
Features:
 Form with username and password fields
 "Log In" button triggers API call to Django backend to validate credentials
 Link to Sign Up for new users

Backend:
 Django handles session/token-based authentication (possibly via `django-rest-framework-simplejwt`)
 Secure password hashing using Django’s built-in user model
---

 🏠 Home Page – Event Listings
![Dashboard Page](attachment)
Top Navbar:
 Logo ("Evently")
 Navigation: `Upcoming | Past | Add | Logout`
 Auth status check – `Logout` shown if user is logged in

Main Section:
 Filter By: Dropdown menu to filter events (e.g., All, Workshops, Seminars, etc.)
 Search: Input to filter events by title/keyword

Content Area:
 Displays Event Listings
 Currently shows no data (likely due to empty DB or loading)

Backend:
 Django API endpoint like `/api/events/` returning JSON list of events
 Filters handled via query params (e.g., `?type=past`, `?search=python`)

---

 📅 Event Functionalities

 1. Add Event Page
 Likely located at `/add`
 Form to create a new event with fields like title, description, date, type, etc.
 On submission, React sends a POST request to Django API

 2. Upcoming & Past Events
 Clicking “Upcoming” or “Past” filters events based on the current date
 Events are sorted and categorized dynamically

---

 ✅ Key Functionalities Summary:

| Feature             | Functionality                                  |
| ------------------- | ---------------------------------------------- |
| 🔐 Login            | User authentication with Django backend        |
| 📋 Event Listing    | Lists all events dynamically via API           |
| 🔍 Search & Filter  | Client-side filtering with real-time updates   |
| ➕ Add Event         | Form submission to Django API                  |
| 📆 Event Categories | Dynamically separates past and upcoming events |

---

 🧪 Testing & Deployment Plan (Suggestions):

 Testing: Use Postman for API endpoints, React Testing Library for frontend components
 Deployment: Deploy React frontend on Vercel/Netlify, Django backend on Render/Heroku
 Security: Use JWT or session-based auth with HTTPS

---

 📦 Future Improvements:

 Profile management
 Event registration feature
 RSVP system with email notifications
 Admin dashboard for approval of events

---

