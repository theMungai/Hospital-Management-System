# Hospital Management System

---

**Hospital Management System** is a modern, fully responsive web application designed to streamline medical appointment scheduling and hospital management. It serves patients, doctors and administrators, offering an intuitive interface for browsing healthcare services, reading health blogs, contacting support, and managing accounts.

Built with **ReactJS** and **Vite** for fast development, styled using **Tailwind CSS**, and animated with **GSAP**, the app emphasizes clean design, smooth interactions, and scalability. The backend is powered by **FastAPI**, providing RESTful APIs, authentication, and database management.

# Key Highlights

- **User Authentication:** Sign up, sign in.

- **Service Listings:** Browse available medical services or specialties.

- **Admin Panel:** Manage doctors and patients, view appointments, and control service listings.
  
- **Doctor Panel:** Manage patients, view appointments, and control service listings.

- **Blog System:** Display health-related blog articles or tips.

- **Contact Page:** Get in touch via a user-friendly form with location info.

- **Help Center:** FAQ-style support and troubleshooting for users.

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

- **Built with Vite:** Lightning-fast development and build times.

---

## 🛠 Tech Stack

- **Frontend**: ReactJS + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Form Handling**: react-hook-form 
- **Icons**: Heroicons and Font Awesome
- **Animations**: GSAP (GreenSock Animation Platform) for smooth UI transitions and effects
- **Backend**: FastAPI (Python) for RESTful APIs, authentication, and database management
- **Database**: PostgreSQL




## Project Structure

```text
Health-Management-System/
├── public/                          # Public assets served by frontend
│   ├── icons/                       # Icon files used in the Frontend interface
│   ├── images/                      # Images used in the application's UI
├── src/                             # React frontend source code
│   ├── assets/                      
│   ├── components/
│   │   ├── common/                  # Navbar, Footer, Buttons
│   │   ├── landing/                 # Hero, Features, etc.
│   │   ├── admin/                   # Admin dashboard components
│   │   └── blog/                    # Blog-related components
│   ├── pages/                       # Pages like Login, Register, Home, etc.
│   ├── routes/                      # React Router route definitions
│   ├── hooks/                       # Custom React hooks
│   ├── utils/                       # Utility/helper functions
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Vite entry point
│   └── index.css                    # Global styles
│   └── tailwind.config.js           # Configure and customize Tailwind CSS
│   └── vercel.json                  # Configure how an app is deployed on Vercel
│   └── vite.config.js               # Configure a Vite project
├── backend/
│   ├── App/                         # Fastapi app package
│   │   ├── __init__.py              # Fastapi app factory
│   │   ├── config.py                # App configuration (env, DB, etc.)
│   │   ├── auth/                    # authentication and authorization
│   │   │   └── auth.py              # Authentication i.e Login
│   │   │   └── oauth2.py            # Authorization by generating access_tokens
│   │   ├── core/                    # Roles
│   │   │   └── enums.py             # set of constant rolesvalues
│   │   ├── database/                # Database configuration and connection
│   │   │   └── config.py            # Database configuration
│   │   │   └── database.py          # Database connection
│   │   ├── models/                  # SQLAlchemy models
│   │   │   └── Appointment.py       # Appointment model
│   │   │   └── AppointmentNote.py   # AppointmentNote model
│   │   │   └── Department.py        # Department model
│   │   │   └── User.py              # User model
│   │   │   └── Appointment.py       # Appointment model
│   │   │   └── Doctor.py            # Doctor model
│   │   │   └── DoctorSchedule.py    # DoctorSchedule model
│   │   │   └── Invoice.py           # Invoice model
│   │   │   └── MedicalRecord.py     # MedicalRecord model
│   │   │   └── Notification.py      # Notification model
│   │   │   └── Patient.py           # Patient model
│   │   │   └── Payment.py           # Payment model
│   │   ├── routes/                  # Blueprint routes
│   │   │   └── auth_routes.py       # Login/Register routes
│   │   │   └── appointment_note_routes.py    # Appointment notes routes
│   │   │   └── appointment_routes.py    # Appointment routes
│   │   │   └── doctor_routes.py     # Doctor routes
│   │   │   └── patient_routes.py    # Patient routes
│   │   ├── utils/                   # Utility functions (email, JWT, Hashing passwords)
│   │   │   └── hashing.py           # Hashing passwords using Bcrypt library
│   │   │   └── mail_config.py       # Configure email settings
│   │   │   └── send_otp.py          # Generate and send a one-time password (OTP) to a user for verification or authentication
│   │   └── schemas/                 # Input/output schemas
│   │   │   └── AppointmentSchema.py # Appointment pydantic model
│   │   │   └── AppointmentNoteSchema.py   # AppointmentNote pydantic model
│   │   │   └── PatientSchema.py     # Patient pydantic model
│   │   │   └── UserSchema.py        # User pydantic model
│   │   │   └── TokenSchema.py       # Access tokens pydnatic model
│   │   │   └── DoctorSchema.py      # Doctor pydantic model
│   ├── migrations/                 
│   ├── main.py                      # Entry point
│   └── requirements.txt             # Python dependencies
│   └── uploads/                     # Store files uploaded by users
├── tailwind.config.js               # Tailwind config
├── postcss.config.js                # PostCSS config
├── package.json                     # Node.js dependencies
├── vite.config.js                   # Vite config
└── README.md


```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Python (v3.10+ recommended)
- pip (Python package manager)
- PostgreSQL (or your preferred database)

### Installation

```bash
git clone https://github.com/theMungai/Health-Management-System.git
cd Health-Management-System
npm install
npm run dev
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

### Backend (FastAPI)
```bash
cd Backend
python -m venv venv         # optional
source venv/bin/activate     # Linux/macOS
# venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```


### Pages Overview

| Page            | Description                            |
| --------------- | -------------------------------------- |
| **Landing**     | Hero section, features, testimonials   |
| **Services**    | List of medical services/ Book appoin..|
| **Contact Us**  | Contact form + contact details         |
| **Help**        | FAQs, support contact, troubleshooting |
| **Blogs**       | Health-related blog articles           |
| **Sign In/Up**  | User authentication forms              |
| **Admin Panel** | Manage appointments, doctors, patients |
| **Doctor Panel**| Manage appointments, patients          |
| **Patient Panel**| Manage appointments, and medications  |

###  Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue.
