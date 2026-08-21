# Contributors

## Team Members

| Name | GitHub | Role | Contributions |
|------|--------|------|---------------|
| Albert (Efan Tech) | [@efan-tech](https://github.com/efan-tech) | Lead Full-Stack Integration & DevOps | Project Architecture, Express/MongoDB Setup, CORS, Vercel/Render Deployment |
| Mercy | [@mercymuiruri-hue](https://github.com/mercymuiruri-hue) | Frontend Developer | Dashboard UI, Post Cards, Activity Stream, Dynamic Feed Integration |
| Yvonne | [@yvonneofficials06](https://github.com/yvonneofficials06) | UI/UX Developer | Feedback Form, Submission Modals, Client Validation |
| Frank | [@wacekefrancis2-droid](https://github.com/wacekefrancis2-droid) | UI/UX Developer | Interactive Widgets, Status Alerts, Mobile Form Styling |
| Joel | [@musembijoel](https://github.com/musembijoel) | Backend Developer | Database Schemas, Express REST API Routes, Endpoint Testing |
| Nahashon | [@nahashonmutahi95](https://github.com/nahashonmutahi95) | Security & Docs Lead | JWT Auth Interceptors, Error Handling Audit, Documentation |
| Drex | N/A | Security & Docs Co-Lead | Code Syntax Auditing, Pitch Preparation |

## Contribution Breakdown

### Albert ( Efan Tech)
- Set up core project architecture and main layouts (`App.jsx`, Navigation, Routing)
- Managed state integration across component feeds
- Initialized Express server (`server.js`), MongoDB connectivity, and CORS middleware
- Handled DevOps, GitHub repo management, merge conflict resolution, and live deployments on Vercel and Render

### Mercy
- Built `Dashboard.jsx`, Post Cards, and main activity stream UI
- Rendered post data dynamically (titles, author, timestamps, content tags)
- Implemented responsive Tailwind CSS styling for mobile and desktop screens
- Connected feed components to `api.js` to fetch and render posts from the backend

### Yvonne & Frank
- Built `Feedback.jsx`, submission modals, and floating action buttons
- Handled client-side validation, error messages, loading states, and form resets on submission
- Configured mobile-responsive forms, buttons, and status toasts/alerts
- Integrated feedback forms with backend endpoints via Axios (`API.post`)

### Joel
- Defined Mongoose database schemas (`Post.js`, `Feedback.js`) with proper validation rules
- Wrote Express route handlers for CRUD operations (`GET /api/posts`, `POST /api/posts`, `POST /api/feedback`)
- Tested all API endpoints using Postman/Bruno to ensure correct JSON responses and status codes

### Nahashon & Drex
- Configured JWT interceptors, token storage, and protected API routes
- Audited frontend and backend code for missing try/catch blocks, closing syntax braces, and edge cases
- Prepared project pitch and GitHub documentation (`README.md` and installation guides)
