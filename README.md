# Admin Reporting Portal

A comprehensive web-based portal for managing multiple types of reports in one centralized location.

## Features

- 🔐 **Secure Login System** - User authentication and session management
- 📊 **Interactive Dashboard** - Overview of all reports with key metrics
- 📋 **4 Integrated Report Modules**:
  - Visa Report Management
  - Deployment Report Management
  - Invoices Report Management
  - Grievances Report Management
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔍 **Advanced Filtering & Search** - Find reports quickly
- 📥 **Export Functionality** - Download reports in multiple formats
- 📈 **Analytics & Insights** - Visual representations of report data

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Material-UI / Tailwind CSS for styling
- Chart.js / Recharts for visualizations
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Mongoose for ORM

### DevOps
- Docker & Docker Compose
- Git for version control

## Project Structure

```
Admin-Reporting-Portal/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store, actions, reducers
│   │   ├── services/        # API services
│   │   ├── styles/          # Global styles
│   │   └── App.js
│   └── package.json
├── backend/                  # Node.js/Express server
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── .env.example
│   └── server.js
├── docker-compose.yml       # Docker configuration
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (or Docker)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/AvezShaikh01/Admin-Reporting-Portal.git
cd Admin-Reporting-Portal
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend (in another terminal)
cd backend
npm install
```

3. Configure environment variables
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. Start the application
```bash
# Using Docker Compose (recommended)
docker-compose up

# Or manually:
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

5. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/:id` - Get specific report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### Visa Reports
- `GET /api/reports/visa` - Get all visa reports
- `POST /api/reports/visa` - Create visa report

### Deployment Reports
- `GET /api/reports/deployment` - Get all deployment reports
- `POST /api/reports/deployment` - Create deployment report

### Invoices Reports
- `GET /api/reports/invoices` - Get all invoice reports
- `POST /api/reports/invoices` - Create invoice report

### Grievances Reports
- `GET /api/reports/grievances` - Get all grievance reports
- `POST /api/reports/grievances` - Create grievance report

## Report Management

### Visa Report
- Applicant information
- Application status tracking
- Document checklist
- Interview schedules
- Status updates

### Deployment Report
- Project details
- Deployment timeline
- Environment tracking
- Deployment status
- Performance metrics

### Invoices Report
- Invoice generation
- Payment tracking
- Due dates
- Amount details
- Invoice history

### Grievances Report
- Grievance submission
- Status tracking
- Resolution timeline
- Comments and updates
- Escalation management

## Dashboard Features

- **Summary Cards** - Quick overview of report counts
- **Status Indicators** - Visual status of each report type
- **Recent Activity** - Latest updates across all reports
- **Quick Actions** - Buttons to create new reports
- **Charts & Graphs** - Visual analytics of report data

## Authentication

- Secure JWT-based authentication
- Password hashing with bcrypt
- Session management
- Role-based access control (optional)

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Multi-user collaboration
- [ ] Audit logging
- [ ] API rate limiting
- [ ] Mobile app
- [ ] Integration with external services
- [ ] Advanced search capabilities

---

**Last Updated:** 2026-05-05
